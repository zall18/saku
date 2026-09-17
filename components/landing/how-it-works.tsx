export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: "🎯",
      title: "Tetapkan Budget Bulanan",
      desc: "Tentukan batas maksimal budget bulan ini (misal Rp 1.500.000). Saku otomatis membagi alokasi budget harian Anda.",
    },
    {
      num: "02",
      icon: "👆",
      title: "Tap 1 Tombol Saat Belanja",
      desc: "Setiap kali jajan atau makan siang, cukup tekan tombol shortcut yang relevan. Transaksi tercatat hanya dalam 3 detik.",
    },
    {
      num: "03",
      icon: "📈",
      title: "Pantau & Bebas Boncos",
      desc: "Lihat sisa budget hari ini dan tren grafik 7 hari. Anda selalu tahu apakah pengeluaran masih dalam batas aman.",
    },
  ];

  return (
    <section id="cara-kerja" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Cara Kerja
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Sederhana, Efektif, dan Langsung Terasa
          </h2>
          <p className="text-base text-slate-500 mt-2">
            Mulai kebiasaan finansial yang sehat hanya dalam 3 langkah mudah.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-extrabold text-lg flex items-center justify-center border border-emerald-100">
                    {step.num}
                  </span>
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
