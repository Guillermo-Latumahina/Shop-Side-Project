import {FC, useState} from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './navbar.css'

const SNavbar: FC = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        <div className="cart-item">
                            <div><h2>Product name</h2></div>
                            <div><h2>Quantity: 3</h2></div>
                            <div><h2>Price: $23,59</h2></div>
                            <div className="cart-item-btns">
                                <Button variant="outline-warning" size="sm" className="cart-item-btn">-</Button>
                                <Button variant="outline-success" size="sm" className="cart-item-btn">+</Button>
                                <Button variant="outline-danger" size="sm">Delete</Button>
                            </div>
                        </div>
                        <div className="cart-item">
                            <div><h2>Product name</h2></div>
                            <div><h2>Quantity: 5</h2></div>
                            <div><h2>Price: $55,23</h2></div>
                            <div className="cart-item-btns">
                                <Button variant="outline-warning" size="sm" className="cart-item-btn">-</Button>
                                <Button variant="outline-success" size="sm" className="cart-item-btn">+</Button>
                                <Button variant="outline-danger" size="sm">Delete</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="cart-total"><h2>Cart total: $78,82</h2></div>
                    <div className="modal-footer-btns">
                        <Button variant="outline-secondary" size="sm" onClick={handleClose}>
                            Close Cart
                        </Button>
                        <Button variant="outline-success" size="sm" onClick={handleClose} href="/orders">
                            Order Now!
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Navbar>

    );
}

export default SNavbar