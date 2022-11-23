import {FC, useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './navbar.css'

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

const SNavbar: FC = () => {
    const [show, setShow] = useState(false);
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
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOrder = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/new-order`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({totalPrice: totalPrice})
            })
        setShow(false)
    }
    const handleAdd = async (e: any) => {
        e.preventDefault();
        const prodId = e.target.product_id.value;
        const value = {prodId: prodId}
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
        const prodId = e.target.product_id.value;
        const value = {prodId: prodId}
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
        const prodId = e.target.product_id.value;
        const cartItem = document.getElementById(prodId);
        const value = {prodId: prodId}
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
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Shop Side Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/products">Products</Nav.Link>
                        <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                        <Nav.Link href="/orders">Orders</Nav.Link>
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/admin/add-product">Add Product</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/products">Admin Products</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Modal className="cart-modal" size="lg" show={show} onHide={handleClose}>
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
        </Navbar>

    );
}

export default SNavbar