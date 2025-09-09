import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Services } from "@/components/sections/Services";

export const metadata = {
  title: "Services",
  description: "Salesforce consulting, AWS integrations, AI automation, and managed support.",
};

export default function ServicesPage() {
  return (
    <div>
      <Navbar />
      <main>
        <section className="container-max py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold">Our Services</h1>
          <p className="mt-4 max-w-2xl text-[#64748b]">
            We build scalable solutions across Salesforce, AWS, and AI automation to deliver tangible business impact.
          </p>
        </section>
        <Services />
      </main>
      <Footer />
    </div>
  );
}



