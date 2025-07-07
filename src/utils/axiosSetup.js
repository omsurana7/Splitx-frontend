// src/utils/axiosSetup.js
import axios from "axios";

// ✅ Use environment variable for backend URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://splitx-backend-nqmb.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ for cookies if needed
});

// ✅ Attach JWT token from localStorage to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
