import axios from 'axios';

const API = axios.create({
  baseURL: 'https://management-backend-ur0n.onrender.com/api', // New Express Backend
});

// Adding a request interceptor to include the JWT token (for when we add auth)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
