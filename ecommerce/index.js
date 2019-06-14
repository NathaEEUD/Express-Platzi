const express = require('express');
const path = require('path');
const app = express();
const productsRouter = require('./routes/products');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
  res.send('hello world');
});

app.use('/products', productsRouter);

const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
});