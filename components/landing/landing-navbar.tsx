import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg shadow-sm shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            💸
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-tight">
              {APP_NAME}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 block leading-none">
              Pengatur Keuangan
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <a href="#fitur" className="hover:text-emerald-600 transition-colors">
            Fitur Unggulan
          </a>
          <a href="#cara-kerja" className="hover:text-emerald-600 transition-colors">
            Cara Kerja
          </a>
          <a href="#keunggulan" className="hover:text-emerald-600 transition-colors">
            Keunggulan
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-bold text-slate-700 hover:text-emerald-600 px-3 py-2 transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/login"
            className="
              inline-flex items-center justify-center gap-1.5
              px-4 py-2 rounded-xl text-xs sm:text-sm font-bold
              bg-emerald-600 hover:bg-emerald-700 text-white
              shadow-sm hover:shadow-md hover:shadow-emerald-600/15
              active:scale-[0.98] transition-all
            "
          >
            <span>Mulai Gratis</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
