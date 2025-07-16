import axios from "axios";

/**
 * Central Axios instance.
 * All components / services should import from "../axios".
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api", // update if your backend runs elsewhere
});

/** Attach JWT from localStorage to every request */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
