import {FC, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductDetails: FC = () => {
    const [productDetails, setProductDetails] = useState<any>([]);
    const {prod_id} = useParams();
    useEffect(() => {
        const fetchProductDetails = async () => {
            const data = await (
                await fetch(`${process.env.REACT_APP_API_BASE_URL}/product/${prod_id}`)
            ).json();
            const {product} = data;
            setProductDetails(product);
        }
        fetchProductDetails();
    }, [])
    const handleAddToCart = () => {

    }

    return (
        <div className="container">
            <Card style={{width: '30rem', height: '36rem', paddingBottom: '2rem'}}>
                <Card.Img variant="top"
                          src={productDetails.imageUrl}/>
                <Card.Body>
                    <Card.Title>{productDetails.title}</Card.Title>
                    <Card.Subtitle>${productDetails.price}</Card.Subtitle>
                    <Card.Text>{productDetails.description}</Card.Text>
                </Card.Body>
                <div className="admin-btns">
                    <form onSubmit={handleAddToCart}>
                        <input type={"hidden"} value={productDetails._id || ''}/>
                        <Button variant="outline-success" type="submit" size="sm">Add to Cart</Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}
export default ProductDetails