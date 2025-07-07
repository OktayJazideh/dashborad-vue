import axios from 'axios';

const API_URL = 'https://64a6e4e7096b3f0fcc80e6e2.mockapi.io/api/v1/users';

export const userService = {
  getAll: () => axios.get(API_URL),
  get: (id) => axios.get(`${API_URL}/${id}`),
  create: (user) => axios.post(API_URL, user),
  update: (id, user) => axios.put(`${API_URL}/${id}`, user),
  remove: (id) => axios.delete(`${API_URL}/${id}`),
}; 