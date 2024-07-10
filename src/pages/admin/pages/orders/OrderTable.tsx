import React, { useEffect, useState } from 'react';
import './OrderTable.scss';
import { useTranslation } from 'react-i18next';
import api from '@/api';
import moneyFormat from '@/util/util';
import OrderDetailModal from './modal/ModalDetail';

interface image {
  id: number;
  imageUrl: string;
}
interface order {
  id: number
  user: {
    id: number;
    imageProducts : image[];
    userName: string;
    address: string;
    phone: string;
  }
  totalPrices: number;
  status: string;
  note: string;
  createDate: string;
  updateDate: string;
  details: any[];
}
const OrderTable: React.FC = () => {
  const {t} = useTranslation();
  const [orders, setOrders] = useState<order[] | null>(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // fetch data
  const fetchOrders = async () => {
    try {
      const response = await api.order.getCart();
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } 
  }
  fetchOrders();
  }, []);

  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  }

  const handleDetailClick = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="order-table-container">
      <div className="header">
        <h1>{t("orderTable")}</h1>
        <div className="actions">
        <select className="choice-button" onChange={handleStatusChange} value={selectedStatus}>
            <option value="">{t("allStatuses")}</option>
            <option value="WAITING">{t("waiting")}</option>
            <option value="CONFIRM">{t("confirm")}</option>
            <option value="DELIVERY">{t("delivery")}</option>
            <option value="SUCCESS">{t("success")}</option>
            <option value="CANCEL">{t("cancel")}</option>
            <option value="DENIED">{t("denied")}</option>
          </select>
          <div className="search-box">
            <input type="text" placeholder={t("placeholderOrderName")} />
            <button>{t("search")}</button>
          </div>
        </div>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>{t("stt")}</th>
            <th>{t("id")}</th>
            <th>{t("userId")}</th>
            <th>{t("totalPrice")}</th>
            <th>{t("status")}</th>
            <th>{t("note")}</th>
            <th>{t("receiveName")}</th>
            <th>{t("receiveAddress")}</th>
            <th>{t("receivePhone")}</th>
            <th>{t("createAt")}</th>
            <th>{t("receivedAt")}</th>
            <th colSpan={2}>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
  { orders?.map((order, index) => (
    <tr key={index + 1}>
      <td>{index +1}</td>
      <td>{order.id}</td>
      <td>{order.user.id}</td>
      <td> {moneyFormat(order.totalPrices)}</td>
      <td>{order.status}</td>
      <td>{order.note}</td>
      <td>{order.user.userName}</td> 
      <td>{order.user.address? "" : "chua co dia chi"}</td>
      <td>{order.user.phone ? "" : " chua co sdt"}</td>
      <td>{order.createDate}</td>
      <td>{order.updateDate}</td>
      <td>
      <button className="detail-button" onClick={() => handleDetailClick(order)}>{t("detail")}</button>
      </td>
      {/* <td>
        <button className="change-button"
        onClick={async () => {
          handleStatusChange(order.id, status)
        }}
        >{t("changeStatus")}</button>
      </td> */}
    </tr>
  ))}
</tbody>
      </table>
      <div className="pagination">
        <button className="pagination-button">{t("previous")}</button>
        <button className="pagination-button">1</button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">3</button>
        <button className="pagination-button">4</button>
        <button className="pagination-button">{t("next")}</button>
      </div>
      {isModalOpen && <OrderDetailModal order={selectedOrder} onClose={closeModal} />}
  
    </div>
  );
};

export default OrderTable;
