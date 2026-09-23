import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

// Keep cart and wishlist across page refreshes.
const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? undefined;
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: {
    cart: load("cart"),
    wishlist: load("wishlist"),
  },
});

store.subscribe(() => {
  const { cart, wishlist } = store.getState();
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
});
