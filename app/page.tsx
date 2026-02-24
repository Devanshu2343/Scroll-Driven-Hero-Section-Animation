"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

const stats = [
  { value: "82%", label: "Higher user engagement" },
  { value: "64%", label: "Better ad recall" },
  { value: "47%", label: "Lower bounce rate" }
];

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const letters = useMemo(() => Array.from("WELCOME ITZFIZZ"), []);

  useEffect(() => {
    if (!heroRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      intro
        .from(".hero-letter", {
          y: 22,
          opacity: 0,
          duration: 0.65,
          stagger: 0.035
        })
        .from(
          ".stat-item",
          {
            y: 14,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
          },
          "-=0.3"
        )
        .from(
          ".visual-frame",
          {
            y: 20,
            opacity: 0,
            duration: 0.6
          },
          "-=0.35"
        );

      const section = heroRef.current;
      const visual = visualRef.current;
      const track = trackRef.current;

      if (!section || !visual || !track) {
        return () => intro.kill();
      }

      const setVisualX = gsap.quickSetter(visual, "x", "px");
      const setVisualY = gsap.quickSetter(visual, "y", "px");
      const setVisualRotate = gsap.quickSetter(visual, "rotation", "deg");
      const setTrackX = gsap.quickSetter(track, "x", "px");
      const ease = gsap.parseEase("power2.out");

      let target = 0;
      let current = 0;
      let raf = 0;

      const updateTarget = () => {
        const rect = section.getBoundingClientRect();
        const progress = gsap.utils.clamp(
          0,
          1,
          -rect.top / Math.max(rect.height, 1)
        );
        target = progress;
      };

      const render = () => {
        current += (target - current) * 0.12;
        const eased = ease(current);
        const horizontal = (eased - 0.5) * window.innerWidth * 0.54;

        setVisualX(horizontal);
        setVisualY(-eased * 36);
        setVisualRotate((eased - 0.5) * 10);
        setTrackX(horizontal * -0.2);

        if (Math.abs(target - current) > 0.0004) {
          raf = requestAnimationFrame(render);
          return;
        }

        current = target;
      };

      const requestRender = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(render);
      };

      const onScroll = () => {
        updateTarget();
        requestRender();
      };

      const onResize = () => {
        updateTarget();
        requestRender();
      };

      updateTarget();
      requestRender();

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);

      return () => {
        intro.kill();
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section ref={heroRef} className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title" aria-label="WELCOME ITZFIZZ">
            {letters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="hero-letter"
                aria-hidden="true"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          <ul className="stats-list">
            {stats.map((item) => (
              <li key={item.value} className="stat-item">
                <p className="stat-value">{item.value}</p>
                <p className="stat-label">{item.label}</p>
              </li>
            ))}
          </ul>

          <div className="visual-frame">
            <div ref={trackRef} className="track-line" />
            <div ref={visualRef} className="visual-object" />
          </div>
        </div>
      </section>

      <section className="scroll-space" aria-hidden="true" />
    </main>
  );
}
