import {FC, useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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

interface Props {
    updateShow: (arg: boolean) => void
}

const SNavbar: FC<Props> = ({updateShow}) => {
    const handleShow = () => updateShow(true)
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
        </Navbar>
    );
}

export default SNavbar