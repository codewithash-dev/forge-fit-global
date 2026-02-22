"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Our App", href: "/ourapp" },
  { label: "Membership", href: "#membership" },
  { label: "Workouts", href: "#workouts" },
  { label: "Equipment", href: "#", hasDropdown: true },
];

const SCROLL_THRESHOLD = 60;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll(); // run once in case page loads scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none" role="banner">
      {/* Pill-shaped bar: iFIT-style alignment – logo left, nav centered, buttons right */}
      <div
        className={`
          pointer-events-auto mx-auto rounded-full flex items-center h-16 w-full
          transition-all duration-300 ease-out
          ${scrolled ? "max-w-4xl px-6" : "max-w-6xl px-8"}
        `}
        style={{
          backgroundColor: "#000",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        }}
      >
        {/* Left: logo with generous padding (bar px handles left edge) */}
        <Link
          href="/"
          className="flex items-center shrink-0 text-white font-bold text-lg italic"
        >
          ForgeFitGlobal
        </Link>

        {/* Center: nav links – spacing via inline margin so it never smushes */}
        <nav
          className="hidden md:flex items-center justify-center flex-1 shrink min-w-[280px]"
          style={{
            marginLeft: scrolled ? 20 : 40,
            marginRight: scrolled ? 20 : 40,
          }}
        >
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white flex items-center gap-1 whitespace-nowrap shrink-0 transition-[margin] duration-300 border-b-2 border-transparent hover:border-[#ea580c] pb-0.5"
              style={{ marginLeft: i === 0 ? 0 : scrolled ? 24 : 32 }}
            >
              {item.label}
              {item.hasDropdown && (
                <span className="text-[10px] opacity-90" aria-hidden>&#9660;</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right: notable gap before buttons, then smaller gap between Log in and Sign up */}
        <div className="flex items-center shrink-0 gap-3">
          <Link
            href="#"
            className="flex items-center gap-2 text-white font-medium rounded-full border border-white/90 px-5 py-2.5 text-sm hover:bg-[#ea580c] hover:border-[#ea580c] transition-colors"
          >
            Log in
            <span className="flex items-center justify-center text-white" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
          </Link>
          <Link
            href="#"
            className="group flex items-center gap-2 text-white font-semibold rounded-full border border-transparent px-5 py-2.5 text-sm bg-[#ea580c] hover:bg-[#f97316] transition-colors"
          >
            <span className="order-2 group-hover:order-1 inline-block text-white text-xs font-bold transition-all duration-200 group-hover:scale-125" aria-hidden>&gt;&gt;</span>
            <span className="order-1 group-hover:order-2">Sign up</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
