import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/orders`;

export const placeOrder = async (order) => {
  const response = await axios.post(API_URL, order);
  return response.data;
};

export const getOrders = async (userId) => {
  const response = await axios.get(API_URL, { params: { userId } });
  return response.data;
};
