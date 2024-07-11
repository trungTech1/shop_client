import axios from "axios";


const url = import.meta.env.VITE_SEVER_URL
const prefix = "categories";
const categoryApi = {
  getCategories: async (
    page: number,
    pageSize: number,
    searchTerm?: string
  ) => {
    let getUrl = `${url}/${prefix}?page=${page}&size=${pageSize}`;
    if (searchTerm) {
      getUrl = `${url}/${prefix}/search?page=${page}&size=${pageSize}&search=${encodeURIComponent(searchTerm)}`;
    }
    return await axios.get(getUrl);
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
