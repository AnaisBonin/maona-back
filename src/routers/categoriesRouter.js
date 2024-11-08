const categoriesRouter = require('express').Router();
const Joi = require('joi');

const {
  findAllCategories,
  findOneCategory,
  postCategory,
  putCategory,
  deleteCategory,
} = require('../models/categoriesModel');

const { findAllByCategory } = require('../models/productsModel');

const categoryValidation = (isCreation = true) => {
  const presence = isCreation ? 'required' : 'optional';
  return Joi.object({
    name: Joi.string().max(200).presence(presence),
  });
};

categoriesRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllCategories();

    if (!result.length) {
      return res.status(404).json({ message: 'No categories found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

categoriesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[result]] = await findOneCategory(id);
  return res.json(result);
});

categoriesRouter.get('/:name/products', async (req, res) => {
  const { name } = req.params;
  const { isAvailable } = req.query;
  const [result] = await findAllByCategory(name, isAvailable);
  return res.json(result);
});

categoriesRouter.post('/', async (req, res) => {
  const { error, value: validCategory } = categoryValidation().validate(req.body);

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [result] = await postCategory(validCategory);
    return res.status(201).json({ id: result.insertId, ...validCategory });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the Category' });
  }
});

categoriesRouter.put('/:id', async (req, res) => {
  const { error, value: validCategory } = categoryValidation(false).validate(
    req.body,
  );
  const { id } = req.params;

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [idResult] = await findOneCategory(id);
    if (!idResult.length) {
      return res.json({ message: `Category number ${id} doesn't exist` });
    }
    putCategory(id, validCategory);
    return res.status(201).json({ id, ...validCategory });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the category' });
  }
});

categoriesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [idResult] = await findOneCategory(id);
    if (!idResult.length) {
      return res.json({ message: `Category number ${id} doesn't exist` });
    }
    await deleteCategory(id);
    return res.status(200).json({ message: `🎉 Category ${id} deleted!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error deleting category ${id}` });
  }
});

module.exports = categoriesRouter;
