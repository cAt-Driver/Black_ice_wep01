import React, { useState, useRef, useEffect } from "react";
import { 
  Terminal, 
  Bell, 
  Globe, 
  Lock, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  LayoutDashboard, 
  LogOut, 
  ExternalLink,
  ChevronDown,
  Layers,
  Cpu,
  Code2,
  X
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const { 
    notifications, 
    unreadNotificationCount, 
    markAllNotificationsRead, 
    markNotificationRead,
    teamUser, 
    setIsAuthModalOpen, 
    setIsInquiryModalOpen, 
    setIsDashboardOpen,
    logoutTeamMember,
    setActiveProjectDetail,
    projects,
    siteSettings
  } = useApp();

  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const brandName = (language === "ar" 
    ? (siteSettings.siteNameAr || (siteSettings as any).teamNameAr) 
    : (siteSettings.siteNameEn || (siteSettings as any).teamNameEn)) || "نوفا كودرز للبرمجيات";
  const tagline = (language === "ar" 
    ? (siteSettings.siteSloganAr || (siteSettings as any).taglineAr) 
    : (siteSettings.siteSloganEn || (siteSettings as any).taglineEn)) || "حلول برمجية ذكية";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.link) {
      const proj = projects.find((p) => p.id === notif.link);
      if (proj) {
        setActiveProjectDetail(proj);
        setIsNotifDropdownOpen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080c17]/85 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Name (Resilient & Responsive) */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0 max-w-[55%] xs:max-w-[60%] sm:max-w-none shrink">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 shrink-0">
              <div className="w-full h-full bg-[#0b1120] rounded-[10px] flex items-center justify-center overflow-hidden">
                {siteSettings.logoUrl ? (
                  <img src={siteSettings.logoUrl} alt={brandName} className="w-full h-full object-cover" />
                ) : (
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 group-hover:rotate-6 transition-transform" />
                )}
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-sky-500"></span>
              </span>
            </div>
            
            <div className="flex flex-col min-w-0 justify-center">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-sm xs:text-base sm:text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors font-sans truncate whitespace-nowrap leading-tight">
                  {brandName}
                </span>
                <span className="hidden sm:inline-flex shrink-0 text-[9px] sm:text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-sky-400 font-semibold tracking-wide">
                  v3.0
                </span>
              </div>
              <span className="hidden xs:block text-[10px] sm:text-xs text-slate-400 font-normal truncate max-w-[130px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-none leading-none mt-0.5">
                {tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <a 
              href="#projects" 
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              {language === "ar" ? "الأنظمة والمشاريع" : "Systems & Portfolio"}
            </a>
            <a 
              href="#services" 
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              {language === "ar" ? "خدماتنا البرمجية" : "Software Services"}
            </a>
            <a 
              href="#team" 
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              {language === "ar" ? "فريق العمل" : "Our Team"}
            </a>
            <a 
              href="#testimonials" 
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              {language === "ar" ? "العملاء ومستخدمو الأنظمة" : "Clients & Solutions"}
            </a>
          </nav>

          {/* Right Action Cluster: Notifications, Language Switcher, Team Login, and CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Real-time Notification Bell & Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                id="notification-bell-btn"
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className={`relative p-2.5 rounded-xl border transition-all duration-200 ${
                  isNotifDropdownOpen 
                    ? "bg-blue-900/30 border-blue-500/50 text-sky-300 shadow-md shadow-blue-500/20" 
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
                title={t("notificationsTitle")}
                aria-label="Toggle notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-[#080c17] animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Dropdown Card */}
              {isNotifDropdownOpen && (
                <div 
                  className={`absolute mt-3 w-80 sm:w-96 rounded-2xl bg-[#0c1324] border border-slate-700/80 shadow-2xl shadow-blue-950/60 p-4 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isRtl ? "left-0 sm:left-auto sm:right-0 origin-top-left sm:origin-top-right" : "right-0 origin-top-right"
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-sky-400" />
                      <h4 className="text-sm font-semibold text-white">
                        {t("notificationsTitle")}
                      </h4>
                      {unreadNotificationCount > 0 && (
                        <span className="text-[11px] bg-blue-500/20 text-sky-400 px-2 py-0.5 rounded-full border border-blue-500/30 font-mono font-medium">
                          {unreadNotificationCount} {language === "ar" ? "جديد" : "new"}
                        </span>
                      )}
                    </div>
                    {unreadNotificationCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors"
                      >
                        {t("markAllRead")}
                      </button>
                    )}
                  </div>

                  <div className="mt-3 space-y-2 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                    {notifications.length === 0 ? (
                      <p className="py-6 text-center text-xs text-slate-500">
                        {t("noNotifications")}
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            !n.read
                              ? "bg-blue-950/40 border-blue-500/30 hover:border-blue-500/50"
                              : "bg-slate-900/40 border-slate-800/60 hover:border-slate-700 opacity-80"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="text-xs font-semibold text-white line-clamp-1">
                              {language === "ar" ? n.titleAr : n.titleEn}
                            </h5>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap font-mono">
                              {n.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                            {language === "ar" ? n.messageAr : n.messageEn}
                          </p>
                          {n.link && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-sky-400 font-medium mt-1.5 hover:underline">
                              {language === "ar" ? "عرض تفاصيل المنظومة" : "View system details"} &rarr;
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold">{language === "ar" ? "English" : "العربية"}</span>
            </button>

            {/* Discrete Team Login / Team Workspace Button */}
            {teamUser ? (
              <div className="flex items-center gap-2">
                <button
                  id="dashboard-open-btn"
                  onClick={() => setIsDashboardOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-sky-300 bg-blue-950/70 border border-blue-500/40 hover:border-blue-400 hover:bg-blue-900/50 rounded-xl transition-all shadow-md shadow-blue-950/40"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">{t("adminDashboard")}</span>
                  <span className="sm:hidden">{teamUser.name.split(" ")[0]}</span>
                </button>
                <button
                  onClick={logoutTeamMember}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-xl border border-slate-800 transition-colors"
                  title={t("logout")}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="team-login-modal-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="group relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-sky-300 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/80 hover:border-blue-500/40 rounded-xl transition-all"
                title={t("teamLoginSubtitle")}
              >
                <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors" />
                <span>{t("teamLoginBtn")}</span>
              </button>
            )}

            {/* Main CTA: Request System */}
            <button
              id="request-system-cta-btn"
              onClick={() => setIsInquiryModalOpen(true)}
              className="relative hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t("navInquiryBtn")}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/80 space-y-2 animate-in slide-in-from-top-2 duration-150">
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            >
              {language === "ar" ? "الأنظمة والمشاريع" : "Systems & Portfolio"}
            </a>
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            >
              {language === "ar" ? "خدماتنا البرمجية" : "Software Services"}
            </a>
            <a
              href="#team"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            >
              {language === "ar" ? "فريق العمل" : "Our Team"}
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            >
              {language === "ar" ? "العملاء ومستخدمو الأنظمة" : "Clients & Solutions"}
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsInquiryModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === "ar" ? "طلب نظام جديد" : "Request System"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
