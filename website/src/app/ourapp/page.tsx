import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OurappHeroVideo from "@/components/OurappHeroVideo";
import StoriesCarousel from "@/components/StoriesCarousel";

export const metadata: Metadata = {
  title: "ForgeFit App | Guided Workouts & Training Programs",
  description:
    "ForgeFit for Equipment – guided workouts on your terms. Train at home or on your equipment with expert trainers, faith, and community.",
};

const TRAINER_NAMES = [
  "Hannah",
  "John",
  "Tommy",
  "Ashley",
  "Knox",
  "Paulo",
  "Alex",
  "Shannon",
];

const ELITE_TRAINERS = [
  { name: "Tommy Rivs", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
  { name: "Ashley Paulson", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" },
  { name: "Kroy Robinson", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80" },
  { name: "Hannah Eden", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80" },
  { name: "John Peel", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
  { name: "Knox Robinson", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
  { name: "Paulo Villanueva", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80" },
  { name: "Alex Gregory", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80" },
  { name: "Shannon Smith", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" },
];

const MEMBERSHIPS = [
  {
    name: "ForgeFit Train Membership",
    price: "$15/month",
    tagline: "Works on your phone or tablet and pairs with Bluetooth-enabled equipment.",
    bullets: [
      "Access to 1,000+ workouts",
      "Trainer-led programs for every level",
      "Sync with Apple Health & fitness apps",
      "1 user",
    ],
    cta: "Join ForgeFit Train",
    featured: false,
    image: "/images/membership-basic.png",
    overlayLabel: "ForgeFit / Train",
  },
  {
    name: "ForgeFit Pro Membership",
    price: "$39/month",
    tagline: "Everything in Train, plus premium series and family sharing.",
    bullets: [
      "Everything in Train",
      "Exclusive series & challenges",
      "Up to 5 household members",
      "Priority support",
    ],
    cta: "Join ForgeFit Pro",
    featured: true,
    image: "/images/membership-plus.png",
    overlayLabel: "ForgeFit / Pro",
  },
];

const STORIES = [
  {
    name: "Kelly P.",
    location: "Utah, USA",
    memberSince: "2020",
    quote: "I love all the traveling and the trainers I get to experience this journey with.",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Juan R.",
    location: "California, USA",
    memberSince: "2020",
    quote: "My number one job is to be a dad. And I want to be around. That's my driving force for choosing ForgeFit.",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Kami T.",
    location: "Utah, USA",
    memberSince: "2020",
    quote: "Every time I finish a race or a Series, I sob my eyes out. I feel so proud of my body and myself. This is the first time in my life I have a healthy relationship with my body.",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Christal S.",
    location: "Nebraska, USA",
    memberSince: "2020",
    quote: "I got in the best shape of my life. Having ForgeFit and making the time checked all my boxes, and the equipment is unparalleled.",
    thumbnail: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Anthony M.",
    location: "North Carolina, USA",
    memberSince: "2020",
    quote: "I see myself progressing. My times are getting faster. My distances are getting further. Running 3 miles would have seemed impossible to me, but I just did almost 4 the other day.",
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Janie E.",
    location: "South Dakota, USA",
    memberSince: "2020",
    quote: "This has kept me going. I never thought that I could do this before. I've never met these trainers, but I feel a genuine connection with them.",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

const EQUIPMENT_BRANDS = [
  {
    name: "NordicTrack",
    image: "/images/compatible-nordictrack.png",
    description:
      "Every treadmill, exercise bike, elliptical, and rower we create transforms how you experience fitness, from the feel of the treadmill cushion to tracking apps that sync with your machine.",
    href: "#",
  },
  {
    name: "ProForm",
    image: "/images/compatible-proform.png",
    description:
      "We design our products to match your busy, family-centered lifestyle. We design our workouts to help you find your complete strength. We don't live to train. We train to live.",
    href: "#",
  },
  {
    name: "Freemotion",
    image: "/images/compatible-freemotion.png",
    description:
      "Strength machines, incline trainers, treadmills, and bikes designed for both commercial and home use. Freemotion's innovative designs change your mood, mind, and fitness level.",
    href: "#",
  },
];

/* App Store badge: dark background, white text + Apple logo */
function AppStoreBadge({ href = "#" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white hover:opacity-90 transition-opacity"
      aria-label="Download on the App Store"
    >
      <svg className="h-8 w-8 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left">
        <span className="block text-[10px] leading-tight">Download on the</span>
        <span className="block text-lg font-semibold leading-tight">App Store</span>
      </div>
    </Link>
  );
}

/* Google Play badge: dark background, white text + Play icon */
function GooglePlayBadge({ href = "#" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white hover:opacity-90 transition-opacity"
      aria-label="Get it on Google Play"
    >
      <svg className="h-8 w-8 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636 8.635L5.864 2.658z" />
      </svg>
      <div className="text-left">
        <span className="block text-[10px] leading-tight">GET IT ON</span>
        <span className="block text-lg font-semibold leading-tight">Google Play</span>
      </div>
    </Link>
  );
}

export default function OurAppPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero – top block ~40–45% viewport (iFIT proportion) */}
      <section className="px-4 sm:px-6 pt-28 pb-10 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg relative min-h-[42vh] flex flex-col justify-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-16 sm:py-20">
            <span className="inline-block text-sm text-white/90 border border-white/40 rounded-lg px-4 py-1.5 mb-6">
              ForgeFit for Equipment
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-4">
              Stunning outdoor workouts
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 font-normal mb-10 tracking-tight">
              on your equipment
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <AppStoreBadge href="#" />
              <GooglePlayBadge href="#" />
            </div>
          </div>
        </div>
      </section>

      {/* Video section – same width and height as hero above (no stretch) */}
      <section className="px-4 sm:px-6 py-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl relative flex flex-col h-[42vh] min-h-[240px]">
          <OurappHeroVideo />
        </div>
      </section>

      {/* Immersive workouts – iFIT: TWO COLUMNS. Left: subtitle + headline + grid. Right: paragraph + 10k+ + paragraph + app buttons. */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 bg-[#f3f4f6]">
        <div className="ourapp-immersive-cols px-0">
          {/* LEFT COLUMN */}
          <div className="mb-8 md:mb-0">
            <p className="text-black text-sm sm:text-base mb-2">
              Get lost in breathtaking destinations
            </p>
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6 lg:mb-8">
              Immersive workouts for your treadmill, bike, rower, elliptical, reformer, & more
            </h2>
            <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm w-full">
              <img
                src="/images/immersive-workouts-grid.png"
                alt="Workout categories: Running, Strength, Walking, Cycling, Pilates, HIIT, Yoga, Rowing, Recovery, Bodyweight, Elliptical, Barre"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          {/* RIGHT COLUMN */}
          <div className="flex flex-col md:pt-0">
            <p className="text-black text-base leading-relaxed mb-6">
              ForgeFit workouts are filmed in stunning outdoor locations across the world, led by expert ForgeFit Trainers. Drop into stunning outdoor locations filmed across all 7 continents, from the canyons of Arizona and the arctic tundra to the salt flats of Bolivia.
            </p>
            <h3 className="text-black text-xl font-bold mb-3">
              10,000+ Workouts
            </h3>
            <p className="text-black text-base leading-relaxed mb-8">
              Explore high-intensity cardio, full-body strength, yoga, Pilates, marathon training, and more. There’s always something new, so you’ll never get bored.
            </p>
            <div className="flex flex-wrap gap-3">
              <AppStoreBadge href="#" />
              <GooglePlayBadge href="#" />
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Responsive – two columns like iFIT: left = heading + paragraph + app buttons, right = bike image */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 bg-[#f3f4f6]">
        <div className="ourapp-immersive-cols px-0">
          {/* LEFT COLUMN: heading, paragraph, app badges */}
          <div className="mb-8 md:mb-0 flex flex-col justify-center">
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
              Real-Time Responsive
            </h2>
            <p className="text-black text-base leading-relaxed mb-8">
              ForgeFit automatically adjusts your machine’s incline, resistance, and speed based on the terrain and your trainer, fully immersing you in the experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <AppStoreBadge href="#" />
              <GooglePlayBadge href="#" />
            </div>
          </div>
          {/* RIGHT COLUMN: image – show full image so 20% SMARTADJUST overlay is visible */}
          <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg w-full aspect-[3/4] relative bg-[#f3f4f6] min-h-0">
            <img
              src="/images/real-time-bike.png"
              alt="Person using equipment with ForgeFit – automatic incline, resistance, and speed"
              className="absolute inset-0 w-full h-full object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Track It All – two columns like iFIT: left = treadmill/connected apps image, right = heading + paragraph + app buttons */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 bg-[#f3f4f6]">
        <div className="ourapp-immersive-cols px-0">
          {/* LEFT COLUMN: image – show full image so Connected apps overlay is visible */}
          <div className="mb-8 md:mb-0 rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg w-full aspect-[3/4] relative bg-[#f3f4f6] min-h-0">
            <img
              src="/images/track-it-all.png"
              alt="Track your progress and connect supported apps – Apple Health, Garmin Connect, Strava"
              className="absolute inset-0 w-full h-full object-contain object-bottom"
            />
          </div>
          {/* RIGHT COLUMN: heading, paragraph, app badges */}
          <div className="flex flex-col justify-center">
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
              Track It All
            </h2>
            <p className="text-black text-base leading-relaxed mb-8">
              Watch your progress grow, celebrate streaks and milestones, and stay accountable to your goals. Easily pair supported apps and track your exercise and health stats in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <AppStoreBadge href="#" />
              <GooglePlayBadge href="#" />
            </div>
          </div>
        </div>
      </section>

      {/* Second video section – same video, play-only button */}
      <section className="px-4 sm:px-6 py-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl relative flex flex-col h-[42vh] min-h-[240px]">
          <OurappHeroVideo />
        </div>
      </section>

      {/* How ForgeFit Works (two cols) + 180+ Elite Trainers carousel */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto">
          {/* Top: How ForgeFit Works – left = label + heading, right = paragraph */}
          <div className="ourapp-immersive-cols px-0 mb-14 sm:mb-16">
            <div>
              <p className="text-[#374151] text-sm mb-2">ForgeFit for Equipment</p>
              <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                How ForgeFit Works
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-black text-base leading-relaxed">
                Providing a unique, two-way user experience that keeps our growing community engaged is the motivation behind ForgeFit. Our platform connects our content to your hardware and makes it one interactive experience. The result is an interactive workout experience built for your goals.
              </p>
            </div>
          </div>
          {/* 180+ Elite Trainers – heading (thin “180+”, bold “Elite Trainers”), subtext */}
          <div className="text-center mb-8">
            <h3 className="text-black text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              <span className="font-extralight">180+ </span>
              <span className="font-bold">Elite Trainers</span>
            </h3>
            <p className="text-black text-base font-normal text-[#374151] mt-3 max-w-2xl mx-auto leading-relaxed">
              Stay motivated and unlock your best performance with ForgeFit’s elite trainers, pro athletes, and world champions who lead you through every workout.
            </p>
          </div>
          <div className="trainer-carousel -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
            <div className="trainer-carousel-track">
              {[...ELITE_TRAINERS, ...ELITE_TRAINERS].map((trainer, i) => (
                <div
                  key={`${trainer.name}-${i}`}
                  className="w-[200px] sm:w-[240px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-md bg-gray-200 aspect-[3/4] relative"
                >
                  <img
                    src={trainer.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <p className="absolute bottom-0 left-0 right-0 p-4 text-white font-semibold text-sm sm:text-base">
                    {trainer.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Membership options */}
      <section id="membership" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-2 text-center">
            Membership options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {MEMBERSHIPS.map((m) => (
              <div
                key={m.name}
                className={`rounded-2xl lg:rounded-3xl overflow-hidden flex flex-col shadow-lg ${
                  m.featured
                    ? "bg-[#1f2937] text-white border-2 border-[#ea580c]"
                    : "bg-[#ebe6df] text-[#2d2d2d]"
                }`}
              >
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex-shrink-0 overflow-hidden">
                  <img
                    src={m.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-1">{m.name}</h3>
                <p className={`text-lg font-semibold mb-4 ${m.featured ? "text-[#f97316]" : "text-[#ea580c]"}`}>
                  {m.price}
                </p>
                <p className={`text-sm mb-6 opacity-90 ${m.featured ? "text-white/90" : "text-[#4b5563]"}`}>
                  {m.tagline}
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <span className={m.featured ? "text-[#ea580c]" : "text-[#ea580c]"} aria-hidden>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className={`group inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold transition-colors ${
                    m.featured
                      ? "bg-[#ea580c] text-white hover:bg-[#f97316]"
                      : "bg-[#1f2937] text-white hover:bg-[#374151]"
                  }`}
                >
                  <span className="order-2 group-hover:order-1 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#62;&#62;</span>
                  <span className="order-1 group-hover:order-2">{m.cta}</span>
                </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works – Compatible Equipment (three columns, iFIT-style) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 bg-[#f3f4f6]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#6b7280] text-sm mb-2">
            How it works
          </p>
          <h2 className="text-center mb-12">
            <span className="block text-black text-3xl md:text-4xl font-bold">
              Compatible
            </span>
            <span className="block text-black text-2xl md:text-3xl font-semibold text-[#374151]">
              Equipment
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {EQUIPMENT_BRANDS.map((brand) => (
              <div key={brand.name} className="flex flex-col">
                <div className="rounded-t-2xl lg:rounded-t-3xl overflow-hidden aspect-[4/3] bg-gray-200 flex-shrink-0">
                  <img
                    src={brand.image}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-[#111827] text-xl font-bold mt-6 mb-3">
                  {brand.name}
                </h3>
                <p className="text-[#6b7280] text-sm font-normal leading-relaxed mb-6 flex-1">
                  {brand.description}
                </p>
                <Link
                  href={brand.href}
                  className="group inline-flex items-center justify-center gap-1 rounded-full border border-[#d1d5db] bg-white px-4 py-1.5 text-sm text-[#111827] font-bold hover:border-[#ea580c] hover:bg-[#ea580c] hover:text-white transition-colors w-fit"
                >
                  <span className="order-2 group-hover:order-1 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#62;&#62;</span>
                  <span className="order-1 group-hover:order-2">{brand.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StoriesCarousel stories={STORIES} />

      {/* Stats strip – two cards; "1 Million" and "58000+" on same row so they align */}
      <section className="px-4 sm:px-6 lg:px-10 pt-4 pb-3 sm:pt-5 sm:pb-4 bg-[#f3f4f6]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl lg:rounded-3xl bg-[#5c6370] px-8 py-8 sm:px-10 sm:py-10 min-h-[140px] sm:min-h-[160px] grid grid-rows-[auto_auto_auto] items-center justify-items-center text-center gap-0">
            <div className="h-8 sm:h-9 w-full flex items-center justify-center" aria-hidden />
            <p className="text-3xl sm:text-4xl font-bold leading-none"><span className="text-white">1</span> <span className="text-[#ea580c]">Million</span></p>
            <p className="text-white/90 text-sm sm:text-base font-light mt-2">downloads on Android Play Store</p>
          </div>
          <div className="rounded-2xl lg:rounded-3xl bg-[#5c6370] px-8 py-8 sm:px-10 sm:py-10 min-h-[140px] sm:min-h-[160px] grid grid-rows-[auto_auto_auto] items-center justify-items-center text-center gap-0">
            <div className="flex text-[#ea580c] h-8 sm:h-9 items-center justify-center" aria-hidden>
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-3xl sm:text-4xl font-bold leading-none"><span className="text-white">58000</span><span className="text-[#ea580c]">+</span></p>
            <p className="text-white/90 text-sm sm:text-base font-light mt-2">4.6 Star Reviews on App Store</p>
          </div>
        </div>
      </section>

      {/* Give your workouts the ultimate upgrade – bottom; gap above matches reference (~30–40px from stats) */}
      <section className="pt-6 pb-16 sm:pt-8 sm:pb-20 px-4 sm:px-6 lg:px-10 bg-[#f3f4f6]">
        <div className="max-w-6xl mx-auto">
          {/* Two cards with aligned spacing: same height, uniform gap (like iFIT) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            <div className="rounded-2xl lg:rounded-3xl overflow-hidden bg-[#5c6370] p-8 sm:p-10 lg:p-12 flex flex-col justify-center text-center shadow-lg min-h-0">
              <p className="text-[#ea580c] text-sm font-normal mb-3">Get the ForgeFit for Equipment App</p>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
                Give your workouts the ultimate upgrade
              </h2>
              <p className="text-white/95 text-base leading-relaxed mb-8 font-normal">
                Millions of people around the world use ForgeFit to build strength, improve endurance, boost mobility, and reach their fitness goals. Join us!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <AppStoreBadge href="#" />
                <GooglePlayBadge href="#" />
              </div>
            </div>
            <div className="rounded-2xl lg:rounded-3xl overflow-hidden relative min-h-[280px] shadow-lg">
              <img
                src="/images/ultimate-upgrade-app-equipment.png"
                alt="ForgeFit app on phone with compatible exercise equipment"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Disclaimer points 1-4 – left-aligned with hanging indent like iFIT */}
          <div className="mt-10 sm:mt-12 flex flex-col items-center">
            <ol className="space-y-2.5 text-[#6b7280] text-[11px] sm:text-xs leading-relaxed max-w-3xl list-decimal list-outside pl-6 sm:pl-7 text-left [&>li]:pl-1 [&>li]:text-left">
              <li>Paid ForgeFit membership required with equipment purchase and to access content and features. Membership auto-renews unless cancelled in advance. Free ForgeFit account, agreement to terms, and wi-fi required to operate equipment.</li>
              <li>ForgeFit subscription and compatible heart rate monitor required (sold separately). Available with treadmills only.</li>
              <li>Coach features provided via in-app (see here for regional availability). Message and data rates may apply where applicable.</li>
              <li>Third-party product and company names referenced on this page are trademarks or registered trademarks and remain the property of their respective owners. Individual streaming services may require subscriptions to their services to view content on ForgeFit.</li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
