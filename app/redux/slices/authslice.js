// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,       // { id, phone, sellerId }
    seller: null,     // { id, name, subdomain, tier, ... }
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    setSeller(state, action) {
      state.seller = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.seller = null;
      state.error = null;
    },
  },
});

export const { setUser, setSeller, setLoading, setError, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectSeller = (state) => state.auth.seller;
export const selectIsPro = (state) => state.auth.seller?.tier === "pro";
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;