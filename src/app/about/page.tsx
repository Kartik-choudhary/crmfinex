import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "About Us",
  description: "Expertise in Salesforce, AWS, and AI automation. Speed, reliability, future-readiness.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-max py-16 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold">About CRMFinex</h1>
        <p className="mt-6 max-w-3xl text-muted-foreground">
          We are a consulting agency specialized in Salesforce and AWS with a focus on
          AI-powered automation. Our team blends deep platform expertise with a product
          mindset to deliver outcomes that are fast, reliable, and built for the future.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold">Salesforce Excellence</h3>
            <p className="text-muted-foreground mt-2">Apex, Lightning, and platform architecture tailored to your business.</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold">AWS at Scale</h3>
            <p className="text-muted-foreground mt-2">Secure, scalable cloud solutions using S3, Lambda, EC2, and more.</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold">AI Automation</h3>
            <p className="text-muted-foreground mt-2">Intelligent workflows that reduce manual work and speed up delivery.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



