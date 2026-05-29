"use client";
import { useRef } from "react";
import { Download, Mail } from "lucide-react";
import { gsap, useGSAP } from "./gsap-plugins";

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.67 5.58.67 11.86c0 5.02 3.25 9.27 7.76 10.77.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.52-.29-5.18-1.26-5.18-5.62 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.44.11-3 0 0 .95-.3 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.17-1.47 3.12-1.17 3.12-1.17.62 1.56.23 2.71.11 3 .73.8 1.17 1.81 1.17 3.05 0 4.37-2.67 5.33-5.2 5.61.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.79.55 4.5-1.5 7.75-5.75 7.75-10.77C23.33 5.58 18.27.5 12 .5Z" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const LINKS = [
  {
    label: "Download CV",
    href: "/cv-placeholder.pdf",
    Icon: Download,
    download: true,
    external: false,
  },
  {
    label: "Email",
    href: "mailto:juhirani1996@gmail.com",
    Icon: Mail,
    download: false,
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/",
    Icon: Github,
    download: false,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    Icon: Linkedin,
    download: false,
    external: true,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      } as const;

      gsap.from(".contact-heading", {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: trigger,
      });

      gsap.from(".contact-link", {
        y: 20,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: trigger,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full min-h-[70vh] px-6 md:px-16 py-24 flex flex-col items-center justify-center text-center"
    >
      <h2 className="contact-heading text-4xl md:text-6xl font-bold mb-12">
        Let&apos;s talk.
      </h2>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {LINKS.map(({ label, href, Icon, download, external }) => (
          <a
            key={label}
            href={href}
            {...(download ? { download: "" } : {})}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="contact-link inline-flex items-center gap-2 px-5 py-3 rounded-full border border-foreground/15 hover:bg-foreground hover:text-background transition-colors text-sm md:text-base font-medium"
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5" />
            {label}
          </a>
        ))}
      </div>
      <p className="mt-16 text-xs text-foreground/40">
        © {new Date().getFullYear()} Jayeesha Ghosh
      </p>
    </section>
  );
}
