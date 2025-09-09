"use client";

import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/TestimonialCard";

const testimonials = [
  {
    title: "Exceptional Results",
    quote: "CRMFinex helped my project immensely. They were reliable, friendly, and a joy to collaborate with. A huge thank you for their support!",
  },
  {
    title: "Outstanding Team",
    quote: "I've worked with many developers, but CRMFinex is the best! They're true collaborators, communicate clearly, and always deliver on time. I highly recommend them!",
  },
  {
    title: "Platform Masters",
    quote: "CRMFinex's Salesforce expertise is unmatched. They helped us prioritize our work and really understand the platform.",
  },
];

export function Testimonials() {
  return (
    <section className="container-max py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0b1020]">
          VOICE OF OUR <span className="text-gradient">CUSTOMERS</span>
        </h2>
        <p className="text-lg text-[#64748b] max-w-4xl mx-auto">
          Trusted by Leading Brands and SMEs, We Deliver Value by Simplifying Complex Business Processes with Straightforward Solutions
        </p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="initial"
        animate="animate"
      >
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx} {...t} />)
        )}
      </motion.div>
    </section>
  );
}



