import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Heart, Users, Globe } from "lucide-react";
import PostCard from "../components/PostCard";

interface HomeProps {
  settings: any;
}

export default function Home({ settings }: HomeProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const primaryColor = settings.primary_color || "#FACC15";

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
          <img
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover scale-110 animate-pulse-slow"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span 
              className="text-sm font-bold tracking-[0.3em] uppercase"
              style={{ color: primaryColor }}
            >
              Social Cooperative Byeori
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              더 나은 세상을 위한<br />
              <span style={{ color: primaryColor }}>따뜻한 연결</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed"
          >
            사회적협동조합 벼리는 소외된 이웃과 함께하며,<br />
            지속 가능한 복지 생태계를 만들어가는 사회적협동조합입니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              className="px-8 py-4 rounded-full font-bold text-black transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              활동 참여하기
            </button>
            <a 
              href="#about"
              className="px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/5 transition-all"
            >
              조합 소개 보기
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Heart, label: "지원 가구", value: "1,200+", color: "#EF4444" },
            { icon: Users, label: "활동 단원", value: "450+", color: "#3B82F6" },
            { icon: Globe, label: "협력 기관", value: "85+", color: "#10B981" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center space-y-4"
            >
              <div className="inline-flex p-4 rounded-2xl bg-white/5">
                <stat.icon size={32} style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-4xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              우리가 걷는 길은<br />
              <span style={{ color: primaryColor }}>희망의 증거</span>가 됩니다.
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              {settings.about_text || "사회적협동조합 벼리는 지역사회의 복지 증진과 소외계층 지원을 위해 설립된 사회적협동조합입니다. 우리는 단순한 지원을 넘어 스스로 일어설 수 있는 힘을 기르는 데 집중합니다."}
            </p>
          </div>
          <div className="space-y-4">
            {[
              "투명한 운영과 신뢰받는 복지 실천",
              "지역사회와 함께하는 상생 네트워크 구축",
              "소외계층의 자립을 위한 맞춤형 프로그램 운영"
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin-slow" />
          <div className="absolute inset-10 overflow-hidden rounded-full">
            <img
              src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1000"
              alt="About Us"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </section>

      {/* News Section */}
      <section id="news" className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              벼리의 <span style={{ color: primaryColor }}>새로운 소식</span>
            </h2>
            <p className="text-white/40">조합의 다양한 활동과 공지사항을 확인하세요.</p>
          </div>
          <button className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            <span>전체보기</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} primaryColor={primaryColor} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div 
          className="relative rounded-[3rem] p-12 md:p-24 text-center space-y-8 overflow-hidden"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
          </div>
          
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-black leading-none">
            당신의 작은 관심이<br />누군가에겐 큰 희망이 됩니다.
          </h2>
          <p className="max-w-xl mx-auto text-black/70 text-lg font-medium">
            벼리와 함께 따뜻한 변화를 만들어갈 후원자와 자원봉사자를 기다립니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-5 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-transform">
              후원하기
            </button>
            <button className="px-10 py-5 border-2 border-black/20 text-black rounded-full font-bold text-lg hover:bg-black/5 transition-all">
              봉사 신청
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
