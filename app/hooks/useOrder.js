"use client";
import { useState, useEffect, useCallback } from "react";

// Mock data — replace with: await supabase.from('orders').select('*').eq('seller_id', sellerId).order('created_at', { ascending: false })
const MOCK_ORDERS = [
  { id: "ORD-041", customer: "Suresh Kumar", phone: "9876543210", address: "12, Shastri Nagar, Meerut", itemsSummary: "2x Dal Tadka Tiffin", amount: "₹160", total: 160, status: "new", time: "10 min ago", payment: "COD" },
  { id: "ORD-040", customer: "Priya Sharma", phone: "9812345678", address: "45, Civil Lines, Meerut", itemsSummary: "1x Rajma Chawal", amount: "₹80", total: 80, status: "new", time: "28 min ago", payment: "COD" },
  { id: "ORD-039", customer: "Amit Verma", phone: "9823456789", address: "7, Gandhi Road, Meerut", itemsSummary: "3x Paneer Tiffin", amount: "₹270", total: 270, status: "delivered", time: "1 hr ago", payment: "COD" },
  { id: "ORD-038", customer: "Neha Singh", phone: "9834567890", address: "23, Model Town, Meerut", itemsSummary: "1x Dal Tiffin", amount: "₹80", total: 80, status: "delivered", time: "2 hr ago", payment: "COD" },
  { id: "ORD-037", customer: "Rohit Gupta", phone: "9845678901", address: "9, Subhash Nagar, Meerut", itemsSummary: "2x Mix Veg", amount: "₹170", total: 170, status: "delivered", time: "3 hr ago", payment: "COD" },
];

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(MOCK_ORDERS);
      setLoading(false);
    }, 300);
  }, []);

  const markDelivered = useCallback((orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "delivered" } : o))
    );
    // Replace with: await supabase.from('orders').update({ status: 'delivered' }).eq('id', orderId)
  }, []);

  const newOrders = orders.filter((o) => o.status === "new");
  const deliveredOrders = orders.filter((o) => o.status === "delivered");
  const todayEarnings = orders.reduce((sum, o) => sum + o.total, 0);

  return { orders, newOrders, deliveredOrders, todayEarnings, loading, error, markDelivered };
}