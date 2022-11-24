import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import SNavbar from "./components/navbar/navbar";
import Shop from "./pages/shop/Shop/Shop";
import Orders from "./pages/shop/Orders/Orders";
import AddProduct from "./pages/admin/AddProduct/AddProduct";
import AdminProducts from "./pages/admin/AdminProducts/AdminProducts";
import ProductDetails from "./pages/shop/ProductDetails/ProductDetails";

function App() {
    return (
        <div className="App">
            <SNavbar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Shop/>}/>
                    <Route path="/products" element={<Shop/>}/>
                    <Route path="/product-details/:prod_id" element={<ProductDetails/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/admin/add-product" element={<AddProduct edit={false}/>}/>
                    <Route path="/admin/edit-product/:prod_id" element={<AddProduct edit={true}/>}/>
                    <Route path="/admin/products" element={<AdminProducts/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App
