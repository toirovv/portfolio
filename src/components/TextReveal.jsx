import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ text, className = "", as = "p", delay = 0, stagger = 0.02 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll(".reveal-char");
    gsap.set(chars, { y: 40, opacity: 0, rotateX: -90 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.to(chars, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger,
            delay,
            ease: "power3.out",
          });
        },
        once: true,
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <span key={i} className="reveal-char inline-block" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
};

const WordReveal = ({ text, className = "", as = "p", delay = 0, stagger = 0.05 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".reveal-word");
    gsap.set(words, { y: 30, opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger,
            delay,
            ease: "power4.out",
          });
        },
        once: true,
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="reveal-word inline-block mr-[0.25em]">{word}</span>
      ))}
    </Tag>
  );
};

export { TextReveal, WordReveal };
