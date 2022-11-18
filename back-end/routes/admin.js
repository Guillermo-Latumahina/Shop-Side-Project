const express = require('express');
const adminController = require('../controllers/admin')

const router = express.Router();

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.AddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.EditProduct);

router.post('/delete-product', adminController.DeleteProduct);

module.exports = router;