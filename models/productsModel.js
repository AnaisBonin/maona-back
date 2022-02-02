const connection = require('../db-config');

const db = connection.promise();

const findAllProducts = ({ isAvailable, isEssential }) => {
  let query = `SELECT pdt.*, c.name AS category, r.text AS review, sc.name AS subcategory FROM products pdt 
  JOIN categories c ON pdt.categoryId = c.id
  JOIN subCategories sc ON pdt.subCategoryId = sc.id
  JOIN reviews r ON r.productId = pdt.id`;

  const params = [];

  if (isAvailable && isEssential) {
    query += ' WHERE pdt.isAvailable = ? AND pdt.isEssential = ?';
    params.push(isAvailable === 'true', isEssential === 'true');
  } else if (isAvailable) {
    query += ' WHERE pdt.isAvailable = ?';
    params.push(isAvailable === 'true');
  } else if (isEssential) {
    query += ' WHERE pdt.isEssential = ?';
    params.push(isEssential === 'true');
  }

  return db.query(query, params);
};

const findAllByCategory = (name, isAvailable) => {
  let query = `SELECT pdt.*, c.name AS category, r.text AS review, sc.name AS subcategory FROM products pdt 
  JOIN categories c ON pdt.categoryId = c.id
  JOIN subCategories sc ON pdt.subCategoryId = sc.id
  JOIN reviews r ON r.productId = pdt.id
  WHERE c.name = ?`;

  const params = [name];

  if (isAvailable) {
    query += ' AND pdt.isAvailable = ?';
    params.push(isAvailable === 'true');
  }

  return db.query(query, params);
};

const findOneById = (id) => db.query(`SELECT pdt.*, c.name AS category, r.text AS review, sc.name AS subcategory FROM products pdt 
JOIN categories c ON pdt.categoryId = c.id
JOIN subCategories sc ON pdt.subCategoryId = sc.id
JOIN reviews r ON r.productId = pdt.id
WHERE pdt.id = ?`, [id]);

const postProduct = ({
  name,
  shortDescription,
  description,
  price,
  stock,
  isAvailable,
  isEssential,
  categoryId,
  subCategoryId
}) => db.query(
  'INSERT INTO products (name, shortDescription, description, price, stock, isAvailable, isEssential, categoryId, subCategoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  [
    name,
    shortDescription,
    description,
    price,
    stock,
    isAvailable,
    isEssential,
    categoryId,
    subCategoryId,
  ],
);

const putProduct = (id, validProduct) => db.query('UPDATE products SET ? WHERE id = ?', [validProduct, id]);

const deleteProduct = (id) => db.query('DELETE FROM products WHERE id = ?', [id]);

module.exports = {
  findAllProducts,
  findAllByCategory,
  findOneById,
  postProduct,
  putProduct,
  deleteProduct,
};
