import React from "react";
import { motion } from "framer-motion";

const AnimatedBg = ({ className = "" }) => (
  <div className={`fixed inset-0 z-0 bg-[#000510] overflow-hidden ${className}`}>
    <motion.div
      animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{ x: [0, -40, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[140px]"
    />
    <motion.div
      animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px]"
    />
  </div>
);

export default AnimatedBg;
