'use strict';

require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,});

console.log('connection successful');


//Drill 1

knexInstance
  .select('*')
  .from('amazong_products')
  .where({ name: 'Point of view gun' })
  .then(result => {
    console.log(result)
  })