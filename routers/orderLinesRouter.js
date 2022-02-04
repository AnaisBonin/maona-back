const orderLinesRouter = require('express').Router();
const Joi = require('joi');

const {
  findAllOrderLines,
  postOrderLine,
  putOrderLine,
} = require('../models/orderLinesModel');

const orderLineValidation = (isEdited = false) => {
  const presence = isEdited ? 'optional' : 'required';
  return Joi.object({
    productName: Joi.string().max(200).presence(presence),
    quantity: Joi.number().integer().presence(presence),
    price: Joi.number().presence(presence),
    totalPrice: Joi.number().presence(presence),
    orderId: Joi.number().presence(presence),
    productId: Joi.number().integer().presence(presence),
  });
};

orderLinesRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllOrderLines(req.query);

    if (!result.length) {
      return res.status(404).json({ message: 'No order lines found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `An error occurred: ${err.message}` });
  }
});

orderLinesRouter.post('/', async (req, res) => {
  const { error, value: validOrderLine } = orderLineValidation().validate(
    req.body,
  );

  if (error) {
    return res.status(422).json({ error, message: 'Invalid data' });
  }

  try {
    const [result] = await postOrderLine(validOrderLine);
    return res.status(201).json({ id: result.insertId, ...validOrderLine });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the order line' });
  }
});

orderLinesRouter.put('/:id', async (req, res) => {
  const { error, value: validOrderLine } = orderLineValidation(true).validate(
    req.body,
  );
  const { id } = req.params;

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [idResult] = await findAllOrderLines(req.query);
    if (!idResult.length) {
      return res.json({ message: `Order Line number ${id} doesn't exist` });
    }
    putOrderLine(id, validOrderLine);
    return res.status(201).json({ id, ...validOrderLine });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the order line' });
  }
});

module.exports = orderLinesRouter;
