import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import ordersReducer from "./orderSlice";
import productsReducer from "./productSlice";
import sellerReducer from "./sellerSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    products: productsReducer,
    seller: sellerReducer,
      cart: cartReducer,
    orders: orderReducer,
  },
});

export default store;