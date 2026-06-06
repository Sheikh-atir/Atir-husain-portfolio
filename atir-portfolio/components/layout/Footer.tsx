"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/data";
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle bg-surface py-20 overflow-hidden">
      {/* Very subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)" }}
      />

      <div className="container-wide">
        <div className="flex flex-col items-center text-center gap-10">
          {/* Logo */}
          <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center text-background font-black text-sm">
            AH
          </div>

          {/* Statement */}
          <p className="text-[28px] md:text-[36px] font-black text-white max-w-xl leading-tight tracking-tight">
            Creating Stories That People{" "}
            <span className="text-gradient-accent">Watch Till The End.</span>
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
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
                className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center hover:border-accent/30 transition-all duration-300 opacity-75 hover:opacity-100"
              >
                <Image src={icon} alt={title} width={24} height={24} className="object-contain" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-border-subtle" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 text-[12px] text-text-secondary">
            <p>© {year} Atir Husain. All rights reserved.</p>
            <p>Designed &amp; crafted in Lucknow, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
