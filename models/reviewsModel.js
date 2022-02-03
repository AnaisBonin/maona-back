const connection = require('../db-config');

const db = connection.promise();

const findAllReviews = ({ productId }) => {
  let query = 'SELECT * FROM reviews';
  const params = [];

  if (productId) {
    query += ' WHERE productId = ?';
    params.push(productId);
  }

  return db.query(query, params);
};

module.exports = {
  findAllReviews,
};