"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll<HTMLElement>("[data-animate='section']");
      const variants = [
        { from: { autoAlpha: 0, y: 50 }, to: { autoAlpha: 1, y: 0 }, duration: 0.85, ease: "power3.out" },
        { from: { autoAlpha: 0, x: -48 }, to: { autoAlpha: 1, x: 0 }, duration: 0.9, ease: "power2.out" },
        { from: { autoAlpha: 0, y: -36 }, to: { autoAlpha: 1, y: 0 }, duration: 0.8, ease: "power3.out" },
        { from: { autoAlpha: 0, x: 48 }, to: { autoAlpha: 1, x: 0 }, duration: 0.85, ease: "power2.out" },
        { from: { autoAlpha: 0, y: 40, scale: 0.97 }, to: { autoAlpha: 1, y: 0, scale: 1 }, duration: 1, ease: "power2.out" },
      ];
      sections.forEach((section, i) => {
        const v = variants[i % variants.length];
        gsap.fromTo(
          section,
          v.from,
          {
            ...v.to,
            duration: v.duration,
            ease: v.ease,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}

