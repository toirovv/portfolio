import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-blue-500/20 border-t-blue-500 animate-spin" />
        <div className="absolute w-12 h-12 rounded-full border border-cyan-500/20 border-b-cyan-400 animate-spin" style={{ animationDuration: "0.8s", animationDirection: "reverse" }} />
        <div className="absolute w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
      </div>
    </div>
  );
};

export default Spinner;
