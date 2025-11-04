"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const linksPrimary = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/categories", label: "Categories" },
  { href: "/custom", label: "Custom" },
];
const linksSecondary = [
  { href: "/commercial", label: "Commercial" },
  { href: "/residential", label: "Residential" },
  { href: "/signature", label: "Signature" },
  { href: "/work", label: "Work" },
  { href: "/shop", label: "Shop" },
  { href: "/nationwide", label: "Nationwide" },
  { href: "/sets", label: "Sets" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [elevate, setElevate] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevate(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all",
        "backdrop-blur-xl",
        elevate ? "bg-black/70 shadow-gold" : "bg-black/30",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="relative h-8 w-8 rounded-full ring-1 ring-[#E8C987]/30 overflow-hidden glow-gold">
              <Image
                src="/file_000000007a4461f59f24187f958711dc~2.png"
                alt="STRION"
                fill
                className="object-cover"
                priority
              />
            </span>
            <span className="text-lg tracking-[0.2em] font-semibold text-brand-gold group-hover:text-brand-goldDim transition">
              STRION
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {linksPrimary.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link">
                {l.label}
              </Link>
            ))}
            <div className="h-5 w-px bg-white/10 mx-2" />
            {linksSecondary.map((l) => (
              <Link key={l.href} href={l.href} className="nav-sub">
                {l.label}
              </Link>
            ))}
            <Link
              href="/custom"
              className="btn-gold ml-2 animate-goldPulse"
            >
              Start Your Design
            </Link>
          </nav>

          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md ring-1 ring-white/10 hover:ring-white/20 transition"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-[#E8C987] transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[#E8C987] transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[#E8C987] transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <div
        className={[
          "lg:hidden overflow-hidden transition-[max-height] duration-500",
          open ? "max-h-[560px]" : "max-h-0",
          "border-t border-white/10",
        ].join(" ")}
      >
        <div className="px-4 py-4 space-y-2 bg-gradient-to-b from-black/80 to-black">
          {[...linksPrimary, ...linksSecondary].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 nav-link"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/custom"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex btn-gold"
          >
            Start Your Design
          </Link>
        </div>
      </div>

      <div className="pointer-events-none select-none h-[1px] w-full bg-goldLine" />
    </header>
  );
}
