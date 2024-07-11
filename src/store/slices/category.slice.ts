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
  data: null,
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
    console.log("response", response.data);
    return response.data.content;
  }
);

export const categoryReducer = categorySlice.reducer;
export const categoryActions = { ...categorySlice.actions, fecthCategories };
