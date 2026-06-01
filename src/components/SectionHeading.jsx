import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionHeading = ({ num, label, title }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".sh-item");

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
        once: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-14">
      <div className="sh-item flex items-center gap-4 mb-5" style={{ opacity: 0, y: 20 }}>
        <span className="text-amber-400 font-mono text-[11px] tracking-[0.3em] font-medium">{num}</span>
        <span className="h-px w-12 bg-gradient-to-r from-amber-500/40 to-transparent" />
        <span className="text-[11px] font-mono tracking-[0.25em] text-slate-500 uppercase">{label}</span>
      </div>
      <h2 className="sh-item text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9]" style={{ opacity: 0, y: 30 }}>
        <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
    </div>
  );
};

export default SectionHeading;
