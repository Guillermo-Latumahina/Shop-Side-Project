import {FC} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductDetails: FC = () => {
    return (
        <div className="container">
            <Card style={{width: '30rem', height:'36rem', paddingBottom: '2rem'}}>
                <Card.Img variant="top"
                          src="https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg"/>
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                <div className="admin-btns">
                    <Button variant="outline-success" size="sm">Add to Cart</Button>
                </div>
            </Card>
        </div>
    )
}
export default ProductDetails