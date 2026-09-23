import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${BASE}/auth`;

export const adminLogin = async (email, password) => {
  try {
    const response = await axios.post(`${BASE}/admin/login`, { email, password });
    return response.data.token;
  } catch (error) {
    if (error.response?.status === 401) return null;
    throw error;
  }
};

export const registerUser = async (user) => {
  const response = await axios.post(`${API_URL}/register`, user);
  return response.data;
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) return null;
    throw error;
  }
};
