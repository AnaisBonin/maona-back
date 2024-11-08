const baseRouter = require('./routers/baseRouter');
const productsRouter = require('./routers/productsRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const subCategoriesRouter = require('./routers/subCategoriesRouter');
const usersRouter = require('./routers/usersRouter');
const testimonialsRouter = require('./routers/testimonialsRouter');
const reviewsRouter = require('./routers/reviewsRouter');
const articlesRouter = require('./routers/articlesRouter');
const imagesRouter = require('./routers/imagesRouter');
const ordersRouter = require('./routers/ordersRouter');
const orderLinesRouter = require('./routers/orderLinesRouter');

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
  app.use('/orders', ordersRouter);
  app.use('/orderlines', orderLinesRouter);
};

module.exports = setupRoutes;
