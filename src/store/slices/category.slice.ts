import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Category {
  id: number;
  name: string;
  iconUrl: string;
  status: boolean;
}

export interface CategoryState {
  data: Category[] | null;
}

const initialState: CategoryState = {
  data: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory : (state, action) => {
      state.data?.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.data = state.data?.filter((category) => category.id !== action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fecthCategories.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

const fecthCategories  = createAsyncThunk(
  "category/fetchData",
  async ({ page, pageSize }: { page: number, pageSize: number }) => {
    const response = await api.categories.getCategories(page, pageSize);
    return response.data.content;
  }
);

const updateCategory = (category: Category) => {
  return async (dispatch: any) => {
    const response = await api.categories.update(category.id, category);
    dispatch(categoryActions.addCategory(category));
  };
};

export const categoryReducer = categorySlice.reducer;
export const categoryActions = { ...categorySlice.actions, fecthCategories, updateCategory };
