'use strict';

require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,});

console.log('connection successful');


//Drill 1

function searchName (searchTerm){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%` )
    .then(result => {
      console.log(result);
    });
}


function itemPaginated (pageNumber){
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(6)
    .offset(6*(pageNumber-1))
    .then(result => {
      console.log(result);
    });
}
  
function afterDate(daysAgo) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added',
      '>',
      knexInstance.raw('now() - \'?? days\'::INTERVAL', daysAgo))
    .then(result => {
      console.log(result);
    });
}




function totalCost(){
  knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
}

totalCost();