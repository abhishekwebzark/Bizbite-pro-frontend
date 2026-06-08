"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Phone, User, Store, CheckCircle, XCircle } from "lucide-react";

const slides = [
  { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", caption: "Take your store online with BizBiteNow" },
  { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", caption: "Built for small sellers, designed for growth" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", caption: "Simple dashboard, powerful results" },
];

const BRAND_COLORS = ["#2E7D52","#1D4ED8","#7C3AED","#DC2626","#D97706","#0891B2","#DB2777","#059669"];

const InputField = ({ icon: Icon, type = "text", placeholder, value, onChange, isValid, showToggle, onToggle, extra }) => (
  <div className="flex items-center border border-gray-700 rounded-xl px-3 gap-2 bg-white/5 focus-within:border-green-500 transition">
    <Icon size={15} className="text-gray-500 flex-shrink-0" />
    {extra}
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-gray-500" />
    {showToggle && (
      <button type="button" onClick={onToggle} className="text-gray-500 hover:text-gray-300 flex-shrink-0">
        {type === "password" ? <Eye size={15} /> : <EyeOff size={15} />}
      </button>
    )}
    {value && (isValid
      ? <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
      : <XCircle size={15} className="text-red-400 flex-shrink-0" />
    )}
  </div>
);

export default function SignUpPage() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const [role, setRole]   = useState("seller");
  const [showPin, setShowPin]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accepted, setAccepted]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [errors, setErrors]           = useState({});

  // QA-001: All seller register fields
  const [form, setForm] = useState({
    fullName: "", email: "", mobile: "", pin: "", confirmPin: "",
    shopName: "", logoUrl: "", bannerUrl: "", brandColor: "#2E7D52",
  });

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const update = (k, v) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: "" })); };

  const valid = {
    fullName: form.fullName.trim().length >= 2,
    email:    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    mobile:   /^[6-9]\d{9}$/.test(form.mobile),
    pin:      /^\d{4,6}$/.test(form.pin),
    confirmPin: form.confirmPin === form.pin && /^\d{4,6}$/.test(form.confirmPin),
    shopName: form.shopName.trim().length >= 2,
  };

  const handleSignup = async () => {
    const e = {};
    if (!valid.fullName)    e.fullName    = "Full name must be at least 2 characters";
    if (!valid.email)       e.email       = "Enter a valid email address";
    if (!valid.mobile)      e.mobile      = "Enter a valid 10-digit mobile number";
    if (!valid.pin)         e.pin         = "PIN must be 4–6 digits";
    if (!valid.confirmPin)  e.confirmPin  = "PINs do not match";
    if (role === "seller" && !valid.shopName) e.shopName = "Shop name is required";
    if (!accepted)          e.terms       = "Please accept Terms & Conditions";
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem("loginOtp", otp);
    sessionStorage.setItem("otpEmail", form.email);
    sessionStorage.setItem("loginRole", role);
    sessionStorage.setItem("otpType", "signup");
    sessionStorage.setItem("signupData", JSON.stringify(form));
    alert(`Dev OTP: ${otp}`); // remove in production
    setLoading(false);
    router.push("/verify-otp");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a12] px-4 py-8">
      <div className="flex w-full max-w-[960px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">

        {/* LEFT — Slider */}
        <div className="hidden md:block flex-1 relative min-h-[600px]">
          {slides.map((s, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}>
              <img src={s.src} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-black/70" />
            </div>
          ))}
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <span className="text-amber-400 font-black text-sm">BB</span>
              </div>
              <span className="text-white font-bold">BizBiteNow</span>
            </div>
            <p className="text-white text-lg font-semibold">{slides[slide].caption}</p>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="w-full md:w-[440px] px-8 py-7 bg-[#13131f] overflow-y-auto">
          <h2 className="text-white text-xl font-bold mb-1">Create Account</h2>
          <p className="text-gray-400 text-sm mb-4">Get started in just a few steps</p>

          {/* Role */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[{ val: "seller", Icon: Store, label: "Seller" }, { val: "customer", Icon: User, label: "Customer" }].map(({ val, Icon, label }) => (
              <button key={val} onClick={() => setRole(val)}
                className={`py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition ${role === val ? "bg-green-700 text-amber-400" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {/* Full Name — QA-001 */}
            <div>
              <InputField icon={User} placeholder="Full Name" value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)} isValid={valid.fullName} />
              {errors.fullName && <p className="text-xs text-red-400 mt-1 ml-1">{errors.fullName}</p>}
            </div>

            {/* Email — QA-001 */}
            <div>
              <InputField icon={Mail} type="email" placeholder="Email Address" value={form.email}
                onChange={(e) => update("email", e.target.value)} isValid={valid.email} />
              {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email}</p>}
            </div>

            {/* Mobile */}
            <div>
              <InputField icon={Phone} type="tel" placeholder="Mobile Number (10 digits)" value={form.mobile}
                onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                isValid={valid.mobile} extra={<span className="text-gray-500 text-sm flex-shrink-0">+91</span>} />
              {errors.mobile && <p className="text-xs text-red-400 mt-1 ml-1">{errors.mobile}</p>}
            </div>

            {/* PIN + Confirm PIN — QA-001 */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <InputField icon={Lock} type={showPin ? "text" : "password"} placeholder="PIN (4–6 digits)"
                  value={form.pin} onChange={(e) => update("pin", e.target.value.replace(/\D/g, "").slice(0, 6))}
                  isValid={valid.pin} showToggle onToggle={() => setShowPin(!showPin)} />
                {errors.pin && <p className="text-xs text-red-400 mt-1 ml-1">{errors.pin}</p>}
              </div>
              <div>
                <InputField icon={Lock} type={showConfirm ? "text" : "password"} placeholder="Confirm PIN"
                  value={form.confirmPin} onChange={(e) => update("confirmPin", e.target.value.replace(/\D/g, "").slice(0, 6))}
                  isValid={valid.confirmPin} showToggle onToggle={() => setShowConfirm(!showConfirm)} />
                {errors.confirmPin && <p className="text-xs text-red-400 mt-1 ml-1">{errors.confirmPin}</p>}
              </div>
            </div>

            {/* Seller-only fields — QA-001 */}
            {role === "seller" && (
              <>
                {/* Shop Name */}
                <div>
                  <InputField icon={Store} placeholder="Shop Name" value={form.shopName}
                    onChange={(e) => update("shopName", e.target.value)} isValid={valid.shopName} />
                  {errors.shopName && <p className="text-xs text-red-400 mt-1 ml-1">{errors.shopName}</p>}
                  {form.shopName.trim() && (
                    <p className="text-xs text-green-400 mt-1 ml-1">
                      Link: {form.shopName.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "")}.apnadukaan.in
                    </p>
                  )}
                </div>

                {/* Logo URL — QA-001 */}
                <div>
                  <div className="flex items-center border border-gray-700 rounded-xl px-3 gap-2 bg-white/5 focus-within:border-green-500 transition">
                    <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">Logo URL</span>
                    <input type="url" placeholder="https://..." value={form.logoUrl}
                      onChange={(e) => update("logoUrl", e.target.value)}
                      className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-gray-500" />
                  </div>
                </div>

                {/* Banner URL — QA-001 */}
                <div>
                  <div className="flex items-center border border-gray-700 rounded-xl px-3 gap-2 bg-white/5 focus-within:border-green-500 transition">
                    <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">Banner URL</span>
                    <input type="url" placeholder="https://..." value={form.bannerUrl}
                      onChange={(e) => update("bannerUrl", e.target.value)}
                      className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-gray-500" />
                  </div>
                </div>

                {/* Brand Color — QA-001 */}
                <div>
                  <p className="text-xs text-gray-400 mb-2">Brand Color</p>
                  <div className="flex flex-wrap gap-2">
                    {BRAND_COLORS.map((c) => (
                      <button key={c} type="button" onClick={() => update("brandColor", c)}
                        className={`w-7 h-7 rounded-lg transition-all border-2 ${form.brandColor === c ? "border-white scale-110" : "border-transparent"}`}
                        style={{ backgroundColor: c }} />
                    ))}
                    <div className="flex items-center border border-gray-700 rounded-lg px-2 gap-1.5 bg-white/5">
                      <span className="w-4 h-4 rounded" style={{ backgroundColor: form.brandColor }} />
                      <input type="text" value={form.brandColor} maxLength={7}
                        onChange={(e) => update("brandColor", e.target.value)}
                        className="w-16 bg-transparent text-xs text-white outline-none" placeholder="#hex" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)}
              className="w-4 h-4 accent-green-600" />
            <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer">
              I agree to <span className="text-amber-400">Terms & Conditions</span>
            </label>
          </div>
          {errors.terms && <p className="text-xs text-red-400 mt-1">{errors.terms}</p>}

          <button onClick={handleSignup} disabled={loading}
            className="mt-4 w-full py-3 bg-green-700 text-amber-400 rounded-xl font-bold text-sm hover:bg-green-800 transition disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" /> Creating Account...</> : "Create Account"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-400 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}