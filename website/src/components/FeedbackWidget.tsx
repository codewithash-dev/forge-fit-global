"use client";

import { useState } from "react";

const FEEDBACK_OPTIONS = [
  "Sign up for ForgeFit",
  "Learn about ForgeFit and connected equipment",
  "Activate equipment",
  "Browse the website",
  "Get support",
  "Other",
];

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      {/* When closed: trigger tab on left (like iFIT) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed left-0 bottom-0 z-50 w-10 h-24 bg-[#ea580c] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center rounded-r-md hover:bg-[#f97316] transition-colors"
          aria-label="Open feedback"
        >
          <span className="inline-block rotate-90 whitespace-nowrap">Feedback</span>
        </button>
      )}

      {/* When open: LEFT side, flush to left and bottom (no gap); FEEDBACK button on right edge of card */}
      {open && (
        <div className="fixed left-0 bottom-0 z-50 flex flex-row items-stretch max-w-[calc(100vw-2rem)]">
          {/* White card – left; rounded only on left side */}
          <div
            className="w-full max-w-md h-[70vh] min-h-[20rem] max-h-[28rem] bg-white rounded-tl-2xl rounded-bl-2xl shadow-2xl border border-gray-200 border-r-0 flex flex-col overflow-hidden shrink-0"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
          >
            <div className="flex items-center justify-between shrink-0 border-b border-gray-200 relative min-h-[3.5rem]">
              <div className="absolute left-0 top-0 bottom-0 w-32 overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 w-full bg-[#ea580c]"
                  style={{ clipPath: "polygon(0 0, 0 100%, 35% 100%, 100% 0)" }}
                />
              </div>
              <div className="relative flex items-center gap-1.5 pl-5 py-3">
                <span className="text-black font-bold text-lg uppercase tracking-tight">ForgeFit</span>
                <svg className="w-5 h-5 text-[#ea580c]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative p-4 text-black hover:text-[#ea580c] text-xl font-bold leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <h2 id="feedback-title" className="text-black font-semibold text-base mb-4">
                What is the main reason for your visit today?
              </h2>
              <ul className="space-y-3">
                {FEEDBACK_OPTIONS.map((option) => (
                  <li key={option}>
                    <label className="flex items-center justify-between gap-3 cursor-pointer group">
                      <span className="text-black text-sm group-hover:text-gray-700">{option}</span>
                      <input
                        type="radio"
                        name="feedback-reason"
                        value={option}
                        checked={selected === option}
                        onChange={() => setSelected(option)}
                        className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white text-[#ea580c] focus:ring-[#ea580c] focus:ring-offset-0 accent-[#ea580c]"
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* FEEDBACK button – right edge of card; orange */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="w-10 shrink-0 bg-[#ea580c] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center rounded-r-md hover:bg-[#f97316] transition-colors self-stretch"
            aria-label="Close feedback"
          >
            <span className="inline-block rotate-90 whitespace-nowrap">Feedback</span>
          </button>
        </div>
      )}
    </>
  );
}
