"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
};

type BlogCardProps = {
  post: BlogPost;
  index: number;
};

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      className="glass rounded-2xl p-6 hover:shadow-[0_8px_30px_rgba(255,74,61,0.15)] transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
          {post.category}
        </span>
        <span className="text-xs text-white/60">{post.readTime}</span>
      </div>
      
      <h3 className="text-xl font-bold mb-3 hover:text-gradient transition-colors">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      
      <p className="text-white/70 mb-4 line-clamp-3">{post.excerpt}</p>
      
      <div className="flex items-center justify-between">
        <time className="text-sm text-white/60">{post.date}</time>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-sm font-semibold text-gradient hover:opacity-80 transition-opacity"
        >
          Read More →
        </Link>
      </div>
    </motion.article>
  );
}
