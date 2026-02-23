import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPhoneIFIT from "@/components/HeroPhoneIFIT";
import FeedbackWidget from "@/components/FeedbackWidget";

// Video: set NEXT_PUBLIC_HERO_VIDEO_URL in Vercel to a hosted URL; locally uses /videos/to-run.mp4
const HERO_VIDEO_SRC = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/to-run.mp4";

const REVIEWS = [
  { quote: "I have been using ForgeFit for 4 years now. To say ForgeFit changed my life is an understatement.", author: "PS" },
  { quote: "The trainers, types of workouts, length of workouts are all so diverse and interesting. There is literally something for everyone. It will change your life!!!", author: "JMS" },
  { quote: "The coaches feel like personal friends. I have never before looked forward to workouts until ForgeFit. My progress is amazing.", author: "MT" },
  { quote: "My fitness level has changed drastically with ForgeFit workouts. I am stronger and more confident.", author: "Kristen" },
  { quote: "ForgeFit has kept me accountable and improving myself for over 2 years! I have lost 100lbs and feel great! Thank you ForgeFit!", author: "LG" },
  { quote: "I went from having no running experience to being able to run my first 5k! All with the guidance and joy from the trainers. I absolutely adore you guys!", author: "SS" },
  { quote: "Love ForgeFit. Just completed my 100th workout. Enjoying every minute. Keeps you accountable. Trainers are enthusiastic and love getting to know them! Highly recommend.", author: "Jen" },
  { quote: "I have done at least one program a day for the last few years. Mixing HIIT, yoga, weight training and stretching. Muscle tone and strength is better than it has been in 20 years.", author: "DW" },
  { quote: "I just renewed for another year because ForgeFit really has made working out easy, at home or at the gym. I love how motivating the trainers are. Best decision I ever made.", author: "TD" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* 1. HERO – video background (to-run.mp4), left copy, right = white iPhone with app mockup */}
      <section className="relative min-h-[92vh] flex items-center px-6 pt-24 pb-16 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Now Streaming + headline + two buttons */}
          <div>
            <p className="text-white text-sm font-medium uppercase tracking-[0.2em] mb-3">Now Streaming</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-8">
              Let the <strong className="text-white">Trainer</strong>
              <br />
              <strong className="text-white">Games</strong> begin.
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#programs"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ea580c] text-white font-semibold hover:bg-[#f97316] transition-colors"
              >
                <span className="order-1 group-hover:order-2">Learn more</span>
                <span className="order-2 group-hover:order-1 text-sm" aria-hidden>&#9874;</span>
              </Link>
              <Link
                href="https://youtube.com/@ForgeFitGlobal"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white bg-transparent text-white font-semibold hover:bg-white hover:text-[#ea580c] transition-colors"
              >
                <span className="order-1 group-hover:order-2">Watch now</span>
                <span className="order-2 group-hover:order-1 text-sm" aria-hidden>&#9874;</span>
              </Link>
            </div>
          </div>
          {/* Right: White iPhone with app mockup (iFIT-style: Hi Max, Trainer Games, Goal card) */}
          <HeroPhoneIFIT />
        </div>
      </section>

      {/* 2. Trusted strip */}
      <section className="py-10 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Trusted by Millions</h2>
          <p className="text-lg text-zinc-400">ForgeFit Global: Leading in Personal Fitness</p>
        </div>
      </section>

      {/* 3. Three columns */}
      <section className="py-16 px-6 bg-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Training – white iPhone mockup; heading above phone */}
          <div id="programs" className="rounded-2xl bg-zinc-800 p-6 lg:p-8 flex flex-col shadow-md border border-zinc-700">
            <h2 className="text-xl font-bold text-white mb-6">Personal Training</h2>
            <div className="mx-auto w-[260px] mb-6">
              <div className="bg-white rounded-[2.25rem] p-2.5 shadow-lg ring-1 ring-black/5">
                <div className="rounded-[1.9rem] overflow-hidden bg-[#0d0d0d]">
                  <div className="px-4 pt-4 pb-4 min-h-[400px] flex flex-col" style={{ backgroundColor: "#1C1D2A" }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/90 text-sm">&#9776;</span>
                      <span className="text-white text-sm font-semibold">Hi, Max</span>
                    </div>
                    <div className="flex gap-1.5 mb-3 overflow-x-auto">
                      {[
                        { label: "Treadmill", active: true },
                        { label: "Bike", active: false },
                        { label: "Rower", active: false },
                        { label: "Elliptical", active: false },
                        { label: "Strength", active: false },
                        { label: "Yoga", active: false },
                      ].map(({ label, active }) => (
                        <div
                          key={label}
                          className={`rounded-lg flex flex-col items-center justify-center py-2 px-2 min-w-[48px] text-[9px] font-medium flex-shrink-0 ${active ? "bg-[#ea580c] text-white" : "bg-white/10 text-white/90"}`}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 rounded-xl overflow-hidden bg-zinc-800 relative min-h-[120px]">
                      <div className="absolute top-2 left-2 bg-black/50 text-white text-[8px] font-semibold uppercase px-2 py-0.5 rounded">Beginner</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="text-[9px] uppercase tracking-wider text-white/80">Continue series</p>
                        <p className="text-sm font-bold">Weight loss walking Italy</p>
                        <p className="text-[10px] text-white/80 mt-0.5">4 of 10 complete</p>
                      </div>
                    </div>
                    <div className="mt-2 px-2 py-1.5 rounded bg-black/30 flex items-center justify-between">
                      <span className="text-[10px] text-white">Next up: Full Body Strength</span>
                      <span className="text-[10px] text-white">&#9733; 4.9</span>
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-zinc-600 overflow-hidden">
                      <div className="h-full w-[40%] rounded-full bg-[#ea580c]" />
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                      <span className="text-[10px] text-white/90">Milestones 2025</span>
                      <span className="text-[10px] text-white/50">&#9660;</span>
                      <span className="text-[10px] text-white/50 ml-0.5">&#9432;</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[9px] text-white/70">WORKOUTS</span>
                      <span className="text-[10px] font-semibold text-black px-2 py-0.5 rounded bg-white">700</span>
                      <span className="text-[9px] text-white/70 px-1.5 py-0.5 rounded bg-white/10">750</span>
                      <span className="text-[9px] text-white/70 px-1.5 py-0.5 rounded bg-white/10">800</span>
                      <span className="text-[9px] text-white/70 px-1.5 py-0.5 rounded bg-white/10">850</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Get the perfect workout for you, every time. Whether you have 30 minutes in the garage or a marathon on your list, ForgeFit can get you there.
            </p>
          </div>

          {/* Equipment – heading above image */}
          <div id="app" className="rounded-2xl bg-zinc-800 p-6 lg:p-8 flex flex-col shadow-md border border-zinc-700">
            <h2 className="text-xl font-bold text-white mb-6">Equipment</h2>
            <div className="mb-6 flex items-end justify-center min-h-[200px]">
              <img
                src="/images/equipment-three.png"
                alt="Stationary bike, treadmill, and rowing machine with NordicTrack displays"
                className="w-full max-w-[320px] h-auto object-contain object-bottom"
              />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We are a leading provider of large exercise equipment in the United States. We make NordicTrack, ProForm and Freemotion machines used by millions.
            </p>
          </div>

          {/* Workouts – heading above grid */}
          <div id="workouts" className="rounded-2xl bg-zinc-800 p-6 lg:p-8 flex flex-col shadow-md border border-zinc-700">
            <h2 className="text-xl font-bold text-white mb-6">Workouts</h2>
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src="/images/workouts-grid.png"
                alt="Workout categories: Running, Strength, Walking, Cycling, Pilates, HIIT, Yoga, Rowing, Recovery, Bodyweight, Elliptical, Barre"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Our immersive, interactive content takes you from Everest to Kyoto, guided by world-class trainers, live or on-demand, anywhere you are.
            </p>
          </div>
        </div>
      </section>

      {/* 4. STATS – 4 cards with orange accent numbers */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-zinc-900 p-6 text-center border border-zinc-700">
            <p className="text-2xl md:text-3xl font-bold text-[#ea580c]">6.4+</p>
            <p className="text-lg font-semibold text-white">Million</p>
            <p className="text-sm text-zinc-400 mt-1">People workout on ForgeFit</p>
          </div>
          <div className="rounded-2xl bg-zinc-900 p-6 text-center border border-zinc-700">
            <div className="flex justify-center gap-0.5 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-[#ea580c] text-sm">&#9733;</span>
              ))}
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#ea580c]">58000+</p>
            <p className="text-lg font-semibold text-white">4.6 Star</p>
            <p className="text-sm text-zinc-400 mt-1">App Store Reviews</p>
          </div>
          <div className="rounded-2xl bg-zinc-900 p-6 text-center border border-zinc-700">
            <p className="text-2xl md:text-3xl font-bold text-[#ea580c]">50+</p>
            <p className="text-lg font-semibold text-white">Years</p>
            <p className="text-sm text-zinc-400 mt-1">of fitness innovation</p>
          </div>
          <div className="rounded-2xl bg-zinc-900 p-6 text-center border border-zinc-700">
            <p className="text-2xl md:text-3xl font-bold text-[#ea580c]">123+</p>
            <p className="text-lg font-semibold text-white">Million</p>
            <p className="text-sm text-zinc-400 mt-1">Workouts streamed every year</p>
          </div>
        </div>
      </section>

      {/* 4b. Full-width video – “TO RUN” overlay + Why ForgeFit? >> (video placeholder until you provide asset) */}
      <section className="py-6 px-4 md:px-6 bg-zinc-900">
        <div className="max-w-[90vw] w-full mx-auto rounded-2xl overflow-hidden shadow-xl aspect-video max-h-[85vh] bg-black relative">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
            poster="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 flex items-end pb-[12%] pl-[8%] md:pl-[10%]">
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
                ForgeFit
                <span className="text-white ml-0.5">&gt;</span>
              </p>
              <Link
                href="#why"
                className="group inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-full bg-[#ea580c] text-white text-sm font-semibold hover:bg-[#f97316] transition-colors shadow-lg"
              >
                <span className="order-2 group-hover:order-1 inline-block font-bold transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;</span>
                <span className="order-1 group-hover:order-2">Why ForgeFit?</span>
              </Link>
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
                INVITES YOU
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why ForgeFit – left = image grid; right = large text */}
      <section id="why" className="py-16 md:py-20 px-6 bg-zinc-900 border-y border-zinc-700">
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

      {/* 6. Progressive programs band + two-card membership */}
      <section id="membership" className="bg-zinc-900">
        {/* Top band: Progressive programs */}
        <div className="bg-zinc-800 px-6 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-zinc-700">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white inline">Progressive </p>
            <p className="text-2xl md:text-3xl font-bold text-[#f97316] inline">programs</p>
            <p className="text-zinc-400 text-base mt-1">To reach your biggest goals</p>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&q=80",
              "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80",
              "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80",
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=80",
            ].map((src, i) => (
              <div key={i} className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-700">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Two large cards: left = Join CTA, right = mountain + overlaid waterscape */}
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 flex flex-col justify-center items-center text-center px-8 py-16 lg:py-20 min-h-[320px]">
            <p className="text-[#f97316] text-sm font-medium uppercase tracking-widest mb-3">Join ForgeFit</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
              Get the ForgeFit membership
            </h2>
            <p className="text-xl text-zinc-400 mb-8">that&apos;s right for you</p>
            <Link
              href="#"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ea580c] text-white font-semibold hover:bg-[#f97316] transition-colors"
            >
              <span className="order-2 group-hover:order-1 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;</span>
              <span className="order-1 group-hover:order-2">Explore Memberships</span>
            </Link>
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden min-h-[320px] relative bg-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
              <div className="w-full max-w-[85%] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20" style={{ borderRadius: "2.5rem 2rem 2.5rem 2rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Watch the Trailer */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Watch the Trailer</h2>
          <p className="text-zinc-400 text-sm mb-2">The search for the next global fitness star</p>
          <p className="text-white text-xl font-semibold mb-4">Let the Trainer Games begin</p>
          <p className="text-zinc-300 mb-8">
            Ten elite contestants. One shot at becoming the next ForgeFit Trainer. Expect transformation, competition, and next-level coaching—all coming soon to your screen in 2026.
          </p>
          <a
            href="https://youtube.com/@ForgeFitGlobal"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ea580c] text-white font-semibold hover:bg-[#f97316] transition-colors"
          >
            <span className="order-2 group-hover:order-1 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;</span>
            <span className="order-1 group-hover:order-2">Watch now on Prime Video</span>
          </a>
        </div>
      </section>

      {/* 8. Reviews */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">ForgeFit Reviews</h2>
          <p className="text-zinc-400 text-lg mb-6">Real people. Real progress. Real results.</p>
          <Link
            href="#"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white bg-transparent text-white font-medium hover:bg-white/10 transition-colors"
          >
            <span className="order-2 group-hover:order-1 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;</span>
            <span className="order-1 group-hover:order-2">See what people are saying</span>
          </Link>
        </div>
        <div className="review-carousel overflow-hidden">
          <div className="review-carousel-track">
            {/* Duplicate reviews for seamless loop */}
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <div
                key={i}
                className="w-[340px] rounded-2xl bg-zinc-900 border border-zinc-700 p-6 relative"
              >
                <span className="absolute top-4 left-6 text-6xl font-serif text-white/20 leading-none">&ldquo;</span>
                <p className="text-zinc-200 pt-8 pl-2 leading-relaxed">{r.quote}</p>
                <p className="text-[#f97316] font-semibold mt-6">{r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Science */}
      <section className="py-8 md:py-12 px-6 bg-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,32rem)_1fr_1fr] gap-8 md:gap-8 w-full md:items-center">
          {/* Left: Science Council intro + 3x3 grid (iFIT: training, Sleep card, sleeping; fence, fruit bowl, activity rings; empty, Heart, empty) */}
          <div className="order-1 w-full max-w-2xl min-w-0">
            <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-xl">
              ForgeFit&apos;s Science Council is a team of leading experts in exercise science, sports medicine, physiology, and health optimization who guide the innovation behind ForgeFit&apos;s industry-leading fitness experiences.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {/* Row 1: training | Sleep card | sleeping – your images */}
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-800">
                <img src="/images/equipment-three.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="bg-zinc-700 rounded-xl p-2.5 flex flex-col min-h-0 aspect-[3/4]">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white font-semibold text-xs">Sleep</h3>
                  <span className="text-zinc-400 text-[10px]" aria-hidden>🌙</span>
                </div>
                <div className="flex-1 flex items-end gap-0.5 mb-1">
                  {[3, 5, 4, 6, 5, 7].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#ea580c] rounded-t" style={{ height: `${h * 8}%` }} />
                  ))}
                </div>
                <p className="text-zinc-400 text-[10px]">6 Hours</p>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-800">
                <img src="/images/science-right-1.png" alt="" className="w-full h-full object-cover" />
              </div>
              {/* Row 2 */}
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-800">
                <img src="/images/workouts-grid.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-800">
                <img src="/images/science-ref-left.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-xl flex items-center justify-center bg-zinc-800 p-1.5">
                <div className="relative w-full h-full max-w-[85%] max-h-[85%]">
                  <div className="absolute inset-0 rounded-full border-[3px] border-red-500 opacity-90" />
                  <div className="absolute inset-[15%] rounded-full border-[3px] border-gray-400 opacity-90" />
                  <div className="absolute inset-[30%] rounded-full border-[3px] border-[#ea580c] opacity-90" />
                </div>
              </div>
              {/* Row 3: fitness | Heart card | fitness – your images */}
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-800">
                <img src="/images/science-ref-grid.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="bg-zinc-700 rounded-xl p-2.5 flex flex-col min-h-0 aspect-[3/4]">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white font-semibold text-xs">Heart</h3>
                  <span className="text-zinc-400 text-[10px]" aria-hidden>❤️</span>
                </div>
                <div className="flex-1 flex items-end mb-1">
                  <svg className="w-full h-8 flex-shrink-0" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <polyline points="0,30 10,25 20,20 30,15 40,18 50,12 60,15 70,10 80,8 90,5 100,3" fill="none" stroke="#ea580c" strokeWidth="2" />
                  </svg>
                </div>
                <p className="text-zinc-400 text-[10px]">95 bpm</p>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-800">
                <img src="/images/science-right-2.png" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          {/* Middle: headline – vertically centered between left and right (like iFIT) */}
          <div className="order-2 flex justify-center items-center md:px-4 pt-4 md:pt-0 md:self-center">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-center">
              Backed by
              <br />
              <strong>science</strong>,
              <br />
              led by <strong>elite
              <br />
              trainers</strong>
            </h2>
          </div>
          {/* Right: single collage image (your image) + trainer paragraph */}
          <div className="order-3 flex flex-col gap-4 justify-center items-center md:items-end max-w-md mx-auto md:mx-0">
            <div className="w-full rounded-xl overflow-hidden bg-zinc-800">
              <img src="/images/science-right-collage.png" alt="" className="w-full h-auto object-contain" loading="lazy" />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed text-center md:text-right max-w-md">
              Our expert trainers craft workouts that optimize your fitness progress. Join them as they transport you to the world&apos;s most stunning landscapes, keeping you motivated to push farther.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <FeedbackWidget />

    </div>
  );
}
