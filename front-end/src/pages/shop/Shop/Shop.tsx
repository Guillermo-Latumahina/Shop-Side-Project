import {FC, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
    const navigate = useNavigate();
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

    const handleDetails = (e: any) => {
        e.preventDefault();
        const prodId = e.target.productId.value;
        navigate(`/product-details/${prodId}`)
    }
    const handleAddToCart = (e: any) => {
        e.preventDefault();
        const prodId = e.target.productId.value;
    }

    return (
        <div className="container">
            {products.map((product: Product) =>
                <Card style={{width: '15rem'}} key={product._id}>
                    <Card.Img variant="top"
                              src={product.imageUrl}/>
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                        <Card.Text>
                            ${product.price}
                        </Card.Text>
                        <div className="admin-btns">
                            <form onSubmit={handleDetails}>
                                <input type="hidden" id="productId" value={product._id}/>
                                <Button variant="primary" size="sm" type="submit">Details</Button>
                            </form>
                            <form onSubmit={handleAddToCart}>
                                <input type="hidden" id="productId" value={product._id}/>
                                <Button variant="outline-success" size="sm">Add to Cart</Button>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}
export default Shop