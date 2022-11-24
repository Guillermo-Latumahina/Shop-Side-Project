import {FC, useEffect, useState} from 'react'

import ProductCard from "../../../components/ProductCard/ProductCard";

import './Shop.css'

type Product = {
    _id: string;
    title: string;
    price: number;
    description: string;
    imageUrl: string
};

const Shop: FC = () => {
    const [products, setProducts] = useState<any>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await (
                await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`)
            ).json();
            const {products} = data
            setProducts(products);
        }
        fetchProducts();
    }, [])
    return (
        <div className="container">
            {products.map((product: Product) =>
                <div key={product._id}>
                    <ProductCard admin={false} product={product}/>
                </div>
            )}
        </div>
    )
}
export default Shop