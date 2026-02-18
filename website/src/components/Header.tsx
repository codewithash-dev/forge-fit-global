import Link from "next/link";

const navItems = [
  { label: "Our App", href: "#app" },
  { label: "Membership", href: "#membership" },
  { label: "Workouts", href: "#workouts" },
  { label: "Equipment", href: "#", hasDropdown: true },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      {/* Pill-shaped bar: dark grey, rounded ends, subtle shadow */}
      <div
        className="max-w-6xl mx-auto rounded-full flex items-center justify-between h-16 px-8 shadow-lg"
        style={{
          backgroundColor: "#1f2937",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        }}
      >
        {/* Logo: ForgeFitGlobal only (no emblem after) */}
        <Link href="/" className="flex items-center gap-3 text-white font-bold text-lg italic">
          <span>ForgeFitGlobal</span>
        </Link>

        {/* Center nav links - generous spacing */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white hover:text-white/95 transition-colors flex items-center gap-1"
            >
              {item.label}
              {item.hasDropdown && (
                <span className="text-[10px] opacity-90">&#9660;</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Log in (outline) + Sign up (solid orange) */}
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium text-white rounded-full border border-white/90 px-5 py-2.5 hover:bg-white/5 transition-colors"
          >
            Log in
            <span className="w-5 h-5 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-semibold text-white rounded-full px-5 py-2.5 transition-colors border border-[#ea580c]"
            style={{
              backgroundColor: "#ea580c",
            }}
          >
            Sign up
            <span className="text-white text-xs font-bold">&gt;&gt;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
