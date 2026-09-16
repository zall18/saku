"use client";

import { useState, useCallback } from "react";
import { Drawer } from "@/components/ui/drawer";
import { QuickInputForm } from "./quick-input-form";

export function ManualInputDrawer() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpen = useCallback(() => setOpen(true), []);

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleOpen}
        className="
          w-full flex items-center justify-center gap-2
          py-3 px-4
          bg-emerald-50 hover:bg-emerald-100/70
          border border-dashed border-emerald-300 hover:border-emerald-400
          rounded-[var(--saku-radius-md)]
          text-sm font-bold text-emerald-800
          transition-all duration-150
          active:scale-[0.98]
          cursor-pointer select-none shadow-xs
        "
      >
        <span className="text-base font-bold leading-none">+</span>
        Catat Transaksi Manual
      </button>

      {/* Drawer with form */}
      <Drawer open={open} onClose={handleClose} title="Catat Transaksi Baru">
        <QuickInputForm onSuccess={handleClose} />
      </Drawer>
    </>
  );
}
