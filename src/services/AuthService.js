import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const registerUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};