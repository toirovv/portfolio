import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "!<>-_\\/[]{}—=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ScrambleText = ({ text, className = "", as = "p", delay = 0, speed = 0.04 }) => {
  const ref = useRef(null);
  const animationRef = useRef(null);

  const scramble = useCallback((el, finalText) => {
    const chars = el.querySelectorAll(".sc-char");
    const total = chars.length;
    let frame = 0;
    let resolved = 0;

    const tick = () => {
      frame++;
      for (let i = 0; i < total; i++) {
        if (chars[i].dataset.done === "true") continue;
        const charSpeed = speed + (i / total) * 0.06;
        if (frame * charSpeed > i) {
          const random = Math.random();
          if (random < 0.05) {
            chars[i].textContent = finalText[i];
            chars[i].dataset.done = "true";
            resolved++;
          } else {
            chars[i].textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
      }
      if (resolved < total) {
        animationRef.current = requestAnimationFrame(tick);
      }
    };

    animationRef.current = requestAnimationFrame(tick);
  }, [speed]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finalText = text;
    el.textContent = "";
    const spans = finalText.split("").map((char) => {
      const span = document.createElement("span");
      span.className = "sc-char inline-block";
      span.textContent = char === " " ? "\u00A0" : char;
      span.dataset.done = "false";
      el.appendChild(span);
      return span;
    });

    gsap.set(spans, { opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.to(spans, {
            opacity: 1,
            duration: 0.001,
            delay,
            onComplete: () => scramble(el, finalText),
          });
        },
        once: true,
      });
    }, el);

    return () => {
      ctx.revert();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [text, delay, scramble]);

  const Tag = as;
  return <Tag ref={ref} className={className} />;
};

export default ScrambleText;
