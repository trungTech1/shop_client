import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoryActions, categoryReducer } from "./slices/category.slice";
import { userActions, userReducer } from "./slices/user.slice";


const rootReducer = combineReducers({
    category: categoryReducer,
    user : userReducer,
  });
  

export type RootState = ReturnType<typeof rootReducer>;

const Store = configureStore({
    reducer: rootReducer,
});

Store.dispatch(categoryActions.fecthCategories( {page: 0, pageSize: 10}));
Store.dispatch(userActions.fetchUsers());
export default Store;