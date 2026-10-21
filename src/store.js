//store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import filterReducer from "./filtersSlice";
import { CART_KEY } from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
});

let prevIds = store.getState().cart.ids;

store.subscribe(() => {
  const ids = store.getState().cart.ids;
  if (ids === prevIds) return;
  prevIds = ids;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(ids));
  } catch {
    console.log("Full or Blocked");
  }
});
