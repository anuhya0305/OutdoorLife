import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/auth`;

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
