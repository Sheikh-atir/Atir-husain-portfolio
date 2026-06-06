"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

const EMAIL = "sheikhhussainr47@gmail.com";
const PHONE = "+91 6391411602";
const LOCATION = "Lucknow, Uttar Pradesh, India";

const projectTypes = [
  "Podcast Editing",
  "Short-form Reels",
  "Long-form Content",
  "Motion Graphics",
  "Color Correction",
  "Other",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email";
    if (!formData.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-[15px] text-white placeholder-text-secondary/40 outline-none transition-all duration-300 focus:border-accent focus:bg-accent/[0.03] ${
      errors[field] ? "border-red-500/50" : "border-border-subtle"
    }`;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Ambient */}
      <div
        className="orb pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          opacity: 0.04,
          background: "radial-gradient(circle, rgba(0,229,255,1) 0%, transparent 70%)",
          top: "50%",
          right: "-10%",
          transform: "translateY(-50%)",
        }}
      />

      <div className="container-wide">
        {/* Header */}
        <div className="mb-20">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="eyebrow">Get in Touch</span>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <h2 className="text-section-title font-black text-white">
              LET&apos;S{" "}
              <span className="text-gradient">COLLABORATE</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.16}>
            <p className="text-[18px] text-text-secondary mt-6 max-w-lg font-light">
              Have a project in mind? Let&apos;s talk about how great editing
              can transform your content.
            </p>
          </SectionReveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20">
          {/* Left — Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <SectionReveal>
              <div className="flex flex-col gap-3">
                {[
                  { Icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                  { Icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE}` },
                  { Icon: MapPin, label: "Location", value: LOCATION, href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="glass glass-hover rounded-2xl p-5 flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-accent/08 border border-accent/15 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-text-secondary mb-0.5 uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-[14px] text-white hover:text-accent transition-colors font-medium break-all"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-[14px] text-white font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* Social links */}
            <SectionReveal delay={0.1}>
              <div>
                <p className="text-[11px] text-text-secondary uppercase tracking-[0.25em] mb-4">
                  Find Me Online
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: "/assets/instagram.png", href: siteConfig.social.instagram, title: "Instagram" },
                    { icon: "/assets/twitter.png", href: siteConfig.social.twitter, title: "Twitter" },
                    { icon: "/assets/linkedin.png", href: siteConfig.social.linkedin, title: "LinkedIn" },
                  ].map(({ icon, href, title }) => (
                    <a
                      key={title}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={title}
                      title={title}
                      className="w-11 h-11 rounded-full border border-border-subtle flex items-center justify-center hover:border-accent/40 transition-all duration-300 hover:shadow-glow-accent opacity-75 hover:opacity-100"
                    >
                      <Image src={icon} alt={title} width={24} height={24} className="object-contain" />
                    </a>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Availability badge */}
            <SectionReveal delay={0.2}>
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[15px] text-white font-semibold">Available for Work</span>
                </div>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  Currently accepting podcast editing, short-form content, and branded video projects.
                </p>
              </div>
            </SectionReveal>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <SectionReveal delay={0.2}>
              <div className="glass rounded-3xl p-8 md:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                      <CheckCircle size={28} className="text-accent" />
                    </div>
                    <h3 className="text-[22px] font-bold text-white">Message Sent!</h3>
                    <p className="text-text-secondary max-w-xs text-[15px] leading-relaxed">
                      Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[12px] text-text-secondary mb-2 block uppercase tracking-wider">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={inputClass("name")}
                        />
                        {errors.name && <p className="text-red-400 text-[12px] mt-1.5">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-[12px] text-text-secondary mb-2 block uppercase tracking-wider">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={inputClass("email")}
                        />
                        {errors.email && <p className="text-red-400 text-[12px] mt-1.5">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Project type */}
                    <div>
                      <label className="text-[12px] text-text-secondary mb-2 block uppercase tracking-wider">Project Type</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-white/[0.04] border border-border-subtle rounded-xl px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-300 focus:border-accent focus:bg-accent/[0.03] appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-surface">Select type…</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t} className="bg-surface">{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-[12px] text-text-secondary mb-2 block uppercase tracking-wider">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, timeline, and goals…"
                        rows={4}
                        className={`${inputClass("message")} resize-none`}
                      />
                      {errors.message && <p className="text-red-400 text-[12px] mt-1.5">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <div className="pt-1">
                      <MagneticButton
                        variant="primary"
                        type="submit"
                        className="w-full justify-center"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            Send Message
                          </>
                        )}
                      </MagneticButton>
                    </div>
                  </form>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
