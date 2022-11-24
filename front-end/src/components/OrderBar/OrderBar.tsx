import {FC} from "react";

import './OrderBar.css'

export type Props = {
    order: {
        _id: string;
        totalPrice: number;
        products: Array<Product>;
    }
}
export type Product = {
    _id: number;
    product: {
        title: string;
        price: number;
    }
    quantity: number
}
const OrderBar: FC<Props> = ({order}) => {
    return (
        <div className="order-bar">
            <h4 className="order-number">Order - #{order._id}</h4>
            <div>
                <ul>
                    {order.products.map((product: Product) =>
                        <li key={product._id}>
                            <div className="order-item">
                                <p>{product.product.title}</p>
                                <p>Stuks: {product.quantity}</p>
                                <p>Prijs: ${product.product.price}</p>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            <h5>Totaal: ${order.totalPrice}</h5>
        </div>
    )
}
export default OrderBar;