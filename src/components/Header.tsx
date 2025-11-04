"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/categories", label: "Categories" },
  { href: "/custom", label: "Custom" },
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

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-800/30 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/* circular gold logo */}
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-[#E8C987]">
            <Image
              src="/file_000000007a4461f59f24187f958711dc~2.png"
              alt="STRION"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-base font-semibold tracking-[0.25em] text-[#E8C987]">
            STRION
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#E8C987]">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA (desktop) */}
        <div className="hidden md:block">
          <Link
            href="/custom"
            className="rounded-md border border-[#E8C987] px-4 py-2 text-[#E8C987] transition hover:bg-[#E8C987] hover:text-black"
          >
            Start Your Design
          </Link>
        </div>

        {/* mobile menu button */}
        <button
          onClick={() => setOpen((s) => !s)}
          className="rounded p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="#E8C987" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
          </svg>
        </button>
      </div>

      {/* mobile dropdown */}
      {open && (
        <div className="grid gap-2 border-t border-yellow-800/20 bg-black p-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/custom"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-md border border-[#E8C987] px-4 py-2 text-center text-[#E8C987] transition hover:bg-[#E8C987] hover:text-black"
          >
            Start Your Design
          </Link>
        </div>
      )}
    </header>
  );
}
