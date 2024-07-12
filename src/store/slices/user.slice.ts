import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 export interface User {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
}


export interface UserState {
    data: User[] | null;
    loading: boolean;
}

export const initialState: UserState = {
    data: null,
    loading: false,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.data?.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchUsers.rejected, (state) => {
            state.data = null;
            //localStorage.removeItem("token");
            state.loading = false;
        })

    }
});


const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async () => {
        const response = await api.user.getUser(localStorage.getItem("token") as string);
        return response.data;
    }
);

export const userReducer = userSlice.reducer;
export const userActions = { ...userSlice.actions, fetchUsers };