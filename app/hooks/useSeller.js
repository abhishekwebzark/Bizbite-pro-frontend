"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setSettings,
  toggleStoreLive as toggleAction,
  setLoading,
  setError,
  selectSellerSettings,
  selectIsStoreLive,
  selectSellerLoading,
} from "@/redux/slices/sellerSlice";
import { selectToken } from "@/redux/slices/authSlice";
import {
  getSellerSettings,
  updateSellerSettings,
  uploadStoreImage,
  toggleStoreLive,
} from "@/services/sellerService";

export function useSeller() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const settings = useSelector(selectSellerSettings);
  const isLive = useSelector(selectIsStoreLive);
  const loading = useSelector(selectSellerLoading);

  const fetchSettings = async () => {
    dispatch(setLoading(true));
    try {
      const data = await getSellerSettings(token);
      dispatch(setSettings(data.settings));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const saveSettings = async (data) => {
    try {
      const res = await updateSellerSettings(data, token);
      dispatch(setSettings(res.settings));
      return true;
    } catch (err) {
      dispatch(setError(err.message));
      return false;
    }
  };

  const uploadImage = async (file, type) => {
    try {
      const data = await uploadStoreImage(file, type, token);
      dispatch(setSettings({ [type]: data.url }));
      return data.url;
    } catch (err) {
      dispatch(setError(err.message));
      return null;
    }
  };

  const toggleLive = async () => {
    dispatch(toggleAction()); // optimistic
    try {
      await toggleStoreLive(!isLive, token);
    } catch (err) {
      dispatch(toggleAction()); // revert on error
      dispatch(setError(err.message));
    }
  };

  return {
    settings,
    isLive,
    loading,
    fetchSettings,
    saveSettings,
    uploadImage,
    toggleLive,
  };
}