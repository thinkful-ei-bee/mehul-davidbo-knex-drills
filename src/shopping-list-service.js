'use strict';

const ShoppingListService = {
  getAllItems(db) {
    return (
      db.select('*').from('shopping_list')
    );
  },

  getItemById(db, id) {
    return (
      db.select('*').from('shopping_list').where('id', id)
    );
  },

  deleteItem(db, id) {
    return (
      db.select('*').from('shopping_list').where('id', id).delete()
    );
  },

  insertItem(db, newItem) {
    return (
      db.insert(newItem).into('shopping_list')
        .returning('*')
        .then(res => res[0])
    );
  },

  updateItem(db, id, updates) {
    return (
      db('shopping_list')
        .where({id})
        .update(updates)
    );
  } 
};



module.exports = ShoppingListService;
