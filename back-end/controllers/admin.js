const mongodb = require('mongodb');
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

exports.AddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({title: title, imageUrl: imageUrl, price: price, description: description})
        .then(
            res.status(201).json({
                message: 'Product created successfully', product: {
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description
                }
            })
        )
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findOne(prodId)
        .then(product => {
            res.status(200).json({
                message: 'Products fetched successfully', product: {
                    title: product.title,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    description: product.description
                }
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.EditProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const prodId = mongodb.ObjectId(req.body.prodId);
    Product.updateOne({_id: prodId}, {title: title, imageUrl: imageUrl, price: price, description: description})
        .then(
            res.status(201).json({
                message: 'Product edited successfully', product: {
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description,
                }
            })
        )
};


exports.DeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({_id: new mongodb.ObjectId(prodId)}
    )
        .then(
            res.status(201).json({
                message: 'Products deleted successfully',
            }))
};