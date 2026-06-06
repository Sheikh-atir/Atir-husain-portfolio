"use client";

import { useState } from "react";
import LoadingScreen from "@/components/sections/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import ScrollContent from "@/components/sections/ScrollContent";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <CustomCursor />

      <LoadingScreen onComplete={() => setLoaded(true)} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Work />
              <ScrollContent />
              <Skills />
              <Experience />
              <Stats />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
