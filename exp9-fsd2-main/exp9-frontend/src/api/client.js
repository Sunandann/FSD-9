import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
  timeout: 12000,
  headers: {
    "Content-Type": "application/json"
  }
});

client.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default client;
