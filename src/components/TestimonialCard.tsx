"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type TestimonialProps = {
  title: string;
  quote: string;
};

export function TestimonialCard({ title, quote }: TestimonialProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-[#e2e8f0] shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold text-[#0b1020]">{title}</h3>
      <div className="h-px w-full bg-[#e2e8f0]"></div>
      <p className="text-[#64748b] leading-relaxed">"{quote}"</p>
    </motion.div>
  );
}



