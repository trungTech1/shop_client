import React, { useEffect, useState } from 'react';
import './addCategory.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { fireBaseFn } from '@firebaseService/firebase';
import api from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActions } from '@/store/slices/category.slice';
import { Modal } from 'antd';
import { RootState } from '@/store';
import LoadingSpinner from '@/routes/loadding/Loadding';


const AddCategory = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userStore = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const newCategory = {
      name: (event.target as any).category_name.value,
      iconUrl: await fireBaseFn.uploadToStorage((event.target as any).image.files[0]),
    }
    console.log("newCategory", newCategory)
    await api.categories.add(
      newCategory
    ).then((res) => {
      Modal.success({
        content: t('addCategorySuccess'),
        onOk: () => {
          dispatch(categoryActions.addCategory(res.data))
          setLoading(false);
          navigate(-1);
        }
      });
      
    }).catch(() => {
      alert(t('addCategoryFailed'));
    });
  };
  const [access, setAccess] = useState(false);
  useEffect(() => {
    if (!userStore.loading) {
      if (userStore.data?.permission?.includes('category.c')) {
        setAccess(true);
      } else {
        navigate('/admin');
      }
    }
  }, [navigate, userStore.data, userStore.loading])
  return (
    <>
      {
        loading && <LoadingSpinner />
      }
      {
        access && (
          <div className="add-category">
            <button onClick={() => {
              navigate(-1)
            }}>Back</button>
            <h1 className="title">{t("addNCategory")}</h1>
            <form className="category-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{t("name")}</label>
                <input
                  type="text"
                  name="category_name"
                  required
                />
                <input type="file" name='image' />
              </div>
              <button type="submit" className="submit-button">{t("addCategory")}</button>
            </form>
          </div>
        )
      }
    </>
  );
};

export default AddCategory;