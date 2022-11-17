const express = require('express');
const adminController = require('../controllers/admin')

const router = express.Router();

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.AddProduct);

router.post('/delete-product', adminController.DeleteProduct);

module.exports = router;