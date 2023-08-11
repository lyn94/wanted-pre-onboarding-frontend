import axios from "axios";

const baseURL = `https://www.pre-onboarding-selection-task.shop/`

const clientApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

clientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default clientApi;