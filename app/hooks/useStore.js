"use client";
import { useState, useEffect, useCallback } from "react";

export function useStore(sellerId = null) {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Replace with: const { data } = await supabase.from('sellers').select('*').eq('id', sellerId).single()
    setTimeout(() => {
      setStore({
        id: "S001",
        name: "Ramesh Tiffin Centre",
        subdomain: "rameshtiffincentre",
        color: "#1A4D2E",
        logo: null,
        banner: null,
        isOpen: true,
        city: "Meerut",
        state: "Uttar Pradesh",
        phone: "9876543210",
        tier: "free",
        productsUsed: 8,
        productsMax: 10,
        categoriesUsed: 3,
        categoriesMax: 3,
      });
      setLoading(false);
    }, 200);
  }, [sellerId]);

  const updateStore = useCallback(async (updates) => {
    setSaving(true);
    // Replace with: await supabase.from('sellers').update(updates).eq('id', store.id)
    await new Promise((r) => setTimeout(r, 800));
    setStore((prev) => ({ ...prev, ...updates }));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, []);

  const toggleStoreOpen = useCallback(async () => {
    if (!store) return;
    await updateStore({ isOpen: !store.isOpen });
  }, [store, updateStore]);

  const isAtProductLimit = store ? store.productsUsed >= store.productsMax : false;
  const isAtCategoryLimit = store ? store.categoriesUsed >= store.categoriesMax : false;
  const isPro = store?.tier === "pro";

  return { store, loading, saving, saved, updateStore, toggleStoreOpen, isAtProductLimit, isAtCategoryLimit, isPro };
}