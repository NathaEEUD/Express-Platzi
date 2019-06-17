const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products.service');
const productsService = new ProductsService();

router.get('/', async function(req, res, next) {
  const { tags } = req.query;

  try {
    // throwing an error
    // throw new Error('This is an error');
    const products = await productsService.getProducts({ tags });
    res.render('products', { products });
  } catch (error) {
    next(error);
  }
});

module.exports = router;