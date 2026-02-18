/**
 * ForgeFit Global app mockup for hero - matches the actual app Scripture screen.
 * Dark blue-black background, gold/cream text, white phone frame.
 */
export default function HeroPhone() {
  const gold = "#C9A84C";
  const cream = "#F5F0E8";
  const darkBg = "#1C1D2A";
  const cardBg = "#252636";

  return (
    <div className="flex justify-center lg:justify-end">
      <div className="w-[340px] flex-shrink-0">
        {/* White phone frame - prominent bezel */}
        <div className="bg-white rounded-[3rem] p-3 shadow-2xl ring-4 ring-white/90">
          <div className="rounded-[2.5rem] overflow-hidden bg-[#0D0D0D]">
            {/* Screen */}
            <div className="bg-[#1C1D2A] min-h-[720px] flex flex-col">
              {/* Status bar */}
              <div className="h-7 flex items-center justify-between px-6 pt-2 text-[10px] text-[#F5F0E8]/80">
                <span>2:18</span>
                <span>🔔</span>
              </div>

              {/* Header: Scripture + tagline + bell */}
              <div className="px-5 pt-2 pb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: gold }}>Scripture</h2>
                  <p className="text-xs mt-0.5" style={{ color: cream, opacity: 0.8 }}>
                    The Word that anchors your training
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ borderColor: `${gold}40` }}>
                  <span className="text-sm" style={{ color: gold }}>🔔</span>
                </div>
              </div>

              {/* Verse of the Day */}
              <div className="px-5 mb-4">
                <div className="rounded-2xl p-4 flex items-start justify-between" style={{ backgroundColor: cardBg }}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: gold }}>✦</span>
                    <span className="text-sm font-semibold" style={{ color: gold }}>Verse of the Day</span>
                  </div>
                  <span className="text-base" style={{ color: gold }}>📖</span>
                </div>
                <p className="text-sm mt-3 pl-1" style={{ color: cream, opacity: 0.7 }}>Loading verse...</p>
              </div>

              {/* You have momentum */}
              <div className="px-5 mb-4">
                <div className="rounded-2xl p-4" style={{ backgroundColor: cardBg }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-base mb-0.5" style={{ color: gold }}>You have momentum</p>
                      <p className="text-xs" style={{ color: cream, opacity: 0.7 }}>3 workouts this week</p>
                    </div>
                    <div className="rounded-lg px-2.5 py-1.5" style={{ backgroundColor: `${gold}20` }}>
                      <p className="font-bold text-sm" style={{ color: gold }}>+12%</p>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: cardBg }}>
                    <div className="h-full rounded-full" style={{ width: "75%", backgroundColor: gold }} />
                  </div>
                  <p className="text-[10px] mt-1.5" style={{ color: cream, opacity: 0.6 }}>75% of weekly goal completed</p>
                </div>
              </div>

              {/* Search */}
              <div className="px-5 mb-4">
                <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ backgroundColor: cardBg }}>
                  <span className="text-sm" style={{ color: cream, opacity: 0.5 }}>🔍</span>
                  <span className="flex-1 text-sm" style={{ color: cream, opacity: 0.5 }}>Search workouts, trainers</span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${gold}20` }}>
                    <span className="text-xs" style={{ color: gold }}>→</span>
                  </div>
                </div>
              </div>

              {/* Featured workouts */}
              <div className="px-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm" style={{ color: gold }}>Featured workouts</h3>
                  <span className="text-xs" style={{ color: gold, opacity: 0.8 }}>See all</span>
                </div>
                <div className="rounded-xl h-28 flex items-center justify-center" style={{ backgroundColor: "#2d2e3d" }}>
                  <span className="text-xs" style={{ color: cream, opacity: 0.4 }}>[ Featured workout image ]</span>
                </div>
              </div>

              {/* Quick categories */}
              <div className="px-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm" style={{ color: gold }}>Quick categories</h3>
                  <span className="text-xs" style={{ color: gold, opacity: 0.8 }}>Explore</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { label: "Strength", icon: "💪" },
                    { label: "Cardio", icon: "🏃" },
                    { label: "Yoga", icon: "🧘" },
                    { label: "HIIT", icon: "⚡" },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="flex-1 rounded-xl h-16 flex flex-col items-center justify-center"
                      style={{ backgroundColor: cardBg }}
                    >
                      <span className="text-lg mb-0.5">{c.icon}</span>
                      <span className="text-[10px] font-medium" style={{ color: gold }}>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom nav */}
              <div className="mt-auto pt-3 pb-6 px-4 rounded-t-2xl" style={{ backgroundColor: "#0D0D0D" }}>
                <div className="flex items-center justify-around">
                  {[
                    { label: "SCRIPTURE", icon: "📖", active: true },
                    { label: "FORGE", icon: "🔥", active: false },
                    { label: "TESTIMONY", icon: "🍃", active: false },
                    { label: "SHABBAT", icon: "⭐", active: false },
                    { label: "PROFILE", icon: "👤", active: false },
                  ].map((t) => (
                    <div key={t.label} className="flex flex-col items-center gap-0.5">
                      <span className="text-sm" style={{ color: t.active ? gold : `${gold}50` }}>{t.icon}</span>
                      <span className="text-[8px] font-semibold uppercase" style={{ color: t.active ? gold : `${gold}50` }}>
                        {t.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
