"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { projects } from "@/lib/data";
import { X, Play, ExternalLink } from "lucide-react";

const categories = [
  "All",
  "Podcast Editing",
  "Short Form Reels",
  "Interviews",
  "Brand Content",
  "Motion Graphics",
];

const projectColors: Record<number, string> = {
  1: "#00E5FF",
  2: "#7B61FF",
  3: "#FF6B6B",
  4: "#FFD93D",
  5: "#6BCB77",
  6: "#FF9F43",
};

/* ─── Project Card — thumbnail + title only (YouTube style) ── */
function ProjectCard({
  project,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}) {
  const color = projectColors[project.id];

  return (
    <div onClick={onClick} className="group cursor-pointer">

      {/* Thumbnail — 16:9 */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#111] border border-white/5 group-hover:border-white/15 transition-all duration-400">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${color}20 0%, #050505 70%)` }}
          />
        )}

        {/* Hover play overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-400 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300"
            style={{ background: `${color}DD`, backdropFilter: "blur(8px)" }}
          >
            <Play size={18} fill="black" color="black" className="ml-0.5" />
          </div>
        </div>
      </div>

      {/* Title below thumbnail */}
      <div className="mt-3 px-1">
        <h3 className="text-[14px] font-semibold text-white/80 group-hover:text-white leading-snug transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>
      </div>
    </div>
  );
}

/* ─── Case Study Modal ───────────────────────────────────── */
function CaseStudyModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  const color = projectColors[project.id];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 26, stiffness: 220 }}
        className="relative w-full max-w-5xl bg-[#080808] border border-white/8 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[88vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-9 h-9 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 border border-white/10"
        >
          <X size={16} />
        </button>

        {/* Left — YouTube embed */}
        <div className="w-full md:w-1/2 relative bg-black flex-shrink-0 min-h-[260px] md:min-h-full">
          {project.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=1&modestbranding=1&rel=0`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            />
          ) : project.thumbnail ? (
            <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-sm">No preview available</span>
            </div>
          )}
        </div>

        {/* Right — Details */}
        <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto flex flex-col gap-5">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full border border-white/10 w-fit"
            style={{ color, backgroundColor: `${color}12` }}
          >
            {project.category}
          </span>

          <h2 className="text-[28px] md:text-[32px] font-black text-white leading-tight">
            {project.title}
          </h2>

          <div className="flex flex-wrap gap-4 text-[13px]">
            <div>
              <p className="text-white/30 uppercase tracking-wider text-[10px] font-semibold mb-0.5">Client</p>
              <p className="text-white/80 font-medium">{project.client}</p>
            </div>
            <div>
              <p className="text-white/30 uppercase tracking-wider text-[10px] font-semibold mb-0.5">Style</p>
              <p className="text-white/80 font-medium">{project.style}</p>
            </div>
            {project.duration && (
              <div>
                <p className="text-white/30 uppercase tracking-wider text-[10px] font-semibold mb-0.5">Duration</p>
                <p className="text-white/80 font-medium">{project.duration}</p>
              </div>
            )}
          </div>

          <div className="h-px w-full" style={{ background: `${color}30` }} />

          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2">Overview</h4>
            <p className="text-white/70 text-[14px] leading-relaxed">{project.description}</p>
          </div>

          {project.results && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">Result</p>
              <p className="font-bold text-[16px]" style={{ color }}>{project.results}</p>
            </div>
          )}

          {project.tools && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2">Tools Used</p>
              <p className="text-[13px] text-white/60 font-medium">{project.tools.join(" · ")}</p>
            </div>
          )}

          {project.youtubeId && (
            <a
              href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] font-semibold mt-auto pt-2 transition-colors duration-200"
              style={{ color }}
            >
              <ExternalLink size={14} />
              Watch on YouTube
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="section-padding relative overflow-hidden bg-[#020202]">
      <div className="container-wide relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <SectionReveal>
              <div className="mb-6 flex items-center gap-4">
                <div className="w-12 h-px bg-accent" />
                <span className="eyebrow text-accent font-bold tracking-[0.3em]">Selected Works</span>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="text-section-title text-white">
                Featured <span className="text-gradient font-black">Projects.</span>
              </h2>
            </SectionReveal>
          </div>

          {/* Category filter */}
          <SectionReveal delay={0.16}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-accent text-black"
                      : "border border-border-subtle text-text-secondary hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* Cards Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
