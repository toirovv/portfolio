import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ft-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative bg-[#000510] py-20 px-6 overflow-hidden border-t border-blue-900/30"
    >
      {/* Background glow (allow clicks to pass through) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_100%,rgba(30,58,138,0.15),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand Card */}
        <div className="ft-card md:col-span-4 p-8 rounded-3xl border border-blue-900/30 bg-blue-950/10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4">
            TOIROV<span className="text-blue-500">.</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Frontend Engineer. Precision in code, excellence in design. Based in
            Tashkent, working for the world.
          </p>
          <div className="flex gap-4">
            {[FaGithub, FaLinkedin, FaTelegram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-3 rounded-full bg-blue-950/50 border border-blue-800/50 text-blue-300 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Group */}
        <div className="ft-card md:col-span-4 grid grid-cols-2 gap-8 p-8">
          <div>
            <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {["Projects", "About", "Pricing", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">
              Social
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Github
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact/CTA */}
        <div className="ft-card md:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-900/30">
          <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">
            Let's talk
          </h4>
          <a
            href="mailto:asadtoirovv@gmail.com"
            className="text-xl font-medium text-white hover:text-blue-400 transition-colors block mb-2"
          >
            asadtoirovv@gmail.com
          </a>
          <p className="text-slate-500 text-sm">Available for new projects</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-blue-900/20 flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs gap-4">
        <p>&copy; {new Date().getFullYear()} TOIROVV.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
