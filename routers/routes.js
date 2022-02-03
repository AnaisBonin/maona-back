const baseRouter = require('./baseRouter');
const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const subCategoriesRouter = require('./subCategoriesRouter');
const usersRouter = require('./usersRouter');
const testimonialsRouter = require('./testimonialsRouter');
const reviewsRouter = require('./reviewsRouter');
const articlesRouter = require('./articlesRouter');
const imagesRouter = require('./imagesRouter');

const setupRoutes = (app) => {
  app.use(baseRouter);
  app.use('/products', productsRouter);
  app.use('/categories', categoriesRouter);
  app.use('/subcategories', subCategoriesRouter);
  app.use('/users', usersRouter);
  app.use('/testimonials', testimonialsRouter);
  app.use('/reviews', reviewsRouter);
  app.use('/articles', articlesRouter);
  app.use('/images', imagesRouter);
};

module.exports = setupRoutes;
