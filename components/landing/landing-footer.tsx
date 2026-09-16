import Link from "next/link";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-base shadow-xs">
            💸
          </div>
          <div>
            <span className="font-extrabold text-slate-900 tracking-tight text-base">
              {APP_NAME}
            </span>
            <p className="text-xs text-slate-500">{APP_DESCRIPTION}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-slate-500">
          <a href="#fitur" className="hover:text-emerald-600 transition-colors">
            Fitur
          </a>
          <a href="#cara-kerja" className="hover:text-emerald-600 transition-colors">
            Cara Kerja
          </a>
          <Link href="/login" className="hover:text-emerald-600 transition-colors">
            Masuk
          </Link>
        </div>

        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
