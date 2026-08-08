"use client";
import { useEffect } from "react";

export function useScrollAnimation() {
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

    const timer = setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}
