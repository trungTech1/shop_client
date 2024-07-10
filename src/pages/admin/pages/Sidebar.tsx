import React from 'react';
import { Link } from 'react-router-dom';
import '@pages/admin/Admin.scss';
import CategoryIcon from '@mui/icons-material/Category';
import PetsIcon from '@mui/icons-material/Pets';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="sidebar-admin">
      <h1>{t('admin')}</h1>
      <ul className="sidebar-menu">
        <li><Link to="/admin/category"><CategoryIcon/> {t("category")}</Link></li>
        <li><Link to="/admin/product"><PetsIcon/> {t("product")}</Link></li>
        <li><Link to="/admin/user"><SupervisedUserCircleIcon/> {t("user")}</Link></li>
        <li><Link to="/admin/order"><ReceiptLongIcon/> {t("order")}</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
