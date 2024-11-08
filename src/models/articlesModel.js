const connection = require('../db-config');

const db = connection.promise();

const findAllArticles = () => db.query('SELECT * FROM articles');

module.exports = {
  findAllArticles,
};
