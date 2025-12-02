import axios from "axios";

export function http() {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers,
  });
}
