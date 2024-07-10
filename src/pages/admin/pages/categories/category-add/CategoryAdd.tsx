import React from 'react';
import './addCategory.scss';
import { useTranslation } from 'react-i18next';
import api from '@/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { categoryActions } from '@/store/slices/category.slide';
import { fireBaseFn } from '@/firebase/firebase';


const AddCategory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCategory = {
      category_name: (event.target as any).category_name.value,
      image: await fireBaseFn.uploadToStorage((event.target as any).image.files[0]),
    }

    console.log("đã vào", newCategory)

    api.category.addCategory(
      newCategory
    ).then((res) => {
       alert(res.data.message);
       dispatch(categoryActions.addCategory(res.data.data));
       navigate(-1);
    }).catch(() => {
      alert(t('addCategoryFailed'));
    });
  };

  return (
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
          <input type="file" name='image'/>
        </div>
        <button type="submit" className="submit-button">{t("addCategory")}</button>
      </form>
    </div>
  );
};

export default AddCategory;
