import { Instagram, Facebook, MessageCircle } from "lucide-react";

interface FooterProps {
  settings: any;
}

export default function Footer({ settings }: FooterProps) {
  const siteName = settings.site_name || "사회적협동조합 벼리";

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tighter text-white">{siteName}</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              우리는 지역사회의 모든 이들이 함께 어우러져<br />
              행복한 삶을 누릴 수 있는 세상을 꿈꿉니다.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/30">연락처</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>주소: {settings.contact_address || "서울특별시 어느구 어느동 123-45"}</li>
              <li>전화: {settings.contact_phone || "02-1234-5678"}</li>
              <li>이메일: {settings.contact_email || "contact@byeori.coop"}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/30">소셜 미디어</h4>
            <div className="flex space-x-4">
              <a href={settings.social_instagram || "#"} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Instagram size={20} className="text-white/70" />
              </a>
              <a href={settings.social_facebook || "#"} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Facebook size={20} className="text-white/70" />
              </a>
              <a href={settings.social_kakao || "#"} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <MessageCircle size={20} className="text-white/70" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-white/30">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
