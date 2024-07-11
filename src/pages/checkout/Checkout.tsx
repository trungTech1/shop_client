import React, { useState } from 'react';
import './checkout.scss';
import ReplyIcon from '@mui/icons-material/Reply';


interface CartItem {
    id: number;
    name: string;
    unit: string;
    price: number;
    quantity: number;
}

interface UserDetails {
    name: string;
    address: string;
    phone: string;
    email: string;
}

const Checkout: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: '',
        address: '',
        phone: '',
        email: '',
    });

    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'Tương ớt cay vừa Nam Dương 255g',
            unit: 'Chai',
            price: 12000,
            quantity: 1,
        },
        {
            id: 2,
            name: 'Nước mắm Nam Ngư 500ml',
            unit: 'Chai',
            price: 40000,
            quantity: 2,
        },
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit order logic here
        console.log('Order submitted:', userDetails, cartItems);
    };

    return (
        <div>
            <div className='checkout-back'>
                <button><ReplyIcon /> <a href="http://localhost:5173/cart">Quay lại giỏ hàng</a></button>
            </div>
        <div className="checkout">
            <h2>Thông tin giao hàng</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Họ và tên:
                    <input
                        id='text-checkout'
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Địa chỉ:
                    <input
                        id='text-checkout'
                        type="text"
                        name="address"
                        value={userDetails.address}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Số điện thoại:
                    <input
                        id='text-checkout'
                        type="tel"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        id='text-checkout'
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button className='button-checkout' type="submit">Hoàn tất đặt hàng</button>
            </form>
            <h2>Tóm tắt đơn hàng</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn vị tính</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.unit}</td>
                            <td>{item.price.toLocaleString()} ₫</td>
                            <td>{item.quantity}</td>
                            <td>{(item.price * item.quantity).toLocaleString()} ₫</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="order-summary">
                <div className="summary-item">
                    <span>Tổng cộng:</span>
                    <span>{total.toLocaleString()} ₫</span>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Checkout;
