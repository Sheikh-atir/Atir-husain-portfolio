"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { testimonials } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (dir: number) => {
    setDirection(dir);
    setActive((p) => (p + dir + testimonials.length) % testimonials.length);
  };

  const current = testimonials[active];

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Ambient */}
      <div
        className="orb pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          opacity: 0.04,
          background: "radial-gradient(circle, rgba(0,229,255,1) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />

      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-20">
          <SectionReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="eyebrow">Testimonials</span>
              <div className="w-8 h-px bg-accent" />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <h2 className="text-section-title font-black text-white">
              WHAT CLIENTS <span className="text-gradient">SAY</span>
            </h2>
          </SectionReveal>
        </div>

        {/* Testimonial card */}
        <div className="max-w-[1000px] mx-auto">
          <SectionReveal delay={0.16}>
            <div className="relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 40 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="glass rounded-3xl p-10 md:p-14 relative overflow-hidden"
                >
                  {/* Top glow */}
                  <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 70% 50% at 50% -10%, ${current.color}10, transparent)`,
                    }}
                  />

                  {/* Large quote mark */}
                  <div
                    className="text-[120px] font-black leading-none absolute top-4 left-8 select-none pointer-events-none"
                    style={{ color: `${current.color}12`, fontFamily: "Georgia, serif" }}
                  >
                    &ldquo;
                  </div>

                  <div className="relative">
                    {/* Quote text */}
                    <blockquote className="text-[20px] md:text-[24px] text-white font-light leading-relaxed mb-10 max-w-3xl">
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>

                    {/* Divider */}
                    <div
                      className="w-16 h-px mb-8"
                      style={{ background: current.color }}
                    />

                    {/* Author */}
                    <div className="flex items-center gap-5">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{
                          background: `${current.color}15`,
                          border: `2px solid ${current.color}40`,
                          color: current.color,
                        }}
                      >
                        {current.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-white text-[16px]">{current.name}</p>
                        <p className="text-text-secondary text-[14px] mt-0.5">{current.role}</p>
                        <p className="text-[13px] mt-1 font-semibold" style={{ color: current.color }}>
                          {current.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${current.color}50, transparent)`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex items-center justify-between mt-8">
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > active ? 1 : -1);
                        setActive(i);
                      }}
                      className="transition-all duration-400 rounded-full"
                      style={{
                        width: i === active ? "28px" : "8px",
                        height: "8px",
                        background: i === active ? "var(--accent)" : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>

                {/* Arrow buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 transition-all duration-300 hover:bg-white/[0.03]"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 transition-all duration-300 hover:bg-white/[0.03]"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
