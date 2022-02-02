const connection = require('../db-config');

const db = connection.promise();

const findAllSubCategories = ({ categoryId }) => {
  let query = 'SELECT * FROM subCategories';

  const params =[];

  if (categoryId) {
    query += ' WHERE categoryId = ?'
    params.push(categoryId);
  }

  return db.query(query, params);
}

const findOneSubCategory = (id) => db.query('SELECT * FROM subCategories WHERE id = ?', [id]);

const postSubCategory = ({ name }) => db.query('INSERT INTO subCategories (name) VALUES (?)', [name]);

const putSubCategory = (id, validSubCategory) => db.query('UPDATE subCategories SET ? WHERE id = ?', [validSubCategory, id]);

const deleteSubCategory = (id) => db.query('DELETE FROM subCategories WHERE id = ?', [id]);

module.exports = {
  findAllSubCategories,
  findOneSubCategory,
  postSubCategory,
  putSubCategory,
  deleteSubCategory,
};
