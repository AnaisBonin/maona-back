const baseRouter = require('./baseRouter');
const productsRouter = require('./productsRouter');

const setupRoutes = (app) => {
  app.use(baseRouter);
  app.use('/products', productsRouter);
};

module.exports = setupRoutes;
