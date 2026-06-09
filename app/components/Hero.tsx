"use client";
import { useRef } from "react";
import { Sour_Gummy } from "next/font/google";
// import {  Film, BookOpen, Plane, Utensils } from "lucide-react";
import { gsap, useGSAP, SplitText, Draggable } from "./gsap-plugins";
import Movie from "../icons/Movie";
import Travel from "../icons/Travel";
import Music from "../icons/Music";
import Paint from "../icons/Paint";

const googleFont = Sour_Gummy({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ICONS = [
  { Icon: Movie, label: "Movies" },
  { Icon: Music, label: "Music" },
  { Icon: Paint, label: "Paint" },
  { Icon: Travel, label: "Travel" },
] as const;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const iconsLayerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".role", { type: "words, chars" });
      gsap.set(".role", { visibility: "visible" });
      gsap.from(split.chars, {
        y: -50,
        autoAlpha: 0,
        stagger: 0.1,
        delay: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });

      gsap.from(nameRef.current, {
        y: 50,
        autoAlpha: 0,
        delay: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      const layer = iconsLayerRef.current;
      if (!layer) return;

      const layerRect = layer.getBoundingClientRect();
      const layerW = layerRect.width;
      const layerH = layerRect.height;
      const iconSize = 56;
      const floorY = layerH - iconSize - 24;

      const iconEls = gsap.utils.toArray<HTMLDivElement>(".hobby-icon");

      const slots = iconEls.map((_, i) => {
        const pad = 40;
        const step = (layerW - pad * 2) / (iconEls.length - 1);
        return pad + step * i;
      });

      iconEls.forEach((el, i) => {
        gsap.set(el, {
          x: slots[i],
          y: -200,
          autoAlpha: 0,
          rotation: gsap.utils.random(-20, 20),
        });
      });

      gsap.to(iconEls, {
        y: floorY,
        autoAlpha: 1,
        duration: 1.4,
        delay: 0.3,
        ease: "bounce.out",
        stagger: { each: 0.15, from: "random" },
        onComplete: () => {
          iconEls.forEach((el) => {
            gsap.to(el, {
              rotation: "+=6",
              duration: 2 + Math.random(),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          });
        },
      });

      iconEls.forEach((el, i) => {
        const restingX = slots[i];
        Draggable.create(el, {
          type: "x,y",
          inertia: true,
          minimumMovement: 4,
          bounds: layer,
          onPress() {
            gsap.killTweensOf(el, "rotation,y");
            gsap.to(el, {
              scale: 1.15,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onRelease() {
            gsap.killTweensOf(el, "y");
            gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
            gsap.to(el, {
              y: floorY,
              duration: 1.1,
              ease: "bounce.out",
              onComplete: () => {
                const currentX = gsap.getProperty(el, "x") as number;
                const clampedX = gsap.utils.clamp(
                  20,
                  layerW - iconSize - 20,
                  currentX,
                );
                if (clampedX !== currentX) {
                  gsap.to(el, { x: clampedX, duration: 0.3 });
                }
                gsap.to(el, {
                  rotation: `+=${gsap.utils.random(-6, 6)}`,
                  duration: 2 + Math.random(),
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              },
            });
            void restingX;
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className={`hero relative w-full h-screen overflow-hidden flex flex-col items-center justify-center ${googleFont.className}`}
    >
      <div
        ref={iconsLayerRef}
        className="icons-layer absolute inset-0 z-0"
        aria-hidden="true"
      >
        {ICONS.map(({ Icon, label }) => (
          <div
            key={label}
            className="hobby-icon absolute top-0 left-0 w-20 h-20 flex items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-sm"
            style={{ touchAction: "none" }}
          >
            <Icon className="w-20 h-20 text-foreground/80" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="role text-4xl invisible">Frontend Developer</div>
        <h1
          ref={nameRef}
          className="name text-[80px] font-bold p-1 invisible leading-none"
        >
          Jayeesha Ghosh
        </h1>
        <p className="mt-6 text-sm text-foreground/50">
          grab the icons — they&apos;ll fall back down
        </p>
      </div>
    </section>
  );
}
