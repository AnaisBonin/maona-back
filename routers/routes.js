const baseRouter = require('./baseRouter');
const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const subCategoriesRouter = require('./subCategoriesRouter');
const usersRouter = require('./usersRouter');

const setupRoutes = (app) => {
  app.use(baseRouter);
  app.use('/products', productsRouter);
  app.use('/categories', categoriesRouter);
  app.use('/subcategories', subCategoriesRouter);
  app.use('/users', usersRouter);
};

module.exports = setupRoutes;
