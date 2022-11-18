const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.status(200).json({
                message: 'Products fetched successfully', products: products
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getProductDetails = (req, res, next) => {
    const prodId = (req.params.productId)
    console.log(prodId)
    Product.findById(prodId)
        .then(product => {
            res.status(200).json({
                message: 'Product details fetched successfully', product: product
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};