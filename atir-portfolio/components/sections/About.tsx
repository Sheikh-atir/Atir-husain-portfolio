"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const skillTags = [
  "Podcast Editing",
  "Short-form Content",
  "Storytelling",
  "Motion Graphics",
  "Color Grading",
  "Sound Design",
];

const aboutStats = [
  { value: 100, suffix: "+", label: "Videos Edited" },
  { value: 5, suffix: "M+", label: "Views Generated" },
  { value: 2, suffix: "+", label: "Years Experience" },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-black">
      <div className="container-wide relative z-10">

        {/* ── Section header with correctly positioned 02 watermark ── */}
        <SectionReveal>
          <div className="relative mb-16 md:mb-24">


            {/* Eyebrow row */}
            <div className="flex items-center gap-4 relative z-10 pt-12 md:pt-16">
              <div className="w-12 h-px bg-accent" />
              <span className="eyebrow text-accent font-bold tracking-[0.3em]">
                BEHIND THE EDITS
              </span>
            </div>
          </div>
        </SectionReveal>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24">

          {/* Left — Heading + body text */}
          <SectionReveal delay={0.1}>
            <div>
              <h2 className="text-section-title text-white mb-8">
                Crafting stories <br /> that{" "}
                <span className="text-gradient font-black">captivate.</span>
              </h2>
              <div className="flex flex-col gap-6 text-[15px] text-text-secondary leading-relaxed max-w-lg">
                <p>
                  I&apos;m a video editor specializing in{" "}
                  <span className="text-accent font-medium">high-retention content</span>. My approach
                  combines <span className="text-white/80">strong pacing</span>,{" "}
                  <span className="text-white/80">dynamic visual effects</span>, and{" "}
                  <span className="text-white/80">crisp audio design</span> to keep viewers engaged
                  from the first second to the last.
                </p>
                <p>
                  Whether it&apos;s a long-form podcast or a snappy 60-second reel, I understand the
                  mechanics of audience retention. I don&apos;t just cut clips—I structure narratives
                  that amplify your brand&apos;s message.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Right — Stats + Expertise tags */}
          <div className="flex flex-col gap-12">

            {/* Stats grid */}
            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden border border-border-subtle">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-surface px-6 py-8 flex flex-col gap-1.5 group hover:bg-accent/[0.03] transition-colors duration-300"
                  >
                    <div className="text-[42px] md:text-[52px] font-black text-white leading-none tracking-tight">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[12px] text-text-secondary font-medium leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* Expertise tags */}
            <SectionReveal delay={0.32}>
              <div>
                <p className="eyebrow mb-5 text-text-secondary">Expertise</p>
                <div className="flex flex-wrap gap-3">
                  {skillTags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.32 + i * 0.06, duration: 0.5 }}
                      className="px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 cursor-default"
                      style={{
                        color: "#00E5FF",
                        border: "1px solid rgba(0,229,255,0.25)",
                        background: "rgba(0,229,255,0.04)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.1)";
                        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(0,229,255,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.04)";
                        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(0,229,255,0.25)";
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
