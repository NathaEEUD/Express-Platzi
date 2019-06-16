const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const productsViewsRouter = require('./routes/views/products.views');
const productsApiRouter = require('./routes/api/products.api');

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

// server
const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
});