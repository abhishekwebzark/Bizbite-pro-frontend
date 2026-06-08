const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Step 1: Send OTP to phone number
export async function sendOtp(phone) {
  const res = await fetch(`${BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  if (!res.ok) throw new Error("OTP bhejne mein error aaya");
  return res.json(); // { success: true, message: "OTP sent" }
}

// Step 2: Verify OTP → returns token + user
export async function verifyOtp(phone, otp) {
  const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });
  if (!res.ok) throw new Error("OTP galat hai ya expire ho gaya");
  return res.json(); // { token, user: { id, name, phone, role } }
}

// Seller signup
export async function sellerSignup(data) {
  const res = await fetch(`${BASE_URL}/auth/seller/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // { name, phone, dukaanName }
  });
  if (!res.ok) throw new Error("Signup mein error aaya");
  return res.json();
}

// Get current user (for token refresh)
export async function getMe(token) {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Session expire ho gaya, dobara login karo");
  return res.json();
}