"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "./gsap-plugins";
import { motion, useScroll, useTransform } from "motion/react";

const BULLETS = [
  { label: "Name", value: "Jayeesha Ghosh" },
  {
    label: "Experience",
    value: "Frontend engineer focused on interactive UIs",
  },
  {
    label: "Core tech",
    value: "React, Next.js, TypeScript, JavaScript, Tailwind",
  },
  { label: "Currently", value: "Building delightful web experiences" },
  { label: "Hobbies", value: "Painting, Sketching and Traveling" },
];

export function About() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["circle(0% at 50% 50%)", "circle(75% at 50% 50%)"],
  );

  // useGSAP(
  //   () => {
  //     const trigger = {
  //       trigger: sectionRef.current,
  //       toggleActions: "restart none restart none",
  //     } as const;
  //     gsap.from(".about-photo", {
  //       x: -100,
  //       autoAlpha: 0,
  //       duration: 0.9,
  //       ease: "power2.out",
  //       scrollTrigger: trigger,
  //     });
  //     gsap.from(".about-heading", {
  //       x: 100,
  //       autoAlpha: 0,
  //       duration: 0.8,
  //       ease: "power2.out",
  //       scrollTrigger: trigger,
  //     });
  //     gsap.from(".about-bullet", {
  //       x: 50,
  //       autoAlpha: 0,
  //       duration: 0.8,
  //       ease: "power2.out",
  //       stagger: 0.2,
  //       scrollTrigger: trigger,
  //     });
  //     return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  //   },
  //   { scope: sectionRef },
  // );

  return (
    <motion.div ref={sectionRef} style={{ clipPath }}>
      <section
        id="about"
        className="w-full min-h-screen px-6 md:px-16 py-24 flex items-center bg-white"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <div
            className="about-photo relative w-full aspect-square max-w-md mx-auto rounded-full
         overflow-hidden bg-foreground/5 border border-foreground/10"
          >
            <Image
              src="/Jayeesha_Ghosh_picture.png"
              alt="Profile"
              fill
              className="object-cover"
              priority={false}
            />
          </div>

          <div>
            <h2 className="about-heading text-4xl md:text-5xl font-bold mb-8 text-gray-800">
              About me
            </h2>
            <ul className="space-y-4">
              {BULLETS.map((b) => (
                <li
                  key={b.label}
                  className="about-bullet flex gap-3 text-base md:text-lg text-gray-800"
                >
                  <span>
                    <span className="font-semibold">{b.label}</span>
                    <span>: {b.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
