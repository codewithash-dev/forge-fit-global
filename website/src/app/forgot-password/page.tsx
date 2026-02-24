"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-zinc-100">
      <main className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-[420px] rounded-2xl bg-white p-8 shadow-lg sm:p-10">
          <Link href="/" className="mb-8 flex items-center justify-center gap-2 text-center">
            <span className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] tracking-tight">
              Forge Fit
            </span>
            <span className="text-4xl sm:text-5xl font-bold text-[#ea580c]" aria-hidden>
              &#9874;&#xFE0E;
            </span>
          </Link>

          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-2 text-center">Forgot password?</h1>
          <p className="text-zinc-600 text-sm mb-6">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="forgot-email" className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-[#1a1a1a] placeholder:text-zinc-400 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c]"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#ea580c] px-4 py-3 text-white font-semibold hover:bg-[#f97316] transition-colors"
            >
              Send reset link
            </button>
          </form>

          <p className="mt-6 text-center">
            <Link href="/login" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#ea580c] hover:underline">
              Back to log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
