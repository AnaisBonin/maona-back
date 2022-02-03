const connection = require('../db-config');

const db = connection.promise();

const findAllUsers = ({ email }) => {
  let query = 'SELECT * FROM users';
  const params = [];
  if (email) {
    query += ' WHERE email = ?';
    params.push(email);
  }

  return db.query(query, params);
};

const findOneUser = (id) => db.query('SELECT * FROM users WHERE id = ?', [id]);

const postUser = ({
  firstname,
  lastname,
  email,
}) => {
  return db.query(
    'INSERT INTO users (`firstname`, `lastname`, `email`) VALUES (?, ?, ?)',
    [
      firstname,
      lastname,
      email,
    ],
  );
};

const putUser = (validUser, id) => db.query('UPDATE users SET ? WHERE id = ?', [validUser, id]);

const deleteUser = (id) => db.query('DELETE FROM users WHERE id = ?', [id]);

module.exports = {
  findAllUsers,
  findOneUser,
  postUser,
  putUser,
  deleteUser,
};
