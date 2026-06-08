"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  addProduct as addProductAction,
  updateProduct as updateProductAction,
  deleteProduct as deleteProductAction,
  setLoading,
  setError,
  selectAllProducts,
  selectProductsLoading,
  selectProductCategories,
} from "@/redux/slices/productsSlice";
import { selectToken } from "@/redux/slices/authSlice";
import {
  getSellerProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";

export function useProducts() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const categories = useSelector(selectProductCategories);

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const data = await getSellerProducts(token);
      dispatch(setProducts(data.products));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const createProduct = async (productData) => {
    try {
      const data = await addProduct(productData, token);
      dispatch(addProductAction(data.product));
      return true;
    } catch (err) {
      dispatch(setError(err.message));
      return false;
    }
  };

  const editProduct = async (id, productData) => {
    try {
      const data = await updateProduct(id, productData, token);
      dispatch(updateProductAction(data.product));
      return true;
    } catch (err) {
      dispatch(setError(err.message));
      return false;
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id, token);
      dispatch(deleteProductAction(id));
      return true;
    } catch (err) {
      dispatch(setError(err.message));
      return false;
    }
  };

  return {
    products,
    categories,
    loading,
    fetchProducts,
    createProduct,
    editProduct,
    removeProduct,
  };
}