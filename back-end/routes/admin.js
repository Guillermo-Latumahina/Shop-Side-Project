const expres = require('express');
const adminController = require('../controllers/admin')

const router = expres.Router();

router.get('/products', adminController.getProducts);

router.get('/add-product', adminController.AddProduct);

module.exports = router;