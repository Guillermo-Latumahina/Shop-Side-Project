import {FC} from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Shop.css'

const Shop: FC = () => {
    return (
        <div className="container">
            <Card style={{width: '15rem'}} className="cards">
                <Card.Img variant="top"
                          src="https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg"/>
                <Card.Body>
                    <Card.Title>A Book</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <div className="product-btns">
                        <Button variant="success" className="product-btn">Details</Button>
                        <Button variant="success" className="product-btn">Add to cart</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
export default Shop