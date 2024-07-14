import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export enum Role {
    ADMIN = "ROLE_ADMIN",
    MOD = "ROLE_MODERATOR",
    USER = "ROLE_USER"

}

 export interface User {
    id: number;
    username: string;
    password: string;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string;

    permission?: string;
    isBlocked?: boolean;
    isDeleted?: boolean;
    isVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
    role?: Role;
}


export interface UserState {
    data: User| null;
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
        const response = await api.user.authen();
        console.log("response", response);
        return response.data;
    }
);

export const userReducer = userSlice.reducer;
export const userActions = { ...userSlice.actions, fetchUsers };