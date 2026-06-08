"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ✅ React Icons
import { MdAccessTime, MdEmail, MdLock } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default function VerifyOTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputs = useRef([]);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setEmail(sessionStorage.getItem("otpEmail") || "your email");
      setRole(sessionStorage.getItem("loginRole") || "customer");
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      const t = setTimeout(() => setCanResend(true), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((ch, i) => (newOtp[i] = ch));
    setOtp(newOtp);
  };

  const filledOtp = otp.join("");
  const isComplete = filledOtp.length === 6;

  // ✅ HARD CODED OTP
  const HARDCODED_OTP = "123456";

  const handleVerify = () => {
    if (!isComplete) return;

    setStatus("loading");
    setErrorMsg("");

    setTimeout(() => {
      if (filledOtp === HARDCODED_OTP) {
        setStatus("success");

        const role = sessionStorage.getItem("loginRole");
        localStorage.setItem("userRole", role);
        localStorage.setItem("token", "fake-jwt-token");

        setTimeout(() => {
          if (role === "seller") {
            router.push("/dashboard");
          } else {
            router.push("/store/rameshtiffin");
          }
        }, 1500);
      } else {
        setStatus("error");
        setErrorMsg("Invalid OTP. Try again.");
        setOtp(["", "", "", "", "", ""]);
        inputs.current[0]?.focus();
      }
    }, 1200);
  };

  const handleResend = () => {
    if (!canResend) return;

    // ❌ alert hata diya
    console.log("Resent OTP: 123456");

    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setStatus("idle");
    setErrorMsg("");
    inputs.current[0]?.focus();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a12]">
      <div className="flex w-full max-w-[960px] min-h-[520px] rounded-[20px] overflow-hidden border border-white/5">

        {/* LEFT */}
        <div className="hidden md:block flex-1 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute bottom-0 p-8 text-white">
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MdAccessTime /> Expires in 10 minutes
              </div>
              <div className="flex items-center gap-2">
                <FiRefreshCw /> Resend after 60 seconds
              </div>
              <div className="flex items-center gap-2">
                <MdEmail /> Check spam folder
              </div>
              <div className="flex items-center gap-2">
                <MdLock /> Keep OTP secure
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[#F4A300]">
              {role === "seller" ? <BsShop /> : <HiOutlineShoppingBag />}
              <span className="text-sm">
                {role === "seller"
                  ? "Redirecting to Dashboard"
                  : "Redirecting to Store"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[400px] px-10 py-9 flex flex-col justify-center bg-[#13131f]">

          {status === "success" ? (
            <div className="text-center">
              <h2 className="text-white text-xl mb-2">Verified</h2>
              <p className="text-gray-400 text-sm">Redirecting...</p>
            </div>
          ) : (
            <>
              <h2 className="text-white text-xl mb-1">Verify OTP</h2>
              <p className="text-gray-400 text-sm mb-4">{email}</p>

              <div className="flex gap-2 mb-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputs.current[i] = el)}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className="w-10 h-10 text-center bg-black text-white border"
                  />
                ))}
              </div>

              {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

              <div className="text-sm text-gray-400 mt-2">
                {canResend ? (
                  <button onClick={handleResend}>Resend OTP</button>
                ) : (
                  <span>Resend in {timer}s</span>
                )}
              </div>

              <button
                onClick={handleVerify}
                className="mt-4 bg-green-700 text-white py-2"
              >
                Verify OTP
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}