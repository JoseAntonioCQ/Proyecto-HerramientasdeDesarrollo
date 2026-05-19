import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000" // Puerto de tu Node
});

export default api;
