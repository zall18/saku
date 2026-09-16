import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-700 p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl shadow-emerald-700/25 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-xs">
              Mulai Sekarang
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Siap Mengendalikan Keuangan Harianmu?
            </h2>

            <p className="text-emerald-100 text-base sm:text-lg mb-8 leading-relaxed">
              Bergabunglah dengan cara mencatat keuangan yang cepat, modern, dan anti-ribet. Cukup masuk dengan akun Google Anda untuk memulai.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/login"
                className="
                  w-full sm:w-auto inline-flex items-center justify-center gap-3
                  px-8 py-4 rounded-2xl text-base font-bold
                  bg-white hover:bg-slate-50 text-slate-900
                  shadow-lg hover:shadow-xl active:scale-[0.98] transition-all
                "
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.36 7.37 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.99 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Masuk dengan Google</span>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100/90 font-medium">
              <span>✓ 100% Gratis Selamanya</span>
              <span>✓ Tanpa Kartu Kredit</span>
              <span>✓ Data Aman di Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
