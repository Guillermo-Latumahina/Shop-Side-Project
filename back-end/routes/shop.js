const express = require('express');
const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/products', shopController.getProducts);

router.get('/product/:productId', shopController.getProductDetails);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.addToCart);

router.post('/cart-subtract-item', shopController.subtractFromCart);

router.post('/cart-delete-item', shopController.deleteFromCart);

router.post('/new-order', shopController.createOrder);

router.get('/orders', shopController.getOrders);

module.exports = router;