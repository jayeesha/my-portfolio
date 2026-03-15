"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

export function Hero() {
  const heroContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".name", { type: "words, chars" });
      gsap.from(split.chars, {
        y: -100, // animate from 100px above
        autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
        stagger: 0.05, // 0.05 seconds between each
      });
    },
    { scope: heroContainer },
  );

  return (
    <div
      ref={heroContainer}
      className="hero w-full h-screen flex flex-col items-center justify-center"
    >
      <div className="name text-4xl font-semibold">Jayeesha Ghosh</div>
      <div className="role text-2xl">Frontend Developer</div>
    </div>
  );
}
