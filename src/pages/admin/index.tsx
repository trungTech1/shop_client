import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@pages/admin/pages/Sidebar';
import './Admin.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import ChangeLanguage from '@/i18n/ChangeLanguage';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Role } from '@/store/slices/user.slice';


const Admin: React.FC = () => {
  const { t } = useTranslation();

  const userStore = useSelector((store: RootState) => store.user);
  
  useEffect(() => {
    if(!userStore.loading) {
      if(userStore.data?.role == Role.USER) {
        window.location.href = '/';
      }
    }
  }, [userStore.data, userStore.loading])

  return (
    <>
      {
        (userStore.data?.role == Role.ADMIN || userStore.data?.role == Role.MOD ) && (
          <div className="wrapper">
      <Sidebar  />
      <div className="main-content">
        <header>
          <div className='admin-header'>
            <div className='admin-header-left'>{t("hello")} {userStore.data?.fullName}-{userStore.data?.role}</div>
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
        )
      }
    </>
  );
};

export default Admin;
