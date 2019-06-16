const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products.service');
const productsService = new ProductsService();

router.get('/', async function(req, res, next) {
  const { tags } = req.query;
  console.log('request query:::::', req.query);

  try {
    // throwing an error
    throw new Error('This is an error from the api');
    const products = await productsService.getProducts({ tags });
  
    res.status(200).json({
      data: products,
      message: 'Products listed'
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async function(req, res, next) {
  const { productId } = req.params;
  console.log('request params:::::', req.params);

  try {
    const product = await productsService.getProduct({ productId });
  
    res.status(200).json({
      data: product,
      message: 'Product retrieved'
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async function(req, res, next) {
  const { body: product } = req;
  console.log('request body:::::', req.body);

  try {
    const createdProduct = await productsService.createProduct({ product });
  
    res.status(201).json({
      data: createdProduct,
      message: 'Product created'
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', async function(req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;
  console.log('request params, body:::::', req.params, req.body);

  try {
    const updatedProduct = await productsService.updateProduct({ productId, product });
  
    res.status(200).json({
      data: updatedProduct,
      message: 'Product updated'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async function(req, res, next) {
  const { productId } = req.params;
  console.log('request params:::::', req.params);

  try {
    const deletedProduct = await productsService.deleteProduct({ productId });
  
    res.status(200).json({
      data: deletedProduct,
      message: 'Product deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;