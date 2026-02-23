"use client";

import { useRef, useState } from "react";

const HERO_VIDEO_SRC = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/to-run.mp4";

export default function OurappHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
      {/* Center: play button only */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <button
          type="button"
          onClick={togglePlay}
          className="group inline-flex items-center gap-2 rounded-full bg-[#d1d5db] px-6 py-3 sm:px-8 sm:py-4 text-[#374151] font-bold text-lg sm:text-xl hover:bg-[#e5e7eb] transition-colors shadow-lg"
          aria-label={playing ? "Pause video" : "Play video"}
        >
          <span className="order-2 group-hover:order-1 inline-block transition-all duration-200 group-hover:scale-125" aria-hidden>&#9874;</span>
          <span className="order-1 group-hover:order-2">{playing ? "Pause" : "Play"}</span>
        </button>
      </div>
    </>
  );
}
