import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Settings as SettingsIcon, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Save,
  ChevronRight,
  LogOut,
  Image as ImageIcon,
  MessageSquare,
  Instagram,
  Facebook,
  MessageCircle
} from "lucide-react";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.token);
        setIsAuthenticated(true);
      } else {
        setError("비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex p-4 bg-yellow-400 rounded-2xl mb-4">
              <SettingsIcon size={32} className="text-black" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">관리자 로그인</h1>
            <p className="text-white/40">계속하려면 비밀번호를 입력하세요.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">비밀번호</label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-yellow-400 transition-colors text-white"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center">{error}</p>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              로그인
            </button>
          </form>

          <div className="text-center">
            <Link to="/" className="text-sm text-white/30 hover:text-white transition-colors">
              사이트로 돌아가기
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <SettingsIcon size={18} className="text-black" />
            </div>
            <span className="font-bold tracking-tight">벼리 관리자</span>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <SidebarLink to="/admin" icon={LayoutDashboard} label="대시보드" exact />
          <SidebarLink to="/admin/posts" icon={FileText} label="게시글 관리" />
          <SidebarLink to="/admin/settings" icon={SettingsIcon} label="사이트 설정" />
          <SidebarLink to="/admin/seo" icon={Search} label="SEO 관리" />
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">로그아웃</span>
          </button>
          <Link to="/" className="flex items-center space-x-3 p-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <ChevronRight size={20} />
            <span className="text-sm font-medium">사이트로 돌아가기</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-8">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/posts" element={<PostManagement />} />
          <Route path="/settings" element={<SiteSettings />} />
          <Route path="/seo" element={<SEOManagement />} />
        </Routes>
      </main>
    </div>
  );
}

function SidebarLink({ to, icon: Icon, label, exact = false }: any) {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 p-3 rounded-xl transition-all duration-200",
        isActive 
          ? "bg-yellow-400 text-black font-bold shadow-lg shadow-yellow-400/20" 
          : "text-white/50 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon size={20} />
      <span className="text-sm">{label}</span>
    </Link>
  );
}

// --- Admin Sub-pages ---

function AdminHome() {
  const [stats, setStats] = useState({ posts: 0 });

  useEffect(() => {
    fetch("/api/posts").then(res => res.json()).then(data => setStats({ posts: data.length }));
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">대시보드 개요</h1>
        <p className="text-white/40 mt-1">웹사이트의 현재 상태를 한눈에 확인하세요.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <FileText className="text-blue-500" />
            </div>
            <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Total Posts</span>
          </div>
          <div>
            <div className="text-4xl font-bold">{stats.posts}</div>
            <div className="text-sm text-white/40">등록된 전체 게시글 수</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);

  const fetchPosts = () => {
    fetch("/api/posts").then(res => res.json()).then(data => setPosts(data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentPost.id ? "PUT" : "POST";
    const url = currentPost.id ? `/api/posts/${currentPost.id}` : "/api/posts";

    await fetch(url, {
      method,
      headers: { 
        "Content-Type": "application/json",
        "x-admin-token": localStorage.getItem("admin_token") || ""
      },
      body: JSON.stringify(currentPost),
    });

    setIsEditing(false);
    setCurrentPost(null);
    fetchPosts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await fetch(`/api/posts/${id}`, { 
      method: "DELETE",
      headers: {
        "x-admin-token": localStorage.getItem("admin_token") || ""
      }
    });
    fetchPosts();
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {currentPost.id ? "게시글 수정" : "새 게시글 작성"}
            </h1>
            <p className="text-white/40 mt-1">내용을 입력하고 저장 버튼을 눌러주세요.</p>
          </div>
          <button 
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white"
          >
            취소
          </button>
        </header>

        <form onSubmit={handleSave} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">제목</label>
              <input 
                required
                value={currentPost?.title || ""}
                onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="제목을 입력하세요"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">카테고리</label>
              <select 
                value={currentPost?.category || "공지사항"}
                onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              >
                <option>공지사항</option>
                <option>새소식</option>
                <option>활동내역</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">이미지 URL</label>
            <div className="flex space-x-2">
              <input 
                value={currentPost?.image_url || ""}
                onChange={e => setCurrentPost({...currentPost, image_url: e.target.value})}
                className="flex-grow bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="https://..."
              />
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                {currentPost?.image_url ? (
                  <img src={currentPost.image_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <ImageIcon size={20} className="text-white/20" />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">내용</label>
            <textarea 
              required
              rows={10}
              value={currentPost?.content || ""}
              onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
              placeholder="게시글 내용을 입력하세요"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <Save size={20} />
            <span>저장하기</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">게시글 관리</h1>
          <p className="text-white/40 mt-1">공지사항 및 활동 내역을 관리합니다.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentPost({ category: "공지사항" });
            setIsEditing(true);
          }}
          className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl flex items-center space-x-2 hover:scale-105 transition-transform"
        >
          <Plus size={20} />
          <span>새 글 작성</span>
        </button>
      </header>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">제목</th>
              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">카테고리</th>
              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">작성일</th>
              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-white group-hover:text-yellow-400 transition-colors">{post.title}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/60">{post.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-white/30 font-mono">
                  {new Date(post.created_at).toLocaleDateString('ko-KR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => {
                        setCurrentPost(post);
                        setIsEditing(true);
                      }}
                      className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-500 transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SiteSettings() {
  const [settings, setSettings] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(res => res.json()).then(data => setSettings(data));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await fetch("/api/settings", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-admin-token": localStorage.getItem("admin_token") || ""
      },
      body: JSON.stringify(settings),
    });
    setIsSaving(false);
    alert("설정이 저장되었습니다. 페이지를 새로고침하면 적용됩니다.");
  };

  return (
    <div className="max-w-4xl space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">사이트 설정</h1>
          <p className="text-white/40 mt-1">웹사이트의 기본 정보와 디자인 테마를 변경합니다.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl flex items-center space-x-2 hover:scale-105 transition-transform disabled:opacity-50"
        >
          <Save size={20} />
          <span>{isSaving ? "저장 중..." : "변경사항 저장"}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-xl font-bold">기본 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">사이트 이름</label>
              <input 
                value={settings.site_name || ""}
                onChange={e => setSettings({...settings, site_name: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">관리자 비밀번호</label>
              <input 
                type="password"
                value={settings.admin_password || ""}
                onChange={e => setSettings({...settings, admin_password: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="새 비밀번호 입력"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">소개 텍스트</label>
            <textarea 
              rows={4}
              value={settings.about_text || ""}
              onChange={e => setSettings({...settings, about_text: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
            />
          </div>
        </section>

        <section className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-xl font-bold">연락처 및 소셜 미디어</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">주소</label>
              <input 
                value={settings.contact_address || ""}
                onChange={e => setSettings({...settings, contact_address: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">전화번호</label>
              <input 
                value={settings.contact_phone || ""}
                onChange={e => setSettings({...settings, contact_phone: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">이메일</label>
              <input 
                value={settings.contact_email || ""}
                onChange={e => setSettings({...settings, contact_email: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">인스타그램 링크</label>
              <input 
                value={settings.social_instagram || ""}
                onChange={e => setSettings({...settings, social_instagram: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">페이스북 링크</label>
              <input 
                value={settings.social_facebook || ""}
                onChange={e => setSettings({...settings, social_facebook: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">카카오톡 링크</label>
              <input 
                value={settings.social_kakao || ""}
                onChange={e => setSettings({...settings, social_kakao: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
          </div>
        </section>

        <section className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-xl font-bold">디자인 테마</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">포인트 컬러 (Primary)</label>
              <div className="flex items-center space-x-4">
                <input 
                  type="color"
                  value={settings.primary_color || "#FACC15"}
                  onChange={e => setSettings({...settings, primary_color: e.target.value})}
                  className="w-12 h-12 bg-transparent border-none cursor-pointer"
                />
                <input 
                  value={settings.primary_color || "#FACC15"}
                  onChange={e => setSettings({...settings, primary_color: e.target.value})}
                  className="flex-grow bg-black border border-white/10 rounded-xl px-4 py-3 font-mono"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">배경색 (Background)</label>
              <div className="flex items-center space-x-4">
                <input 
                  type="color"
                  value={settings.bg_color || "#000000"}
                  onChange={e => setSettings({...settings, bg_color: e.target.value})}
                  className="w-12 h-12 bg-transparent border-none cursor-pointer"
                />
                <input 
                  value={settings.bg_color || "#000000"}
                  onChange={e => setSettings({...settings, bg_color: e.target.value})}
                  className="flex-grow bg-black border border-white/10 rounded-xl px-4 py-3 font-mono"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SEOManagement() {
  const [seoList, setSeoList] = useState<any[]>([]);
  const [currentSeo, setCurrentSeo] = useState<any>({ page: "home", title: "", description: "", keywords: "" });

  useEffect(() => {
    fetch("/api/seo").then(res => res.json()).then(data => setSeoList(data));
  }, []);

  const handleSave = async () => {
    await fetch("/api/seo", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-admin-token": localStorage.getItem("admin_token") || ""
      },
      body: JSON.stringify(currentSeo),
    });
    alert("SEO 설정이 저장되었습니다.");
    fetch("/api/seo").then(res => res.json()).then(data => setSeoList(data));
  };

  return (
    <div className="max-w-4xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">SEO 관리</h1>
        <p className="text-white/40 mt-1">검색 엔진 최적화를 위한 메타 태그를 설정합니다.</p>
      </header>

      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">페이지 선택</label>
            <select 
              value={currentSeo.page}
              onChange={e => setCurrentSeo({...currentSeo, page: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
            >
              <option value="home">메인 페이지 (Home)</option>
              <option value="about">소개 페이지 (About)</option>
              <option value="news">소식 페이지 (News)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">페이지 제목 (Title)</label>
            <input 
              value={currentSeo.title}
              onChange={e => setCurrentSeo({...currentSeo, title: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="검색 결과에 표시될 제목"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">설명 (Description)</label>
          <textarea 
            rows={3}
            value={currentSeo.description}
            onChange={e => setCurrentSeo({...currentSeo, description: e.target.value})}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
            placeholder="검색 결과에 표시될 설명 문구"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">키워드 (Keywords)</label>
          <input 
            value={currentSeo.keywords}
            onChange={e => setCurrentSeo({...currentSeo, keywords: e.target.value})}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
            placeholder="쉼표로 구분 (예: 복지, 협동조합, 벼리)"
          />
        </div>

        <button 
          onClick={handleSave}
          className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <Save size={20} />
          <span>SEO 설정 저장</span>
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest">현재 설정된 SEO 목록</h3>
        <div className="grid grid-cols-1 gap-4">
          {seoList.map((item) => (
            <div key={item.page} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-yellow-400 uppercase text-xs tracking-widest">{item.page}</div>
                <div className="text-sm font-medium">{item.title}</div>
              </div>
              <button 
                onClick={() => setCurrentSeo(item)}
                className="p-2 text-white/30 hover:text-white transition-colors"
              >
                <Edit3 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
