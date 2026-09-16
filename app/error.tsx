"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex-1 w-full max-w-lg mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-2xl mb-4 text-rose-400">
        ⚠️
      </div>
      <h2 className="text-lg font-bold text-saku-text mb-2">Terjadi Kesalahan</h2>
      <p className="text-sm text-saku-text-muted max-w-sm mb-6 leading-relaxed">
        {error.message || "Aplikasi mengalami kendala teknis sementara."}
      </p>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => (window.location.href = "/")}>
          Ke Beranda
        </Button>
        <Button variant="primary" onClick={() => reset()}>
          Coba Lagi
        </Button>
      </div>
    </main>
  );
}
