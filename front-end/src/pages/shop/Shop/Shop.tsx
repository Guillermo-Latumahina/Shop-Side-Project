import {FC, useEffect, useState} from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Shop.css'
import axios from "axios";

const Shop: FC = () => {
    const [products, setProducts] = useState<any>([]);
    const url = "http://localhost:8080/products";
    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setProducts(res.data.products)
            })
    }, [url])
    console.log(products)
    return (
        <div className="container">
            {products.map((product: { id: string, title: string, price: number, description: string, imageUrl: string }) =>
                <Card style={{width: '15rem'}} key={product.id}>
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
                            <Button variant="outline-success" size="sm">Details</Button>
                            <Button variant="outline-success" size="sm">Add to Cart</Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}
export default Shop