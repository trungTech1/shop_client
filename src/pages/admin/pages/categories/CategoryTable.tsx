import React from "react";
import "./CategoryTable.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const CategoryTable: React.FC = () => {
  const { t } = useTranslation();
  const categoryStore = useSelector ((state: RootState) => state.category);

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
                placeholder={t("search")}
              />
            <button className="search-button" >
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
            <th>{t("isDeleted")}</th>
            <th colSpan={2}>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {categoryStore.data?.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <img src={category.iconUrl} alt={category.name} />
              </td>
              <td>{category.status ? "Deleted" : "Active"}</td>
              <td>
                <Link to={`edit/${category.id}`}>{t("edit")}</Link>
              </td>
              <td>
                <button>{t("delete")}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination">
        <button
 
        >
          Previous
        </button>
        <button
        
        >
          Next
        </button>
        <select
          className="select-page-size"
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
