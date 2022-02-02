const productsRouter = require('express').Router();
const Joi = require('joi');

const {
  findAllProducts,
  findOneById,
  postProduct,
  putProduct,
  deleteProduct,
} = require('../models/productsModel');

const productValidation = (isEdited = false) => {
  const presence = isEdited ? 'optional' : 'required';
  return Joi.object({
    name: Joi.string().max(100).presence(presence),
    shortDescription: Joi.string().max(100).presence(presence),
    description: Joi.string().presence('optional'),
    price: Joi.number().presence(presence),
    stock: Joi.number().integer().presence(presence).default(0),
    isAvailable: Joi.boolean().optional(),
    isEssential: Joi.boolean().optional(),
    categoryId: Joi.number().integer().presence(presence),
    subCategoryId: Joi.number().integer().presence(presence),
  });
};

productsRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllProducts(req.query);

    if (!result.length) {
      return res.status(404).json({ message: 'No products found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[result]] = await findOneById(id);
  return res.json(result);
});

productsRouter.post('/', async (req, res) => {
  const { error, value: validProduct } = productValidation().validate(req.body);

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [result] = await postProduct(validProduct);
    return res.status(201).json({ id: result.insertId, ...validProduct });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the product' });
  }
});

productsRouter.put('/:id', async (req, res) => {
  const { error, value: validProduct } = productValidation(true).validate(
    req.body,
  );
  const { id } = req.params;

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [idResult] = await findOneById(id);
    if (!idResult.length) {
      return res.json({ message: `Product number ${id} doesn't exist` });
    }
    putProduct(id, validProduct);
    return res.status(201).json({ id, ...validProduct });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the product' });
  }
});

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [idResult] = await findOneById(id);
    if (!idResult.length) {
      return res.json({ message: `Product number ${id} doesn't exist` });
    }
    await deleteProduct(id);
    return res.status(200).json({ message: `🎉 Product ${id} deleted!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error deleting product ${id}` });
  }
});

module.exports = productsRouter;
