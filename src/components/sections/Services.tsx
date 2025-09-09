"use client";

import { motion } from "framer-motion";
import { LayersIcon, LightningBoltIcon, RocketIcon, GearIcon } from "@radix-ui/react-icons";

const services = [
  {
    title: "Salesforce Consulting & Development",
    desc: "Custom solutions, Apex, Lightning, and platform optimization tailored to your processes.",
    Icon: LightningBoltIcon,
  },
  {
    title: "AWS Cloud Integrations",
    desc: "S3, Lambda, EC2 setups and integrations that are secure, scalable, and cost-effective.",
    Icon: LayersIcon,
  },
  {
    title: "AI-Powered Automation",
    desc: "Intelligent workflows and automation systems to reduce manual work and accelerate delivery.",
    Icon: RocketIcon,
  },
  {
    title: "Managed Support & Maintenance",
    desc: "Reliable ongoing support that keeps your systems healthy and future-ready.",
    Icon: GearIcon,
  },
];

export function Services() {
  return (
    <section className="container-max py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0b1020]">Services</h2>
      <p className="text-[#64748b] mt-2 max-w-2xl">Comprehensive expertise across Salesforce, AWS, and AI automation.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {services.map(({ title, desc, Icon }, idx) => (
          <motion.div
            key={title}
            className="glass rounded-2xl p-6 hover:shadow-[0_8px_30px_rgba(255,74,61,0.15)] border border-[#e2e8f0]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundImage: "var(--gradient-phoenix)" }}>
                <Icon className="text-white" />
              </span>
              <h3 className="font-semibold text-lg text-[#0b1020]">{title}</h3>
            </div>
            <p className="text-[#64748b] mt-3">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


