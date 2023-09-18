import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:9200/api/",
  withCredentials: true,
});
