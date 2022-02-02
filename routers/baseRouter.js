const baseRouter = require('express').Router();

baseRouter.get('/', (req, res) => {
  res.send('Server Maona');
});

module.exports = baseRouter;
