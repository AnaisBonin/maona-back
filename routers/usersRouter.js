const usersRouter = require('express').Router();
const Joi = require('joi');

const {
  findAllUsers,
  findOneUser,
  postUser,
  putUser,
  deleteUser,
} = require('../models/usersModel');

const userValidation = (isCreation = true) => {
  const presence = isCreation ? 'required' : 'optional';
  return Joi.object({
    firstname: Joi.string().max(200).presence(presence),
    lastname: Joi.string().max(200).presence(presence),
    email: Joi.string().max(200).presence(presence),
  });
};

usersRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllUsers(req.query);

    if (!result.length) {
      return res.status(404).json({ message: 'No user found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const [result] = await findOneUser(req.params.id);

    if (!result) {
      return res.status(404).json({ message: 'No user found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`An error occurred: ${err.message}`);
  }
});

usersRouter.post('/', async (req, res) => {
  const { value: validUser, error } = userValidation().validate(req.body);

  if (error) {
    return res.status(422).json(error);
  }

  const [[existingUser]] = await findAllUsers(validUser);

  if (existingUser) {
    return res.status(409).json({
      message: 'This user already exists',
    });
  }
  
  try {
    const [{ insertId }] = await postUser(validUser);
    return res.status(201).json({ id: insertId, ...validUser});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error saving the user', err});
  }
});

usersRouter.put('/:id', async (req, res) => {
  const { error, value: validUser } = userValidation(false).validate(req.body);
  const { id } = req.params;

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }
  try {
    await putUser(validUser, id);
    return res.status(201).json({ id, ...validUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the user' });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [idResult] = await findOneUser(id);
    if (!idResult.length) {
      return res.json({ message: `User number ${id} doesn't exist` });
    }
    await deleteUser(id);
    return res.status(200).json({ message: `🎉 User ${id} deleted!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error deleting user ${id}` });
  }
});

module.exports = usersRouter;
