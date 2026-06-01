import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Resume from "../assets/resume.pdf";
import {
  TbArrowRight,
  TbSend,
  TbCode,
  TbBolt,
  TbWorld,
  TbShieldCheck,
  TbDeviceMobile,
  TbExternalLink,
  TbCpu,
  TbLayersUnion,
  TbPalette,
  TbDatabase,
  TbTerminal2,
} from "react-icons/tb";
import { FaGithub, FaTelegram } from "react-icons/fa";
import AnimatedBg from "../components/AnimatedBg";
import Magnetic from "../components/Magnetic";
import GlowCard from "../components/GlowCard";
import SectionHeading from "../components/SectionHeading";
import ScrambleText from "../components/ScrambleText";
import { sendTelegram } from "../services/telegram";
import { PROJECTS } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = ["About", "Work", "Services", "Skills", "Contact"];

const EXPERIENCES = [
  {
    role: "Senior Frontend Engineer",
    company: "Tech-Innovations Lab",
    period: "2024 — Present",
    desc: "Architecting high-performance, pixel-perfect interfaces using Next.js and TypeScript. Driving frontend scalability and elevating core UI component systems.",
    icon: <TbCpu size={16} />,
  },
  {
    role: "Frontend Developer",
    company: "Global Soft Solutions",
    period: "2023 — 2024",
    desc: "Developed responsive fintech dashboards with React and TypeScript. Improved Lighthouse scores by 40%.",
    icon: <TbLayersUnion size={16} />,
  },
  {
    role: "Junior Frontend Developer",
    company: "NEXUS IT Center",
    period: "2022 — 2023",
    desc: "Built interactive UI components and landing pages. Transitioned legacy jQuery codebase to React.",
    icon: <TbTerminal2 size={16} />,
  },
];

const SKILL_GROUPS = [
  {
    category: "Frontend",
    icon: <TbPalette size={18} className="text-amber-400" />,
    items: [
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    category: "APIs & Data",
    icon: <TbDatabase size={18} className="text-teal-400" />,
    items: ["REST / GraphQL", "Next.js API", "Supabase", "TanStack Query"],
  },
  {
    category: "Tools",
    icon: <TbBolt size={18} className="text-yellow-400" />,
    items: ["Git / GitHub", "Vite / Webpack", "Figma", "Vitest"],
  },
];

const Marquee = ({ items }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1 });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-4 border-y border-white/[0.04]"
    >
      <motion.div
        animate={inView ? { x: ["0%", "-50%"] } : { x: "0%" }}
        transition={
          inView
            ? { repeat: Infinity, duration: 35, ease: "linear" }
            : undefined
        }
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-xs md:text-sm text-slate-500 font-mono tracking-widest uppercase inline-flex items-center gap-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600/50" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const CountUp = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const once = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !once.current) {
          once.current = true;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else setCount(Math.floor(current));
          }, 25);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouse = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 12);
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
      style={{ perspective: 1200, rotateX, rotateY }}
      transition={{ type: "tween", duration: 0.08, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const ParallaxSection = ({ children, className = "", speed = 0.1 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const inner = el?.querySelector(".parallax-inner");
    if (!inner) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.set(inner, { y: self.progress * speed * 150 - speed * 75 });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div className="parallax-inner">{children}</div>
    </div>
  );
};

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 35 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", ...NAV_LINKS.map((l) => l.toLowerCase())];
      const pos = window.scrollY + 150;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    const result = await sendTelegram(form);
    setLoading(false);

    if (result?.ok || result?.result) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    } else {
      setError("Unable to send message. Check your Telegram bot settings.");
    }
  };

  const isExternalLink = (url) => /^https?:\/\//.test(url);

  const sectionDots = ["home", ...NAV_LINKS.map((l) => l.toLowerCase())];

  return (
    <div
      ref={containerRef}
      className="bg-[#0c1a2e] text-white overflow-x-hidden relative selection:bg-amber-500/20"
    >
      <AnimatedBg />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-teal-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[#0c1a2e] flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-4xl font-black text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
        {sectionDots.map((id) => (
          <button key={id} onClick={() => scrollTo(id)} aria-label={id}>
            <span
              className={`block rounded-full transition-all duration-500 ${activeSection === id ? "bg-white w-3 h-1.5" : "bg-white/20 w-1.5 h-1.5 hover:bg-white/40"}`}
            />
          </button>
        ))}
      </nav>

      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center px-5 md:px-6 pt-5 md:pt-5"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="md:grid md:grid-cols-12 md:gap-8 md:items-center">
            <div className="md:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <span className="text-[11px] font-mono tracking-[0.25em] text-slate-500 uppercase border-l-2 border-amber-400/60 pl-3">
                  Frontend Developer
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]"
                >
                  <span className="text-white">Asadbek</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]"
                >
                  <span className="bg-gradient-to-r from-slate-300 via-slate-400 to-slate-600 bg-clip-text text-transparent">
                    Toirov
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-slate-400 text-sm md:text-base max-w-md leading-relaxed mt-6 mb-8 font-body"
              >
                Frontend Engineer with 1+ year of experience building scalable
                web applications. Passionate about React, UI/UX performance, and
                writing clean, maintainable code.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="flex gap-3 md:gap-4 flex-wrap items-center"
              >
                <Magnetic
                  onClick={() => scrollTo("work")}
                  as="button"
                  className="px-6 md:px-8 py-3.5 md:py-4 bg-white text-slate-950 rounded-full text-xs md:text-sm font-semibold hover:bg-amber-50 transition-colors inline-flex items-center gap-2"
                >
                  View Work <TbArrowRight size={16} />
                </Magnetic>
                <Magnetic
                  onClick={() => scrollTo("contact")}
                  as="button"
                  className="px-6 md:px-8 py-3.5 md:py-4 border border-white/20 text-white rounded-full text-xs md:text-sm font-semibold hover:bg-white/5 transition-colors"
                >
                  Get in Touch
                </Magnetic>
                <a
                  href={Resume}
                  target="_blank"
                  download
                  className="px-6 md:px-8 py-3.5 md:py-4 border border-white/20 text-white rounded-full text-xs md:text-sm font-semibold hover:bg-white/5 transition-colors inline-flex items-center justify-center"
                >
                  Download CV
                </a>
                <div className="flex gap-2 ml-2">
                  <a
                    href="https://github.com/toirovv"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <FaGithub size={13} />
                  </a>
                  <a
                    href="https://t.me/toirovvasad"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <FaTelegram size={13} />
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden md:block md:col-span-5 relative"
            >
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/[0.04] to-transparent rounded-[40px]" />
                <div className="absolute inset-4 border border-white/[0.04] rounded-[32px]" />
                <div className="absolute inset-8 border border-white/[0.03] rounded-[24px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[180px] font-black text-white/[0.02] select-none">
                    AT
                  </span>
                </div>
                <div className="absolute top-1/4 -left-4 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-4 w-32 h-32 bg-gradient-to-br from-teal-500/8 to-transparent rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-slate-400/30 to-transparent" />
        </motion.div>
      </section>

      <ParallaxSection speed={0.06}>
        <section
          id="about"
          className="relative z-10 py-24 md:py-36 px-5 md:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              num="01"
              label="About"
              title="The Architect Behind the Code"
            />
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div className="space-y-4 md:space-y-5 text-sm md:text-base text-slate-400 leading-relaxed">
                <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
                  Frontend Engineer with 1+ years of experience crafting
                  high-performance, accessible interfaces that seamlessly bridge
                  the gap between complex functionality and refined aesthetics.
                </p>

                <p className="text-slate-500 leading-relaxed font-body">
                  Operating from Tashkent, I collaborate with global partners to
                  transform intricate concepts into elegant, high-impact digital
                  realities.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { value: 10, suffix: "+", label: "Projects" },
                  { value: 15, suffix: "+", label: "Clients" },
                  { value: 1, suffix: "+ Yrs", label: "Experience" },
                  { value: 25, suffix: "+", label: "Technologies" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border border-white/[0.06] rounded-xl md:rounded-2xl p-4 md:p-6"
                  >
                    <div className="text-2xl md:text-4xl font-black text-white">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <section id="work" className="relative z-10 py-24 md:py-36 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            num="02"
            label="Selected Work"
            title="Projects I've Built"
          />
          <div className="grid md:grid-cols-2 gap-4 md:gap-5 mt-4">
            {PROJECTS.slice(0, 4).map((project, i) => (
              <TiltCard key={i}>
                <GlowCard
                  delay={i * 0.05}
                  className="h-full p-5 md:p-8 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div
                      className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-r ${project.color} p-[1px]`}
                    >
                      <div className="w-full h-full rounded-xl bg-[#0c1a2e] flex items-center justify-center text-white/80">
                        {project.icon}
                      </div>
                    </div>
                    <span className="text-4xl md:text-5xl font-black text-white/[0.03] font-mono leading-none">
                      {project.num}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold mb-1.5 md:mb-2 tracking-tight group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-5 font-body">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4 md:mb-5">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.06] pt-3 md:pt-4">
                    <span className="text-[11px] font-mono text-slate-500">
                      {project.year}
                    </span>
                    {isExternalLink(project.link) ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-amber-400/70 text-xs font-medium hover:text-amber-300 transition-colors"
                      >
                        View Project
                        <TbExternalLink
                          size={11}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </a>
                    ) : (
                      <Link
                        to={project.link}
                        className="inline-flex items-center gap-1 text-amber-400/70 text-xs font-medium hover:text-amber-300 transition-colors"
                      >
                        View Project
                        <TbExternalLink
                          size={11}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </Link>
                    )}
                  </div>
                </GlowCard>
              </TiltCard>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View All Projects <TbArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="relative z-10 py-24 md:py-36 px-5 md:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            num="03"
            label="Journey"
            title="Experience & Services"
          />
          <div className="grid md:grid-cols-5 gap-8 mt-4 items-start">
            <div className="md:col-span-2 space-y-6 md:space-y-8">
              {EXPERIENCES.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="border-l-2 border-white/[0.06] pl-4 md:pl-5 hover:border-white/20 transition-all duration-500"
                >
                  <span className="text-[11px] font-mono text-slate-500">
                    {exp.period}
                  </span>
                  <h4 className="text-xs md:text-sm font-bold text-white mt-1 flex items-center gap-2">
                    {exp.icon} {exp.role}
                  </h4>
                  <p className="text-[11px] md:text-xs text-slate-500 mt-0.5 mb-1.5 font-mono">
                    {exp.company}
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-body">
                    {exp.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="md:col-span-3">
              <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
                {[
                  {
                    icon: <TbCpu size={24} />,
                    title: "Architecture",
                    desc: "Scalable microservices systems built for performance.",
                  },
                  {
                    icon: <TbShieldCheck size={24} />,
                    title: "Security",
                    desc: "Enterprise encryption and robust auth implementations.",
                  },
                  {
                    icon: <TbPalette size={24} />,
                    title: "Design",
                    desc: "Fluid interfaces with motion-driven user experiences.",
                  },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-white/[0.06] rounded-xl p-4 md:p-5 hover:border-white/20 transition-all duration-500 group"
                  >
                    <div className="text-slate-500 mb-2 md:mb-3 group-hover:text-amber-400 transition-colors">
                      {s.icon}
                    </div>
                    <h4 className="text-xs md:text-sm font-bold text-white mb-1 uppercase tracking-wider">
                      {s.title}
                    </h4>
                    <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed font-body">
                      {s.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ParallaxSection speed={-0.04}>
        <section
          id="skills"
          className="relative z-10 py-24 md:py-36 px-5 md:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              num="04"
              label="Stack"
              title="Technologies I Master"
            />
            <div className="mt-4">
              <Marquee
                items={[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "PostgreSQL",
                  "Tailwind CSS",
                  "Framer Motion",
                  "Docker",
                  "AWS",
                  "GraphQL",
                  "Redis",
                  "WebSocket",
                ]}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-5 mt-6 md:mt-8">
              {SKILL_GROUPS.map((group, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-white/[0.06] rounded-xl p-5 md:p-6 hover:border-white/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4 md:mb-5 pb-3 md:pb-4 border-b border-white/[0.06]">
                    {group.icon}
                    <h3 className="text-sm font-bold text-white">
                      {group.category}
                    </h3>
                  </div>
                  <div className="space-y-2.5 md:space-y-3">
                    {group.items.map((skill, j) => (
                      <div
                        key={j}
                        className="flex justify-between items-center group/skill"
                      >
                        <span className="text-xs md:text-sm text-slate-400 group-hover/skill:text-amber-300 transition-colors font-body">
                          {skill}
                        </span>
                        <span className="w-5 h-[1px] bg-gradient-to-r from-slate-600/30 to-transparent group-hover/skill:from-amber-400/40 transition-all" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      <section
        id="contact"
        className="relative z-10 py-24 md:py-36 px-5 md:px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="md:grid md:grid-cols-12 md:gap-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="md:col-span-5 mb-10 md:mb-0"
            >
              <span className="text-[11px] font-mono tracking-[0.3em] text-slate-500 uppercase block mb-2">
                05
              </span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white/[0.06] select-none">
                Contact
              </h2>
              <div className="mt-4 md:mt-6 space-y-3">
                {[
                  { label: "@toirovvasad", href: "https://t.me/toirovvasad" },
                  {
                    label: "github.com/toirovv",
                    href: "https://github.com/toirovv",
                  },
                  { label: "+998 93 857 33 11", href: "tel:+998938573311" },
                ].map((item, i) => (
                  <div key={i}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-slate-400 hover:text-white transition-colors font-body"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-1.5">
                    Name
                  </p>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/[0.06] px-0 pb-2 pt-1 text-sm text-white outline-none transition-all duration-300 font-body focus:border-slate-400"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-1.5">
                    Email
                  </p>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/[0.06] px-0 pb-2 pt-1 text-sm text-white outline-none transition-all duration-300 font-body focus:border-slate-400"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-1.5">
                    Message
                  </p>
                  <textarea
                    required
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/[0.06] px-0 pb-2 pt-1 text-sm text-white outline-none transition-all duration-300 font-body resize-none focus:border-slate-400"
                  />
                </div>
                {error && <p className="text-xs text-slate-400">{error}</p>}
                <div className="flex items-center justify-between pt-2">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ x: 4 }}
                    className="text-sm text-white font-medium inline-flex items-center gap-2 transition-opacity disabled:opacity-40"
                  >
                    {loading ? "Sending..." : sent ? "Sent" : "Send"}
                    {!loading && !sent && <TbArrowRight size={14} />}
                  </motion.button>
                  <span className="text-[10px] font-mono text-slate-600">
                    toirovv.dev
                  </span>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
