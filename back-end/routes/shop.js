const expres = require('express');
const shopController = require('../controllers/shop')

const router = expres.Router();

router.get('/products', shopController.getProducts);

module.exports = router;