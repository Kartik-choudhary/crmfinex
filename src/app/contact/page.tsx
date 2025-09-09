"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending...");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setStatus("Thanks! We'll be in touch shortly.");
      form.reset();
    } catch (e: any) {
      setStatus(e?.message ? `Error: ${e.message}` : "Sorry, something went wrong. Please email us directly.");
    }
  }

  return (
    <div>
      <Navbar />
      <main className="container-max py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0b1020] text-center">Contact Us</h1>
        <p className="mt-3 text-center text-[#64748b] max-w-2xl mx-auto">
          Tell us about your goals. We'll reply within one business day.
        </p>

        <form
          onSubmit={onSubmit}
          className="glass rounded-2xl p-6 md:p-8 max-w-xl mx-auto mt-8 grid gap-5 border border-[#e2e8f0]"
        >
          <div>
            <label className="text-sm text-[#0b1020]">Name</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-md bg-white border border-[#e2e8f0] p-3 outline-none focus:ring-2 focus:ring-[#ff6a3d]/30 focus:border-[#ff6a3d]"
            />
          </div>
          <div>
            <label className="text-sm text-[#0b1020]">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-md bg-white border border-[#e2e8f0] p-3 outline-none focus:ring-2 focus:ring-[#ff6a3d]/30 focus:border-[#ff6a3d]"
            />
          </div>
          <div>
            <label className="text-sm text-[#0b1020]">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-1 w-full rounded-md bg-white border border-[#e2e8f0] p-3 outline-none focus:ring-2 focus:ring-[#ff6a3d]/30 focus:border-[#ff6a3d]"
            />
          </div>
          <button className="btn-primary rounded-full px-5 py-3 font-semibold">Send Message</button>
          {status && <p className="text-sm text-[#64748b]">{status}</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
}


