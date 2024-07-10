import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@pages/admin/pages/Sidebar';
import './Admin.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import ChangeLanguage from '@/i18n/ChangeLanguage';


const Admin: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="wrapper">
      <Sidebar  />
      <div className="main-content">
        <header>
          <div className='admin-header'>
            <div className='admin-header-left'>{t("hello")} {t("admin")}</div>
            <div className='admin-heder-right'>
              <AccountCircleIcon />
              <span>   </span>
              <ChangeLanguage /></div>
          </div>
        </header>
        <main className="table">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
