"use client";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { gsap, useGSAP } from "./gsap-plugins";

type Project = {
  title: string;
  description: string;
  href: string;
  tag: string;
};

const PROJECTS: Project[] = [
  {
    title: "Project One",
    description:
      "An interactive dashboard with real-time data viz, built on Next.js and D3.",
    href: "#",
    tag: "Web app",
  },
  {
    title: "Project Two",
    description:
      "A design-system component library with motion primitives and docs site.",
    href: "#",
    tag: "Library",
  },
  {
    title: "Project Three",
    description:
      "A generative-art playground for exploring shaders and creative coding.",
    href: "#",
    tag: "Experiment",
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
              <div className="aspect-video rounded-xl bg-gradient-to-br from-foreground/10 to-foreground/5" />
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
                className="inline-flex items-center gap-2 text-sm font-medium mt-auto hover:gap-3 transition-all"
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
