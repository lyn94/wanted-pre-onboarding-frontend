import axios from "axios";

// const baseURL = `https://www.pre-onboarding-selection-task.shop/`
const baseURL = `http://localhost:8000/`

const token = localStorage.getItem("access_token");
export const clientApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
})

export default clientApi;