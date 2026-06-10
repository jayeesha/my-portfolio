"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { gsap, useGSAP } from "./gsap-plugins";

type Project = {
  title: string;
  description: string;
  href: string;
  screenshot: string;
  tag: string;
};

const PROJECTS: Project[] = [
  {
    title: "Geo Green Cover",
    description: "A Green Cover Change Detection app",
    href: "https://geo-green-cover.vercel.app/",
    screenshot: "/geo_green_cover_project.png",
    tag: "Environment",
  },
  {
    title: "Doodle Detect",
    description: "Draw on a canvas and let AI guess what your sketch is",
    href: "https://doodle-detect.vercel.app/",
    screenshot: "/doodle_detect_project.png",
    tag: "AI",
  },
  {
    title: "Movie Explorer",
    description:
      "Movie discovery app built with React, TypeScript, Vite and The Movie Database (TMDb) API",
    href: "https://movie-explorer-ftj28n8jz-jayeeshas-projects.vercel.app/",
    screenshot: "/movie_explorer_project.png",
    tag: "Movie",
  },
  {
    title: "BTS Break App",
    description:
      "Electron App built with React and TypeScript that locks the screen with an animated character to enforce breaks",
    href: "https://github.com/jayeesha/break-bts-app",
    screenshot: "/BTS_break_project.png",
    tag: "Electron App",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      gsap.from(".projects-heading", {
        y: 30,
        autoAlpha: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(track, {
        x: () => -(track.scrollWidth - document.documentElement.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () =>
            "+=" + (track.scrollWidth - document.documentElement.clientWidth),
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full h-screen overflow-hidden"
    >
      <div className="h-full flex flex-col py-20 md:py-24">
        <h2 className="projects-heading text-4xl md:text-5xl font-bold mb-10 px-6 md:px-16 shrink-0">
          Projects
        </h2>

        <div
          ref={trackRef}
          className="flex gap-6 px-6 md:px-16 will-change-transform"
        >
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="shrink-0 w-[80vw] sm:w-[65vw] md:w-[50vw] lg:w-[38vw] rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 flex flex-col gap-4"
            >
              <div className="relative w-full aspect-video">
                <Link href={p.href} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={p.screenshot}
                    alt={`${p.screenshot}`}
                    fill
                    className="rounded-xl"
                  />
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/50">
                {p.tag}
              </div>
              <h3 className="text-2xl font-bold">{p.title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {p.description}
              </p>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium mt-auto"
              >
                View project
                <ExternalLink className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
