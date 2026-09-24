import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/orders`;

const userAuth = () => ({
  headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedInUser"))?.token}` },
});

export const placeOrder = async (order) => {
  const response = await axios.post(API_URL, order, userAuth());
  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get(API_URL, userAuth());
  return response.data;
};
