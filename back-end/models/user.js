const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {type: Number, required: true}
            }
        ],
    }
});

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.product.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            product: product._id,
            quantity: newQuantity,
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.subtractFromCart = function (productId) {
    const cartProductIndex = this.cart.items.findIndex(item => {
        return item.product.toString() === productId.toString();
    });
    let updatedCartItems = [...this.cart.items];
    if (this.cart.items[cartProductIndex].quantity > 1) {
        updatedCartItems[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity - 1;
    } else {
        updatedCartItems = this.cart.items.filter(item => {
            return item.product.toString() !== productId.toString();
        })
    }
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.deleteFromCart = function (productId) {
    this.cart.items = this.cart.items.filter(item => {
        return item.product.toString() !== productId.toString();
    });
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = {items: []};
    return this.save();
};

module.exports = mongoose.model('User', userSchema);