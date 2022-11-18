import {FC} from 'react'
import {useNavigate} from "react-router-dom";

import "./AddProduct.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddProduct: FC = () => {
    const navigate = useNavigate();
    const handleForm = async (e: any) => {
        e.preventDefault();
        const title = e.target?.title?.value;
        const imageUrl = e.target?.imageUrl?.value;
        const price = e.target?.price?.value;
        const description = e.target?.description?.value;
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/add-product`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        title: title,
                        imageUrl: imageUrl,
                        price: price,
                        description: description
                    })
            })
        navigate('/admin/products')
    }
    return (
        <div className="container">
            <div className="form-div">
                <h1>Add Product</h1>
                <Form onSubmit={handleForm}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Product
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default AddProduct