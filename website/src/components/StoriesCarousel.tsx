"use client";

import { useState } from "react";
import Link from "next/link";

export type StoryItem = {
  name: string;
  location: string;
  memberSince: string;
  quote: string;
  thumbnail: string;
  youtubeUrl: string;
};

const CARDS_PER_PAGE = 3;

export default function StoriesCarousel({ stories }: { stories: StoryItem[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(stories.length / CARDS_PER_PAGE));
  const start = currentPage * CARDS_PER_PAGE;
  const visible = stories.slice(start, start + CARDS_PER_PAGE);

  const goPrev = () => setCurrentPage((p) => (p <= 0 ? totalPages - 1 : p - 1));
  const goNext = () => setCurrentPage((p) => (p >= totalPages - 1 ? 0 : p + 1));

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl text-white mb-12">
          <span className="font-bold uppercase">ForgeFit</span>
          <span className="font-normal"> Stories</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visible.map((story) => (
            <div
              key={story.name + story.location}
              className="rounded-2xl lg:rounded-3xl bg-zinc-800 border border-zinc-700 shadow-lg overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[9/16] bg-zinc-700 flex-shrink-0">
                <img
                  src={story.thumbnail}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-4 text-white text-sm">
                  {story.location}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-8">
                  <p className="text-white font-bold text-lg">{story.name}</p>
                  <p className="text-white/90 text-sm">Member Since {story.memberSince}</p>
                  <p className="text-white/80 text-xs mt-1">
                    *Featured ForgeFit member compensated for travel & time.
                  </p>
                </div>
                <Link
                  href={story.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#5c6370] hover:bg-[#ea580c] flex items-center justify-center text-white transition-colors"
                  aria-label={`Play ${story.name} testimonial`}
                >
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </Link>
              </div>
              <div className="p-5 flex-1 border-t border-zinc-700 bg-zinc-800">
                <p className="text-zinc-300 text-sm leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            type="button"
            onClick={goPrev}
            className="w-12 h-12 rounded-full bg-[#5c6370] hover:bg-[#ea580c] text-white flex items-center justify-center transition-colors"
            aria-label="Previous testimonials"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentPage ? "bg-[#ea580c]" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="w-12 h-12 rounded-full bg-[#5c6370] hover:bg-[#ea580c] text-white flex items-center justify-center transition-colors"
            aria-label="Next testimonials"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
