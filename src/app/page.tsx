import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
