import React, { useEffect, useState } from 'react';
import './UserTable.scss';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User } from "@/store/slices/user.slice";
import { useTranslation } from 'react-i18next';


const UserTable: React.FC = () => {
  const {t} = useTranslation();
  const User = useSelector((store: any) => store.user);


  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    setUser(user);
  }, [User]);


  return (
    <div className="user-table-container">
      <div className="header">
        <h1>{t("userTable")}</h1>
        <div className="actions">
          {/* <button className="add-button">
            <Link className="link-add-user" to="/admin/user/add">{t("addNUser")}</Link>
          </button> */}
          <div className="search-box">
            <input type="text" placeholder={t("enterusername")} />
            <button>{t("search")}</button>
          </div>
        </div>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>{t("id")}</th>
            <th>{t("userName")}</th>
            <th>Email</th>
            <th>{t("password")}</th>
            <th>Role</th>
            <th>{t("status")}</th>
            <th>{t("phone")}</th>
            <th>{t("address")}</th>
            <th colSpan={3}>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {User ? (
            <tr>
              <td>{User.data.id}</td>
              <td>{User.data.userName}</td>
              <td>{User.data.email}</td>
              <td>{User.data.password}</td>
              <td>{User.data.UserRole ? 'Admin' : 'User'}</td>
              <td>{User.data.status ? 'unActive' : 'Active'}</td>
              <td>{User.data.phone}</td>
              <td>{User.data.address}</td>
              <td>
                <button className="unlock-button">{t("unlock")}</button>
              </td>
              <td>
                <button className="lock-button">{t("lock")}</button>
              </td>
              <td>
                <button className="delete-button">{t("delete")}</button>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={15}>No user data available</td>
            </tr>
          )}
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
    </div>
  );
};

export default UserTable;