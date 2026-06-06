"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { process } from "@/lib/data";

export default function Process() {
  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* BG gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />
      </div>

      <div className="container-wide">
        <div className="text-center mb-20">
          <SectionReveal>
            <span className="eyebrow">Workflow</span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4">
              My Editing <span className="text-gradient">Workflow</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-text-secondary mt-4 max-w-lg mx-auto">
              A systematic approach that ensures every project is delivered with
              precision, creativity, and cinematic quality.
            </p>
          </SectionReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {process.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Number watermark */}
              <div className="process-number absolute -top-4 -left-2 pointer-events-none select-none">
                {step.number}
              </div>

              {/* Card */}
              <div className="glass glass-hover rounded-2xl p-7 relative z-10 h-full">
                {/* Step number pill */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-background text-xs font-black">
                    {parseInt(step.number)}
                  </div>
                  <div className="h-px w-12 bg-gradient-to-r from-accent to-transparent" />
                </div>

                <h3 className="font-bold text-white text-lg mb-3 group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connector arrow (not last) */}
                {i < process.length - 1 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block z-20">
                    <div className="w-8 h-px bg-gradient-to-r from-accent/50 to-transparent" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
