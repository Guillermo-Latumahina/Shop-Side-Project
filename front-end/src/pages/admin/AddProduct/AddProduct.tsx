import {FC, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";

import "./AddProduct.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export type Props = {
    edit: boolean;
}
const AddProduct: FC<Props> = ({edit}) => {
    const [productDetails, setProductDetails] = useState<any>([]);
    const navigate = useNavigate();
    const {prod_id} = useParams();
    useEffect(() => {
        const fetchProductDetails = async () => {
            const data = await (
                await fetch(`${process.env.REACT_APP_API_BASE_URL}/product/${prod_id}`)
            ).json();
            const {product} = data;
            setProductDetails(product);
        }
        if(edit) fetchProductDetails();
    }, [])

    const handleForm = async (e: any) => {
        e.preventDefault();
        const title = e.target?.title?.value;
        const imageUrl = e.target?.imageUrl?.value;
        const price = e.target?.price?.value;
        const description = e.target?.description?.value;
        const prodId = e.target?.prod_id?.value;
        const values = {
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
            prodId: prodId
        };
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/${edit ? "edit" : "add"}-product`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
        navigate('/admin/products')
    }
    return (
        <div className="container">
            <div className="form-div">
                <h1>{edit ? "Edit" : "Add"} Product</h1>
                <Form onSubmit={handleForm}>
                    {edit ? <input type={"hidden"} id="prod_id" value={productDetails._id || ''}/> : null}
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" defaultValue={productDetails.title || ''}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" defaultValue={productDetails.imageUrl || ''}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" defaultValue={productDetails.price || ''}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} defaultValue={productDetails.description || ''}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {edit ? "Edit" : "Add"} Product
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default AddProduct