import React, { useState } from 'react';
import './cart.scss';
import ReplyIcon from '@mui/icons-material/Reply';

interface CartItem {
    id: number;
    name: string;
    unit: string;
    price: number;
    quantity: number;
}

const Cart: React.FC = () => {
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
        {
            id: 2,
            name: 'Nước mắm Nam Ngư 500ml',
            unit: 'Chai',
            price: 40000,
            quantity: 2,
        },
        {
            id: 2,
            name: 'Nước mắm Nam Ngư 500ml',
            unit: 'Chai',
            price: 40000,
            quantity: 2,
        },
        {
            id: 2,
            name: 'Nước mắm Nam Ngư 500ml',
            unit: 'Chai',
            price: 40000,
            quantity: 2,
        },
    ]);

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className='cart-container'>
            <div className='cart-back'>
                <button><ReplyIcon /> <a href="http://localhost:5173/shop">Tiếp tục mua sắm</a></button>
            </div>
            <div className="cart">
                <table>
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Đơn vị tính</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.unit}</td>
                                <td>{item.price.toLocaleString()} ₫</td>
                                <td>
                                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                                    {item.quantity}
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </td>
                                <td>{(item.price * item.quantity).toLocaleString()} ₫</td>
                                <td>
                                    <button onClick={() => removeItem(item.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="cart-summary">
                    <div className="summary-item">
                        <span>Tạm tính giỏ hàng:</span>
                        <span>{total.toLocaleString()} ₫</span>
                    </div>
                    <div className="summary-item">
                        <span>Tạm tính sản phẩm KM:</span>
                        <span>0 ₫</span>
                    </div>
                    <div className="summary-item">
                        <span>Tiết kiệm được:</span>
                        <span>0 ₫</span>
                    </div>
                    <div className="summary-item">
                        <span>Phí vận chuyển:</span>
                        <span>0 ₫</span>
                    </div>
                    <div className="summary-item">
                        <span>Khuyến mại:</span>
                        <span>0 ₫</span>
                    </div>
                    <div className="summary-item">
                        <span>Thành tiền:</span>
                        <span>{total.toLocaleString()} ₫</span>
                    </div>
                    <button className="checkout-button">THANH TOÁN {total.toLocaleString()} ₫</button>
                    <button className="clear-cart-button" onClick={clearCart}>Xóa giỏ hàng</button>
                </div>
            </div >
        </div>
    );
};

export default Cart;
