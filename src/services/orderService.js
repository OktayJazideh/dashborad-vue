import axios from 'axios';

const API_URL = 'https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/v1/orders';

export const orderService = {
  getAll: () => axios.get(API_URL),
  get: (id) => axios.get(`${API_URL}/${id}`),
  create: (order) => axios.post(API_URL, order),
  update: (id, order) => axios.put(`${API_URL}/${id}`, order),
  remove: (id) => axios.delete(`${API_URL}/${id}`),
}; 