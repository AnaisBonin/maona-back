const connection = require('../db-config');

const db = connection.promise();

const findAllOrderLines = ({ orderId }) => {
  let query = 'SELECT * FROM orderLines';
  const params = [];
  if (orderId) {
    query += ' WHERE orderId = ?';
    params.push(orderId);
  }
  return db.query(query, params);
};

const postOrderLine = ({
  productName,
  quantity,
  price,
  totalPrice,
  orderId,
  productId,
}) => db.query(
  'INSERT INTO orderLines (productName, quantity, price, totalPrice, orderId, productId) VALUES (?, ?, ?, ?, ?, ?)',
  [
    productName,
    quantity,
    price,
    totalPrice,
    orderId,
    productId,
  ],
);

const putOrderLine = (id, validOrder) => db.query('UPDATE orderLines SET ? WHERE id = ?', [validOrder, id]);

module.exports = {
  findAllOrderLines,
  postOrderLine,
  putOrderLine,
};
