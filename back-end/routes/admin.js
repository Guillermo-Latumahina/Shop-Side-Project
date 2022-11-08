const expres = require('express');
const adminController = require('../controllers/admin')

const router = expres.Router();

router.get('/products', adminController.getProducts);

module.exports = router;