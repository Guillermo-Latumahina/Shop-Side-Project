import {FC, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Shop.css'

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
            {products.map((product: { _id: string, title: string, price: number, description: string, imageUrl: string }) =>
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
                            <Button variant="primary" size="sm">Details</Button>
                            <Button variant="outline-success" size="sm">Add to Cart</Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}
export default Shop