import axios from "axios";

const SearchClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SEARCH_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const Client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { SearchClient, Client };
