"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";

/* ─── Animation Variants ─────────────────────────────────── */
const CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  /* Mouse parallax */
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sX = useSpring(mX, { stiffness: 40, damping: 18 });
  const sY = useSpring(mY, { stiffness: 40, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    mX.set(((e.clientX - left) / width - 0.5) * 24);
    mY.set(((e.clientY - top) / height - 0.5) * 14);
  };

  /* Scroll values */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY  = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const txtY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const txtOp = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#050505]"
    >
      {/* ── Full-screen background image + parallax ── */}
      <motion.div
        style={{ y: bgY, x: sX }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/assets/hero-image.png"
          alt="Atir Husain — Video Editor"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Strong left-side gradient so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        {/* Top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent" />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "200px",
            background: "linear-gradient(to bottom, transparent, #050505 100%)",
          }}
        />
      </motion.div>

      {/* ── Main Text Content ── */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <motion.div
          style={{ y: txtY, opacity: txtOp }}
          variants={CONTAINER}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 max-w-[640px]"
        >
          {/* Eyebrow — cyan dot + label */}
          <motion.div variants={ITEM} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "#00E5FF" }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.28em]"
              style={{ color: "#00E5FF" }}
            >
              Video Editor Portfolio &mdash; 2026
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={ITEM}
            className="m-0 p-0 text-white font-black uppercase leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(72px, 12vw, 148px)" }}
          >
            ATIR
            <br />
            HUSAIN
          </motion.h1>

          {/* Sub-roles */}
          <motion.p
            variants={ITEM}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50 mt-1"
          >
            Podcast Editor&nbsp;&bull;&nbsp;Short-Form Specialist&nbsp;&bull;&nbsp;Motion Graphics
          </motion.p>

          {/* Description */}
          <motion.p
            variants={ITEM}
            className="text-[16px] md:text-[17px] text-white/60 font-light leading-relaxed mt-3 max-w-[480px]"
          >
            I help creators, brands, and businesses transform raw footage into
            engaging content that retains attention and drives results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={ITEM} className="flex items-center gap-4 mt-5 flex-wrap">
            {/* Primary — solid cyan */}
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[14px] text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.45)] hover:scale-[1.03]"
              style={{ background: "#00E5FF" }}
            >
              View Projects
            </a>

            {/* Secondary — dark outline with play icon */}
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-[14px] text-white border border-white/20 bg-white/5 backdrop-blur-sm hover:border-white/40 hover:bg-white/10 transition-all duration-300"
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#00E5FF" }}
              >
                {/* Play icon */}
                <svg
                  viewBox="0 0 10 12"
                  width="10"
                  height="12"
                  fill="black"
                >
                  <path d="M0 0l10 6-10 6V0z" />
                </svg>
              </span>
              Watch Showreel
            </a>
          </motion.div>

          {/* Available badge */}
          <motion.div variants={ITEM} className="flex items-center gap-2 mt-4">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
              style={{ background: "#22c55e" }}
            />
            <span className="text-[12px] text-white/40 font-medium tracking-wide">
              Available for new projects
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-white/30 font-semibold">
          Scroll
        </span>
        <motion.div
          style={{
            width: 1,
            height: 36,
            background: "linear-gradient(to bottom, rgba(0,229,255,0.6), transparent)",
          }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
