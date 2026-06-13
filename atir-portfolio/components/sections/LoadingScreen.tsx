"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase(1), 100));   // Name
    timers.push(setTimeout(() => setPhase(2), 550));   // VIDEO EDITOR (cyan)
    timers.push(setTimeout(() => setPhase(3), 950));   // PODCAST EDITOR
    timers.push(setTimeout(() => setPhase(4), 1300));  // SHORT FORM EDITOR
    timers.push(setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 450);
    }, 1900));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-overlay"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Very subtle teal ambient glow at centre-bottom */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "700px",
              height: "300px",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

            {/* ── ATIR HUSAIN ── */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={phase >= 1 ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                className="font-black text-white text-center uppercase leading-none"
                style={{
                  fontSize: "clamp(52px, 10vw, 120px)",
                  letterSpacing: "-0.03em",
                }}
              >
                ATIR HUSAIN
              </motion.h1>
            </div>

            {/* ── Separator line ── */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-5 mb-4"
                  style={{
                    width: "120px",
                    height: "1px",
                    background: "linear-gradient(to right, transparent, rgba(0,229,255,0.6), transparent)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* ── Role labels ── */}
            <div className="flex flex-col items-center gap-[6px]">

              {/* VIDEO EDITOR — cyan */}
              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p
                      className="font-medium tracking-[0.5em] uppercase text-center"
                      style={{ fontSize: "clamp(11px, 1.5vw, 16px)", color: "#00E5FF" }}
                    >
                      Video Editor
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PODCAST EDITOR — muted */}
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <p
                      className="tracking-[0.4em] uppercase text-center"
                      style={{ fontSize: "clamp(10px, 1.3vw, 14px)", color: "rgba(168,168,168,0.7)", fontWeight: 400 }}
                    >
                      Podcast Editor
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SHORT FORM EDITOR — muted */}
              <AnimatePresence>
                {phase >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <p
                      className="tracking-[0.4em] uppercase text-center"
                      style={{ fontSize: "clamp(10px, 1.3vw, 14px)", color: "rgba(168,168,168,0.7)", fontWeight: 400 }}
                    >
                      Short Form Editor
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Loading bar ── */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 rounded-full overflow-hidden"
                  style={{ width: "140px", height: "1px", background: "rgba(255,255,255,0.08)" }}
                >
                  <motion.div
                    className="h-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.2, ease: "linear" }}
                    style={{ background: "#00E5FF" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
