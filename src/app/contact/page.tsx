"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <main className="container-max py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Contact Us</h1>
        <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
          Tell us about your goals. We'll reply within one business day.
        </p>
        <div className="text-center mt-8">
          <p className="text-lg text-foreground">
            You can reach us by email at:{" "}
            <a href="mailto:kartik.choudhary@crmfinex.com" className="text-[#ff6a3d] hover:underline">
              kartik.choudhary@crmfinex.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}