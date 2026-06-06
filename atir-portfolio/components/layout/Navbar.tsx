"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-blur" : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between h-16 md:h-20">

          {/* Logo — AH badge + ATIR HUSAIN */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-3 z-50 relative group"
          >
            {/* Cyan square badge */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-[13px] text-black tracking-tight flex-shrink-0"
              style={{ background: "#00E5FF" }}
            >
              AH
            </div>
            <span className="text-[15px] font-bold tracking-widest text-white uppercase">
              Atir Husain
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-[13px] font-semibold tracking-wide text-text-secondary hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}

            {/* Let's Talk — outlined style */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="px-5 py-2 rounded-full border border-accent text-accent text-[13px] font-semibold tracking-wide hover:bg-accent hover:text-black transition-all duration-300"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 translate-x-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: menuOpen ? 1 : 0,
          y: menuOpen ? 0 : -16,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-[64px] left-0 right-0 z-40 nav-blur py-8"
      >
        <div className="container-wide flex flex-col gap-6">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.label}
              initial={false}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -12 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-2xl font-bold text-white/80 hover:text-white transition-colors tracking-tight"
            >
              {link.label}
            </motion.button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="mt-2 w-fit px-6 py-3 rounded-full border border-accent text-accent text-[14px] font-semibold hover:bg-accent hover:text-black transition-all duration-300"
          >
            Let&apos;s Talk
          </button>
        </div>
      </motion.div>
    </>
  );
}
