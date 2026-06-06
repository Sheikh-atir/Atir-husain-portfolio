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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={onClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >

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

        {/* YouTube Hover Play */}
        {isHovered && project.youtubeId && (
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=0&controls=0&modestbranding=1&loop=1&playlist=${project.youtubeId}`}
            allow="autoplay"
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
            style={{ border: 'none' }}
          />
        )}

        {/* Hover play overlay (only shows while iframe is loading) */}
        {!isHovered && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-400 flex items-center justify-center z-20">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300"
              style={{ background: `${color}DD`, backdropFilter: "blur(8px)" }}
            >
              <Play size={18} fill="black" color="black" className="ml-0.5" />
            </div>
          </div>
        )}
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
        className="relative w-full max-w-5xl aspect-video bg-black border border-white/8 rounded-3xl overflow-hidden shadow-2xl flex max-h-[88vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-9 h-9 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 border border-white/10"
        >
          <X size={16} />
        </button>

        {/* Full-width YouTube embed */}
        <div className="w-full h-full relative">
          {project.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${project.youtubeId}&controls=1&modestbranding=1&rel=0`}
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
                  onClick={() => {
                    setActiveCategory(cat);
                    if (cat === "Short Form Reels") {
                      document.querySelector("#reels")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
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
