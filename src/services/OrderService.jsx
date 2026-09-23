import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${BASE}/orders`;

export const getAllOrders = async () => {
  const response = await axios.get(`${BASE}/admin/orders`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });
  return response.data;
};

export const placeOrder = async (order) => {
  const response = await axios.post(API_URL, order);
  return response.data;
};

export const getOrders = async (userId) => {
  const response = await axios.get(API_URL, { params: { userId } });
  return response.data;
};
