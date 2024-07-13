import categoryApi from "./module/category.api";
import { productApi } from "./module/product.api";
import userApi from "./module/user.api";
import "./axios.instance";


export default {
    categories: categoryApi,
    user : userApi,
    product : productApi
}