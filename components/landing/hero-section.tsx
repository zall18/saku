import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden text-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-indigo-100/30 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Pengatur Keuangan Harian Cepat &amp; Minimalis</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
          Catat Pengeluaran Tanpa Ribet.{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent block sm:inline">
            Cegah Boncos Setiap Hari.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Aplikasi keuangan yang dirancang untuk kecepatan: pencatatan <strong>1-tap dalam 3 detik</strong>, perhitungan <strong>budget harian otomatis</strong>, dan sinkronisasi cloud real-time dengan Supabase.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <Link
            href="/login"
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-3
              px-7 py-3.5 rounded-2xl text-base font-bold
              bg-emerald-600 hover:bg-emerald-700 text-white
              shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30
              active:scale-[0.98] transition-all
            "
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#ffffff"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#ffffff"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.36 7.37 24 12 24z"
              />
              <path
                fill="#ffffff"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.99 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#ffffff"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Mulai Gratis dengan Google</span>
          </Link>

          <a
            href="#demo"
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-2
              px-6 py-3.5 rounded-2xl text-base font-bold
              bg-white hover:bg-slate-50 text-slate-700
              border border-slate-200 hover:border-slate-300
              shadow-sm hover:shadow active:scale-[0.98] transition-all
            "
          >
            <span>Lihat Tampilan</span>
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>

        {/* Feature Micro-Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto pt-4 border-t border-slate-200/60">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 py-1">
            <span className="text-base">⚡</span>
            <span>3 Detik per Input</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 py-1">
            <span className="text-base">🎯</span>
            <span>Batas Budget Harian</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 py-1">
            <span className="text-base">☁️</span>
            <span>Cloud Supabase</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 py-1">
            <span className="text-base">🛡️</span>
            <span>100% Bebas Iklan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
