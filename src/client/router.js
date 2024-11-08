const baseRouter = require('./controllers/baseController');
const productsRouter = require('./controllers/productsController');
const categoriesRouter = require('./controllers/categoriesController');
const subCategoriesRouter = require('./controllers/subCategoriesController');
const usersRouter = require('./controllers/usersController');
const testimonialsRouter = require('./controllers/testimonialsController');
const reviewsRouter = require('./controllers/reviewsController');
const articlesRouter = require('./controllers/articlesController');
const imagesRouter = require('./controllers/imagesController');
const ordersRouter = require('./controllers/ordersController');
const orderLinesRouter = require('./controllers/orderLinesController');

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
