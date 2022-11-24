import {FC, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './ProductDetails.css';

const ProductDetails: FC = () => {
    const [productDetails, setProductDetails] = useState<any>([]);
    const {product_id} = useParams();
    useEffect(() => {
        const fetchProductDetails = async () => {
            const data = await (
                await fetch(`${process.env.REACT_APP_API_BASE_URL}/product/${product_id}`)
            ).json();
            const {product} = data;
            setProductDetails(product);
        }
        fetchProductDetails();
    }, )
    const handleAddToCart = async (e: any) => {
        e.preventDefault();
        const productId = e.target.prod_id.value;
        const value = {productId: productId}
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value)
            })
    }

    return (
        <div className="container">
            <Card className="detail-card">
                <Card.Img variant="top"
                          src={productDetails.imageUrl}/>
                <Card.Body>
                    <Card.Title>{productDetails.title}</Card.Title>
                    <Card.Subtitle>${productDetails.price}</Card.Subtitle>
                    <Card.Text>{productDetails.description}</Card.Text>
                </Card.Body>
                <div className="card-btns">
                    <form onSubmit={handleAddToCart}>
                        <input type={"hidden"} id="prod_id" value={productDetails._id || ''}/>
                        <Button variant="outline-success" type="submit" size="sm">Add to Cart</Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}
export default ProductDetails