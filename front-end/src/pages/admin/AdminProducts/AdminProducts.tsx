import {FC} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import'./AdminProducts.css'

const AdminProducts: FC = () => {
    return (
        <div className="container">
            <Card style={{width: '15rem'}}>
                <Card.Img variant="top"
                          src="https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg"/>
                <Card.Body>
                    <Card.Title>A Book</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <div className="admin-btns">
                        <Button variant="outline-warning" size="sm">Edit</Button>
                        <Button variant="outline-danger" size="sm" >Delete</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
export default AdminProducts