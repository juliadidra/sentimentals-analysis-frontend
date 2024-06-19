import axios from "axios";

export const apiFetcher = axios.create({
  baseURL: process.env.API_URL,
});