import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

const api = {
  search(q = '', type = '') {
    return axios.get(`${BASE_URL}/search?q=${q}&type=${type}`);
  },
};

export default api;
