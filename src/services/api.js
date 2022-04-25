import axios from "axios";

const api = axios.create({
  baseURL: process.env.IDENTITY_SERVICE_URL,
});

export default api;