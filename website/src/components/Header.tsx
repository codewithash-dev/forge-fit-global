"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SignUpModal from "@/components/SignUpModal";

const navItems = [
  { label: "Our App", href: "/ourapp" },
  { label: "Membership", href: "/membership" },
  { label: "Workouts", href: "#workouts" },
];

const EQUIPMENT_DROPDOWN = [
  {
    title: "NordicTrack",
    subtitle: "Smart fitness for your home",
    href: "https://www.nordictrack.com/",
    external: true,
  },
  {
    title: "ProForm",
    subtitle: "Interactive home training",
    href: "https://www.proform.com/",
    external: true,
  },
  {
    title: "Freemotion",
    subtitle: "Innovative Commercial Fitness",
    href: "https://www.freemotionfitness.com/",
    external: true,
  },
  {
    title: "ForgeFit Membership",
    subtitle: "Connect your equipment",
    href: "/membership",
    external: false,
  },
];

const SCROLL_THRESHOLD = 60;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileEquipmentOpen, setMobileEquipmentOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-8 sm:pt-10 md:pt-12 pointer-events-none" role="banner">
      {/* Pill-shaped bar */}
      <div
        className={`
          pointer-events-auto mx-auto rounded-full flex items-center h-14 sm:h-16 w-full
          transition-all duration-300 ease-out
          ${scrolled ? "max-w-4xl px-4 sm:px-6" : "max-w-6xl px-4 sm:px-8"}
        `}
        style={{
          backgroundColor: "#ea580c",
          boxShadow: "0 4px 14px rgba(234,88,12,0.3)",
        }}
      >
        {/* Left: logo – name and symbol same size like iFIT */}
        <Link
          href="/"
          className="flex items-center shrink-0 text-white font-bold text-lg sm:text-xl md:text-2xl italic min-w-0"
        >
          <span className="whitespace-nowrap truncate">ForgeFitGlobal</span>
          <span className="ml-1 sm:ml-1.5 inline-flex items-center justify-center self-center text-[1.75em] leading-none text-white shrink-0 -translate-y-0.5" aria-hidden>&#9874;&#xFE0E;</span>
        </Link>

        {/* Center: nav links + Equipment dropdown (desktop only) */}
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
              className={`${scrolled ? "text-sm" : "text-base"} font-bold text-white flex items-center gap-1 whitespace-nowrap shrink-0 transition-all duration-300 border-b-2 border-transparent hover:border-white pb-0.5`}
              style={{ marginLeft: i === 0 ? 0 : scrolled ? 24 : 32 }}
            >
              {item.label}
            </Link>
          ))}
          {/* Equipment with dropdown (hover to open) */}
          <div
            ref={dropdownRef}
            className="relative"
            style={{ marginLeft: scrolled ? 24 : 32 }}
            onMouseEnter={() => setEquipmentOpen(true)}
            onMouseLeave={() => setEquipmentOpen(false)}
          >
            <button
              type="button"
              className={`${scrolled ? "text-sm" : "text-base"} font-bold text-white flex items-center gap-1 whitespace-nowrap shrink-0 transition-all duration-300 border-b-2 pb-0.5 ${
                equipmentOpen ? "border-white" : "border-transparent hover:border-white"
              }`}
              aria-expanded={equipmentOpen}
              aria-haspopup="true"
            >
              Equipment
              <span className="text-[10px] opacity-90 transition-transform" aria-hidden>
                {equipmentOpen ? "\u25B2" : "\u25BC"}
              </span>
            </button>
            {equipmentOpen && (
              <div
                className="absolute left-0 top-full pt-2 min-w-[280px]"
                role="menu"
              >
                <div className="rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl overflow-hidden py-1">
                  {EQUIPMENT_DROPDOWN.map((entry, idx) => (
                    <div key={entry.title} role="none">
                      {idx > 0 && <div className="border-t border-zinc-700" />}
                      {entry.external ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          role="menuitem"
                          className="flex items-center justify-between gap-3 px-4 py-3 transition-colors group"
                        >
                          <div className="min-w-0">
                            <p className="font-bold text-white text-sm">{entry.title}</p>
                            <p className="text-zinc-400 text-xs mt-0.5 group-hover:text-white transition-colors">{entry.subtitle}</p>
                          </div>
                          <span className="text-[#ea580c] shrink-0" aria-hidden>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={entry.href}
                          role="menuitem"
                          onClick={() => setEquipmentOpen(false)}
                          className="flex items-center justify-between gap-3 px-4 py-3 transition-colors group"
                        >
                          <div className="min-w-0">
                            <p className="font-bold text-white text-sm">{entry.title}</p>
                            <p className="text-zinc-400 text-xs mt-0.5 group-hover:text-white transition-colors">{entry.subtitle}</p>
                          </div>
                          <span className="text-[#ea580c] shrink-0" aria-hidden>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right: mobile = icon-only (person + hamburger); desktop = Log in + Sign up buttons */}
        <div className="flex items-center shrink-0 gap-2 sm:gap-3 ml-auto">
          {/* Mobile only: person icon + hamburger (iFIT-style minimal bar) */}
          <Link
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white hover:bg-white/15 transition-colors"
            aria-label="Log in"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white hover:bg-white/15 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Desktop only: Log in + Sign up full buttons */}
          <Link
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-white font-bold rounded-full border-2 border-white bg-transparent px-5 py-2.5 text-sm hover:bg-white hover:border-white hover:text-[#ea580c] transition-colors [&_svg]:stroke-[currentColor]"
          >
            Log in
            <span className="flex items-center justify-center" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSignUpModalOpen(true)}
            className="hidden md:flex group items-center gap-2 text-white font-bold rounded-full border-2 border-white bg-transparent px-5 py-2.5 text-sm hover:bg-white hover:border-white hover:text-[#ea580c] transition-colors"
          >
            <span className="order-2 group-hover:order-1 inline-block text-xs font-bold transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;&#xFE0E;</span>
            <span className="order-1 group-hover:order-2">Sign up</span>
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu (iFIT-style): same pill bar at top with logo + profile circle + X circle */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden bg-zinc-900 flex flex-col pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="shrink-0 px-4 pt-4">
            <div
              className="mx-auto rounded-full flex items-center h-14 w-full max-w-6xl px-4"
              style={{
                backgroundColor: "#ea580c",
                boxShadow: "0 4px 14px rgba(234,88,12,0.3)",
              }}
            >
              <Link
                href="/"
                className="flex items-center shrink-0 text-white font-bold text-lg italic min-w-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="whitespace-nowrap truncate">ForgeFitGlobal</span>
                <span className="ml-1.5 inline-flex items-center justify-center self-center text-[1.75em] leading-none text-white shrink-0 -translate-y-0.5" aria-hidden>&#9874;&#xFE0E;</span>
              </Link>
              <div className="flex items-center shrink-0 gap-2 ml-auto">
                <Link
                  href="/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white hover:bg-white/15 transition-colors"
                  aria-label="Log in"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white hover:bg-white/15 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-auto px-5 py-6 flex flex-col gap-0">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-white font-bold text-base border-b border-zinc-800"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-b border-zinc-800">
              <button
                type="button"
                onClick={() => setMobileEquipmentOpen((o) => !o)}
                className="w-full py-4 flex items-center justify-between text-white font-bold text-base"
                aria-expanded={mobileEquipmentOpen}
              >
                Equipment
                <span className="text-zinc-400" aria-hidden>{mobileEquipmentOpen ? "\u25B2" : "\u25BC"}</span>
              </button>
              {mobileEquipmentOpen && (
                <div className="pb-3 pl-2 space-y-1">
                  {EQUIPMENT_DROPDOWN.map((entry) =>
                    entry.external ? (
                      <a
                        key={entry.title}
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-3 pr-4"
                      >
                        <p className="font-bold text-white text-sm">{entry.title}</p>
                        <p className="text-zinc-400 text-xs mt-0.5">{entry.subtitle}</p>
                      </a>
                    ) : (
                      <Link
                        key={entry.title}
                        href={entry.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-3 pr-4"
                      >
                        <p className="font-bold text-white text-sm">{entry.title}</p>
                        <p className="text-zinc-400 text-xs mt-0.5">{entry.subtitle}</p>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="pt-6">
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); setSignUpModalOpen(true); }}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-[#ea580c] text-white font-semibold text-sm"
              >
                Sign up
                <span aria-hidden>&#9874;&#xFE0E;</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      <SignUpModal isOpen={signUpModalOpen} onClose={() => setSignUpModalOpen(false)} />
    </header>
  );
}
