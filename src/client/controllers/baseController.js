const baseController = require('express').Router();

baseController.get('/', (req, res) => {
  res.send('Server Maona');
});

module.exports = baseController;
