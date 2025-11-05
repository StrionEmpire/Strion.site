"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open (mobile)
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300
        ${scrolled ? "shadow-[0_0_30px_rgba(232,201,135,0.25)] bg-black/70 backdrop-blur" : "bg-black/40"}
      `}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left: Crest + Name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-full ring-1 ring-[#E8C987]/40 overflow-hidden">
            <Image
              src="/file_000000007a4461f59f24187f958711dc~2.png"
              alt="STRION Crest"
              fill
              className="object-contain"
              sizes="36px"
            />
          </div>
          <span className="tracking-wide font-semibold text-[#E8C987]">STRION</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link className="navlink" href="/about">About</Link>
          <Link className="navlink" href="/categories">Categories</Link>
          <Link className="navlink" href="/signature">Signature</Link>
          <Link className="navlink" href="/work">Work</Link>
          <Link className="btn-gold" href="/custom">Start Your Design</Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          aria-label="Menu"
          className="md:hidden outline-none focus:ring-2 focus:ring-[#E8C987]/50 rounded px-2 py-1"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-6 space-y-1.5">
            <span className="block h-[2px] bg-[#E8C987]"></span>
            <span className="block h-[2px] bg-[#E8C987]"></span>
            <span className="block h-[2px] bg-[#E8C987]"></span>
          </div>
        </button>
      </nav>

      {/* Mobile menu (no slide-in, just drops under header) */}
      {open && (
        <div className="md:hidden max-h-[75vh] overflow-y-auto border-t border-white/10 bg-black/90">
          <div className="px-4 py-3 flex flex-col text-base">
            <Link className="mobilelink" href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link className="mobilelink" href="/categories" onClick={() => setOpen(false)}>Categories</Link>
            <Link className="mobilelink" href="/signature" onClick={() => setOpen(false)}>Signature</Link>
            <Link className="mobilelink" href="/work" onClick={() => setOpen(false)}>Work</Link>
            <Link className="btn-gold mt-2 text-center" href="/custom" onClick={() => setOpen(false)}>
              Start Your Design
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
