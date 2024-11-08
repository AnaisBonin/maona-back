const testimonialsRouter = require('express').Router();
const Joi = require('joi');

const {
  findAllTestimonials,
} = require('../models/testimonialsModel');

testimonialsRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllTestimonials();

    if (!result.length) {
      return res.status(404).json({ message: 'No testimonilas found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

module.exports = testimonialsRouter;
