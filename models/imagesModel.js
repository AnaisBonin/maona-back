const connection = require('../db-config');

const db = connection.promise();

const findAllImages = ({ productId, coverPicture }) => {
  let query = `SELECT i.*, pi.coverPicture, p.name AS productName, p.id AS productId FROM images i 
  LEFT JOIN productImage pi ON i.id = pi.imageId
  LEFT JOIN products p ON p.id = pi.productId`;
  const params = [];

  if (productId && coverPicture) {
    query += ' WHERE productId = ? AND pi.coverPicture = ?';
    params.push(productId, coverPicture);
  } else if (productId) {
    query += ' WHERE productId = ?';
    params.push(productId);
  } else if (coverPicture) {
    query += ' WHERE pi.coverPicture = ?';
    params.push(coverPicture);
  } else {
    null;
  }
  
  return db.query(query, params);
};

module.exports = {
  findAllImages,
};