const connection = require('../db-config');

const db = connection.promise();

const findAllImages = ({ productId }) => {
  let query = `SELECT i.*, pi.coverPicture, p.name AS productName, p.id AS productId FROM images i 
  LEFT JOIN productImage pi ON i.id = pi.imageId
  LEFT JOIN products p ON p.id = pi.productId`;
  const params = [];

  if (productId) {
    query += ' WHERE productId = ?';
    params.push(productId);
  }

  return db.query(query, params);
};

module.exports = {
  findAllImages,
};