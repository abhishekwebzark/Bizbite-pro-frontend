// redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},       // { productId: qty }
    storeId: null,
  },
  reducers: {
    addItem(state, action) {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    removeItem(state, action) {
      const id = action.payload;
      if (state.items[id] > 1) state.items[id]--;
      else delete state.items[id];
    },
    clearCart(state) {
      state.items = {};
      state.storeId = null;
    },
    setStoreId(state, action) {
      state.storeId = action.payload;
    },
  },
});

export const { addItem, removeItem, clearCart, setStoreId } = cartSlice.actions;

// Selectors
export const selectCartCount = (state) =>
  Object.values(state.cart.items).reduce((s, q) => s + q, 0);

export const selectCartTotal = (products) => (state) =>
  Object.entries(state.cart.items).reduce((sum, [id, qty]) => {
    const p = products.find((p) => String(p.id) === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

export const selectCartItems = (products) => (state) =>
  Object.entries(state.cart.items)
    .map(([id, qty]) => {
      const p = products.find((p) => String(p.id) === id);
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);

export default cartSlice.reducer;