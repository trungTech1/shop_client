import React, { useState, useEffect } from 'react';
import './addProduct.scss';
import { useTranslation } from 'react-i18next';
import { Category } from '@store/slices/category.slice';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { fireBaseFn } from '@firebaseService/firebase';
import api from '@/api';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';


const AddProduct: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const category = useSelector((state: RootState) => state.category);
  useEffect(() => {
    if (category.data) {
      setCategories(category.data);
    }
  }, [category]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const images = (event.target as any).image.files;
    const imageUrls: string[] = [];
    for (let i = 0; i < images.length; i++) {
      await fireBaseFn.uploadToStorage(images[i]).then((url) => {
        imageUrls.push(url);
      });
    }

    const newProduct = {
      product_name: (event.target as any).name.value,
      imageUrls: imageUrls,
      unitPrice: (event.target as any).price.value,
      stock_quantity: (event.target as any).stock.value,
      category_id: (event.target as any).category.value,
      description: (event.target as any).description.value,
    };
    console.log("product", newProduct)
    await api.product.addProduct(newProduct).then(() => {
      Modal.success({
        content: t('addProductSuccess'),
      });
      navigate('/admin/product');
    }).catch(() => {
      Modal.error({
        content: t('addProductFailed'),
      });
    });
  };

  return (
    <div className="add-product">
      <h1 className="title">{t("addNproduct")}</h1>
      <form className="product-form" onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="name">{t("name")}</label>
          <input
            type="text"
            id="name"
            name='name'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">{t("image")}</label>
          <input
            type="file"
            id="image"
            name='image'
            accept="image/*"
            multiple={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">{t("price")}</label>
          <input
            type="number"
            id="price"
            name='price'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">{t("stock")}</label>
          <input
            type="number"
            id="stock"
            name='stock'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">{t("category")}</label>
          <select id="category" required>
            <option value="" >{t("selectacategory")}</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">{t("description")}</label>
          <input
            id="description"
            type='text'
            name='description'
            required
          />
        </div>
        <button type="submit" className="submit-button">{t("addProduct")}</button>
      </form>
    </div>
  );
};

export default AddProduct;
