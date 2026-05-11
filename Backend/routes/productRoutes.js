const express = require('express');

const router = express.Router();

const {
  getProducts,
  createProduct,
  deleteProduct
} = require('../controllers/productController');


router.get('/products', getProducts);

router.post('/products', createProduct);

router.delete('/products/:id', deleteProduct);


module.exports = router;