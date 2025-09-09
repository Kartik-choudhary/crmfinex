"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30" aria-hidden>
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl" style={{ backgroundImage: "var(--gradient-phoenix)" }} />
        <div className="absolute -bottom-40 -left-40 h-[440px] w-[440px] rounded-full blur-3xl" style={{ backgroundImage: "var(--gradient-phoenix)", opacity: 0.5 }} />
      </div>
      <div className="container-max py-20 md:py-28">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight text-[#0b1020]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Fast. Reliable. <span className="text-gradient">Future-Ready</span> CRM & AWS Solutions.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-[#64748b]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Salesforce expertise, AWS integrations, and AI-powered automation to scale confidently and move faster.
        </motion.p>
        <div className="mt-8 flex items-center gap-4">
          <Button href="/contact">Book a Free Consultation</Button>
          <Button variant="ghost" href="/services">Explore Services</Button>
        </div>
      </div>
    </section>
  );
}



