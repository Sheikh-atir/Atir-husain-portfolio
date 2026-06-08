"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  Variants
} from "framer-motion";
import Image from "next/image";

const CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const ITEM: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  /* Mouse parallax */
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sX = useSpring(mX, { stiffness: 35, damping: 20 });
  const sY = useSpring(mY, { stiffness: 35, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    mX.set(((e.clientX - left) / width - 0.5) * 20);
    mY.set(((e.clientY - top) / height - 0.5) * 12);
  };

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const txtY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const txtOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[680px] overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── Background image ── */}
      <motion.div
        style={{ y: bgY, x: sX }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/assets/hero-image.png"
          alt="Atir Husain — Video Editor"
          fill
          priority
          className="object-cover object-[38%_70%] md:object-[65%_center]"
        />

        {/* Left side fade for text visibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #050505 0%, #050505 10%, rgba(5,5,5,0.82) 20%, rgba(5,5,5,0.35) 40%, transparent 95%)",
          }}
        />

        {/* Top vignette — strong dark fade above the person's face */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.7) 20%, rgba(5,5,5,0.2) 35%, transparent 60%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "220px",
            background: "linear-gradient(to bottom, transparent, #050505 100%)",
          }}
        />
      </motion.div>

      {/* ── Text content — left column ── */}
      <div className="relative z-10 w-full h-full flex items-center">
        <motion.div
          style={{ y: txtY, opacity: txtOp }}
          variants={CONTAINER}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 px-5 sm:px-8 md:px-14 lg:px-20 max-w-[600px]"
        >
          {/* Eyebrow */}
          <motion.div variants={ITEM} className="flex items-center gap-2">
            <span
              className="w-[7px] h-[7px] rounded-full flex-shrink-0"
              style={{ background: "#00E5FF" }}
            />
            <span
              className="font-bold uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.28em",
                color: "#00E5FF",
              }}
            >
              Video Editor Portfolio &mdash; 2026
            </span>
          </motion.div>

          {/* ATIR HUSAIN */}
          <motion.h1
            variants={ITEM}
            className="m-0 p-0 text-white uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(40px, 9.5vw, 120px)",
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            ATIR
            <br />
            HUSAIN
          </motion.h1>

          {/* Sub-roles */}
          <motion.p
            variants={ITEM}
            className="font-semibold uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.5)",
              marginTop: "2px",
            }}
          >
            Podcast Editor • Short-Form Specialist • Motion Graphics
          </motion.p>

          {/* Description */}
          <motion.p
            variants={ITEM}
            className="font-light leading-relaxed"
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.58)",
              marginTop: "10px",
              maxWidth: "440px",
            }}
          >
            I help creators, brands, and businesses transform raw footage into
            engaging content that retains attention and drives results.
          </motion.p>

          <motion.div
            variants={ITEM}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ marginTop: "18px" }}
          >
            {/* View Projects — solid cyan */}
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex justify-center items-center font-bold text-black transition-all duration-300 hover:scale-[1.04]"
              style={{
                background: "#00E5FF",
                padding: "13px 28px",
                borderRadius: "999px",
                fontSize: "14px",
                boxShadow: "0 0 0 0 rgba(0,229,255,0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(0,229,255,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(0,229,255,0)";
              }}
            >
              View Projects
            </a>

            {/* Watch Showreel — dark outline with cyan play dot */}
            <a
              href="#reels"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#reels")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex justify-center items-center gap-3 font-semibold text-white transition-all duration-300"
              style={{
                padding: "13px 22px",
                borderRadius: "999px",
                fontSize: "14px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {/* Play dot */}
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#00E5FF" }}
              >
                <svg viewBox="0 0 10 12" width="9" height="11" fill="black">
                  <path d="M0 0l10 6-10 6V0z" />
                </svg>
              </span>
              Watch Showreel
            </a>
          </motion.div>

          {/* Available badge */}
          <motion.div
            variants={ITEM}
            className="flex items-center gap-2"
            style={{ marginTop: "14px" }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
            />
            <span
              className="font-medium tracking-wide"
              style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)" }}
            >
              Available for new projects
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span
          className="uppercase font-semibold"
          style={{ fontSize: "9px", letterSpacing: "0.35em", color: "rgba(255,255,255,0.28)" }}
        >
          Scroll
        </span>
        <motion.div
          style={{
            width: 1,
            height: 36,
            background: "linear-gradient(to bottom, rgba(0,229,255,0.5), transparent)",
          }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
