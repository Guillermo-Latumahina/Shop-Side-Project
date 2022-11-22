const express = require('express');
const shopController = require('../controllers/shop')
const adminController = require("../controllers/admin");

const router = express.Router();

router.get('/products', shopController.getProducts);

router.get('/product/:productId', shopController.getProductDetails);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.addToCart);

// router.post('/cart-subtract-item', shopController.cartSubtractProduct);

router.post('/cart-delete-item', shopController.deleteFromCart);

module.exports = router;