"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

const timelineNodes = [
  {
    year: "2023",
    role: "Freelance Video Editor",
    company: "RJ Prateek Production House",
    detail: "Remote · Freelance",
    description: "Edited podcasts, reels, and storytelling videos. Built a strong foundation in audience-retention editing across 1.5 years.",
    color: "#7B61FF",
    present: false,
  },
  {
    year: "2025",
    role: "Podcast Video Editor",
    company: "Oregano Brandworks",
    detail: "Mumbai · Full Time",
    description: "Producing high-quality branded podcast content, interview edits, and social media videos for leading brands.",
    color: "#00E5FF",
    present: false,
  },
  {
    year: "Now",
    role: "Editing Podcasts, Reels & Brand Content",
    company: "Open to New Projects",
    detail: "Lucknow, Uttar Pradesh",
    description: "Available for podcast editing, short-form content, and branded video production projects.",
    color: "#00E5FF",
    present: true,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Ambient */}
      <div
        className="orb pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          opacity: 0.04,
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          top: "30%",
          right: "-10%"
        }}
      />

      <div className="container-wide relative z-10">
        <SectionReveal>
          <div className="mb-16 md:mb-24 flex items-center gap-4">
            <span className="process-number absolute -top-12 -left-4 md:-top-20 md:-left-8">04</span>
            <div className="w-12 h-px bg-accent" />
            <span className="eyebrow text-accent font-bold tracking-[0.3em]">Timeline</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="text-section-title text-white mb-16 md:mb-24 text-center">
            My <span className="text-gradient">Journey.</span>
          </h2>
        </SectionReveal>

        <div className="max-w-4xl mx-auto relative">
          <div className="timeline-line hidden md:block" />

          <div className="relative z-10">
            <div className="flex flex-col gap-12 md:gap-24">
              {timelineNodes.map((node, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <div key={node.year} className="relative w-full">
                    {/* Node Dot (Desktop) */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background hidden md:block" style={{ backgroundColor: node.color }} />

                    <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                      {/* Left side */}
                      <div className={`pr-0 md:pr-16 text-left md:text-right ${isLeft ? "" : "md:opacity-0 md:pointer-events-none"}`}>
                        {isLeft && (
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                          >
                            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: node.color }}>
                              {node.year}
                            </span>
                            <div className="glass glass-hover rounded-2xl p-6 mt-3 text-left md:text-right">
                              <h3 className="font-bold text-white text-[16px] mb-1 leading-tight">{node.role}</h3>
                              <p className="font-semibold text-[14px] mb-1" style={{ color: node.color }}>{node.company}</p>
                              <p className="text-text-secondary text-[12px] mb-3">{node.detail}</p>
                              
         <p className="text-text-secondary text-[13px] leading-relaxed">{node.description}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Right side */}
                      <div className={`pl-16 ${!isLeft ? "" : "opacity-0 pointer-events-none"}`}>
                        {!isLeft && (
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                          >
                            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: node.color }}>
                              {node.year}
                            </span>
                            <div className="glass glass-hover rounded-2xl p-6 mt-3">
                              <h3 className="font-bold text-white text-[16px] mb-1 leading-tight">{node.role}</h3>
                              <p className="font-semibold text-[14px] mb-1" style={{ color: node.color }}>{node.company}</p>
                              <p className="text-text-secondary text-[12px] mb-3">{node.detail}</p>
                              <p className="text-text-secondary text-[13px] leading-relaxed">{node.description}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
