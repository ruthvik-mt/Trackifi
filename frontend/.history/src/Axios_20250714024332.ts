import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api", // adjust if needed
  withCredentials: true,
});

export default instance;
