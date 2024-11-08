const subCategoriesRouter = require('express').Router();
const Joi = require('joi');

const {
  findAllSubCategories,
  findOneSubCategory,
  postSubCategory,
  putSubCategory,
  deleteSubCategory,
} = require('../models/subCategoriesModel');

const { findAllBySubCategory } = require('../models/productsModel');

const subCategoryValidation = (isCreation = true) => {
  const presence = isCreation ? 'required' : 'optional';
  return Joi.object({
    name: Joi.string().max(200).presence(presence),
  });
};

subCategoriesRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllSubCategories(req.query);

    if (!result.length) {
      return res.status(404).json({ message: 'No subCategories found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

subCategoriesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[result]] = await findOneSubCategory(id);
  return res.json(result);
});

subCategoriesRouter.get('/:name/products', async (req, res) => {
  const { name } = req.params;
  const { isAvailable } = req.query;
  const [result] = await findAllBySubCategory(name, isAvailable);
  return res.json(result);
});

subCategoriesRouter.post('/', async (req, res) => {
  const { error, value: validSubCategory } = subCategoryValidation().validate(req.body);

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [result] = await postSubCategory(validSubCategory);
    return res.status(201).json({ id: result.insertId, ...validSubCategory });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the SubCategory' });
  }
});

subCategoriesRouter.put('/:id', async (req, res) => {
  const { error, value: validSubCategory } = subCategoryValidation(false).validate(
    req.body,
  );
  const { id } = req.params;

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [idResult] = await findOneSubCategory(id);
    if (!idResult.length) {
      return res.json({ message: `SubCategory number ${id} doesn't exist` });
    }
    putSubCategory(id, validSubCategory);
    return res.status(201).json({ id, ...validSubCategory });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the subCategory' });
  }
});

subCategoriesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [idResult] = await findOneSubCategory(id);
    if (!idResult.length) {
      return res.json({ message: `SubCategory number ${id} doesn't exist` });
    }
    await deleteSubCategory(id);
    return res.status(200).json({ message: `🎉 SubCategory ${id} deleted!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error deleting subCategory ${id}` });
  }
});

module.exports = subCategoriesRouter;
