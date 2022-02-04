const connection = require('../db-config');

const db = connection.promise();

const findAllOrders = ({ userId }) => {
  let query = 'SELECT * FROM orders';
  const params = [];
  if (userId) {
    query += 'WHERE userId = ?';
    params.push(userId);
  }
  return db.query(query, params);
};

const findOneOrder = (id) => db.query('SELECT * FROM orders WHERE id = ?', [id]);

const postOrder = ({
  id,
  date,
  totalOrder,
  status,
  userId,
}) => db.query(
  'INSERT INTO orders (id, date, totalOrder, status, userId) VALUES (?, ?, ?, ?, ?)',
  [
    id,
    date,
    totalOrder,
    status,
    userId,
  ],
);

const putOrder = (id, validOrder) => db.query('UPDATE orders SET ? WHERE id = ?', [validOrder, id]);

module.exports = {
  findAllOrders,
  findOneOrder,
  postOrder,
  putOrder,
};
