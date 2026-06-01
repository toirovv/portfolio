import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBg from "../components/AnimatedBg";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Framer Motion / GSAP", level: 88 },
  { name: "HTML / CSS", level: 95 },
  { name: "JavaScript (ES6+)", level: 92 },
];

const exp = [
  {
    role: "Senior Frontend Engineer",
    company: "Tech-Innovations Lab",
    period: "2024 — Present",
    desc: "Building pixel-perfect UIs with Next.js, TypeScript, and Tailwind. Leading frontend architecture and mentoring juniors.",
  },
  {
    role: "Frontend Developer",
    company: "Global Soft Solutions",
    period: "2023 — 2024",
    desc: "Developed responsive fintech dashboards with React and TypeScript. Improved Lighthouse scores by 40%.",
  },
  {
    role: "Junior Frontend Developer",
    company: "NEXUS IT Center",
    period: "2022 — 2023",
    desc: "Built interactive UI components and landing pages. Transitioned legacy jQuery codebase to React.",
  },
];

const values = [
  { num: "100", label: "Pixel Perfect" },
  { num: "3+", label: "Years Exp" },
  { num: "30+", label: "Projects" },
  { num: "99", label: "Uptime" },
];

const skillIcons = {
  "React / Next.js": "R",
  TypeScript: "TS",
  "Tailwind CSS": "TW",
  "Framer Motion / GSAP": "MG",
  "HTML / CSS": "HC",
  "JavaScript (ES6+)": "JS",
};

const About = () => {
  const expRef = useRef(null);

  useEffect(() => {
    const items = expRef.current?.querySelectorAll(".exp-item");
    if (items?.length) {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: expRef.current,
          start: "top 80%",
          onEnter: () =>
            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
            }),
          once: true,
        });
      }, expRef.current);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0c1a2e] text-white overflow-x-hidden">
      <AnimatedBg />
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 md:mb-20"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] text-slate-500 uppercase mb-4 block">
            02 / About
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.9] mb-3">
            Frontend
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
              Engineer
            </span>
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="text-slate-500 text-sm font-body">
              Tashkent, UZ
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="md:col-span-7 text-slate-300 text-base md:text-lg leading-relaxed font-body"
          >
            I create fast, accessible, and visually polished interfaces. Every
            component, transition, and layout is crafted with care — from the
            first wireframe to the final deploy.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5 text-slate-500 text-sm leading-relaxed font-body"
          >
            Specializing in React ecosystems, modern CSS, and animation
            libraries. I turn complex designs into smooth, responsive
            experiences.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-14 md:mb-20"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="border border-white/[0.06] rounded-2xl p-4 md:p-5 text-center"
            >
              <p className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {v.num}
              </p>
              <p className="text-[11px] font-mono text-slate-500 mt-1">
                {v.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-mono tracking-[0.2em] text-slate-500 uppercase">
              Tech Stack
            </span>
            <span className="h-px flex-1 bg-white/[0.04]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative border border-white/[0.06] rounded-xl p-4 md:p-5 overflow-hidden hover:border-white/[0.15] transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[11px] font-mono font-bold text-slate-400 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                    {skillIcons[skill.name]}
                  </span>
                  <span className="text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: i * 0.06,
                      ease: "power3.out",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-slate-400 to-slate-600"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div ref={expRef}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-mono tracking-[0.2em] text-slate-500 uppercase">
              Experience
            </span>
            <span className="h-px flex-1 bg-white/[0.04]" />
          </div>
          <div className="space-y-3">
            {exp.map((item, i) => (
              <div
                key={i}
                className="exp-item border border-white/[0.06] rounded-2xl p-5 md:p-6 hover:border-white/[0.12] transition-all duration-300"
                style={{ opacity: 0, y: 15 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white">
                      {item.role}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {item.company}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white/[0.03] px-2 py-1 rounded self-start whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-400 font-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
