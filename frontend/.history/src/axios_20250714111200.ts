// // src/axios.ts
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api",
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;

// src/axios.ts
// src/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "", // <-- frontend sends /api/... and Vite handles the proxy
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;


