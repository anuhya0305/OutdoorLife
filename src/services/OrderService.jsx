import axios from "axios";

const API_URL = "http://localhost:3000/orders";

export const placeOrder = async (order) => {
  const response = await axios.post(API_URL, order);
  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};