/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";



const prefix = '/user';
const url = import.meta.env.VITE_API_URL;

const userApi = {
    getAll: () => axios.get(`${url}${prefix}`),
    get: (id: string) => axios.get(`${url}${prefix}/${id}`),
    create: (data: any) => axios.post(`${url}${prefix}`, data),
    update: (id: string, data: any) => axios.put(`${url}${prefix}/${id}`, data),
    delete: (id: string) => axios.delete(`${url}${prefix}/${id}`),
    userLogin: (data: any) => axios.post(`${url}${prefix}/sign-in`, data),
};

export default userApi;