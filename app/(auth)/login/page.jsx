"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Phone, CheckCircle, XCircle, Store, User } from "lucide-react";

// ✅ FIX: Component OUTSIDE
const FieldWrapper = ({ children, hasValue, isValid }) => (
  <div className="flex items-center border border-gray-700 rounded-xl px-3 gap-2 bg-white/5 focus-within:border-green-500 transition">
    {children}
    {hasValue && (
      isValid
        ? <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
        : <XCircle size={15} className="text-red-400 flex-shrink-0" />
    )}
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]   = useState({ email: "", pin: "", mobile: "" });
  const [role, setRole]   = useState("seller");
  const [method, setMethod] = useState("email");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});

  const update = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const isValidEmail  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isValidPin    = /^\d{4,6}$/.test(form.pin);
  const isValidMobile = /^[6-9]\d{9}$/.test(form.mobile);

  const validate = () => {
    const e = {};
    if (method === "email" && !isValidEmail) e.email = "Enter a valid email address";
    if (method === "mobile" && !isValidMobile) e.mobile = "Enter a valid 10-digit mobile number";
    if (!isValidPin) e.pin = "PIN must be 4–6 digits";
    return e;
  };

  const handleLogin = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem("loginOtp", otp);
    sessionStorage.setItem("otpEmail", form.email || form.mobile);
    sessionStorage.setItem("loginRole", role);
    sessionStorage.setItem("otpType", "login");

    alert(`Dev OTP: ${otp}`);

    setLoading(false);
    router.push("/verify-otp");
  };

  const inputBase = "w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-gray-500";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a12] px-4">
      <div className="flex w-full max-w-[900px] min-h-[500px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">

        {/* LEFT */}
        <div className="hidden md:flex flex-1 flex-col justify-between bg-gradient-to-br from-green-900 to-green-950 p-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-amber-400 font-black text-sm">BB</span>
            </div>
            <span className="text-white font-bold">BizBiteNow</span>
          </div>

          <div>
            <p className="text-white text-xl font-bold mb-2">Welcome Back</p>
            <p className="text-green-300 text-sm mb-5">Manage your store and orders</p>

            <div className="space-y-2 text-sm text-green-300">
              <div className="flex items-center gap-2"><Store size={14} /> Seller — full dashboard access</div>
              <div className="flex items-center gap-2"><User size={14} /> Customer — store and orders</div>
              <div className="flex items-center gap-2"><Lock size={14} /> Secure PIN-based login</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[380px] px-8 py-8 bg-[#13131f] flex flex-col justify-center">
          <h2 className="text-white text-xl font-bold mb-1">Login</h2>
          <p className="text-gray-400 text-sm mb-5">Enter your credentials</p>

          {/* Role */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {[{ val: "seller", Icon: Store }, { val: "customer", Icon: User }].map(({ val, Icon }) => (
              <button key={val} onClick={() => setRole(val)}
                className={`py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold ${role === val ? "bg-green-700 text-amber-400" : "bg-white/5 text-gray-400"}`}>
                <Icon size={14} /> {val}
              </button>
            ))}
          </div>

          {/* Method */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-4">
            <button onClick={() => setMethod("email")} className={`flex-1 py-1.5 ${method === "email" ? "bg-green-700 text-white" : "text-gray-400"}`}>Email</button>
            <button onClick={() => setMethod("mobile")} className={`flex-1 py-1.5 ${method === "mobile" ? "bg-green-700 text-white" : "text-gray-400"}`}>Mobile</button>
          </div>

          <div className="space-y-3">

            {method === "email" ? (
              <FieldWrapper hasValue={!!form.email} isValid={isValidEmail}>
                <Mail size={15} />
                <input type="email" value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputBase} />
              </FieldWrapper>
            ) : (
              <FieldWrapper hasValue={!!form.mobile} isValid={isValidMobile}>
                <Phone size={15} />
                <input type="tel" value={form.mobile}
                  onChange={(e) => update("mobile", e.target.value)}
                  className={inputBase} />
              </FieldWrapper>
            )}

            <FieldWrapper hasValue={!!form.pin} isValid={isValidPin}>
              <Lock size={15} />
              <input type={showPin ? "text" : "password"} value={form.pin}
                onChange={(e) => update("pin", e.target.value)}
                className={inputBase} />
              <button type="button" onClick={() => setShowPin(!showPin)}>
                {showPin ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </FieldWrapper>

          </div>

          <button onClick={handleLogin} className="mt-5 w-full py-3 bg-green-700 text-amber-400 rounded-xl">
            Login
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-amber-400">Sign Up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}