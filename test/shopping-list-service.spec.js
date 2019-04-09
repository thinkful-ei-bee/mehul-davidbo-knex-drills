'use strict';
const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');
require('dotenv').config();

describe('Shopping List Service', () => {
  let db;
  before(() => { 
    db = knex({ 
      client: 'pg', 
      connection: process.env.DB_URL });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  const testData = [
    { 
      id: 1,
      name: 'Fish Tricks',
      price: '13.10',
      date_added: new Date('2100-05-22T16:28:32.615Z'),      
      checked: false,
      category: 'Main'
    },

    { 
      id: 2,
      name: 'Not Dogs',
      price: '43.10',
      date_added: new Date('2100-05-22T16:28:32.615Z'),      
      checked: false,
      category: 'Snack'
    },

    { 
      id: 3,
      name: 'Dog Tricks',
      price: '23.10',
      date_added: new Date('2100-05-22T16:28:32.615Z'),      
      checked: false,
      category: 'Main'
    },
  ];
  
  beforeEach(() => {
    return db.into('shopping_list').insert(testData);
  });

  it('gets all items when requested', () => {
    return ShoppingListService.getAllItems(db)
      .then(res => {
         expect(testData).to.eql(res.map(item => ({
           ...item,
          date_added: new Date(item.date_added)
          })))
      });
  });


  it('gets a particular item when requested', () => {
    return  ShoppingListService.getItemById(db,2)
      .then(res => {
        let res_arr = res.map(item => ({
          ...item,
         date_added: new Date(item.date_added)
         }));
       return  expect(testData[1]).to.eql(res_arr[0]);
      });
  });



  it('delete an item when requested', () => {
    let tempData = testData.filter(data => data.id !=2);
    return ShoppingListService.deleteItem(db,2)
    .then(() => ShoppingListService.getAllItems(db))
    .then(res => {
      expect(tempData).to.eql(res.map(item => ({
         ...item,
        date_added: new Date(item.date_added)
        })))
    })
    
  });


  it('update an item when requested', () => {
    let updatedInfo = {
      name: 'testName',
      price: '99.99'
    }
    testData[1].name = updatedInfo.name;
    testData[1].price = updatedInfo.price;
    return ShoppingListService.updateItem(db,2,updatedInfo)
    .then(() => ShoppingListService.getItemById(db,2))
    .then(res => {
      let res_arr = res.map(item => ({
        ...item,
       date_added: new Date(item.date_added)
       }));
      expect(testData[1]).to.eql(res_arr[0])
    })
    
  });


  it('insert an item when requested', () => {
    let newItem = {
      id: 5,
      name: 'TestItem3',
      price: '45.10',
      date_added: new Date('2100-05-22T16:28:32.615Z'),      
      checked: false,
      category: 'Snack'
    }
    return ShoppingListService.insertItem(db,newItem)
    .then(() => ShoppingListService.getItemById(db,5))
    .then(res => {
      let res_arr = res.map(item => ({
        ...item,
       date_added: new Date(item.date_added)
       }));
      expect(newItem).to.eql(res_arr[0])
    })
    
  });

});