import { LoginButton } from "./login-button";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

export const metadata = {
  title: `Masuk — ${APP_NAME}`,
  description: "Masuk dengan akun Google untuk mengelola pengeluaran harian Anda.",
};

export default function LoginPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-indigo-50/20">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600 text-white text-2xl shadow-lg shadow-emerald-600/20 mb-3.5">
            💸
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {APP_NAME}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {APP_DESCRIPTION}
          </p>
        </div>

        {/* Login Card */}
        <div className="saku-card p-6 md:p-8 bg-white border border-slate-200 shadow-xl rounded-2xl">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-slate-900">
              Selamat Datang Kembali
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Masuk dengan akun Google Anda untuk mengakses data keuangan
            </p>
          </div>

          <LoginButton />

          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <span className="text-emerald-600 font-bold text-sm leading-none">✓</span>
              <span><strong>Pencatatan 1-Tap</strong>: Catat pengeluaran harian dalam 3 detik</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <span className="text-emerald-600 font-bold text-sm leading-none">✓</span>
              <span><strong>Kuota Harian</strong>: Kontrol batas belanja agar tidak boncos</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <span className="text-emerald-600 font-bold text-sm leading-none">✓</span>
              <span><strong>Cloud Database</strong>: Tersimpan aman di Supabase PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Saku &copy; {new Date().getFullYear()} &bull; Cepat, Simpel, Fokus
        </p>
      </div>
    </main>
  );
}
