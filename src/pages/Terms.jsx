import React from "react";
import { motion } from "framer-motion";
import AnimatedBg from "../components/AnimatedBg";

const sections = [
    {
      title: "Terms of Engagement",
      content:
        "By accessing this portfolio, you acknowledge that all materials and code samples are provided for informational and professional evaluation purposes. All content is offered 'as-is' without express or implied warranties.",
    },
    {
      title: "Intellectual Property Rights",
      content:
        "All proprietary code, UI/UX designs, and intellectual assets showcased here are the exclusive property of TOIROVV. Unauthorized reproduction, distribution, or commercial exploitation is strictly prohibited without prior written consent.",
    },
    {
      title: "Limitation of Liability",
      content:
        "TOIROVV shall not be held liable for any direct, indirect, or consequential damages arising from the access, use, or performance limitations of this site or its integrated components.",
    },
    {
      title: "Third-Party Integrations",
      content:
        "This site may reference or link to external third-party platforms. We assume no responsibility for the content, privacy policies, or operational practices of these external entities.",
    },
    {
      title: "Agreement Modifications",
      content:
        "We reserve the unilateral right to amend these terms at any time. Continued interaction with this platform following any updates constitutes your binding acceptance of the revised conditions.",
    },
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#0c1a2e] text-white overflow-x-hidden">
      <AnimatedBg />
      <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-6 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] text-slate-500 uppercase mb-4 block">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[0.9] mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm font-body">
            Last updated: June 2026
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <h2 className="text-lg font-bold text-white mb-2">{s.title}</h2>
              <p className="text-sm text-slate-400 font-body leading-relaxed">
                {s.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms;
