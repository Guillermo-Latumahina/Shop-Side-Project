import {FC, useEffect, useState} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import axios from "axios";
import './AdminProducts.css'


type Product = {
    _id: string;
    title: string;
    price: number;
    description: string;
    imageUrl: string
};

const AdminProducts: FC = () => {
    const [products, setProducts] = useState<any>([]);
    const url = `${process.env.REACT_APP_API_BASE_URL}/admin/products`;
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await (
                await fetch(url)
            ).json();
            const {products} = data
            setProducts(products);
        }
        fetchProducts();
    }, [])

    const handleEdit = async (e: any) => {
        // e.preventDefault()
        // const productId = e.target?.productId?.value;
    }
    const handleDelete = async (e: any) => {
        // e.preventDefault()
        // const productId = e.target?.productId?.value;
        // const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/delete-product`,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(
        //             {
        //                 productId: productId
        //             })
        //     })
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
                            <form onSubmit={handleEdit}>
                                <input type="hidden" id="productId" value={product._id}/>
                                <Button variant="outline-warning" size="sm" type="submit">Edit</Button>
                            </form>
                            <form onSubmit={handleDelete}>
                                <input type="hidden" id="productId" value={product._id}/>
                                <Button variant="outline-danger" size="sm" type="submit">Delete</Button>
                            </form>

                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}
export default AdminProducts