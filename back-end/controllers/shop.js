const Product = require('../models/product');
const Order = require('../models/order')

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

exports.getCart = async (req, res, next) => {
    await req.user
        .populate('cart.items.product')
        .then(user => {
            const cartProducts = user.cart.items;
            const totalCartPrice = user.cart.totalPrice;
            res.status(200).json({
                message: 'Products fetched successfully', cartProducts: cartProducts, totalCartPrice: totalCartPrice
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.addToCart = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.findById(prodId)
        .then(product => {
            req.user.addToCart(product);
            res.status(201).json({
                message: 'Product added to cart successfully',
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}


exports.subtractFromCart = (req, res, next) => {
    const prodId = req.body.prodId;
    req.user
        .subtractFromCart(prodId)
        .then(result => {
            res.status(201).json({
                message: 'Product subtracted from cart successfully',
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteFromCart = (req, res, next) => {
    const prodId = req.body.prodId;
    req.user
        .deleteFromCart(prodId)
        .then(result => {
            res.status(201).json({
                message: 'Product removed from cart successfully',
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id})
        .then(orders => {
            res.status(200).json({
                message: 'Products fetched successfully', orders: orders
            });
        }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.createOrder = (req, res, next) => {
    const totalPrice = req.body.totalPrice;
    req.user
        .populate('cart.items.product')
        .then(user => {
            const products = user.cart.items.map(i => {
                return {quantity: i.quantity, product: {...i.product._doc}};
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products,
                totalPrice:totalPrice
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(result => {
            res.status(201).json({
                message: 'Order created successfully',
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}