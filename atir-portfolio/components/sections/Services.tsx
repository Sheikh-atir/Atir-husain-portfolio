"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* BG orb */}
      <div
        className="orb w-[500px] h-[500px] opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(123,97,255,1) 0%, transparent 70%)",
          top: "50%",
          right: "-10%",
          transform: "translateY(-50%)",
        }}
      />

      <div className="container-wide">
        <div className="text-center mb-16">
          <SectionReveal>
            <span className="eyebrow">Services</span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4">
              What I <span className="text-gradient">Do</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
              End-to-end video production services crafted to elevate your content
              and make your audience stay till the very last second.
            </p>
          </SectionReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass glass-hover rounded-2xl p-7 group relative overflow-hidden"
              data-cursor-hover
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 100% 80% at 50% 0%, ${service.accent}08 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${service.accent}12`,
                  border: `1px solid ${service.accent}25`,
                }}
              >
                {service.icon}
              </div>

              {/* Content */}
              <h3
                className="font-semibold text-lg text-white mb-2 group-hover:transition-colors duration-300"
                style={{ color: "white" }}
              >
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-2">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs text-text-secondary">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: service.accent }}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accent}50, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
