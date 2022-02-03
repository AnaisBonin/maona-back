const connection = require('../db-config');

const db = connection.promise();

const findAllReviews = ({ productId }) => {
  let query = 'SELECT r.*, u.firstname FROM reviews r JOIN users u ON u.id = r.userId';
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