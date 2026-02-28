"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container-max flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-bold tracking-wide text-[18px] text-foreground">
            <span>CRM</span>
            <span className="text-gradient">Finex</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-foreground">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-80 transition-opacity">
              {item.label}
            </Link>
          ))}
          <motion.a
            href="/contact"
            className="btn-primary rounded-full px-4 py-2 text-sm font-semibold"
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            Book a Free Consultation
          </motion.a>
        </nav>
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-foreground/10 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <nav className="container-max py-4 flex flex-col gap-3 border-t border-foreground/10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground text-sm font-medium py-2 hover:opacity-80"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/contact"
                className="btn-primary rounded-full px-4 py-2 text-sm font-semibold text-center mt-2 inline-block w-fit"
                onClick={() => setMobileOpen(false)}
              >
                Book a Free Consultation
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </header>
  );
}



