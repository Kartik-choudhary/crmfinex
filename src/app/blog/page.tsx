import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";

export const metadata = {
  title: "Blog",
  description: "Advanced Salesforce insights, tips, and best practices from CRMFinex experts. Topics include automation, architecture, security, and innovative integrations like AWS S3 file management, helping clients optimize CRM storage and performance.",
};

const blogPosts = [
  {
    id: "1",
    title: "Mastering Salesforce Flow: Advanced Automation Patterns for Enterprise",
    excerpt: "Discover sophisticated Flow patterns that can handle complex business logic, error handling, and performance optimization for large-scale Salesforce implementations.",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Salesforce Flow",
    slug: "mastering-salesforce-flow-advanced-automation"
  },
  {
    id: "2", 
    title: "Building Scalable Apex Architecture: Design Patterns for Lightning Platform",
    excerpt: "Learn enterprise-grade Apex design patterns including Factory, Builder, and Strategy patterns to create maintainable and testable Salesforce applications.",
    date: "December 10, 2024",
    readTime: "12 min read",
    category: "Apex Development",
    slug: "scalable-apex-architecture-design-patterns"
  },
  {
    id: "3",
    title: "Salesforce Security Deep Dive: Implementing Zero-Trust Architecture",
    excerpt: "Comprehensive guide to implementing zero-trust security principles in Salesforce, covering field-level security, data encryption, and compliance frameworks.",
    date: "December 5, 2024", 
    readTime: "10 min read",
    category: "Security & Compliance",
    slug: "salesforce-zero-trust-security-architecture"
  },
  {
    id: "4",
    title: "Generic File Management App: Seamless Salesforce Integration with AWS S3",
    excerpt: "Manage files on any Salesforce record with direct AWS S3 uploads, previews, and secure deletes—cut storage costs while leveraging scalable, secure cloud infrastructure.",
    date: "February 27, 2026",
    readTime: "10 min read",
    category: "Integration",
    slug: "generic-file-management-app-salesforce-aws-s3"
  }
];

export default function BlogPage() {
  return (
    <div>
      <Navbar />
      <main className="container-max py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Salesforce <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Advanced tips, patterns, and best practices from our Salesforce experts to help you build better, faster, and more reliable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-white/70 mb-6">
              Get the latest Salesforce insights delivered to your inbox. No spam, just valuable content.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
