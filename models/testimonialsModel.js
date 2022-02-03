const connection = require('../db-config');

const db = connection.promise();

const findAllTestimonials = () => db.query('SELECT t.*, u.firstname FROM testimonials t JOIN users u ON u.id = t.userId');

module.exports = {
  findAllTestimonials,
};
