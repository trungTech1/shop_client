import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Category {
  id: number;
  name: string;
  iconUrl: string;
  status: boolean;
}

interface CategoryState {
  data: Category[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: [],
  totalPages: 0,
  currentPage: 0,
  pageSize: 5,
  loading: true,
  error: null,
};


const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.content;
      },
      updateCategory: (state, action) => {
        const index = state.data.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      },
    addCategory : (state, action) => {
      state.data?.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.data = state.data?.filter((category) => category.id !== action.payload) || null;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fecthCategories.fulfilled, (state, action) => {
      state.data = action.payload.content;
      state.totalPages = action.payload.page.totalPages;
      state.currentPage = action.payload.page;
      state.loading = false;
    });
  },
});

const fecthCategories  = createAsyncThunk(
  "category/fetchData",
  async ({ page, pageSize }: { page: number, pageSize: number }) => {
    const response = await api.categories.getCategories(page, pageSize);
    console.log("responseưeqweqwe", response.data);
    return response.data;
  }
);


export const categoryReducer = categorySlice.reducer;
export const categoryActions = { ...categorySlice.actions, fecthCategories };
