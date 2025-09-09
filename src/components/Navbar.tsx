"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container-max flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          {/* <img src="/finexlogo.png" alt="CRMFinex Logo" className="h-8 w-auto" /> */}
          <span className="font-bold tracking-wide text-[18px] text-[#0b1020]">
            <span>CRM</span>
            <span className="text-gradient">Finex</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#0b1020]">
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
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0b1020]/10 to-transparent" />
    </header>
  );
}



