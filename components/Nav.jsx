"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/profile";
import { FiX, FiMenu } from "react-icons/fi";

export default function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* monogram logo */}
        <a href="#home" onClick={(e) => go(e, "#home")} className="group flex items-center gap-1">
          <span className="grid grid-cols-2 gap-[3px]">
            <span className="w-3 h-3 bg-white group-hover:bg-pop transition-colors" />
            <span className="w-3 h-3 bg-pop" />
            <span className="w-3 h-3 bg-white/40" />
            <span className="w-3 h-3 bg-white group-hover:bg-pop transition-colors" />
          </span>
          <span className="ml-2 font-display font-bold tracking-wide hidden sm:inline">SD</span>
        </a>

        {/* desktop links */}
        <ul className="hidden md:flex items-center gap-7 lg:gap-9 font-display text-sm font-semibold tracking-wider">
          {navLinks.map((l) => {
            const id = l.href.replace("#", "");
            const on = active === id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className={`relative transition-colors ${on ? "text-gold" : "text-white/80 hover:text-white"}`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-gold transition-all duration-300 ${
                      on ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden text-2xl text-white/90 hover:text-pop transition-colors"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="bg-ink2/95 backdrop-blur border-t border-white/5 px-6 py-4 flex flex-col gap-4 font-display font-semibold tracking-wide">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className={active === l.href.replace("#", "") ? "text-gold" : "text-white/85"}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
