import React from 'react';
import './modal.scss';
import moneyFormat from '@/util/util';

interface OrderDetailModalProps {
  order: any;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content2">
        <h2>Order Detail</h2>
        <p>Order ID: {order.id}</p>
        <p>User ID: {order.user.id}</p>
        <p>Total Price: {moneyFormat(order.totalPrices)}</p>
        <p>Status: {order.status}</p>
        
        <table className="order-details-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.details.map((detail: any, index: any) => (
              <tr key={index + 1}>
                <td className='imageDetail'><img src={detail.product.imageProducts[0].imageUrl} alt="Product Image" /></td>
                <td>{detail.product.product_name}</td>
                <td>{detail.quantity}</td>
                <td>{moneyFormat(detail.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
