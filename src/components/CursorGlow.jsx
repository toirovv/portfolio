import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const CursorGlow = () => {
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 250, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 22, mass: 0.4 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (prefersReduced) return;

    const move = (e) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX - 16);
        y.set(e.clientY - 16);
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced, x, y]);

  if (prefersReduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-slate-400/25 pointer-events-none z-[999] hidden lg:block"
      style={{ x: springX, y: springY }}
    />
  );
};

export default CursorGlow;
