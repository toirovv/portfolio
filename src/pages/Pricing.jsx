import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbCircleCheck, TbArrowRight } from "react-icons/tb";
import AnimatedBg from "../components/AnimatedBg";

const PLANS = [
  {
    name: "STARTUP",
    price: "$100+",
    desc: "A powerful entry point for personal brands and innovative concepts.",
    features: [
      "High-Performance Landing Page",
      "Tailored Motion Design",
      "Mobile-First Responsiveness",
      "SEO-Optimized Structure",
      "Performance Optimization",
      "Basic Analytics Setup",
    ],
    buttonText: "Start Your Journey",
  },
  {
    name: "BUSINESS",
    price: "$1,000+",
    desc: "Tailored solutions for growing enterprises and ambitious scale-ups.",
    features: [
      "Multi-Page Architecture",
      "Advanced GSAP Interaction",
      "Dynamic CMS Integration",
      "Dedicated Technical Support",
      "Automated Form Handling",
      "Security Hardening",
      "Speed Strategy Implementation",
    ],
    buttonText: "Scale Your Business",
    highlight: true,
  },
  {
    name: "ENTERPRISE",
    price: "agreed upon",
    desc: "Robust, scalable, and secure infrastructures for industry leaders.",
    features: [
      "Custom Full-Stack Ecosystem",
      "Immersive 3D Experiences",
      "Complex API & DB Architecture",
      "Premium 24/7 Consultation",
      "Cloud Deployment & CI/CD",
      "Scalable Auth Systems",
      "Tailored Maintenance Plan",
    ],
    buttonText: "Get a Consultation",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-[#000510] text-slate-200 py-24">
      <AnimatedBg />
      <section className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Investment Plans
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Select the tier that aligns with your project requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-[#020b1a] border border-slate-800 p-8 rounded-3xl flex flex-col transition-all hover:border-slate-600"
            >
              <div className="mb-8">
                <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-600 text-sm">/ project</span>
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <TbCircleCheck className="text-slate-700" /> {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="w-full py-4 rounded-xl border border-slate-700 text-sm font-semibold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
              >
                Choose Plan <TbArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
