import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/"/>
                    <Route path="/products"/>
                    <Route path="/cart"/>
                    <Route path="/orders"/>
                    <Route path="/admin/add-product"/>
                    <Route path="/admin/products"/>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;
