import Link from "next/link";
import { getAuthUser } from "@/lib/supabase/server";
import { formatDateFull } from "@/lib/utils";

export async function Navbar() {
  const user = await getAuthUser();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Date */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform">
              💸
            </div>
            <div>
              <span className="text-lg font-black text-slate-900 tracking-tight block leading-tight">
                Saku
              </span>
              <span className="text-[11px] font-medium text-emerald-600 hidden sm:block leading-none">
                Pengatur Keuangan
              </span>
            </div>
          </Link>

          <div className="hidden md:block h-5 w-px bg-slate-200 ml-2" />
          <span className="hidden md:block text-xs font-medium text-slate-500">
            {formatDateFull(new Date())}
          </span>
        </div>

        {/* Right: User profile, settings, logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user && (
            <div className="flex items-center gap-2.5 pl-2">
              {/* User Avatar */}
              {user.user_metadata?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata?.full_name || "User"}
                  className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                  {(user.email?.[0] || "U").toUpperCase()}
                </div>
              )}

              {/* User Name/Email */}
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[140px]">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </p>
                <p className="text-[10px] text-slate-400 truncate max-w-[140px] leading-tight">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {/* Settings Link */}
          <Link
            href="/settings"
            className="
              p-2 rounded-xl text-slate-600 hover:text-slate-900
              hover:bg-slate-100 border border-transparent hover:border-slate-200
              transition-all
            "
            title="Pengaturan"
            aria-label="Pengaturan"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>

          {/* Logout button */}
          {user && (
            <form action="/auth/signout" method="POST">
              <button
                type="submit"
                className="
                  p-2 rounded-xl text-slate-500 hover:text-rose-600
                  hover:bg-rose-50 border border-transparent hover:border-rose-200
                  transition-all cursor-pointer
                "
                title="Keluar"
                aria-label="Keluar"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
