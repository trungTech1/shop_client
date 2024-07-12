/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";



const prefix = '/user';
const url = import.meta.env.VITE_SEVER_URL;
export interface User {
    username: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    AvatarUrl: string;
}


const userApi = {
    getAll: () => axios.get(`${url}${prefix}`),
    getUser: (token: string) => axios.get(`${url}${prefix}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),
    create: (data: User) => axios.post(`${url}/auth/register`, data),
    update: (id: string, data: any) => axios.put(`${url}${prefix}/${id}`, data),
    delete: (id: string) => axios.delete(`${url}${prefix}/${id}`),
    userLogin: (data: any) => axios.post(`${url}/auth/login`, data),
};

export default userApi;