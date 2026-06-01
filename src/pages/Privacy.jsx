import React from "react";
import { motion } from "framer-motion";
import AnimatedBg from "../components/AnimatedBg";

const sections = [
  {
    title: "Data Collection Principles",
    content:
      "Transparency is fundamental. We collect only essential information—primarily contact details provided voluntarily through our communication channels—alongside anonymized usage analytics to enhance your experience.",
  },
  {
    title: "Purpose of Processing",
    content:
      "Your data is processed exclusively to facilitate project communication, service refinement, and performance optimization. We strictly maintain a zero-tolerance policy regarding the sale or unauthorized sharing of your personal information.",
  },
  {
    title: "Cookie Governance",
    content:
      "This platform uses minimal, non-intrusive cookies solely to ensure functionality and remember your cookie preference. We do not use tracking, advertising, or third-party marketing cookies.",
    details: [
      { name: "cookie-consent", purpose: "Stores your cookie acceptance preference", duration: "1 year" },
    ],
  },
  {
    title: "Security & Integrity",
    content:
      "We employ industry-standard protocols to safeguard your digital footprint. While no system provides absolute immunity against vulnerabilities, we remain committed to proactive risk mitigation and data integrity.",
  },
  {
    title: "Direct Communication",
    content:
      "Should you require clarification regarding our data practices, please initiate contact via the site portal or reach out directly to asadtoirovv@gmail.com for prompt assistance.",
  },
];

const Privacy = () => {
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
            Privacy Policy
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
              {s.details && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-xs md:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left text-slate-300 font-semibold py-2 pr-4">Cookie</th>
                        <th className="text-left text-slate-300 font-semibold py-2 pr-4">Purpose</th>
                        <th className="text-left text-slate-300 font-semibold py-2">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.details.map((d, j) => (
                        <tr key={j} className="border-b border-white/[0.04]">
                          <td className="py-2 pr-4 text-slate-400 font-mono">{d.name}</td>
                          <td className="py-2 pr-4 text-slate-400">{d.purpose}</td>
                          <td className="py-2 text-slate-400">{d.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
