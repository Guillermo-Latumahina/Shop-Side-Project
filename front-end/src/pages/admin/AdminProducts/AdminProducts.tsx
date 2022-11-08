import {FC, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import './AdminProducts.css'

const AdminProducts: FC = () => {
    const [products, setProducts] = useState<any>([]);
    const url = "http://localhost:8080/admin/products";
    useEffect(() => {
        axios.get("http://localhost:8080/admin/products")
            .then((res) => {
                setProducts(res.data.products)
            })
    }, [url])
    console.log(products)
    return (
        <div className="container">
            {products.map((product: { id:string, title: string, price: number, description: string, imageUrl: string }) =>
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
                            <Button variant="outline-warning" size="sm">Edit</Button>
                            <Button variant="outline-danger" size="sm">Delete</Button>
                        </div>
                    </Card.Body>
                </Card>
            )}

        </div>
    )
}
export default AdminProducts