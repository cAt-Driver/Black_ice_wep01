import React from "react";
import { Terminal, Shield, Lock, Globe, Heart, ArrowUp, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { setIsAuthModalOpen, teamUser, setIsDashboardOpen, siteSettings } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const brandName = (language === "ar" 
    ? (siteSettings.siteNameAr || siteSettings.teamNameAr) 
    : (siteSettings.siteNameEn || siteSettings.teamNameEn)) || "نوفا كودرز للبرمجيات";
  const tagline = (language === "ar" 
    ? (siteSettings.siteSloganAr || siteSettings.taglineAr) 
    : (siteSettings.siteSloganEn || siteSettings.taglineEn)) || "حلول برمجية ذكية";
  const description = (language === "ar" 
    ? (siteSettings.heroSubtitleAr || siteSettings.heroDescriptionAr) 
    : (siteSettings.heroSubtitleEn || siteSettings.heroDescriptionEn)) || "";

  return (
    <footer className="bg-[#050811] border-t border-slate-900 text-slate-400 text-xs py-14 relative overflow-hidden">
      
      {/* Background Subtle Cyber Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400 overflow-hidden">
                {siteSettings.logoUrl ? (
                  <img src={siteSettings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Terminal className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight font-sans block">
                  {brandName}
                </span>
                <span className="text-[11px] text-sky-400 font-medium">
                  {tagline}
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 max-w-md text-xs leading-relaxed">
              {description}
            </p>

            {/* Quick Contact Line */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <a 
                href={`https://wa.me/${siteSettings.contactWhatsApp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{siteSettings.contactPhone}</span>
              </a>

              <a 
                href={`mailto:${siteSettings.contactEmail}`}
                className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{siteSettings.contactEmail}</span>
              </a>

              <span className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{siteSettings.address}</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {language === "ar" ? "أقسام الموقع" : "Navigation"}
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="#projects" className="hover:text-sky-400 transition-colors">
                  {language === "ar" ? "معرض الأنظمة والمشاريع" : "Our Projects"}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">
                  {language === "ar" ? "الخدمات والحلول البرمجية" : "Services"}
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-sky-400 transition-colors">
                  {language === "ar" ? "فريق العمل والمهندسون" : "Engineering Team"}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-sky-400 transition-colors">
                  {language === "ar" ? "آراء وتقييمات العملاء" : "Client Reviews"}
                </a>
              </li>
            </ul>
          </div>

          {/* Team Access */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {language === "ar" ? "بوابة فريق العمل" : "Team Portal"}
            </h5>
            <ul className="space-y-2">
              <li>
                {teamUser ? (
                  <button
                    onClick={() => setIsDashboardOpen(true)}
                    className="text-sky-400 hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <Lock className="w-3.5 h-3.5 text-sky-400" />
                    <span>{language === "ar" ? "لوحة التحكم الشاملة" : "Admin Dashboard"}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-slate-300 hover:text-sky-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{language === "ar" ? "تسجيل دخول أعضاء الفريق" : "Team Sign In"}</span>
                  </button>
                )}
              </li>
              <li>
                <span className="text-[11px] text-slate-400">
                  {brandName} - {language === "ar" ? "فريق عمل برمجي متكامل" : "Unified Engineering Team"}
                </span>
              </li>
              <li>
                <span className="text-[11px] text-emerald-400/90 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{language === "ar" ? "دعم فني وضمان متواصل" : "Continuous Support & Warranty"}</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>
            © {new Date().getFullYear()} {brandName}. {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <span>{language === "ar" ? "للأعلى" : "Back to top"}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
