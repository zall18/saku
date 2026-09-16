"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      // Only close if clicking the backdrop (dialog itself), not the content
      if (e.target === dialogRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDialogElement>) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className={`
        fixed inset-0 z-50
        w-full max-w-full h-full max-h-full
        m-0 p-0
        bg-transparent
        backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm
        open:flex open:items-end md:open:items-center open:justify-center
      `}
    >
      <div
        ref={contentRef}
        className={`
          w-full max-w-lg
          bg-white rounded-t-[var(--saku-radius-xl)] md:rounded-[var(--saku-radius-xl)]
          border border-slate-200
          shadow-2xl
          max-h-[85dvh] overflow-y-auto
          ${open ? "saku-animate-slide-up" : ""}
        `}
      >
        {/* Drag handle for mobile */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1.5 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        {title ? (
          <div className="px-6 pb-3 pt-3 flex items-center justify-between border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              aria-label="Tutup"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ) : null}

        {/* Content */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </dialog>
  );
}
