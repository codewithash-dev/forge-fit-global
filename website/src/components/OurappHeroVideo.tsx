"use client";

import LoopingVideo from "@/components/LoopingVideo";

const HERO_VIDEO_SRC = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/FFG-video.mp4";

export default function OurappHeroVideo() {
  return (
    <>
      <LoopingVideo
        src={HERO_VIDEO_SRC}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" aria-hidden />
    </>
  );
}
