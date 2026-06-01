import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const socials = [
  { label: "GitHub", url: "#" },
  { label: "LinkedIn", url: "#" },
  { label: "Telegram", url: "#" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 md:py-6 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto w-full max-w-2xl bg-[#000510]/60 backdrop-blur-2xl border border-white/10 rounded-[20px] p-2 flex items-center justify-between shadow-2xl"
        >
          {location.pathname === "/" ? (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="pl-3 md:pl-4 cursor-pointer"
            >
              <div className="text-lg md:text-xl font-black tracking-tighter text-white">
                TOIROV<span className="text-blue-500">.</span>
              </div>
            </button>
          ) : (
            <Link to="/" className="pl-3 md:pl-4">
              <div className="text-lg md:text-xl font-black tracking-tighter text-white">
                TOIROV<span className="text-blue-500">.</span>
              </div>
            </Link>
          )}

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute inset-0 bg-white/5 rounded-xl border border-white/5"
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 pr-2">
            <Link
              to="/contact"
              className="hidden md:inline-flex bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-blue-400 transition-colors"
            >
              HIRE ME
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center pointer-events-auto"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={open ? "open" : "closed"}
                className="flex flex-col items-center justify-center gap-[5px]"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 7 },
                  }}
                  className="block w-5 h-[2px] bg-white rounded-full"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="block w-5 h-[2px] bg-white rounded-full"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -7 },
                  }}
                  className="block w-5 h-[2px] bg-white rounded-full"
                />
              </motion.div>
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#000510] border-t border-white/[0.06] rounded-t-3xl pb-10 pt-3 px-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-6" />

              <nav className="flex flex-col gap-1">
                {links.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive
                            ? "text-white bg-white/5 border border-white/5"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                        }`}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-blue-500" : "bg-white/20"
                            }`}
                          />
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 pt-6 border-t border-white/[0.04]"
              >
                <p className="text-xs font-mono tracking-[0.2em] text-slate-600 uppercase mb-3 px-4">
                  Connect
                </p>
                <div className="flex flex-wrap gap-2 px-4">
                  {socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      className="px-4 py-2 rounded-xl border border-white/[0.06] text-sm text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-6 pt-4 border-t border-white/[0.04] text-center"
              >
                <span className="text-xs font-mono text-slate-600">
                  toirovv.dev
                </span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
