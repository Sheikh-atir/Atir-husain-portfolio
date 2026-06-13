"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { scrollContent } from "@/lib/data";

/* ─── Poster: inline SVG gradient so card is never black ──────────── */
function makePoster(color: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='533'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%'  stop-color='${color}' stop-opacity='0.35'/>
        <stop offset='60%' stop-color='#050505' stop-opacity='0.98'/>
        <stop offset='100%' stop-color='#050505' stop-opacity='1'/>
      </linearGradient>
    </defs>
    <rect width='300' height='533' fill='url(#g)'/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/* ─── Scroll Card ───────────────────────────────────────── */
function ScrollCard({
  item,
  index,
  isDragging,
}: {
  item: (typeof scrollContent)[0];
  index: number;
  isDragging: React.MutableRefObject<boolean>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // First 2 cards: load immediately. Rest: load when within 200px of viewport.
  // This prevents 8 large videos downloading simultaneously on page load.
  const rootMargin = index < 2 ? "600px" : "200px";

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !item.video) return;

    // First 2 cards skip the observer entirely — load right away
    if (index < 2) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [item.video, index, rootMargin]);

  // Auto-play muted as soon as src is assigned (browsers allow muted autoplay)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [isVisible]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.5;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      // keep playing silently — no black frame on next hover
    }
  };

  // First 2 cards get preload="auto" for instant play.
  // The rest get preload="metadata" — browser only fetches the first few KB
  // (enough for duration + first frame) without buffering the whole file.
  const preloadMode = index < 2 ? "auto" : "metadata";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="scroll-snap-card relative rounded-2xl overflow-hidden border border-border-subtle group cursor-pointer flex-shrink-0"
      style={{
        width: "300px",
        aspectRatio: "9/16",
        background: `linear-gradient(175deg, ${item.color}33 0%, rgba(5,5,5,0.98) 70%)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (!isDragging.current && item.link) {
          window.open(item.link, "_blank", "noopener,noreferrer");
        }
      }}
      data-cursor-hover
    >
      {/* Video — lazy/eager loaded, muted autoplay, unmutes on hover */}
      {item.video && isVisible && (
        <video
          ref={videoRef}
          src={item.video}
          muted
          loop
          autoPlay
          playsInline
          preload={preloadMode}
          poster={makePoster(item.color)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Title only — bottom of card */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5">
        <h3 className="text-[15px] font-bold text-white leading-snug">
          {item.title}
        </h3>
      </div>

      {/* Hover glow border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 0 1px ${item.color}60` }}
      />
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────── */
export default function ScrollContent() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const isDragging      = useRef(false);
  const startX          = useRef(0);
  const startScrollLeft = useRef(0);
  const velX            = useRef(0);
  const lastX           = useRef(0);
  const lastTime        = useRef(0);
  const animFrameRef    = useRef<number | null>(null);
  const isPointerDown   = useRef(false);

  /* ── Momentum deceleration after release ── */
  const applyMomentum = () => {
    const el = containerRef.current;
    if (!el) return;
    velX.current *= 0.92;
    if (Math.abs(velX.current) < 0.4) { velX.current = 0; return; }
    el.scrollLeft -= velX.current;
    animFrameRef.current = requestAnimationFrame(applyMomentum);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    isPointerDown.current   = true;
    isDragging.current      = false;
    startX.current          = e.pageX;
    startScrollLeft.current = el.scrollLeft;
    lastX.current           = e.pageX;
    lastTime.current        = Date.now();
    velX.current            = 0;
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current || !containerRef.current) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 4) isDragging.current = true;
    if (!isDragging.current) return;
    const now = Date.now();
    const dt  = now - lastTime.current || 1;
    velX.current   = ((lastX.current - e.pageX) / dt) * 16;
    lastX.current  = e.pageX;
    lastTime.current = now;
    containerRef.current.scrollLeft = startScrollLeft.current - dx;
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
    setTimeout(() => { isDragging.current = false; }, 80);
    animFrameRef.current = requestAnimationFrame(applyMomentum);
  };

  useEffect(() => {
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  return (
    <section id="reels" className="section-padding relative overflow-hidden bg-background">
      <div className="container-wide mb-12">
        <SectionReveal>
          <div className="mb-8 flex items-center gap-4">
            <div className="w-12 h-px bg-accent" />
            <span className="eyebrow text-accent font-bold tracking-[0.3em]">Short Form Reels</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="text-section-title text-white mb-6">
            High-retention <span className="text-gradient font-black">reels.</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="text-text-secondary text-[16px] max-w-md leading-relaxed">
            Short-form edits engineered for maximum retention, engagement, and virality.
            <br />
            <span className="text-white/30 text-[13px] mt-1 block">🔊 Hover a card to hear audio</span>
          </p>
        </SectionReveal>
      </div>

      {/* Horizontal scroll with momentum */}
      <div
        ref={containerRef}
        className="scroll-container flex gap-5"
        style={{
          paddingLeft:  "max(48px, calc((100vw - 1440px) / 2 + 48px))",
          paddingRight: "max(48px, calc((100vw - 1440px) / 2 + 48px))",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {scrollContent.map((item, i) => (
          <ScrollCard key={item.id} item={item} index={i} isDragging={isDragging} />
        ))}

        {/* End card */}
        <div
          className="scroll-snap-card rounded-2xl border border-dashed border-border-subtle flex flex-col items-center justify-center gap-4 flex-shrink-0"
          style={{ width: "220px", aspectRatio: "9/16" }}
        >
          <div className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary text-xl">
            +
          </div>
          <p className="text-text-secondary text-[13px] text-center px-4 leading-relaxed">
            More reels available — reach out to view full portfolio
          </p>
        </div>
      </div>

      {/* Drag hint */}
      <div className="container-wide mt-8">
        <SectionReveal delay={0.3}>
          <p className="text-text-secondary text-[12px] flex items-center gap-2">
            <span className="text-accent">←</span>
            Drag to explore
            <span className="text-accent">→</span>
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
