import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./editProduct.scss";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fireBaseFn } from "@firebaseService/firebase";
import { Modal } from "antd";

interface Product {
  product_id: number;
  product_name: string;
  imageUrls: string[];
  description: string;
  unitPrice: number;
  stock_quantity: number;
  categoryId: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

const EditProduct: React.FC = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams<{ productId: string }>();
  const categories = useSelector(
    (state: RootState) => state.category.data
  );
  console.log(categories);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await api.product.getProductById(Number(productId));
      const productData = data.data;
      setProduct(productData);
      console.log("productData", productData)
    };
    fetchProduct();
  }, [productId]);

  const handleRemoveImage = (index: number) => {
    if (product) {
      const updatedImages = product.imageUrls.filter(
        (_image, i) => i !== index
      );
      setProduct({ ...product, imageUrls: updatedImages });
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      setProduct({ ...product, product_name: event.target.value });
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      try {
        const uploadPromises = Array.from(event.target.files).map(file => 
          fireBaseFn.uploadToStorage(file)
        );
        
        const uploadedUrls = await Promise.all(uploadPromises);
        
        if (product) {
          const updatedImages = [...product.imageUrls, ...uploadedUrls];
          setProduct({ ...product, imageUrls: updatedImages });
        }
      } catch (error) {
        console.error("Error uploading images", error);
      }
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      setProduct({ ...product, unitPrice: parseFloat(event.target.value) });
    }
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      setProduct({
        ...product,
        stock_quantity: parseInt(event.target.value, 10),
      });
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (product) {
      setProduct({ ...product, categoryId: parseInt(event.target.value, 10) });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      (async () => {
        await api.product.updateProduct(product as Product);
      }
    )();
    Modal.success({
      content: "Product updated successfully!",
      onOk: () => {
        window.location.href = "/admin/product";
      },
    });
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div className="edit-product">
      <h1 className="title">{t("editProduct")}</h1>
      {product && (
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">{t("id")}</label>
            <input type="text" id="id" value={product.product_id} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="name">{t("name")}</label>
            <input
              type="text"
              id="name"
              value={product.product_name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrls">{t("image")}</label>
            <input
              type="file"
              id="imageUrls"
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
            <div className="images-container">
              {product.imageUrls?.map((image, index) => (
                <div key={index} className="image-item">
                <img src={image} alt="product" />
                <button className="remove-image-btn" onClick={() => handleRemoveImage(index)}>X</button>
              </div>
              ))}

            </div>
          </div>
          <div className="form-group">
            <label htmlFor="price">{t("price")}</label>
            <input
              type="number"
              id="price"
              value={product.unitPrice}
              onChange={handlePriceChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">{t("description")}</label>
            <textarea
              id="description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">{t("stock")}</label>
            <input
              type="number"
              id="stock"
              value={product.stock_quantity}
              onChange={handleStockChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">{t("category")}</label>
            <select
              id="category"
              value={product.categoryId}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                {t("selectacategory")}
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            {t("saveChanges")}
          </button>
        </form>
      )}

    </div>
  );
};

export default EditProduct;
