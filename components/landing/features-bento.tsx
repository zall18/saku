export function FeaturesBento() {
  return (
    <section id="fitur" className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Fitur Utama
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Dibuat untuk Kecepatan, Dirancang agar Tidak Boncos
          </h2>
          <p className="text-base text-slate-500 mt-3">
            Singkirkan aplikasi keuangan yang penuh iklan, form bertingkat, dan analitik yang membingungkan. Saku fokus pada apa yang Anda butuhkan setiap hari.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 1-Tap Quick Shortcut (Spans 2 cols) */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-xs group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Pencatatan 1-Tap dalam 3 Detik
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Pengeluaran harian seperti makan siang, kopi, atau shuttle biasanya berulang dengan nominal yang mirip. Cukup 1 sentuhan di tombol pintas, transaksi langsung tercatat tanpa perlu mengetik apapun.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-200/60">
              {["🍚 Makan Siang (15k)", "☕ Kopi (12k)", "🚐 Shuttle (25k)", "🍡 Jajan (10k)"].map((label, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Smart Daily Quota */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-xs group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
                🎯
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Kuota Belanja Harian
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Budget bulanan dibagi rata otomatis sesuai sisa hari. Anda akan langsung tahu berapa batas aman uang yang boleh dibelanjakan hari ini.
              </p>
            </div>

            <div className="mt-6 p-3 rounded-2xl bg-white border border-emerald-200 text-center">
              <span className="text-xs text-slate-400 block font-medium">Contoh Kuota Hari Ini:</span>
              <span className="text-xl font-bold text-emerald-600 saku-mono">Rp 50.000 / hari</span>
            </div>
          </div>

          {/* Card 3: Visual 7-Day Chart */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-xs group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
                📊
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Grafik Batang 7 Hari
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visualisasi pengeluaran seminggu terakhir dengan garis kuota harian. Batang berwarna hijau saat hemat, dan merah jika melewati batas.
              </p>
            </div>

            <div className="mt-6 flex items-end gap-1.5 h-16 bg-white p-2.5 rounded-2xl border border-slate-200">
              {[35, 60, 45, 95, 40, 80, 50].map((val, idx) => (
                <div key={idx} className="flex-1 flex items-end justify-center h-full">
                  <div
                    className={`w-full rounded-t-sm ${
                      val > 75 ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Modern Payment Sources (Spans 2 cols) */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-xs group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
                💳
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Dukungan Pembayaran Kekinian Indonesia
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Catat apakah Anda bayar menggunakan <strong>QRIS</strong>, m-banking <strong>BRImo</strong>, dompet digital <strong>DANA / GoPay</strong>, atau <strong>Tunai</strong> untuk melacak dari mana uang Anda keluar.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5 pt-4 border-t border-slate-200/60">
              {[
                { icon: "📱", label: "QRIS" },
                { icon: "🏦", label: "BRImo" },
                { icon: "💙", label: "DANA" },
                { icon: "💚", label: "GoPay" },
                { icon: "💳", label: "E-Wallet" },
                { icon: "💵", label: "Tunai" },
              ].map((src, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  <span>{src.icon}</span>
                  <span>{src.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
