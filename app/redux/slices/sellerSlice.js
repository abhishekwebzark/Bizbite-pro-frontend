import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {
    dukaanName: "",
    subdomain: "",
    brandColor: "#1A4D2E",
    logo: null,
    banner: null,
  },
  isLive: true,
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setSettings(state, action) {
      state.settings = { ...state.settings, ...action.payload };
      state.loading = false;
    },
    toggleStoreLive(state) {
      state.isLive = !state.isLive;
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

export const { setSettings, toggleStoreLive, setLoading, setError } =
  sellerSlice.actions;

// Selectors
export const selectSellerSettings = (state) => state.seller.settings;
export const selectIsStoreLive = (state) => state.seller.isLive;
export const selectSellerLoading = (state) => state.seller.loading;

export default sellerSlice.reducer;