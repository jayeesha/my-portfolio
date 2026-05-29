"use client";
import { useRef } from "react";
import { gsap, useGSAP, ScrollSmoother } from "./gsap-plugins";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.5,
        effects: true,
      });
    },
    { scope: wrapperRef },
  );

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
