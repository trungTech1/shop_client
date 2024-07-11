import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoryActions, categoryReducer } from "./slices/category.slice";


const rootReducer = combineReducers({
    category: categoryReducer,
  });
  

export type RootState = ReturnType<typeof rootReducer>;

const Store = configureStore({
    reducer: rootReducer,
});
Store.dispatch(categoryActions.fecthCategories( {page: 0, pageSize: 10}));
export default Store;