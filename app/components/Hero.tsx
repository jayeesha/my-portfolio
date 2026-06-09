"use client";
import { useEffect, useRef, useState } from "react";
import { Sour_Gummy } from "next/font/google";
import {
  gsap,
  useGSAP,
  SplitText,
  Draggable,
  ScrollTrigger,
} from "./gsap-plugins";
import Movie from "../icons/Movie";
import Travel from "../icons/Travel";
import Music from "../icons/Music";
import Paint from "../icons/Paint";

const googleFont = Sour_Gummy({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const BASE_ICONS = [
  { Icon: Movie, label: "Movies" },
  { Icon: Music, label: "Music" },
  { Icon: Paint, label: "Paint" },
  { Icon: Travel, label: "Travel" },
] as const;

type IconData = {
  Icon: (typeof BASE_ICONS)[number]["Icon"];
  label: string;
  id: string;
  shouldFall: boolean;
  size: number;
};

// Generated on the client only (random values would otherwise mismatch SSR).
function generateIcons(): IconData[] {
  const count = Math.floor(Math.random() * 21) + 150;
  return Array.from({ length: count }, (_, idx) => {
    const base = BASE_ICONS[idx % BASE_ICONS.length];
    return {
      ...base,
      id: `${base.label}-${idx}`,
      shouldFall: Math.random() < 0.3,
      size: Math.floor(Math.random() * 50) + 32,
    };
  });
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const iconsLayerRef = useRef<HTMLDivElement>(null);
  const [icons, setIcons] = useState<IconData[]>([]);

  // Populate the random icons after mount so server and client markup match.
  useEffect(() => {
    setIcons(generateIcons());
  }, []);

  // Text intro — runs once on mount, independent of the icons state so it
  // isn't reverted/replayed when the icons populate.
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
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      const layer = iconsLayerRef.current;
      if (!layer || !icons.length) return;

      const layerRect = layer.getBoundingClientRect();
      const layerW = layerRect.width;
      const layerH = layerRect.height;

      const iconEls = gsap.utils.toArray<HTMLDivElement>(".hobby-icon");

      // Assign each icon a random resting X and a fixed floor Y
      const restingPositions = iconEls.map((_, i) => {
        const size = icons[i]?.size ?? 48;
        return {
          x: Math.random() * (layerW - size),
          y: layerH - size - Math.floor(Math.random() * 16),
        };
      });

      // Set initial state
      iconEls.forEach((el, i) => {
        const { x, y } = restingPositions[i];
        const shouldFall = icons[i]?.shouldFall ?? false;
        gsap.set(el, {
          x,
          y: shouldFall ? -120 : y,
          autoAlpha: 0,
          rotation: gsap.utils.random(-25, 25),
        });
      });

      // Falling icons: bounce down with stagger
      const fallingEls = iconEls.filter((_, i) => icons[i]?.shouldFall);
      if (fallingEls.length) {
        gsap.to(fallingEls, {
          y: (i) => restingPositions[iconEls.indexOf(fallingEls[i])].y,
          autoAlpha: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "bounce.out",
          stagger: { each: 0.06, from: "random" },
          onComplete: () => startIdleAnimation(fallingEls),
        });
      }

      // Non-falling icons: ease in at their resting position
      const easeInEls = iconEls.filter((_, i) => !icons[i]?.shouldFall);
      if (easeInEls.length) {
        gsap.to(easeInEls, {
          autoAlpha: 1,
          duration: 0.5,
          delay: 0.8,
          ease: "power2.out",
          stagger: { each: 0.03, from: "random" },
          onComplete: () => startIdleAnimation(easeInEls),
        });
      }

      function startIdleAnimation(els: HTMLDivElement[]) {
        els.forEach((el) => {
          gsap.to(el, {
            rotation: `+=${gsap.utils.random(-8, 8)}`,
            duration: 1.8 + Math.random() * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      iconEls.forEach((el, i) => {
        const size = icons[i]?.size ?? 48;
        Draggable.create(el, {
          type: "x,y",
          inertia: true,
          minimumMovement: 4,
          bounds: layer,
          onPress() {
            gsap.killTweensOf(el, "rotation");
            gsap.to(el, {
              scale: 1.2,
              duration: 0.15,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onRelease() {
            gsap.to(el, { scale: 1, duration: 0.15, ease: "power2.out" });
            gsap.to(el, {
              y: restingPositions[i].y,
              duration: 1.1,
              ease: "bounce.out",
              onComplete: () => {
                const currentX = gsap.getProperty(el, "x") as number;
                const clampedX = gsap.utils.clamp(0, layerW - size, currentX);
                if (clampedX !== currentX)
                  gsap.to(el, { x: clampedX, duration: 0.3 });
                gsap.to(el, {
                  // rotation: `+=${gsap.utils.random(-8, 8)}`,
                  duration: 1.8 + Math.random() * 1.5,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              },
            });
          },
        });
      });

      const fadeOut = gsap.timeline({ paused: true });
      fadeOut
        .to(".icons-layer", { autoAlpha: 0, ease: "power2.out" }, 0)
        .to(".hero-content", { autoAlpha: 0, ease: "power2.out" }, 0)
        .to(
          containerRef.current,
          { backgroundColor: "#000000", ease: "power2.out" },
          0,
        );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "50% top",
        onEnter: () => fadeOut.play(),
        onLeaveBack: () => fadeOut.reverse(),
      });
    },
    { scope: containerRef, dependencies: [icons] },
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
        {icons.map(({ Icon, id, size }) => (
          <div
            key={id}
            className="hobby-icon absolute top-0 left-0 flex items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-sm"
            style={{
              touchAction: "none",
              width: `${size}px`,
              height: `${size}px`,
            }}
          >
            <Icon className="text-foreground/80" />
          </div>
        ))}
      </div>

      <div className="hero-content relative z-10 flex flex-col items-center">
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
