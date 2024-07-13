import React, { useState } from "react";
import "./CategoryTable.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/api";
import { Modal } from "antd";
import { categoryActions } from "@/store/slices/category.slice";


const CategoryTable: React.FC = () => {
  const { t } = useTranslation();
  const categoryStore = useSelector ((state: RootState) => state.category);
  console.log(categoryStore,"hhhhgghh")
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  

  const handleDelete = async (id: number) => {
    try {
      await api.categories.delete(id);
      Modal.success({
        content: t("deleteCategorySuccess"),
        onOk: () => {
          dispatch(categoryActions.deleteCategory(id));
          dispatch(categoryActions.fecthCategories( 
            {
              page: currentPage,
              pageSize: pageSize
            }
          ) as any);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const loadCategories = async () => {
    const data = await api.categories.getCategories(
      currentPage,
      pageSize,
      searchTerm
    );
    dispatch(categoryActions.addCategory(data.data));
    setTotalPages(data.data.totalPages);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleSearch = () => {
    setCurrentPage(0);
    loadCategories();
  };
  return (
    <div className="category-table-container">
      <div className="header">
        <h1>{t("categoryTable")}</h1>
        <div className="actions">
          <button className="add-button">
            <Link className="link-add-category" to="add">
              {t("addNewCategory")}
            </Link>
          </button>
          <div className="search-box">
              <input
                type="text"
                placeholder={t("placeholderSearchCategory")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }
                }
              />
            <button className="search-button" onClick={handleSearch}>
              {t("search")}
            </button>
          </div>
        </div>
      </div>
      <div className="table-wrapper">
      <table className="category-table">
        <thead>
          <tr>
            <th>{t("id")}</th>
            <th>{t("name")}</th>
            <th>{t("image")}</th>
            <th>{t("status")}</th>
            <th colSpan={2}>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(categoryStore.data) && categoryStore.data.length > 0 ?(
              categoryStore.data?.map((category,index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <img src={category.iconUrl} alt={category.name} />
                  </td>
                  <td>{category.status ? "Active" : "NoAcative"}</td>
                  <td>
                    <Link to={`edit/${category.id}`}>{t("edit")}</Link>
                  </td>
                  <td>
                    <button
                    onClick={() => {
                      handleDelete(category.id);
                    }  
              }
                    >{t("delete")}</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}>{t("noData")}</td>
              </tr>
            )
          }
         
        </tbody>
      </table>
      </div>
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

export default CategoryTable;
