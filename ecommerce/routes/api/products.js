const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');
const productsService = new ProductsService();

router.get('/', async function(req, res, next) {
  const { tags } = req.query;

  try {
    const products = await productsService.getProducts({ tags });
  
    res.status(200).json({
      data: productMocks,
      message: 'Products listed'
    });
  } catch (error) {
    next(err);
  }
});

router.get('/:productId', async function(req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productsService.getProduct({ productId });
  
    res.status(200).json({
      data: productMocks[0],
      message: 'Product retrieved'
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async function(req, res, next) {
  const { body: product } = req;

  try {
    const createdProduct = await productsService.createProduct({ product });
  
    res.status(201).json({
      data: product,
      message: 'Product created'
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', async function(req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const updatedProduct = await productsService.updateProduct({ productId, product });
  
    res.status(200).json({
      data: productId,
      message: 'Product updated'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async function(req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productsService.deleteProduct({ productId });
  
    res.status(200).json({
      data: productId,
      message: 'Product deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;