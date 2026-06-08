import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    updateProduct(state, action) {
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.products[idx] = action.payload;
    },
    deleteProduct(state, action) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setLoading,
  setError,
} = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductCategories = (state) => [
  ...new Set(state.products.products.map((p) => p.category)),
];

export default productsSlice.reducer;