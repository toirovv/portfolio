import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbSend,
  TbCircleCheck,
  TbPhone,
  TbMapPin,
  TbArrowRight,
  TbBrandTelegram,
} from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import AnimatedBg from "../components/AnimatedBg";
import { sendTelegram } from "../services/telegram";

const tiles = [
  {
    icon: TbPhone,
    label: "Phone",
    value: "+998 93 857 33 11",
    href: "tel:+998938573311",
  },
  { icon: TbMapPin, label: "Location", value: "Tashkent, UZ" },
  {
    label: "Social",
    social: [
      {
        icon: TbBrandTelegram,
        label: "Telegram",
        href: "https://t.me/toirovvasad",
      },
      {
        icon: FaGithub,
        label: "GitHub",
        href: "https://github.com/toirovv",
      },
    ],
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await sendTelegram(form);
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0c1a2e] text-white overflow-x-hidden relative">
      <AnimatedBg />
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] text-slate-500 uppercase mb-4 block">
            04 / Contact
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.9]">
            Let's Connect
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {tiles.map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="border border-white/[0.06] rounded-xl p-4"
              >
                <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-2">
                  {tile.label}
                </p>
                {tile.social ? (
                  <div className="flex gap-2">
                    {tile.social.map((s, j) => (
                      <a
                        key={j}
                        href={s.href}
                        className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all duration-300"
                      >
                        <s.icon size={13} />
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    href={tile.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors font-body"
                  >
                    {tile.value}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="border border-white/[0.06] rounded-2xl p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-1.5 block">
                          Name
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 font-body placeholder:text-slate-600 focus:border-slate-500/30"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-1.5 block">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 font-body placeholder:text-slate-600 focus:border-slate-500/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-1.5 block">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 font-body placeholder:text-slate-600 resize-none focus:border-slate-500/30"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-white text-slate-950 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Send Message"}{" "}
                      <TbSend size={14} />
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 12,
                        stiffness: 150,
                      }}
                      className="w-14 h-14 rounded-full border border-white/[0.08] flex items-center justify-center mx-auto mb-4"
                    >
                      <TbCircleCheck size={28} className="text-white/60" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Message Sent!
                    </h3>
                    <p className="text-xs text-slate-400 font-body mb-5">
                      Thanks! I'll reply within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: "", email: "", message: "" });
                      }}
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500 hover:text-white tracking-[0.2em] uppercase transition-colors"
                    >
                      Send Again <TbArrowRight size={11} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
