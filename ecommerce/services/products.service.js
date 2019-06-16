const productMocks = require('../utils/mocks/products.mock');
const MongoLib = require('../lib/mongo');

class ProductsService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);
    
    return products || [];
  }

  getProduct({ productId }) {
    return Promise.resolve(productMocks[0]);
  }

  createProduct({ product }) {
    return Promise.resolve(productMocks[0]);
  }

  updateProduct({ productId, product }) {
    return Promise.resolve(productMocks[0]);
  }

  deleteProduct({ productId }) {
    return Promise.resolve(productMocks[0]);
  }
};

module.exports = ProductsService;