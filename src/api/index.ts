import categoryApi from "./module/category.api";
import { productApi } from "./module/product.api";
import userApi from "./module/user.api";


export default {
    categories: categoryApi,
    user : userApi,
    product : productApi
}