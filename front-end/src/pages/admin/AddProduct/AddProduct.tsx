import {FC} from 'react'

import "./AddProduct.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddProduct: FC = () => {
    return (
        <div className="container">
            <div className="form-div">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
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