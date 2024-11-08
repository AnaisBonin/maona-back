const connection = require('../db-config');

const db = connection.promise();

const findAllCategories = () => db.query('SELECT * FROM categories');

const findOneCategory = (id) => db.query('SELECT * FROM categories WHERE id = ?', [id]);

const postCategory = ({ name }) => db.query('INSERT INTO categories (name) VALUES (?)', [name]);

const putCategory = (id, validCategory) => db.query('UPDATE categories SET ? WHERE id = ?', [validCategory, id]);

const deleteCategory = (id) => db.query('DELETE FROM categories WHERE id = ?', [id]);

module.exports = {
  findAllCategories,
  findOneCategory,
  postCategory,
  putCategory,
  deleteCategory,
};
