"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

const metrics = [
  { value: 100, numSuffix: "+", unitSuffix: "",   label: "Projects"  },
  { value: 10,  numSuffix: "",  unitSuffix: "M+",  label: "Views"     },
  { value: 2,   numSuffix: "+", unitSuffix: "",    label: "Years"     },
  { value: 48,  numSuffix: "",  unitSuffix: "Hr",  label: "Delivery"  },
];

function StatBlock({
  metric,
  delay,
}: {
  metric: (typeof metrics)[0];
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 80;
          const increment = metric.value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= metric.value) {
              setCount(metric.value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [metric.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="flex flex-col items-center justify-center gap-3 group text-center px-4 py-10"
    >
      {/* Number row — all on one line, nowrap */}
      <div className="flex items-baseline gap-0 whitespace-nowrap leading-none">
        {/* Animated count */}
        <span
          className="font-black text-white tabular-nums group-hover:text-accent transition-colors duration-500"
          style={{ fontSize: "clamp(56px, 8vw, 100px)", letterSpacing: "-0.04em" }}
        >
          {count}
        </span>

        {/* Inline suffix (e.g. "+" or "") — same size as number */}
        {metric.numSuffix && (
          <span
            className="font-black text-accent"
            style={{ fontSize: "clamp(56px, 8vw, 100px)", letterSpacing: "-0.02em" }}
          >
            {metric.numSuffix}
          </span>
        )}

        {/* Unit suffix (e.g. "M+", "Hr") — slightly smaller */}
        {metric.unitSuffix && (
          <span
            className="font-black text-accent"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.02em" }}
          >
            {metric.unitSuffix}
          </span>
        )}
      </div>

      {/* Label */}
      <div className="text-[12px] text-text-secondary font-semibold tracking-[0.28em] uppercase">
        {metric.label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden py-32 md:py-40">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Subtle ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.012,
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,229,255,1) 0%, transparent 70%)",
        }}
      />

      <div className="container-wide">
        {/* Section label */}
        <SectionReveal>
          <div className="flex items-center justify-center gap-3 mb-16">
            <div className="w-12 h-px bg-accent" />
            <span className="eyebrow">Results That Speak</span>
            <div className="w-12 h-px bg-accent" />
          </div>
        </SectionReveal>

        {/* 4-column stat row */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border-subtle">
          {metrics.map((metric, i) => (
            <StatBlock key={metric.label} metric={metric} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
