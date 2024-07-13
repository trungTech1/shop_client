import React, { useEffect, useState } from "react";
import "./editCategory.scss";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fireBaseFn } from "@firebaseService/firebase";
import { Category, categoryActions } from "@/store/slices/category.slice";
import { RootState } from "@/store";


const EditCategory: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState<Category | null>(null);

  const { categoryId } = useParams();
const categoryStore = useSelector((state: RootState) => state.category);
console.log("categoryStore", categoryStore, "asdas", Number(categoryId));
 useEffect(() => {
    const category = categoryStore.data.find((cat) => cat.id === Number(categoryId));
    console.log("category", category);
    if (category) {
      console.log("category1", category);
      setCategory(category);
    }
  }, [categoryId, categoryStore.data]);
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: category?.name,
      image: category?.iconUrl,
      status: category?.status,
    };

    await api.categories.update(category!.id, data).then((res) => {
      if (res.status === 200) {
        dispatch(categoryActions.updateCategory(category!));
        navigate("-1");
      }
    }).catch((error) => {
      console.error("Lỗi khi update category", error);
    }
  );

  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const url = await fireBaseFn.uploadToStorage(file);
        console.log("url", url);
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
              name="name"
              value={category.name}
              onChange={(event) =>
                setCategory((prevCategory) => ({
                  ...prevCategory!,
                  name: event.target.value,
                }))
              }
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
              src={category.iconUrl || "https://firebasestorage.googleapis.com/v0/b/shopinufb.appspot.com/o/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg?alt=media&token=a1ec7eae-fbc7-4306-b7ec-bb2e6ad3c91c"}
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
