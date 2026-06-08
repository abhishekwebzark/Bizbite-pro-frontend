// services/orderService.js

import { api } from "./api";

export const orderService = {
  /** Get all orders for a seller (today only on Free Tier) */
  getSellerOrders: (sellerId, todayOnly = true) => {
    const today = new Date().toISOString().split("T")[0];
    const filter = todayOnly
      ? `/orders?seller_id=eq.${sellerId}&created_at=gte.${today}&order=created_at.desc`
      : `/orders?seller_id=eq.${sellerId}&order=created_at.desc`;
    return api.get(filter);
  },

  /** Get single order by ID */
  getOrder: (orderId) => api.get(`/orders?id=eq.${orderId}`),

  /** Create new order (from customer storefront) */
  createOrder: (orderData) =>
    api.post("/orders", {
      seller_id: orderData.sellerId,
      customer_name: orderData.name,
      customer_phone: orderData.phone,
      delivery_address: orderData.address,
      items: orderData.items,           // JSON array
      total: orderData.total,
      payment_method: "COD",            // Free Tier: COD only
      status: "new",
      created_at: new Date().toISOString(),
    }),

  /** Mark order as delivered */
  markDelivered: (orderId) =>
    api.patch(`/orders?id=eq.${orderId}`, {
      status: "delivered",
      delivered_at: new Date().toISOString(),
    }),

  /** Get today's earnings summary */
  getTodayStats: async (sellerId) => {
    const today = new Date().toISOString().split("T")[0];
    const orders = await api.get(
      `/orders?seller_id=eq.${sellerId}&created_at=gte.${today}&status=eq.delivered`
    );
    const total = orders.reduce((sum, o) => sum + o.total, 0);
    return { total, count: orders.length, orders };
  },
};