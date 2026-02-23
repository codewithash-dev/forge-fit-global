"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const MEMBERSHIPS = [
  {
    id: "train",
    title: "Forge Fit / Train",
    tagline: "Get Forge Fit Train.",
    description:
      "Our standard fitness membership with workouts you can do on any equipment.",
    cta: "Create My Account",
  },
  {
    id: "pro",
    title: "Forge Fit / Pro",
    tagline: "Get Forge Fit Pro.",
    description:
      "Our premiere fitness membership for workouts on connected equipment; multiple user accounts included.",
    cta: "Create My Account",
  },
];

type Props = { isOpen: boolean; onClose: () => void };

export default function SignUpModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
      style={{ pointerEvents: "auto" }}
    >
      {/* Backdrop – lower z so panel is on top */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close modal"
      />

      {/* Modal panel – above backdrop so buttons are clickable */}
      <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-zinc-700">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 sm:p-10">
          <h2 id="signup-modal-title" className="text-center text-2xl sm:text-3xl font-bold text-white mb-2">
            Your Forge Fit Journey
          </h2>
          <p className="text-center text-lg sm:text-xl font-semibold text-[#ea580c] mb-8">
            Starts Now
          </p>

          {/* Membership cards */}
          <div className="grid gap-6 sm:grid-cols-2 mb-8">
            {MEMBERSHIPS.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-6 flex flex-col"
              >
                <h3 className="text-lg font-bold text-white">{m.title}</h3>
                <p className="text-sm text-[#ea580c] font-medium mt-1">{m.tagline}</p>
                <p className="text-zinc-300 text-sm mt-3 flex-1">{m.description}</p>
                <Link
                  href="/login"
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ea580c] px-4 py-3 font-semibold text-white hover:bg-[#f97316] transition-colors"
                >
                  <span className="order-1 group-hover:order-2 transition-all duration-200">{m.cta}</span>
                  <span className="order-2 group-hover:order-1" aria-hidden>&#9874;</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Footer links – Redeem → /login, Compare → /#membership */}
          <div className="flex flex-col items-center gap-2 text-sm text-zinc-400">
            <p>
              Have a code?{" "}
              <Link href="/login" className="text-[#ea580c] font-medium hover:underline">
                Redeem here
              </Link>
            </p>
            <p>
              Want more information?{" "}
              <Link href="/#membership" onClick={onClose} className="text-[#ea580c] font-medium hover:underline">
                Compare memberships
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : null;
}
