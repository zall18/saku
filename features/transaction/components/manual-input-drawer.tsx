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
          w-full flex items-center justify-center gap-2.5
          py-3.5 px-4
          bg-saku-surface-hover/50 hover:bg-saku-surface-hover
          border border-dashed border-saku-border
          rounded-[var(--saku-radius-md)]
          text-sm font-medium text-saku-text-secondary
          hover:text-saku-text hover:border-saku-accent/40
          transition-all duration-150
          active:scale-[0.98]
          cursor-pointer select-none
        "
      >
        <span className="text-lg leading-none">+</span>
        Input Manual
      </button>

      {/* Drawer with form */}
      <Drawer open={open} onClose={handleClose} title="Tambah Transaksi">
        <QuickInputForm onSuccess={handleClose} />
      </Drawer>
    </>
  );
}
