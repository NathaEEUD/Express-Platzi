const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const boom = require('boom');
const productsViewsRouter = require('./routes/views/products.views');
const productsApiRouter = require('./routes/api/products.api');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers');

// app
const app = express();

// middlewares
app.use(bodyParser.json());

// static files handling
app.use('/static', express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routes
app.get('/', (req, res, next) => {
  // res.send('hello world');
  res.redirect('/products');
});
app.use('/products', productsViewsRouter);
app.use('/api/products', productsApiRouter);

// middleware for 404 page
app.use(function(req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload}
    } = boom.notFound();

    res.status(statusCode).json(payload);
  }

  res.status(404).render('404');
})

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// server
const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
});