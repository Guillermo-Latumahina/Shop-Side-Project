import {FC, useEffect, useState} from 'react'

import OrderBar from "../../../components/OrderBar/OrderBar";

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
                        <OrderBar order={order}/>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Orders