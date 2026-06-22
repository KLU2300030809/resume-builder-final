import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// attach token automatically
api.interceptors.request.use((config) => {
  console.log("BASE URL:", config.baseURL);
  console.log("URL:", config.url);
  console.log("FINAL:", `${config.baseURL}${config.url}`);
  const token = localStorage.getItem("token");
  console.log("TOKEN SENT:", token); // DEBUG
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;