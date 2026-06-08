"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  loginSuccess,
  logout,
  setLoading,
  setError,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectToken,
} from "@/redux/slices/authSlice";
import { sendOtp, verifyOtp, sellerSignup } from "@/services/authService";

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const token = useSelector(selectToken);

  const handleSendOtp = async (phone) => {
    dispatch(setLoading(true));
    try {
      await sendOtp(phone);
      return true;
    } catch (err) {
      dispatch(setError(err.message));
      return false;
    }
  };

  const handleVerifyOtp = async (phone, otp) => {
    dispatch(setLoading(true));
    try {
      const data = await verifyOtp(phone, otp);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      // Redirect based on role
      if (data.user.role === "seller") {
        router.push("/dashboard");
      } else {
        router.push("/store");
      }
      return true;
    } catch (err) {
      dispatch(setError(err.message));
      return false;
    }
  };

  const handleSignup = async (formData) => {
    dispatch(setLoading(true));
    try {
      await sellerSignup(formData);
      return true; // redirect to OTP verify after this
    } catch (err) {
      dispatch(setError(err.message));
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    sendOtp: handleSendOtp,
    verifyOtp: handleVerifyOtp,
    signup: handleSignup,
    logout: handleLogout,
  };
}