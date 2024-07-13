import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@pages/admin/Admin.scss';
import CategoryIcon from '@mui/icons-material/Category';
import PetsIcon from '@mui/icons-material/Pets';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const userStore = useSelector((store: RootState) => store.user)

  const [menus, setMenus] = useState<any>([])

  useEffect(() => {
    let perList = [];
    console.log('user permissions:', userStore.data?.permission);
    if(userStore.data?.permission?.includes('category')) {
      perList.push({
        name: 'category',
        icon: <CategoryIcon />,
        link: '/admin/category',
      })
    }
    if(userStore.data?.permission?.includes('product')) {
      perList.push({
        name: 'product',
        icon: <PetsIcon />,
        link: '/admin/product',
      })
    }
    if(userStore.data?.permission?.includes('user')) {
      perList.push({
        name: 'user',
        icon: <SupervisedUserCircleIcon />,
        link: 'user',
      })
    }
    if(userStore.data?.permission?.includes('order')) {
      perList.push({
        name: 'order',
        icon: <ReceiptLongIcon />,
        link: 'order',
      })
    }
    setMenus(perList)
    
  }, [userStore])
  return (
    <div className="sidebar-admin">
      <h1>{t('admin')}</h1>
      <ul className="sidebar-menu">
        {
          menus.map((menu: any) => (
            <li key={menu.name}>
              <Link to={menu.link}>{menu.icon} {t(menu.name)}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;
