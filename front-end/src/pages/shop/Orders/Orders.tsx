import {FC, useEffect, useState} from 'react'
import './Orders.css'

const Orders: FC = () => {
    const [orders, setOrders] = useState<any>([]);
    useEffect(() => {
        const fetchOrders = async () => {
            const data = await (
                await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders`)
            ).json();
            const {orders} = data
            setOrders(orders);
        }
        fetchOrders();
    }, [])
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