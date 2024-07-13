/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";



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
    register: (data: User) => {
        return axios.post(`${url}/auth/register`, data)
    },
    login: (data: any) => {
        return axios.post(`${url}/auth/login`, data)
    },
    authen: () => {
        return axios.post(`${url}/auth`, {

        })
    },
    findAll: () => {
        return axios.get(`${url}/user/list`)
    },
    update: (data: User) => {
        return axios.put(`${url}/user/update`, data)
    }
};

export default userApi;