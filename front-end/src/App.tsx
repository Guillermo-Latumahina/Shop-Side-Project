import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import SNavbar from "./components/navbar/navbar";
import Cart from "./components/Cart/Cart";
import Shop from "./pages/shop/Shop/Shop";
import Orders from "./pages/shop/Orders/Orders";
import AddProduct from "./pages/admin/AddProduct/AddProduct";
import AdminProducts from "./pages/admin/AdminProducts/AdminProducts";
import ProductDetails from "./pages/shop/ProductDetails/ProductDetails";

function App() {
    const [show, setShow] = useState<boolean>(false);
    const updateShowCart = (showCart: boolean) => {
        setShow(showCart)
    }
    return (
        <div className="App">
            <SNavbar updateShow={setShow}/>
            <Cart showCart={show} updateShowCart={setShow}/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Shop/>}/>
                    <Route path="/products" element={<Shop/>}/>
                    <Route path="/product-details/:product_id" element={<ProductDetails/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/admin/add-product" element={<AddProduct edit={false}/>}/>
                    <Route path="/admin/edit-product/:product_id" element={<AddProduct edit={true}/>}/>
                    <Route path="/admin/products" element={<AdminProducts/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App
