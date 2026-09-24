import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

const adminAuth = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
});

export const getStats = async () => (await axios.get(`${BASE}/admin/stats`, adminAuth())).data;

export const getAllOrders = async () => (await axios.get(`${BASE}/admin/orders`, adminAuth())).data;

export const updateOrderStatus = async (id, orderStatus) =>
  (await axios.put(`${BASE}/admin/orders/${id}/status`, { orderStatus }, adminAuth())).data;

export const getMessages = async () => (await axios.get(`${BASE}/admin/messages`, adminAuth())).data;
