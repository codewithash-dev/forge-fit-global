import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoopingVideo from "@/components/LoopingVideo";
import StoriesCarousel from "@/components/StoriesCarousel";

const HERO_VIDEO_SRC = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/FFG-video.mp4";

const TRAIN_FEATURES = [
  "Number of users: 1",
  "Access to 10,000+ workouts library",
  "ForgeFit for Equipment App",
  "Heart rate-based training (ActivePulse™)",
  "Workouts tailored to your fitness level with SmartAdjust™",
  "ForgeFit AI Coach to set, track, and achieve goals",
  "Follow Trainer: machine follows incline, speed, and resistance",
  "Syncs with Strava, Garmin, and Apple Health",
];

const PRO_FEATURES = [
  "Number of users: 5",
  "Access to 10,000+ workouts library",
  "ForgeFit for Equipment App",
  "Heart rate-based training (ActivePulse™)",
  "Workouts tailored to your fitness level with SmartAdjust™",
  "ForgeFit AI Coach to set, track, and achieve goals",
  "Follow Trainer: machine follows incline, speed, and resistance",
  "Syncs with Strava, Garmin, and Apple Health",
  "Streaming apps on your embedded screen",
  "Workout Creator",
  "Works with equipment with an embedded screen",
];

const COMPARE_ROWS = [
  { label: "Number of Users", train: "1", pro: "5" },
  { label: "10,000+ workouts", train: "✓", pro: "✓" },
  { label: "Available on phones & tablets", train: "✓", pro: "✓" },
  { label: "SmartAdjust™", train: "✓", pro: "✓" },
  { label: "Heart rate-based training", train: "✓", pro: "✓" },
  { label: "Follow Trainer", train: "✓", pro: "✓" },
  { label: "ForgeFit AI Coach", train: "✓", pro: "✓" },
  { label: "Fitness App Integrations", train: "✓", pro: "✓" },
  { label: "Workout Creator", train: "—", pro: "✓" },
  { label: "Available on Equipment touchscreens", train: "—", pro: "✓" },
  { label: "Entertainment Streaming on Equipment", train: "—", pro: "✓" },
];

const STATS = [
  { value: "10,000+", label: "workouts" },
  { value: "180+", label: "trainers to motivate you" },
  { value: "7", label: "continents", sub: "Stunning locations" },
  { value: "Weekly", label: "new content", sub: "Drop in to on-demand workouts" },
  { value: "Progressive", label: "programs", sub: "To reach your biggest goals" },
];

const STORIES = [
  { name: "Kelly P.", location: "Utah, USA", memberSince: "2020", quote: "I love all the traveling and the trainers I get to experience this journey with.", thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80", youtubeUrl: "https://www.youtube.com/@ForgeFitGlobal" },
  { name: "Juan R.", location: "California, USA", memberSince: "2020", quote: "My number one job is to be a dad. And I want to be around. That's my driving force for choosing ForgeFit.", thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", youtubeUrl: "https://www.youtube.com/@ForgeFitGlobal" },
  { name: "Kami T.", location: "Utah, USA", memberSince: "2020", quote: "Every time I finish a race or a Series, I sob my eyes out. I feel so proud of my body and myself.", thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80", youtubeUrl: "https://www.youtube.com/@ForgeFitGlobal" },
  { name: "Christal S.", location: "Nebraska, USA", memberSince: "2020", quote: "I got in the best shape of my life. Having ForgeFit and making the time checked all my boxes.", thumbnail: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80", youtubeUrl: "https://www.youtube.com/@ForgeFitGlobal" },
];

function AppStoreBadge({ href = "#" }: { href?: string }) {
  return (
    <Link href={href} className="inline-block" aria-label="Download on the App Store">
      <span className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2.5 text-white text-sm font-medium border border-zinc-600 hover:bg-zinc-700 transition-colors">
        <span className="text-xl" aria-hidden>📱</span>
        App Store
      </span>
    </Link>
  );
}

function GooglePlayBadge({ href = "#" }: { href?: string }) {
  return (
    <Link href={href} className="inline-block" aria-label="Get it on Google Play">
      <span className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2.5 text-white text-sm font-medium border border-zinc-600 hover:bg-zinc-700 transition-colors">
        <span className="text-xl" aria-hidden>▶</span>
        Google Play
      </span>
    </Link>
  );
}

/** Checkmark in orange circle (ForgeFit); dash for not included */
function CompareCell({ value }: { value: string }) {
  if (value === "✓") {
    return (
      <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ea580c] text-white" aria-hidden>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  if (value === "—") {
    return <span className="text-zinc-500 text-lg font-light">—</span>;
  }
  return <span className="text-zinc-300 font-medium">{value}</span>;
}

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Explicit spacer: forces visible gap between header and video (header ~100–115px tall) */}
      <div
        className="w-full bg-black shrink-0"
        style={{ minHeight: "160px" }}
        aria-hidden
      />

      {/* Video in a card – sits below the spacer */}
      <div className="pb-8 sm:pb-10 px-6 sm:px-8 md:px-10 max-w-7xl mx-auto">
        <section className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] bg-black">
          <LoopingVideo
            src={HERO_VIDEO_SRC}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="text-white/90 text-sm sm:text-base uppercase tracking-widest mb-4">
              Join ForgeFit
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              Unlock a world of workouts
              <br />
              <span className="text-white font-thin">with a ForgeFit Membership</span>
            </h1>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#ea580c] text-white font-bold text-lg hover:bg-[#f97316] transition-colors shadow-lg"
            >
              <span className="order-2 group-hover:order-1 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;&#xFE0E;</span>
              <span className="order-1 group-hover:order-2">Sign Up</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Membership options – two columns like iFIT: image → title → price → description → button */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-14 sm:mb-16">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              ForgeFit Membership
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-zinc-300 ml-1 sm:ml-2">
              Options
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Train – column: image, title, price, description, button (placeholder image; your images are in Compare section) */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-800 border border-zinc-600 flex flex-col shadow-xl">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] flex-shrink-0 overflow-hidden bg-zinc-700">
                <img
                  src="/images/options-train.png"
                  alt="ForgeFit Train on phone or tablet with equipment"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">ForgeFit Train</h3>
                <p className="text-xl sm:text-2xl font-bold text-[#ea580c] mb-4">$15/month</p>
                <p className="text-zinc-400 text-sm sm:text-base mb-6">
                  ForgeFit Train works on your phone or tablet and pairs with Bluetooth-enabled, ForgeFit-ready equipment without a built-in screen.
                </p>
                <Link
                  href="/signup"
                  className="group mt-auto inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#ea580c] text-white font-semibold hover:bg-[#f97316] transition-colors"
                >
                  <span className="order-2 group-hover:order-1">Join ForgeFit Train</span>
                  <span className="order-1 group-hover:order-2 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;&#xFE0E;</span>
                </Link>
              </div>
            </div>
            {/* Pro – column: image, title, price, description, button */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-800 border-2 border-[#ea580c] flex flex-col shadow-xl relative">
              <span className="absolute top-4 right-4 z-10 text-xs font-semibold text-[#ea580c] bg-black/60 backdrop-blur px-2 py-1 rounded">Popular</span>
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] flex-shrink-0 overflow-hidden bg-zinc-700">
                <img
                  src="/images/options-pro.png"
                  alt="ForgeFit Pro on equipment with built-in screen"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">ForgeFit Pro</h3>
                <p className="text-xl sm:text-2xl font-bold text-[#ea580c] mb-4">$39/month</p>
                <p className="text-zinc-400 text-sm sm:text-base mb-6">
                  ForgeFit Pro is made for equipment with built-in touchscreens from NordicTrack, ProForm, and Freemotion.
                </p>
                <Link
                  href="/signup"
                  className="group mt-auto inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#ea580c] text-white font-semibold hover:bg-[#f97316] transition-colors"
                >
                  <span className="order-2 group-hover:order-1">Join ForgeFit Pro</span>
                  <span className="order-1 group-hover:order-2 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;&#xFE0E;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare your ForgeFit Membership – iFIT-style: two columns (title, price, image, description, button) then table */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 sm:mb-12">
            Compare your <span className="text-[#ea580c]">ForgeFit Membership</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12">
            {/* Train column – your image */}
            <div className="flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">ForgeFit Train</h3>
              <p className="text-xl font-bold text-[#ea580c] mb-4">$15/month</p>
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-zinc-800 mb-4">
                <img
                  src="/images/membership-basic.png"
                  alt="ForgeFit Train – phone or tablet with equipment"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-zinc-400 text-sm sm:text-base mb-6">
                ForgeFit Train works on your phone or tablet and pairs with Bluetooth-enabled, ForgeFit-ready equipment without a built-in screen.
              </p>
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#ea580c] text-white font-semibold hover:bg-[#f97316] transition-colors"
              >
                <span className="order-2 group-hover:order-1">Join ForgeFit Train</span>
                <span className="order-1 group-hover:order-2 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;&#xFE0E;</span>
              </Link>
            </div>
            {/* Pro column – your image */}
            <div className="flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">ForgeFit Pro</h3>
              <p className="text-xl font-bold text-[#ea580c] mb-4">$39/month</p>
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-zinc-800 mb-4">
                <img
                  src="/images/membership-plus.png"
                  alt="ForgeFit Pro – equipment with built-in touchscreen"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-zinc-400 text-sm sm:text-base mb-6">
                ForgeFit Pro is made for equipment with built-in touchscreens from NordicTrack, ProForm, and Freemotion.
              </p>
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#ea580c] text-white font-semibold hover:bg-[#f97316] transition-colors"
              >
                <span className="order-2 group-hover:order-1">Join ForgeFit Pro</span>
                <span className="order-1 group-hover:order-2 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;&#xFE0E;</span>
              </Link>
            </div>
          </div>
          {/* Feature comparison table */}
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="py-4 pr-4 text-zinc-400 font-medium"></th>
                  <th className="py-4 px-4 text-white font-semibold">ForgeFit Train<br /><span className="text-[#ea580c] font-normal">$15/month</span></th>
                  <th className="py-4 px-4 text-white font-semibold">ForgeFit Pro<br /><span className="text-[#ea580c] font-normal">$39/month</span></th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={i} className="border-b border-zinc-700/70">
                    <td className="py-3 pr-4 text-zinc-300 text-sm">{row.label}</td>
                    <td className="py-3 px-4">
                      <CompareCell value={row.train} />
                    </td>
                    <td className="py-3 px-4">
                      <CompareCell value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Same as homepage: Why ForgeFit – left = image grid; right = 10k+ and features */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-zinc-900 border-y border-zinc-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.58fr_0.42fr] gap-10 lg:gap-12 items-start">
            <div className="grid grid-cols-4 gap-2 w-full auto-rows-fr">
              {[
                "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
                "https://images.unsplash.com/photo-1532296829144-843ec380b985?w=400&q=80",
                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
                "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
                "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
                "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
                "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
                "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&q=80",
                "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&q=80",
                "https://images.unsplash.com/photo-1581009146145-b5ef050c149e?w=400&q=80",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
              ].map((src, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl overflow-hidden bg-zinc-800 ${
                    i === 11 ? "lg:row-start-4 lg:col-start-1" : i === 12 ? "lg:row-start-4 lg:col-start-2" : ""
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="space-y-8 lg:space-y-10">
              <div>
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">10,000+</p>
                <p className="text-2xl md:text-3xl text-zinc-300 mt-1">workouts</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white underline decoration-white decoration-2 underline-offset-2 inline">Amazing</p>
                <span className="text-2xl md:text-3xl font-bold text-[#f97316] ml-1">trainers</span>
                <p className="text-zinc-400 text-base mt-1">180+ to motivate you</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white underline decoration-white decoration-2 underline-offset-2 inline">Stunning</p>
                <span className="text-2xl md:text-3xl font-bold text-[#f97316] ml-1">locations</span>
                <p className="text-zinc-400 text-base mt-1">All 7 continents</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white underline decoration-white decoration-2 underline-offset-2 inline">New content</p>
                <span className="text-2xl md:text-3xl font-bold text-[#f97316] ml-1">weekly</span>
                <p className="text-zinc-400 text-base mt-1">Drop in to on-demand workouts</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white underline decoration-white decoration-2 underline-offset-2 inline">Progressive</p>
                <span className="text-2xl md:text-3xl font-bold text-[#f97316] ml-1">programs</span>
                <p className="text-zinc-400 text-base mt-1">To reach your biggest goals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ForgeFit Stories */}
      <StoriesCarousel stories={STORIES} />

      {/* Membership details – two cards with bullets */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-zinc-900">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          Membership <span className="text-[#ea580c]">Details</span>
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="rounded-2xl bg-zinc-800 border border-zinc-700 p-8 sm:p-10">
            <h3 className="text-xl font-bold text-white mb-2">ForgeFit Train Membership</h3>
            <p className="text-zinc-400 text-sm mb-6">
              ForgeFit Train works on your phone or tablet and pairs with Bluetooth-enabled, ForgeFit-ready equipment without a built-in screen.
            </p>
            <p className="text-[#ea580c] font-bold mb-4">$15/month:</p>
            <ul className="space-y-2 text-zinc-300 text-sm list-disc list-inside">
              {TRAIN_FEATURES.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <Link href="/signup" className="mt-6 inline-flex px-6 py-3 rounded-xl bg-[#ea580c] text-white font-semibold hover:bg-[#f97316] transition-colors">
              Join ForgeFit Train
            </Link>
          </div>
          <div className="rounded-2xl bg-zinc-800 border border-zinc-700 p-8 sm:p-10">
            <h3 className="text-xl font-bold text-white mb-2">ForgeFit Pro Membership</h3>
            <p className="text-zinc-400 text-sm mb-6">
              ForgeFit Pro is made for equipment with built-in touchscreens and connected machines.
            </p>
            <p className="text-[#ea580c] font-bold mb-4">$39/month:</p>
            <ul className="space-y-2 text-zinc-300 text-sm list-disc list-inside">
              {PRO_FEATURES.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <Link href="/signup" className="mt-6 inline-flex px-6 py-3 rounded-xl bg-[#ea580c] text-white font-semibold hover:bg-[#f97316] transition-colors">
              Join ForgeFit Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Give your workouts the ultimate upgrade + app CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <div className="rounded-2xl bg-zinc-900 border border-zinc-700 p-8 sm:p-10 flex flex-col justify-center text-center">
              <p className="text-[#ea580c] text-sm font-medium mb-3">Get the ForgeFit for Equipment App</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
                Give your workouts the ultimate upgrade
              </h2>
              <p className="text-zinc-300 text-base mb-8">
                Millions of people around the world use ForgeFit to build strength, improve endurance, boost mobility, and reach their fitness goals. Join us!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <AppStoreBadge href="#" />
                <GooglePlayBadge href="#" />
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-zinc-800 min-h-[260px] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80"
                alt="ForgeFit app and equipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <ol className="mt-10 sm:mt-12 space-y-2.5 text-zinc-500 text-xs leading-relaxed max-w-3xl mx-auto list-decimal list-outside pl-6 text-left">
            <li>Paid ForgeFit membership required with equipment purchase and to access content and features. Membership auto-renews unless cancelled in advance. Free ForgeFit account, agreement to terms, and wi-fi required to operate equipment.</li>
            <li>ForgeFit subscription and compatible heart rate monitor required (sold separately). Available with treadmills only.</li>
            <li>AI Coach provided via in-app (see here for regional availability). Message and data rates may apply.</li>
            <li>Third-party product and company names referenced on this page are trademarks or registered trademarks and remain the property of their respective owners. Individual streaming services may require subscriptions to view content on ForgeFit.</li>
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
