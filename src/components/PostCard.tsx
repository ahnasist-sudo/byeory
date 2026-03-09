import { motion } from "motion/react";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
}

interface PostCardProps {
  post: Post;
  primaryColor: string;
}

export default function PostCard({ post, primaryColor }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image_url || "https://picsum.photos/seed/placeholder/800/400"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span 
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border"
            style={{ borderColor: `${primaryColor}40`, color: primaryColor }}
          >
            {post.category}
          </span>
          <span className="text-[10px] text-white/30 font-mono">
            {new Date(post.created_at).toLocaleDateString('ko-KR')}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
          {post.title}
        </h3>
        <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
          {post.content}
        </p>
      </div>
    </motion.div>
  );
}
