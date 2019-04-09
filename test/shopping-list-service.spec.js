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
    {name: 'Fish Tricks',
      price: 13.10,
      category: 'Main',
      checked: false,
      date_added: new Date(),
      id: 1 },

    {name: 'Not Dogs',
      price: 4.99,
      category: 'Snack',
      checked: true,
      date_added: new Date(),
      id: 2 },

    {name: 'Bluffalo Wings',
      price: 5.50,
      category: 'Snack',
      checked: false,
      date_added: new Date(),
      id: 3 },
  ];
  
  beforeEach(() => {
    return db.into('shopping_list').insert(testData);
  });

  it('gets all items when requested', () => {
    ShoppingListService.getAllItems(db)
      .then((res) => {
        expect(res).to.eql(testData);
      });
  });
});