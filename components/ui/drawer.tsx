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
        backdrop:bg-black/60 backdrop:backdrop-blur-sm
        open:flex open:items-end open:justify-center
      `}
    >
      <div
        ref={contentRef}
        className={`
          w-full max-w-lg
          bg-saku-surface rounded-t-[var(--saku-radius-xl)]
          border-t border-x border-saku-border
          shadow-[var(--saku-shadow-lg)]
          max-h-[85dvh] overflow-y-auto
          ${open ? "saku-animate-slide-up" : ""}
        `}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-saku-border" />
        </div>

        {/* Header */}
        {title ? (
          <div className="px-6 pb-3 pt-1">
            <h2 className="text-lg font-semibold text-saku-text">{title}</h2>
          </div>
        ) : null}

        {/* Content */}
        <div className="px-6 pb-8">{children}</div>
      </div>
    </dialog>
  );
}
