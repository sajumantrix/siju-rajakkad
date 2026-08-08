"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollAnimation() {
  const pathname = usePathname();

  useEffect(() => {
    // Signal to CSS that JS is running — enables opacity:0 animations
    document.body.classList.add("js-loaded");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    // Re-scan on every route change: client-side navigation keeps <body>
    // (and its js-loaded class) mounted while swapping page content, so a
    // fresh observer is needed each time or newly rendered elements stay
    // stuck at opacity:0 with nothing left to reveal them.
    const timer = setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);
}
