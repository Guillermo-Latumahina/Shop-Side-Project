import {FC} from 'react'
import './Orders.css'

const Orders: FC = () => {
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