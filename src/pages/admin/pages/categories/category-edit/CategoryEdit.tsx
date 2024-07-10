import React, { useState, useEffect } from "react";
import "./editCategory.scss";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Modal } from "antd";
import { fireBaseFn } from "@/firebase/firebase";
import { Category, categoryActions } from "@/store/slices/category.slide";

const EditCategory: React.FC = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useTranslation();
  const categoryStore = useSelector((state: RootState) => state.category);
  const navigator = useNavigate();

  useEffect(() => {
    const foundCategory = categoryStore.categories.find(
      (category) => category.category_id === Number(categoryId)
    );
    setCategory(foundCategory || null);
  }, [categoryStore.categories, categoryId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!category) return;

   const newcategory = { 
      category_id: category.category_id,
      category_name: category.category_name,
      image: category.image,
      status: category.status,
   };
    api.category.updateCategory(newcategory).then((res) => {
      Modal.success({
        title: "Cập nhật thành công",
        content: res.data.message,
      });
      categoryActions.updateCategory(newcategory);
      navigator(-1);
    }).catch(() => {
      Modal.error({
        title: "Cập nhật thất bại",
        content: "Có lỗi xảy ra khi cập nhật danh mục",
      });
    });
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const url = await fireBaseFn.uploadToStorage(file);
        if (url) {
          setCategory((prevCategory) => ({
            ...prevCategory!,
            image: url,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi tải ảnh lên", error);
      }
    }
  };

  return (
    <div className="edit-category">
      <h1 className="title">{t("editCategory")}</h1>
      {category ? (
        <form className="category-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t("name")}</label>
            <input
              type="text"
              id="name"
              value={category.category_name}
              onChange={(event) =>
                setCategory((prevCategory) => ({
                  ...prevCategory!,
                  category_name: event.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">{t("image")}</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <img
              src={category.image || "https://firebasestorage.googleapis.com/v0/b/shopinufb.appspot.com/o/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg?alt=media&token=a1ec7eae-fbc7-4306-b7ec-bb2e6ad3c91c"}
              alt="Category"
              className="category-image"
            />
          </div>
          <div className="form-group">
            <label htmlFor="isDeleted">{t("isDeleted")}</label>
            <input
              type="checkbox"
              id="isDeleted"
              checked={category.status}
              onChange={(event) =>
                setCategory((prevCategory) => ({
                  ...prevCategory!,
                  status: event.target.checked,
                }))
              }
            />
          </div>
          <button type="submit" className="submit-button">
            {t("updateCategory")}
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditCategory;
