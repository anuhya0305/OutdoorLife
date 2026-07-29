import axios from "axios";

const API = "http://localhost:3000/products";
const REVIEW_API = "http://localhost:3000/reviews";

export const getProducts = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await axios.get(API);
  return response.data.filter((product) => product.featured);
};

export const getDealProducts = async () => {
  const response = await axios.get(API);
  return response.data.filter((product) => product.deal);
};

export const getBestSellerProducts = async () => {
  const response = await axios.get(API);
  return response.data.filter((product) => product.bestSeller);
};

export const getReviews = async () => {
  const response = await axios.get(REVIEW_API);
  return response.data;
};

export const getReviewsByProduct = async (productId) => {
  const response = await axios.get(
    `${REVIEW_API}?productId=${productId}`
  );
  return response.data;
};

export const addReview = async (review) => {
  const response = await axios.post(REVIEW_API, review);
  return response.data;
};