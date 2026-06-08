// redux/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    loading: false,
    error: null,
    todayEarnings: 0,
  },
  reducers: {
    setOrders(state, action) {
      state.list = action.payload;
      state.todayEarnings = action.payload
        .reduce((sum, o) => sum + (o.total || 0), 0);
    },
    markDelivered(state, action) {
      const order = state.list.find((o) => o.id === action.payload);
      if (order) {
        order.status = "delivered";
        // On Free Tier: only 2 statuses — new and delivered
      }
    },
    addOrder(state, action) {
      state.list.unshift(action.payload);
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

export const { setOrders, markDelivered, addOrder, setLoading, setError } = orderSlice.actions;

export const selectAllOrders = (state) => state.orders.list;
export const selectNewOrders = (state) => state.orders.list.filter((o) => o.status === "new");
export const selectDeliveredOrders = (state) => state.orders.list.filter((o) => o.status === "delivered");
export const selectTodayEarnings = (state) => state.orders.todayEarnings;
export const selectOrdersLoading = (state) => state.orders.loading;

export default orderSlice.reducer;