import axios from "axios";

export const urlAPI = axios.create({
  baseURL: "http://localhost:5000",
});

export const analyticsAPI = axios.create({
  baseURL: "http://localhost:5001",
});