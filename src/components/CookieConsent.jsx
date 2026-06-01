import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto bg-[#000510]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-2xl">
            <p className="text-xs md:text-sm text-slate-300 font-body flex-1">
              This site uses cookies to improve your experience. By continuing, you agree to our{" "}
              <a href="/privacy" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">Privacy Policy</a>.
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={accept}
                className="bg-white text-slate-950 text-xs font-bold px-5 py-2.5 rounded-full hover:bg-slate-200 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
