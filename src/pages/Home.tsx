import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Send } from "lucide-react";
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

  const newsPosts = posts.filter(post => post.category !== "활동내역");
  const activityPosts = posts.filter(post => post.category === "활동내역");

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
            <a 
              href="#activities"
              className="px-8 py-4 rounded-full font-bold text-black transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              활동 참여하기
            </a>
            <a 
              href="#about"
              className="px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/5 transition-all flex items-center justify-center"
            >
              조합 소개 보기
            </a>
          </motion.div>
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
            <p className="text-white/40">조합의 공지사항과 새소식을 확인하세요.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsPosts.map((post) => (
            <PostCard key={post.id} post={post} primaryColor={primaryColor} />
          ))}
          {newsPosts.length === 0 && (
            <p className="text-white/20 col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl">등록된 소식이 없습니다.</p>
          )}
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              벼리의 <span style={{ color: primaryColor }}>활동내역</span>
            </h2>
            <p className="text-white/40">지역사회와 함께한 소중한 기록들입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activityPosts.map((post) => (
            <PostCard key={post.id} post={post} primaryColor={primaryColor} />
          ))}
          {activityPosts.length === 0 && (
            <p className="text-white/20 col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl">등록된 활동내역이 없습니다.</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div 
            className="relative rounded-[3rem] p-12 md:p-16 text-left space-y-8 overflow-hidden h-full"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black leading-none">
              당신의 작은 관심이<br />누군가에겐 큰 희망이 됩니다.
            </h2>
            <p className="max-w-md text-black/70 text-lg font-medium">
              벼리와 함께 따뜻한 변화를 만들어갈 분들을 기다립니다. 궁금한 점이 있다면 언제든 문의해 주세요.
            </p>
            <div className="space-y-4 text-black/80 font-bold">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                  <Send size={18} className="text-black" />
                </div>
                <span>{settings.contact_email || "contact@byeori.coop"}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 space-y-8">
            <h3 className="text-3xl font-bold tracking-tight">문의하기</h3>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name"),
                  contact: formData.get("contact"),
                  message: formData.get("message"),
                };
                await fetch("/api/inquiries", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
                alert("문의가 접수되었습니다. 확인 후 연락드리겠습니다.");
                (e.target as HTMLFormElement).reset();
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">성함</label>
                <input 
                  name="name"
                  required
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-yellow-400 transition-colors text-white"
                  placeholder="홍길동"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">연락처 (전화번호 또는 이메일)</label>
                <input 
                  name="contact"
                  required
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-yellow-400 transition-colors text-white"
                  placeholder="010-0000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">문의 내용</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-yellow-400 transition-colors text-white resize-none"
                  placeholder="궁금하신 내용을 입력해주세요."
                />
              </div>
              <button 
                type="submit"
                className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>문의 보내기</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
