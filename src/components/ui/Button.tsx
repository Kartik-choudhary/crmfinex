"use client";

import { motion } from "framer-motion";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({ href, children, className = "", variant = "primary", ...props }: ButtonProps) {
  const classes = [
    "rounded-full px-6 py-3 text-sm font-semibold transition-transform",
    variant === "primary" ? "btn-primary shadow-[0_8px_30px_rgba(255,74,61,0.25)]" : "glass border border-[#e2e8f0] text-[#0b1020] hover:bg-[#f8fafc]",
    "hover:scale-[1.02] active:scale-[0.98]",
    className,
  ].join(" ");

  if (href) {
    return (
      <motion.a whileHover={{ y: -1 }} whileTap={{ y: 0 }} href={href} className={classes}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button whileHover={{ y: -1 }} whileTap={{ y: 0 }} className={classes} {...props}>
      {children}
    </motion.button>
  );
}



