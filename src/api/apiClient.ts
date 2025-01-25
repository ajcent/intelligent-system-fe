import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://fuzzy-weather-system.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
