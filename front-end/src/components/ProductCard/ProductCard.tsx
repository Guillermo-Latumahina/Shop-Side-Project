import {FC} from "react";
import {useNavigate} from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import './ProductCard.css'

export type Props = {
    admin: boolean;
    product: {
        _id: string;
        title: string;
        price: number;
        description: string;
        imageUrl: string
    }
}
const ProductCard: FC<Props> = ({admin, product}) => {
    const navigate = useNavigate();

    const handleDetails = (e: any) => {
        e.preventDefault();
        const productId = e.target.productId.value;
        navigate(`/product-details/${productId}`)
    }
    const handleAddToCart = async (e: any) => {
        e.preventDefault();
        const productId = e.target.productId.value;
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

    const handleEdit = async (e: any) => {
        e.preventDefault()
        const productId = e.target?.productId?.value;
        navigate(`/admin/edit-product/${productId}`)
    }
    const handleDelete = async (e: any) => {
        e.preventDefault()
        const productId = e.target?.productId?.value;
        const productCard = document.getElementById(productId);
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/delete-product`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        prodId: productId
                    })
            })
        productCard?.remove();
    }

    return (
        <Card className="product-card">
            <Card.Img variant="top" src={product.imageUrl}/>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
                <div className="card-btns">
                    <form onSubmit={admin ? handleEdit : handleDetails}>
                        <input type="hidden" id="productId" value={product._id}/>
                        <Button
                            variant={admin ? "warning" : "primary"}
                            size="sm"
                            type="submit">{admin ? "Edit" : "Details"}
                        </Button>
                    </form>
                    <form onSubmit={admin ? handleDelete : handleAddToCart}>
                        <input type="hidden" id="productId" value={product._id}/>
                        <Button
                            variant={admin ? "outline-danger" : "outline-success"}
                            type="submit"
                            size="sm">{admin ? "Delete" : "Add to Cart"}
                        </Button>
                    </form>
                </div>
            </Card.Body>
        </Card>
    )
}
export default ProductCard;