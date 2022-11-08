import {FC, useEffect, useState} from 'react'

import './Orders.css'
import axios from "axios";

const Orders: FC = () => {
    const [orders, setOrders] = useState<any>([]);
    const url = "http://localhost:8080/orders";
    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setOrders(res.data.products)
            })
    }, [url])
    console.log(orders)
    return (
        <div className="container">
            <div className="orders">
                <div className="order">
                    <p>Order - # 32193820393801</p>
                    <ul className="items">
                        <li className="item">
                            product (1)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Orders