const expres = require('express');
const shopController = require('../controllers/shop')

const router = expres.Router();

router.get('/products', shopController.getProducts);

router.get('/product/:productId', shopController.getProductDetails);

module.exports = router;