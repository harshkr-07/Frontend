import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-h7ew.onrender.com/api', // Make sure this is correct
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
