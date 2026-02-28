"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "5+",
    label: "Successful Projects",
  },
  {
    number: "5+",
    label: "Happy Customers",
  },
  {
    number: "3+",
    label: "Salesforce Experts",
  },
  {
    number: "12+",
    label: "Salesforce Certifications",
  },
];

export function Stats() {
  return (
    <section className="container-max py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section - Value Proposition */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0b1020]">
            Transform Your Business with{" "}
            <span className="text-gradient">Expert</span> Salesforce & AWS Solutions
          </h2>
          <p className="text-lg text-[#64748b] max-w-lg">
            Accelerate growth through proven expertise, cutting-edge technology, and strategic implementation that delivers measurable results.
          </p>
        </motion.div>

        {/* Right Section - Statistics Grid */}
        <motion.div
          className="grid grid-cols-2 gap-8"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-[#64748b] font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
