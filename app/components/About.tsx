"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { annotate, annotationGroup } from "rough-notation";
import { gsap, useGSAP } from "./gsap-plugins";

type Annotation = ReturnType<typeof annotate>;
type AnnotationGroup = ReturnType<typeof annotationGroup>;

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const valueRefs = useRef<(HTMLElement | null)[]>([]);
  const groupRef = useRef<AnnotationGroup | null>(null);

  // Build the annotations once, kept hidden. They are positioned and drawn only
  // when .show() runs, which we trigger after the GSAP reveal has settled.
  useEffect(() => {
    const annotations: Annotation[] = [];

    if (photoRef.current) {
      annotations.push(
        annotate(photoRef.current, {
          type: "box",
          color: "#43c7ff",
          strokeWidth: 2,
          padding: 5,
          iterations: 6,
          animationDuration: 1000,
        }),
      );
    }

    if (headingRef.current) {
      annotations.push(
        annotate(headingRef.current, {
          type: "underline",
          color: "#43c7ff",
          strokeWidth: 2,
          multiline: true,
          animationDuration: 600,
        }),
      );
    }

    valueRefs.current.forEach((el) => {
      if (el) {
        annotations.push(
          annotate(el, {
            type: "highlight",
            color: "#fbb53c59",
            multiline: true,
            animationDuration: 800,
          }),
        );
      }
    });

    // A group plays them in sequence instead of all at once.
    const group = annotationGroup(annotations);
    groupRef.current = group;

    // Re-position if the layout reflows on resize.
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        annotations.forEach((a) => {
          a.hide();
          a.show();
        });
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      annotations.forEach((a) => a.remove());
      groupRef.current = null;
    };
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current,
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(75% at 50% 50%)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onLeaveBack: () => groupRef.current?.hide(),
        },
        // Annotations are drawn only once the reveal has finished.
        onComplete: () => groupRef.current?.show(),
      });

      tl.from(".about-photo", {
        x: -100,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .from(
          ".about-heading",
          { x: 50, autoAlpha: 0, duration: 0.8, ease: "power2.out" },
          "<",
        )
        .from(
          ".about-bullet",
          {
            x: 50,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
          },
          "<",
        );
    },
    { scope: wrapperRef },
  );

  return (
    <div ref={wrapperRef}>
      <section
        ref={sectionRef}
        id="about"
        className="w-full min-h-screen px-6 md:px-16 py-24 flex items-center bg-white"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <div
            ref={photoRef}
            className="about-photo relative h-95 w-80 aspect-square max-w-md mx-auto rounded-[40] rotate-355
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
            <h2
              ref={headingRef}
              className="about-heading text-4xl md:text-5xl font-bold mb-8 text-gray-800 inline-block"
            >
              About me
            </h2>
            <ul className="space-y-4">
              {BULLETS.map((b, i) => (
                <li
                  key={b.label}
                  className="about-bullet flex gap-3 text-base md:text-lg text-gray-800"
                >
                  <span>
                    <span className="font-semibold">{b.label}</span>:{" "}
                    <span
                      ref={(el) => {
                        valueRefs.current[i] = el;
                      }}
                    >
                      {b.value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
