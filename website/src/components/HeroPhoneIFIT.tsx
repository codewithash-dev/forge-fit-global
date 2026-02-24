"use client";

import { useRef, useEffect } from "react";

/**
 * Hero phone mockup – matches iFIT design; no blur so video shows through crystal clear.
 * Scroll the feed with mouse wheel over the phone.
 */
function TreadmillIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
function StrengthIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 10.5h2v3h-2zM15.5 10.5h2v3h-2zM8.5 11v1h7v-1M12 8v8" />
      <circle cx="6.5" cy="8" r="1.5" />
      <circle cx="6.5" cy="16" r="1.5" />
      <circle cx="17.5" cy="8" r="1.5" />
      <circle cx="17.5" cy="16" r="1.5" />
    </svg>
  );
}
function BikeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M9 17.5h6M15 14l4-6 2 1-4 6" />
      <path d="M12 8l-2 6.5h4" />
    </svg>
  );
}
function YogaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <path d="M12 8a4 4 0 110 8 4 4 0 010-8z" />
    </svg>
  );
}
function RowerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h4l2 4 4-8 2 4h2" />
      <path d="M6 18v-2M14 18v-2" />
    </svg>
  );
}
function EllipticalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="8" ry="4" />
      <path d="M4 12h16" />
    </svg>
  );
}

const categories = [
  { label: "Treadmill", Icon: TreadmillIcon },
  { label: "Strength", Icon: StrengthIcon },
  { label: "Bike", Icon: BikeIcon },
  { label: "Yoga", Icon: YogaIcon },
  { label: "Rower", Icon: RowerIcon },
  { label: "Elliptical", Icon: EllipticalIcon },
];

export default function HeroPhoneIFIT() {
  const selectedIndex = 1; // Strength selected (orange)
  const scrollRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phone = phoneRef.current;
    const scrollEl = scrollRef.current;
    if (!phone || !scrollEl) return;
    const onWheel = (e: WheelEvent) => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) return;
      const next = scrollTop + e.deltaY;
      el.scrollTop = Math.max(0, Math.min(maxScroll, next));
      e.preventDefault();
      e.stopPropagation();
    };
    phone.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => phone.removeEventListener("wheel", onWheel, true);
  }, []);

  return (
    <div className="flex justify-center lg:justify-end w-full max-w-[320px] mx-auto lg:mx-0">
      <div ref={phoneRef} className="relative w-[260px] sm:w-[300px] lg:w-[320px] flex-shrink-0">
        {/* Phone: frame with integrated side buttons – iPhone 16 style (reference) */}
        <div className="relative rounded-[2.5rem] sm:rounded-[3rem] p-0 border-[2.5px] border-white/50 bg-transparent">
          {/* Left: (3) Action/mute – small horizontal switch; (2) Volume – two stacked ovals */}
          <div className="absolute -left-[3px] top-[18%] flex flex-col gap-2.5 z-10 items-start" aria-hidden>
            <div className="h-[6px] w-3 rounded-sm bg-white/50 flex-shrink-0" title="Action" />
            <div className="flex flex-col gap-1">
              <div className="h-6 sm:h-7 w-[4px] rounded-full bg-white/50 flex-shrink-0" />
              <div className="h-6 sm:h-7 w-[4px] rounded-full bg-white/50 flex-shrink-0" />
            </div>
          </div>
          {/* Right: (1) Side/power – top; (4) Camera control – lower */}
          <div className="absolute -right-[3px] top-[22%] flex flex-col gap-6 z-10 items-end" aria-hidden>
            <div className="h-8 sm:h-10 w-[4px] rounded-full bg-white/50 flex-shrink-0" />
            <div className="h-6 sm:h-8 w-[4px] rounded-full bg-white/50 flex-shrink-0" />
          </div>
          <div className="m-[2.5px] rounded-[calc(2.5rem-2.5px)] sm:rounded-[calc(3rem-2.5px)] overflow-hidden bg-black/20 min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] flex flex-col">
            {/* Top bar – same px as category row so Max aligns with icons */}
            <div className="px-5 pt-5 pb-1.5 flex items-center gap-3 bg-black/20">
              <span className="text-white text-lg">☰</span>
              <span className="text-white font-semibold">Hi, Davis</span>
            </div>
            {/* Category row – tight spacing, no glow */}
            <div className="px-5 pb-2 flex gap-1 overflow-x-auto">
              {categories.map(({ label, Icon }, i) => {
                const selected = i === selectedIndex;
                return (
                  <div
                    key={label}
                    className={`flex-shrink-0 flex flex-col items-center gap-0.5 rounded-lg px-2 py-2 min-w-[48px] bg-transparent`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${selected ? "text-[#ea580c]" : "text-white/90"}`} />
                    <span className={`text-[9px] font-medium ${selected ? "text-[#ea580c]" : "text-white/90"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Scrollable feed – use mouse wheel over phone to scroll */}
            <div
              ref={scrollRef}
              role="region"
              aria-label="App content"
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-5 pb-5 gap-1.5 flex flex-col overscroll-contain scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch", minHeight: 0 }}
            >
              <div className="flex flex-col gap-1.5 min-h-[440px]">
              {/* Episode card */}
              <div className="flex-shrink-0 flex flex-col rounded-2xl overflow-hidden bg-black/30">
                <div className="min-h-[120px] relative overflow-hidden">
                  <img
                    src="/images/hero-phone-workout.png"
                    alt="Trainer Games workout"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <span className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    38:37
                  </span>
                  <div className="absolute bottom-2 left-2 right-2 z-10 text-white">
                    <p className="text-[10px] opacity-90">Trainer Games</p>
                    <p className="text-sm font-bold">Episode 101: Trust Fall</p>
                    <p className="text-[10px] text-[#ea580c] mt-0.5">Next up: Episode 102 →</p>
                  </div>
                </div>
                <div className="h-1 flex-shrink-0 w-full bg-black/40 overflow-hidden">
                  <div
                    className="h-full rounded-r"
                    style={{ width: "65%", background: "linear-gradient(90deg, #ffffff 0%, #ea580c 100%)" }}
                  />
                </div>
              </div>
              {/* Goal card */}
              <div
                className="flex-shrink-0 rounded-2xl p-3 flex flex-col justify-between min-h-[100px]"
                style={{
                  background: "linear-gradient(135deg, rgba(88,28,135,0.85) 0%, rgba(17,94,89,0.85) 100%)",
                }}
              >
                <div>
                  <p className="text-[#ea580c] text-[10px] font-semibold uppercase mb-0.5">GOAL</p>
                  <p className="text-white font-semibold text-sm">Improve health and wellness</p>
                </div>
                <div>
                  <p className="text-white/95 text-[10px]">2/5 WORKOUTS COMPLETED THIS WEEK</p>
                  <p className="text-white/80 text-[10px]">WEEK 1 OF 4</p>
                  <div className="mt-1.5 h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: "40%", background: "linear-gradient(90deg, #c2410c 0%, #ea580c 100%)" }}
                    />
                  </div>
                </div>
              </div>
              {/* Extra card so there is content to scroll */}
              <div className="flex-shrink-0 rounded-2xl overflow-hidden bg-black/30 min-h-[80px] p-3">
                <p className="text-[10px] text-white/80">Up next</p>
                <p className="text-sm font-bold text-white">Episode 102</p>
                <p className="text-[10px] text-white/70 mt-0.5">New episode available</p>
              </div>
              <div className="flex-shrink-0 rounded-2xl overflow-hidden bg-black/30 min-h-[80px] p-3">
                <p className="text-[10px] text-white/80">Recommended</p>
                <p className="text-sm font-bold text-white">Full Body Strength</p>
                <p className="text-[10px] text-white/70 mt-0.5">30 min · Strength</p>
              </div>
              <div className="flex-shrink-0 rounded-2xl overflow-hidden bg-black/30 min-h-[80px] p-3">
                <p className="text-[10px] text-white/80">Yoga Flow</p>
                <p className="text-sm font-bold text-white">Morning Stretch</p>
                <p className="text-[10px] text-white/70 mt-0.5">15 min · Yoga</p>
              </div>
              <div className="flex-shrink-0 rounded-2xl overflow-hidden bg-black/30 min-h-[72px] p-3">
                <p className="text-[10px] text-white/80">Quick burn</p>
                <p className="text-sm font-bold text-white">20 Min HIIT</p>
                <p className="text-[10px] text-white/70 mt-0.5">High intensity</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
