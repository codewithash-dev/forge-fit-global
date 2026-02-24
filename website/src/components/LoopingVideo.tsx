"use client";

import { useRef, useEffect } from "react";

type LoopingVideoProps = {
  src: string;
  className?: string;
  poster?: string;
  ariaHidden?: boolean;
};

export default function LoopingVideo({ src, className, poster, ariaHidden = true }: LoopingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {});
    };

    const restart = () => {
      video.currentTime = 0;
      play();
    };

    const onEnded = () => {
      video.currentTime = 0;
      let attempts = 0;
      const retry = () => {
        video.play().then(() => {}).catch(() => {
          attempts++;
          if (attempts < 20) setTimeout(retry, 150);
        });
      };
      retry();
    };

    const onCanPlay = () => play();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") play();
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("canplay", onCanPlay);
    document.addEventListener("visibilitychange", onVisibilityChange);

    play();

    const poll = setInterval(() => {
      if (!videoRef.current) return;
      if (document.visibilityState !== "visible") return;
      if (videoRef.current.paused) {
        const v = videoRef.current;
        if (v.readyState >= 2) v.play().catch(() => restart());
      }
    }, 800);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      clearInterval(poll);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
      aria-hidden={ariaHidden}
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
