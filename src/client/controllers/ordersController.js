const ordersController = require('express').Router();
const Joi = require('joi');

const {
  findAllOrders,
  findOneOrder,
  postOrder,
  putOrder,
} = require('../../infrastructure/models/ordersModel');

const orderValidation = (isEdited = false) => {
  const presence = isEdited ? 'optional' : 'required';
  return Joi.object({
    id: Joi.number().presence(presence),
    date: Joi.date().presence(presence),
    totalOrder: Joi.number().presence(presence),
    status: Joi.string().max(255).presence('optional'),
    userId: Joi.number().integer().presence(presence),
  });
};

ordersController.get('/', async (req, res) => {
  try {
    const [result] = await findAllOrders(req.query);
    if (!result.length) {
      return res.status(404).json({ message: 'No orders found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `An error occurred: ${err.message}` });
  }
});

ordersController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [result] = await findOneOrder(id);
  return res.json(result);
});

ordersController.post('/', async (req, res) => {
  const { error, value: validOrder } = orderValidation().validate(req.body);

  if (error) {
    return res.status(422).json({ error, message: 'Invalid data' });
  }

  try {
    const [result] = await postOrder(validOrder);
    return res.status(201).json({ id: result.insertId, ...validOrder });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the order' });
  }
});

ordersController.put('/:id', async (req, res) => {
  const { error, value: validOrder } = orderValidation(true).validate(
    req.body,
  );
  const { id } = req.params;

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [idResult] = await findOneOrder(id);
    if (!idResult.length) {
      return res.json({ message: `Order number ${id} doesn't exist` });
    }
    putOrder(id, validOrder);
    return res.status(201).json({ id, ...validOrder });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the order' });
  }
});

module.exports = ordersController;
