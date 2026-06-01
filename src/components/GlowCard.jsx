import React from "react";
import { motion } from "framer-motion";

const GlowCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={`group relative border border-white/[0.06] rounded-2xl bg-white/[0.01] hover:border-amber-500/20 transition-all duration-500 ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
};

export default GlowCard;
