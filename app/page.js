import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#045923] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F4A300] flex items-center justify-center text-[#0F1A13] font-bold text-sm">
            B
          </div>
          <span className="font-semibold text-lg tracking-wide">BizBiteNow</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how" className="hover:text-white transition-colors">Kaise kaam karta hai</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-[#F4A300] text-[#0F1A13] font-semibold px-4 py-2 rounded-lg hover:bg-[#e09600] transition-colors"
          >
            Free shuru karo
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center relative">
        {/* Glow bg */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1A4D2E]/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative">
          <span className="inline-block bg-[#1A4D2E] text-[#F4A300] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            🇮🇳 India ke chhote sellers ke liye
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Apni dukaan{" "}
            <span className="text-[#F4A300]">online</span>
            <br />
            karo — aaj hi
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tiffin, snacks, homemade food — kuch bhi becho. Online store banao,
            orders lo, aur cash-on-delivery ke saath deliver karo. Bilkul free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-[#F4A300] text-[#0F1A13] font-bold px-8 py-4 rounded-xl text-base hover:bg-[#e09600] transition-all hover:scale-105 shadow-lg shadow-[#F4A300]/20"
            >
              Free mein shuru karo →
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto border border-white/20 text-white/70 px-8 py-4 rounded-xl text-base hover:border-white/40 hover:text-white transition-all"
            >
              Pehle se account hai? Login karo
            </Link>
          </div>

          <p className="text-white/30 text-xs mt-5">
            Credit card nahi chahiye · Setup 5 minute mein
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/8 py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {[
            { num: "2,400+", label: "Active sellers" },
            { num: "₹0", label: "Free tier cost" },
            { num: "5 min", label: "Setup time" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-[#F4A300]">{s.num}</div>
              <div className="text-sm text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sab kuch included hai — free mein
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            Complicated setup nahi. Bas apna number dalo, dukaan banao, aur orders lena shuru karo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🏪",
              title: "Apna online store",
              desc: "Ek minute mein apna store banao apne subdomain pe — rameshtiffin.apnadukaan.in",
            },
            {
              icon: "📦",
              title: "Order management",
              desc: "Naye orders turant dikhe, customer ka address, phone number, items — sab ek jagah.",
            },
            {
              icon: "💵",
              title: "Cash on delivery",
              desc: "COD support built-in. Payment gateway ki jhanjhat nahi, seedha ghar pe cash lo.",
            },
            {
              icon: "📍",
              title: "GPS delivery address",
              desc: "Customer apna live location share karta hai — aapko address dhundhne ki zaroorat nahi.",
            },
            {
              icon: "🎨",
              title: "Brand customization",
              desc: "Apna logo, banner, aur brand color lagao. Dukaan bilkul apni lage.",
            },
            {
              icon: "📱",
              title: "Mobile friendly",
              desc: "Aap aur aapke customers — dono ke liye phone pe perfectly kaam karta hai.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-white/3 border-y border-white/8 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kaise kaam karta hai?</h2>
            <p className="text-white/40">Teen simple steps mein shuru karo</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Signup karo",
                desc: "Apna phone number dalo, OTP verify karo. Bas — account ready.",
              },
              {
                step: "02",
                title: "Dukaan banao",
                desc: "Apne products add karo, logo lagao, aur store live karo. 5 minute ka kaam.",
              },
              {
                step: "03",
                title: "Orders lo",
                desc: "Link share karo — WhatsApp pe, Instagram pe, kahin bhi. Orders aane lagenge.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#1A4D2E] border border-[#F4A300]/30 flex items-center justify-center text-[#F4A300] font-bold text-lg mx-auto mb-5">
                  {s.step}
                </div>
                <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple pricing</h2>
          <p className="text-white/40">Shuru karo free mein, badhne pe upgrade karo</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-sm text-white/40 font-medium mb-2">Free Tier</div>
            <div className="text-4xl font-bold mb-1">₹0</div>
            <div className="text-white/30 text-sm mb-8">Hamesha free</div>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                "10 products",
                "3 categories",
                "Unlimited orders",
                "COD support",
                "GPS delivery",
                "Custom store link",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#F4A300]">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-8 block text-center border border-white/20 text-white py-3 rounded-xl text-sm hover:border-white/40 transition-colors"
            >
              Free mein shuru karo
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-[#1A4D2E] border border-[#F4A300]/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#F4A300] text-[#0F1A13] text-xs font-bold px-2 py-0.5 rounded-full">
              COMING SOON
            </div>
            <div className="text-sm text-[#F4A300]/70 font-medium mb-2">Pro</div>
            <div className="text-4xl font-bold mb-1">₹299</div>
            <div className="text-white/30 text-sm mb-8">per month</div>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                "Unlimited products",
                "Unlimited categories",
                "WhatsApp notifications",
                "Custom domain",
                "Analytics dashboard",
                "Priority support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#F4A300]">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              disabled
              className="mt-8 w-full bg-[#F4A300]/20 text-[#F4A300]/50 py-3 rounded-xl text-sm cursor-not-allowed"
            >
              Jald aayega
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="bg-[#1A4D2E]/50 border border-[#F4A300]/20 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Aaj hi shuru karo 🚀
          </h2>
          <p className="text-white/40 mb-8 text-base">
            Hazaron sellers pehle se apni dukaan chala rahe hain. Aapka number?
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#F4A300] text-[#0F1A13] font-bold px-10 py-4 rounded-xl text-base hover:bg-[#e09600] transition-all hover:scale-105 shadow-xl shadow-[#F4A300]/20"
          >
            Free mein dukaan banao →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#F4A300] flex items-center justify-center text-[#0F1A13] font-bold text-xs">
              B
            </div>
            <span>BizBiteNow</span>
          </div>
          <div>© 2025 BizBiteNow. Made with ❤️ for Indian sellers.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}