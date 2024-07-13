import React, { useEffect, useState } from "react";
import "./ProductTable.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { Modal } from "antd";
interface product {
  product_id: number;
  product_name: string;
  imageUrls: string[];
  unitPrice: number;
  decription: string;
  stock_quantity: number;
  category_id: number;
  status: boolean;
  created_at: string;
  updatedAt: string;
}
const ProductTable: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const loadProducts = async () => {
      const data = await api.product.getAllproducts(currentPage, pageSize);
      console.log("data", data.data);
      setProducts(data.data.content);
      console.log("products", products[0].imageUrls);
      setTotalPages(data.data.totalPages);
    };
    loadProducts();
  }, [currentPage, pageSize]);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleSearch = () => {
    setCurrentPage(0);
    const loadProducts = async () => {
      const data = await api.product.getAllproducts(
        currentPage,
        pageSize,
        searchTerm
      );
      setProducts(data.data.content);
      setTotalPages(data.data.totalPages);
    };
    loadProducts();
  };

  return (
    <div className="product-table-container">
      <div className="header">
        <h1>{t("productTable")}</h1>
        <div className="actions">
          <button className="add-button">
            <Link className="link-add-product" to="add">
              {t("addProduct")}
            </Link>{" "}
          </button>
          <div className="search-box">
            <input
              type="text"
              placeholder={t("placeholderSearchCategory")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <button className="search-button" onClick={handleSearch}>
              {t("search")}
            </button>
          </div>
        </div>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>{t("id")}</th>
            <th>{t("name")}</th>
            <th>{t("image")}</th>
            <th>{t("unitPrice")}</th>
            <th>{t("stock")}</th>
            <th>{t("categoryId")}</th>
            <th>{t("createdAt")}</th>
            <th>{t("updatedAt")}</th>
            <th colSpan={2}>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products?.map((product, index) => (
              <tr key={product.product_id}>
                <td>{index + 1 + pageSize * currentPage}</td>
                <td>{product.product_name}</td>
                <td>
                  <img
                    src={
                      product.imageUrls?.[0] ||
                      "https://firebasestorage.googleapis.com/v0/b/shopinufb.appspot.com/o/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg?alt=media&token=a1ec7eae-fbc7-4306-b7ec-bb2e6ad3c91c"
                    }
                    alt={product.product_name || "Product image"}
                  />
                </td>
                <td>{product.unitPrice}</td>
                <td>{product.stock_quantity}</td>
                <td>{product.category_id}</td>
                <td>{product.created_at}</td>
                <td>{product.updatedAt}</td>
                <td>
                  <button className="edit-button">
                    <Link to={`/admin/product/edit/${product.product_id}`}>
                      {t("edit")}
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => [
                      Modal.confirm({
                        title: "Xác nhận!",
                        content: "Bạn chắc chưa",
                        onOk: () => {
                          api.product
                            .deleteProduct(product.product_id)
                            .then((res) => {
                              Modal.success({
                                content: t("deleteProductSuccess"),
                              });
                              setProducts(
                                products.filter(
                                  (item) =>
                                    item.product_id !== product.product_id
                                )
                              );
                              res.data;
                            })
                            .catch(() => {
                              Modal.error({
                                content: t("deleteProductFailed"),
                              });
                            });
                        },
                      }),
                    ]}
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}>{t("noData")}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        {getPageNumbers().map((number) => (
          <button
            key={number}
            className={`pagination-button ${
              currentPage === number - 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(number - 1)}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
          }
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
        <select
          className="select-page-size"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(0);
          }}
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default ProductTable;
