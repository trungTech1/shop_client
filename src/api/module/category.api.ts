import axios from "axios";


const url = import.meta.env.VITE_SEVER_URL
const categoryApi = {
  getAll: () => {
    return axios.get(`${url}/categories`);
  },
  add: (data: any) => {
    return axios.post(`${url}/categories`, data);
  },
  update: (id: number, data: any) => {
    return axios.put(`${url}/categories/${id}`, data);
  },
  delete: (id: number) => {
    console.log("id", id)
    return axios.delete(`${url}/categories/${id}`);
  },
};

export default categoryApi;
