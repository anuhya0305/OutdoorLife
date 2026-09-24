import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const sendMessage = async (message) => (await axios.post(`${BASE}/contact`, message)).data;

export const subscribe = async (email) => (await axios.post(`${BASE}/newsletter`, { email })).data;
