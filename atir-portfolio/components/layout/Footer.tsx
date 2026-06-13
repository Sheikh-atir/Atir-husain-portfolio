"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

// Generated once at module-load — satisfies React purity rules (no Math.random in render)
const PARTICLES = Array.from({ length: 15 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  width: Math.random() * 4 + 1.5,
  height: Math.random() * 4 + 1.5,
  dx: Math.random() * 80 - 40,
  scale: Math.random() * 0.8 + 1,
  duration: Math.random() * 15 + 15,
}));

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "Instagram", href: siteConfig.social.instagram },
  { name: "Twitter/X", href: siteConfig.social.twitter },
  { name: "LinkedIn", href: siteConfig.social.linkedin },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Subtle Magnetic Mouse Light (Parallax rather than direct follow)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 60, mass: 2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate distance from center, scale it down for a subtle shift
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = e.clientX - rect.left - centerX;
        const offsetY = e.clientY - rect.top - centerY;

        mouseX.set(offsetX * 0.15); // moves 15% of the mouse distance
        mouseY.set(offsetY * 0.15);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <footer className="relative w-full px-3 md:px-6 pb-3 md:pb-6 pt-10 md:pt-16 bg-transparent">
      <div
        ref={containerRef}
        className="relative w-full max-w-[1920px] mx-auto rounded-[40px] md:rounded-[48px] bg-[#02040A] border border-white/[0.05] overflow-hidden flex flex-col pt-16 md:pt-28 px-4 md:px-12 shadow-[inset_0_0_100px_rgba(0,229,255,0.03)]"
      >
        {/* =========================================
            ATMOSPHERIC COLOR SYSTEM (Layers 1-5)
            ========================================= */}

        {/* Layer 1: Huge Cyan Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 0.9, 1],
            x: [0, 80, -40, 0],
            y: [0, -50, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] left-0 w-[70vw] h-[70vw] bg-[#00E5FF]/[0.06] blur-[140px] rounded-full pointer-events-none z-0 mix-blend-screen"
        />

        {/* Layer 2: Deep Blue Ambient Gradient */}
        <motion.div
          animate={{
            scale: [1, 1.1, 0.95, 1],
            x: [0, -60, 60, 0],
            y: [0, 60, -60, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-[10%] w-[80vw] h-[80vw] bg-[#061B40]/[0.5] blur-[160px] rounded-full pointer-events-none z-0 mix-blend-screen"
        />

        {/* Layer 3: Subtle Teal Cloud */}
        <motion.div
          animate={{
            scale: [1, 1.3, 0.8, 1],
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[10%] w-[60vw] h-[60vw] bg-[#008080]/[0.08] blur-[130px] rounded-full pointer-events-none z-0 mix-blend-screen"
        />

        {/* Layer 4: Soft Floating Particles */}
        {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              initial={{
                top: p.top + "%",
                left: p.left + "%",
                width: p.width + "px",
                height: p.height + "px",
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, p.dx, 0],
                opacity: [0.05, 0.5, 0.05],
                scale: [1, p.scale, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute rounded-full bg-accent pointer-events-none blur-[1px] z-0"
            />
          ))}

        {/* Layer 5: Animated radial light source (Subtle Magnetic Influence) */}
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -ml-[500px] -mt-[500px] rounded-full pointer-events-none z-0 mix-blend-screen opacity-70"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.06)_0%,transparent_50%)] blur-[50px]" />
        </motion.div>

        {/* =========================================
            TOP ROW: Availability, Email Hero, CTA
            ========================================= */}
        <div className="relative z-10 w-full flex flex-col xl:flex-row justify-between items-start xl:items-center gap-12 xl:gap-8 mb-20 md:mb-32">
          {/* Left Side: Availability & Email */}
          <div className="flex flex-col gap-6 w-full xl:w-1/3">
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2 md:gap-3 bg-white/[0.03] border border-white/[0.08] px-4 md:px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.05)]">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                <span className="text-[11px] md:text-sm font-medium text-white/80 tracking-widest uppercase truncate">
                  Available for Projects
                </span>
              </div>
            </motion.div>

            {/* Email Contact Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-start text-left w-full"
            >
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 md:gap-3 bg-white/[0.03] border border-white/[0.08] px-4 md:px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.05)] hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-300 group cursor-pointer max-w-full"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-[11px] sm:text-[13px] md:text-[15px] font-medium text-white/90 tracking-wide group-hover:text-white transition-colors duration-300 truncate">
                  sheikhhussainr47@gmail.com
                </span>
              </a>
            </motion.div>
          </div>

          {/* Center: Hero Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="flex w-full xl:w-1/3 justify-center text-center"
          >
            <h2 className="text-[clamp(32px,3.5vw,56px)] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tighter leading-[1.1]">
              Let&apos;s build <br className="hidden xl:block" />
              <span className="text-accent">something</span> great.
            </h2>
          </motion.div>

          {/* Right: CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex w-full xl:w-1/3 justify-start xl:justify-end"
          >
            <MagneticButton
              href="#contact"
              className="relative overflow-hidden group bg-white text-black px-6 md:px-8 py-4 md:py-5 rounded-full font-bold text-[13px] md:text-[15px] flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:bg-accent hover:text-black hover:scale-105"
            >
              <span className="relative z-10">Start Project</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path
                  d="M5 19L19 5M19 5V18.5M19 5H5.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>

        {/* =========================================
            MIDDLE ROW: Navigation & Socials
            ========================================= */}
        <div className="relative z-10 w-full flex flex-col items-center gap-10 md:gap-14 border-t border-white/[0.06] pt-16 md:pt-20 mb-20 md:mb-28">
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-14 gap-y-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
              >
                <Link
                  href={link.href}
                  className="text-[15px] md:text-[16px] font-medium text-white/50 hover:text-white transition-colors duration-300 group relative py-2 px-1"
                  data-cursor-hover
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[14px] md:text-[15px] font-medium text-white/40 hover:text-accent transition-all duration-300"
                  data-cursor-hover
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            BOTTOM ROW: Giant ATIR HUSAIN Typography
            ========================================= */}
        <div className="relative z-10 w-full flex justify-center items-end mt-auto pt-10 pb-0 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 80, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-black whitespace-nowrap tracking-tighter select-none w-full px-4"
            style={{
              fontSize: "clamp(35px, 11vw, 350px)",
              lineHeight: 0.75,
              color: "rgba(255, 255, 255, 0.8)",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)",
              textShadow: "0 -10px 80px rgba(0,229,255,0.1)",
              mixBlendMode: "plus-lighter",
            }}
          >
            ATIR HUSAIN
          </motion.h1>

          {/* Typography Bottom Reflection Glow */}
          <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-accent/[0.15] blur-[100px] pointer-events-none rounded-[100%]" />
        </div>
      </div>
    </footer>
  );
}
