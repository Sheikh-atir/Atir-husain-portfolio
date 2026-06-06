"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { expertiseAreas, software } from "@/lib/data";
import { Star } from "lucide-react";

function StarRating({ stars, total = 5 }: { stars: number; total?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < stars ? "star-filled" : "star-empty"}
          fill={i < stars ? "currentColor" : "none"}
          strokeWidth={i < stars ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function SoftwareCard({ sw, delay }: { sw: (typeof software)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-software-card p-6 flex flex-col items-center gap-4 group cursor-default"
      data-cursor-hover
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-[13px] transition-all duration-500 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${sw.color}25 0%, ${sw.color}08 100%)`,
          border: `1px solid ${sw.color}30`,
          color: sw.color,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {sw.name.substring(0, 2).toUpperCase()}
      </div>

      <div className="text-center">
        <h4 className="text-white font-bold text-[15px] mb-1">{sw.name}</h4>
        <p className="text-[12px] text-text-secondary uppercase tracking-widest">Expert</p>
      </div>

      <div className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `0 0 20px ${sw.color}15` }} />
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-background">
      <div className="container-wide relative z-10">
        <SectionReveal>
          <div className="mb-16 md:mb-24 flex items-center gap-4">
            <div className="w-12 h-px bg-accent" />
            <span className="eyebrow text-accent font-bold tracking-[0.3em]">Skills &amp; Tools</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="text-section-title text-white mb-16 md:mb-24 text-center">
            Tools &amp; <span className="text-gradient font-black">Expertise.</span>
          </h2>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — Star ratings */}
          <div>
            <SectionReveal>
              <p className="text-[13px] text-text-secondary uppercase tracking-[0.25em] font-semibold mb-10">
                Expertise Categories
              </p>
            </SectionReveal>

            <div className="flex flex-col gap-0">
              {expertiseAreas.map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  className="flex items-center justify-between py-5 border-b border-border-subtle group hover:border-accent/20 transition-colors duration-300"
                >
                  <span className="text-[17px] font-semibold text-white group-hover:text-accent transition-colors duration-300">
                    {area.name}
                  </span>
                  <StarRating stars={area.stars} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Software glass cards */}
          <div>
            <SectionReveal delay={0.1}>
              <p className="text-[13px] text-text-secondary uppercase tracking-[0.25em] font-semibold mb-10">
                Software
              </p>
            </SectionReveal>

            <div className="grid grid-cols-3 gap-4">
              {software.map((sw, i) => (
                <SoftwareCard key={sw.name} sw={sw} delay={i * 0.08 + 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
