"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
      <div className="p-4 flex justify-between items-start">
        <p className="text-zinc-800 text-sm">Hi, what can we help you with today?</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-zinc-400 hover:text-zinc-600"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="px-4 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#374151] flex items-center justify-center text-white text-lg">?</div>
        <button type="button" className="flex-1 py-2.5 px-4 rounded-lg bg-[#374151] text-white text-sm font-semibold uppercase hover:bg-[#1f2937] transition-colors">
          Chat with an expert
        </button>
      </div>
    </div>
  );
}
