// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const CART_KEY = "cart";

function readFromLocalStorage() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: { ids: readFromLocalStorage(), isOpen: false },
  reducers: {
    addToCart: (state, action) => {
      if (!state.ids.includes(action.payload)) state.ids.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { addToCart, removeFromCart, openCart, closeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
