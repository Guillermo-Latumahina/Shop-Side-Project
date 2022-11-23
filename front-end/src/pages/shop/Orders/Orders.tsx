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
            <div>
                {orders.map((order: any) =>
                    <div key={order._id}>
                        <p>Order - #{order._id}</p>
                        <div>
                            <ul>
                                {order.products.map((product: any) =>
                                    <li key={product._id}>
                                        <p>{product.product.title} Aantal: {product.quantity} Prijs p/s:
                                            ${product.product.price}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <p>Order totaal: ${order.totalPrice}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Orders