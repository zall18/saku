import Link from "next/link";

export function ProductPreview() {
  return (
    <section id="demo" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Desain Dashboard yang Bersih &amp; Fokus
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Semua informasi penting dalam satu pandangan. Tidak ada menu berbelit-belit.
          </p>
        </div>

        {/* Browser Mockup Wrapper */}
        <div className="relative rounded-2xl md:rounded-3xl border border-slate-300/80 bg-white shadow-2xl shadow-slate-300/40 overflow-hidden">
          {/* Mockup Window Bar */}
          <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                saku.app/dashboard
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Mode Interaktif</span>
            </div>
          </div>

          {/* Mockup Dashboard Content */}
          <div className="p-4 sm:p-6 md:p-8 bg-slate-50/60 space-y-6">
            {/* Top Stat Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="saku-card p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Bulan Ini</span>
                  <span>📅</span>
                </div>
                <div className="mt-2">
                  <span className="text-xl md:text-2xl font-bold text-slate-900 saku-mono block">
                    Rp 435.000
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Budget: Rp 1.500.000
                  </span>
                </div>
              </div>

              <div className="saku-card p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Sisa Budget</span>
                  <span>💰</span>
                </div>
                <div className="mt-2">
                  <span className="text-xl md:text-2xl font-bold text-emerald-600 saku-mono block">
                    Rp 1.065.000
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                    Aman (29%)
                  </span>
                </div>
              </div>

              <div className="saku-card p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Hari Ini</span>
                  <span>⚡</span>
                </div>
                <div className="mt-2">
                  <span className="text-xl md:text-2xl font-bold text-slate-900 saku-mono block">
                    Rp 27.000
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Target: Rp 50.000/hari
                  </span>
                </div>
              </div>

              <div className="saku-card p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Sisa Kuota Hari Ini</span>
                  <span>🎯</span>
                </div>
                <div className="mt-2">
                  <span className="text-xl md:text-2xl font-bold text-emerald-600 saku-mono block">
                    Rp 23.000
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold mt-1 block">
                    Tersisa untuk hari ini
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Grid: Shortcuts + Today's Transactions Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Quick Shortcuts */}
              <div className="lg:col-span-7 space-y-4">
                <div className="saku-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-slate-900">
                      Pintasan Cepat (1-Tap)
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Sekali Klik Selesai
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { icon: "🍚", label: "Makan Siang", amount: "Rp 15.000" },
                      { icon: "☕", label: "Kopi", amount: "Rp 12.000" },
                      { icon: "🚐", label: "Shuttle", amount: "Rp 25.000" },
                      { icon: "👕", label: "Laundry", amount: "Rp 15.000" },
                      { icon: "🍡", label: "Jajan", amount: "Rp 10.000" },
                      { icon: "🎮", label: "Game", amount: "Rp 15.000" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 transition-all shadow-xs"
                      >
                        <span className="text-2xl mb-1">{item.icon}</span>
                        <span className="text-xs font-bold text-slate-800 truncate w-full text-center">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold saku-mono">
                          {item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/70 text-center text-xs font-bold text-emerald-800">
                  + Catat Transaksi Manual (Drawer Bottom-Sheet)
                </div>
              </div>

              {/* Right: Transactions Feed */}
              <div className="lg:col-span-5">
                <div className="saku-card p-5 h-full">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                    <span className="text-sm font-bold text-slate-900">
                      Transaksi Hari Ini
                    </span>
                    <span className="text-xs text-slate-400">2 transaksi</span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-lg flex items-center justify-center">
                        🍚
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">Makan Siang Warteg</p>
                        <p className="text-[10px] text-slate-400">12:30 • 📱 QRIS</p>
                      </div>
                      <span className="text-xs font-bold saku-mono text-rose-600">
                        -Rp 15.000
                      </span>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-lg flex items-center justify-center">
                        ☕
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">Kopi Susu Aren</p>
                        <p className="text-[10px] text-slate-400">10:15 • 📱 QRIS</p>
                      </div>
                      <span className="text-xs font-bold saku-mono text-rose-600">
                        -Rp 12.000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live CTA Under Preview */}
        <div className="text-center mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
          >
            <span>Coba langsung dengan akun Google Anda</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
