import {FC, useEffect, useState} from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import './cart.css'

type CartItem = {
    quantity: number;
    _id: string;
    product: {
        _id: string;
        title: string;
        price: number;
        description: string;
        imageUrl: string;
    }
};

interface Props {
    showCart: boolean,
    updateShowCart: (arg: boolean) => void
}

const Cart: FC<Props> = ({showCart, updateShowCart}) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const fetchCartItems = async () => {
            let cartTotal = 0;
            const data = await (
                await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart`)
            ).json();
            const {cartProducts} = data;
            cartProducts.forEach((cartProduct: CartItem) => {
                cartTotal = cartProduct.product.price * cartProduct.quantity + cartTotal
            })
            setCartItems(cartProducts);
            setTotalPrice(cartTotal)
        }
        fetchCartItems();
    }, [])

    const handleClose = () => {
        updateShowCart(false)
    };

    const handleOrder = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/new-order`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({totalPrice: totalPrice})
            })
    }
    const handleAdd = async (e: any) => {
        e.preventDefault();
        const productId = e.target.product_id.value;
        const value = {productId: productId}
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value)
            })
    };
    const handleSubtract = async (e: any) => {
        e.preventDefault();
        const productId = e.target.product_id.value;
        const value = {productId: productId}
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart-subtract-item`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value)
            })
    };
    const handleDelete = async (e: any) => {

        e.preventDefault();
        const productId = e.target.product_id.value;
        const cartItem = document.getElementById(productId);
        const value = {productId: productId}
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart-delete-item`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value)
            })
        cartItem?.remove();
    };
    return (
        <Modal className="cart-modal" size="lg" show={showCart} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="cart-items">
                    {cartItems.map((cartItem: CartItem) =>
                        <div className="cart-item" key={cartItem.product._id} id={cartItem.product._id}>
                            <div><h2>{cartItem.product.title}</h2></div>
                            <div><h2>Quantity: {cartItem.quantity}</h2></div>
                            <div><h2>Price: ${cartItem.product.price}</h2></div>
                            <div className="cart-item-btns">
                                <form onSubmit={handleSubtract}>
                                    <input type='hidden' id='product_id' value={cartItem.product._id}/>
                                    <Button variant="outline-warning" size="sm" className="cart-item-btn"
                                            type={"submit"}>-</Button>
                                </form>
                                <form onSubmit={handleAdd}>
                                    <input type='hidden' id='product_id' value={cartItem.product._id}/>
                                    <Button variant="outline-success" size="sm" className="cart-item-btn"
                                            type={"submit"}>+</Button>
                                </form>
                                <form onSubmit={handleDelete}>
                                    <input type='hidden' id='product_id' value={cartItem.product._id}/>
                                    <Button variant="outline-danger" size="sm" type={"submit"}>Delete</Button>
                                </form>

                            </div>
                        </div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="cart-total"><h2>Cart total: ${totalPrice}</h2></div>
                <div className="modal-footer-btns">
                    <Button variant="outline-secondary" size="sm" onClick={handleClose}>
                        Close Cart
                    </Button>
                    <Button variant="outline-success" size="sm" onClick={handleOrder}>
                        Order Now!
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
export default Cart;