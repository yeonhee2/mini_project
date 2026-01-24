// src/api/axiosInstance.js
import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL || ""; 

export const axiosSpring = axios.create({
  baseURL,
  timeout: 60000,
  withCredentials: true, // ✅ 세션(JSESSIONID) 필수
});
