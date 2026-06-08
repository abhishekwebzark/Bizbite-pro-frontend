// services/productService.js

import { api } from "./api";
import { FREE_TIER } from "@/lib/constants";

export const productService = {
  /** Get all products for a seller */
  getProducts: (sellerId) =>
    api.get(`/products?seller_id=eq.${sellerId}&order=created_at.asc`),

  /** Get single product */
  getProduct: (productId) => api.get(`/products?id=eq.${productId}`),

  /** Get all products for public store (available only) */
  getStoreProducts: (sellerId) =>
    api.get(`/products?seller_id=eq.${sellerId}&order=created_at.asc`),

  /** Create product — checks Free Tier limit */
  createProduct: async (sellerId, productData, currentCount) => {
    if (currentCount >= FREE_TIER.maxProducts) {
      throw new Error(`Free Tier limit: max ${FREE_TIER.maxProducts} products`);
    }
    return api.post("/products", {
      seller_id: sellerId,
      name: productData.name,
      price: Number(productData.price),
      category: productData.category,
      description: productData.description || "",
      image_url: productData.imageUrl || null,
      available: true,
      created_at: new Date().toISOString(),
    });
  },

  /** Update product */
  updateProduct: (productId, updates) =>
    api.patch(`/products?id=eq.${productId}`, {
      ...updates,
      updated_at: new Date().toISOString(),
    }),

  /** Toggle availability */
  toggleAvailability: (productId, available) =>
    api.patch(`/products?id=eq.${productId}`, { available }),

  /** Delete product */
  deleteProduct: (productId) => api.delete(`/products?id=eq.${productId}`),
};