import axios from "axios";

export const api = axios.create({
  adapter: "xhr",
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});
