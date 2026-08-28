import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  CheckCircle2,
  Headphones,
  Smartphone,
  ShoppingBag,
  Calculator,
  Activity,
  Layers,
  Star,
  Lock,
  TrendingUp,
  Monitor,
  Terminal,
  Cpu,
  Code2,
  Settings
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const HeroSection: React.FC = () => {
  const { isRtl, language } = useLanguage();
  const { 
    setIsInquiryModalOpen, 
    siteSettings, 
    setActiveProjectDetail, 
    projects,
    teamUser,
    setIsDashboardOpen
  } = useApp();

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const siteName = (language === "ar" 
    ? (siteSettings.siteNameAr || (siteSettings as any).teamNameAr) 
    : (siteSettings.siteNameEn || (siteSettings as any).teamNameEn)) || "نوفا كودرز للبرمجيات";
  const siteSlogan = (language === "ar" 
    ? (siteSettings.siteSloganAr || (siteSettings as any).taglineAr) 
    : (siteSettings.siteSloganEn || (siteSettings as any).taglineEn)) || "تطوير تطبيقات الجوال والأنظمة البرمجية";

  const title1 = language === "ar" ? siteSettings.heroTitleLine1Ar : siteSettings.heroTitleLine1En;
  const highlight = language === "ar" ? siteSettings.heroTitleHighlightAr : siteSettings.heroTitleHighlightEn;
  const title2 = language === "ar" ? siteSettings.heroTitleLine2Ar : siteSettings.heroTitleLine2En;
  const description = language === "ar" ? siteSettings.heroSubtitleAr : siteSettings.heroSubtitleEn;

  // Dynamic showcase items derived directly from real projects in AppContext
  const showcaseTabs = React.useMemo(() => {
    if (!projects || projects.length === 0) return [];
    
    return projects.map((proj, idx) => {
      const titleAr = proj.titleAr || "نظام مخصص";
      const titleEn = proj.titleEn || proj.titleAr || "Custom System";
      const tagAr = proj.category || (proj.tags && proj.tags[0]) || "نظام متكامل";
      const tagEn = proj.category || (proj.tags && proj.tags[0]) || "Full System";
      const image = (proj.coverImage && proj.coverImage.trim().length > 0)
        ? proj.coverImage
        : (proj.galleryImages && proj.galleryImages[0] && proj.galleryImages[0].trim().length > 0)
          ? proj.galleryImages[0]
          : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";

      const badgeTextAr = proj.taglineAr || proj.descriptionAr || "نظام برمجي متكامل";
      const badgeTextEn = proj.taglineEn || proj.descriptionEn || "Complete software solution";
      
      let floatingStat = "جاهز للطلب";
      if (proj.pricingType === "subscription") {
        floatingStat = language === "ar" ? "اشتراك مرن" : "Subscription";
      } else if (proj.hasDiscount && proj.offerTag) {
        floatingStat = proj.offerTag;
      } else if (proj.price) {
        floatingStat = proj.price;
      }

      return {
        id: proj.id,
        titleAr,
        titleEn,
        tagAr,
        tagEn,
        image,
        badgeTextAr,
        badgeTextEn,
        badgeIcon: idx % 2 === 0 ? Zap : Sparkles,
        floatingStat,
        project: proj
      };
    });
  }, [projects, language]);

  const [activeTabId, setActiveTabId] = useState<string>("");

  const activeShowcase = React.useMemo(() => {
    if (showcaseTabs.length === 0) return null;
    const found = showcaseTabs.find((t) => t.id === activeTabId);
    return found || showcaseTabs[0];
  }, [showcaseTabs, activeTabId]);

  const handleOpenShowcaseDetail = () => {
    if (activeShowcase?.project) {
      setActiveProjectDetail(activeShowcase.project);
    } else if (projects.length > 0) {
      setActiveProjectDetail(projects[0]);
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28 border-b border-slate-800/80">
      {/* Dark Navy Background Cyber Glows & Animated Mesh */}
      <div className="absolute inset-0 bg-[#080c17] pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.08, 1],
            opacity: [0.15, 0.22, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-600/20 via-sky-500/10 to-transparent blur-[140px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-600/15 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-sky-500/15 blur-[130px] rounded-full"
        />
        
        {/* Subtle Background Radial Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PROMINENT SOFTWARE GROUP LOGO AT THE START OF THE PAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center mb-6 relative"
        >
          {/* Ambient Glow behind the logo */}
          <div className="absolute w-36 h-36 sm:w-44 sm:h-44 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none -z-10 animate-pulse" />

          {/* Logo Frame with Rotating Cyber Orbits */}
          <div className="relative group cursor-pointer" onClick={() => teamUser && setIsDashboardOpen(true)}>
            {/* Outer Rotating Cyber Dashed Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 sm:-inset-2.5 rounded-full border border-dashed border-sky-400/40 pointer-events-none group-hover:border-sky-300 transition-colors"
            />
            {/* Inner Counter-Rotating Gradient Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 sm:-inset-1.5 rounded-full border border-blue-500/30 border-t-sky-400/70 border-b-indigo-400/70 pointer-events-none"
            />

            {/* Central Compact Logo Shield / Container */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl p-0.5 bg-gradient-to-b from-sky-400/30 via-blue-600/20 to-indigo-600/40 backdrop-blur-xl shadow-[0_0_25px_rgba(56,189,248,0.2)] border border-sky-400/40 group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(56,189,248,0.35)] transition-all duration-300 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center overflow-hidden p-1.5 relative">
                {siteSettings.logoUrl && siteSettings.logoUrl.trim().length > 0 ? (
                  <img
                    src={siteSettings.logoUrl}
                    alt={siteName}
                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback if image URL fails
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-sky-400">
                    <Terminal className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
                    <span className="text-[9px] font-mono font-bold tracking-wider mt-0.5 text-slate-300">NOVA</span>
                  </div>
                )}

                {/* Tech Scan Line Effect */}
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-sky-400/15 to-transparent pointer-events-none"
                />
              </div>

              {/* Glowing Corner Tech Nodes */}
              <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_4px_#38bdf8]" />
              <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_4px_#38bdf8]" />
              <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-indigo-400 shadow-[0_0_4px_#818cf8]" />
              <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-indigo-400 shadow-[0_0_4px_#818cf8]" />
            </div>

            {/* Verified Floating Badge */}
            <div className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-blue-600 to-sky-500 border border-[#080c17] shadow-md shadow-blue-500/40">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>

          {/* Group Name & Identity Under Logo */}
          <div className="mt-2.5 text-center px-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-sm max-w-[92vw] sm:max-w-none overflow-hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide font-sans truncate whitespace-nowrap">
                {siteName}
              </span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-sky-300 font-semibold border border-blue-400/30 shrink-0">
                {language === "ar" ? "المجموعة البرمجية" : "Engineering Group"}
              </span>
            </div>

            {teamUser && (
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="block mx-auto mt-1.5 text-[10px] text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 transition-colors"
                title="تعديل الشعار من لوحة التحكم"
              >
                <Settings className="w-2.5 h-2.5" />
                <span>{language === "ar" ? "تعديل الشعار والهوية من لوحة التحكم" : "Edit Logo in Control Panel"}</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Top Status Capsule */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-blue-500/30 shadow-inner text-[11px] sm:text-xs text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">{language === "ar" ? "فريقنا جاهز لاستقبال وتنفيذ مشاريعكم" : "Team Ready for Projects"}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-800/40 text-[11px] sm:text-xs text-sky-300 font-medium">
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>{language === "ar" ? "حلول برمجية جاهزة ومخصصة" : "Ready & Custom Solutions"}</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2]"
          >
            <span>{title1} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
              {highlight}
            </span>
            <span className="block mt-1 text-slate-100 text-xl sm:text-3xl lg:text-4xl font-bold">
              {title2}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3.5 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              id="hero-explore-projects-btn"
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-sky-600 hover:from-blue-500 hover:to-sky-500 rounded-xl shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>{language === "ar" ? "تصفح الأنظمة والأسعار والشاشات" : "Browse Systems & Pricing"}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </a>

            <button
              id="hero-launch-project-btn"
              onClick={() => setIsInquiryModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 rounded-xl transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === "ar" ? "طلب نظام جديد أو استشارة مجانية" : "Request Custom System"}</span>
            </button>
          </motion.div>
        </div>

        {/* VISUAL DELIGHT: Interactive Software Showcase Preview Window (Compact & Dynamic) */}
        {activeShowcase && showcaseTabs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 sm:mt-12 max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-[#0e162a] to-[#070c18] border border-blue-500/30 shadow-xl shadow-blue-950/80 p-2.5 sm:p-4 relative overflow-hidden"
          >
            {/* Showcase Top Control Bar & Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pb-3 border-b border-slate-800">
              
              {/* System Switcher Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 custom-scrollbar">
                {showcaseTabs.map((tab) => {
                  const TabIcon = tab.badgeIcon || Zap;
                  const isActive = tab.id === activeShowcase.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                        isActive 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-[1.02]" 
                          : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                      }`}
                    >
                      <TabIcon className="w-3 h-3 text-sky-300" />
                      <span>{language === "ar" ? tab.titleAr : tab.titleEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* View Project Action */}
              <button
                onClick={handleOpenShowcaseDetail}
                className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 hover:border-blue-400 transition-colors self-end sm:self-center"
              >
                <Monitor className="w-3 h-3" />
                <span>{language === "ar" ? "معاينة كامل الشاشات" : "View Full Screens"}</span>
              </button>
            </div>

            {/* Showcase Screen Frame with Floating Highlights */}
            <div className="relative mt-3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[16/9] max-h-[260px] sm:max-h-[340px] group">
              <motion.img
                key={activeShowcase.image}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={activeShowcase.image}
                alt={language === "ar" ? activeShowcase.titleAr : activeShowcase.titleEn}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e1c] via-transparent to-black/20 pointer-events-none"></div>

              {/* Floating Live Feature Pill (Top Right / Left) */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-blue-500/40 shadow-lg text-[10px] sm:text-xs font-bold text-white flex items-center gap-2 max-w-[220px]"
              >
                <div className="p-1.5 rounded-lg bg-blue-600/30 text-sky-400 border border-blue-500/40 shrink-0">
                  <activeShowcase.badgeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] text-sky-300 font-bold">{language === "ar" ? activeShowcase.tagAr : activeShowcase.tagEn}</div>
                  <div className="text-[10px] sm:text-xs text-white line-clamp-1">{language === "ar" ? activeShowcase.badgeTextAr : activeShowcase.badgeTextEn}</div>
                </div>
              </motion.div>

              {/* Floating Stat Pill (Bottom Left / Right) */}
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 shadow-lg flex items-center gap-1.5 text-[10px] sm:text-xs font-extrabold text-emerald-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{activeShowcase.floatingStat}</span>
              </motion.div>

              {/* Hover overlay button to open details */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-xs transition-opacity duration-200">
                <button
                  onClick={handleOpenShowcaseDetail}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                >
                  <span>{language === "ar" ? "استعراض تفاصيل وباقات هذا النظام" : "Explore System Packages"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Clear, Customer-Friendly Feature Pillars */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          
          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#0c1324]/80 border border-slate-800/80 hover:border-blue-500/40 transition-all backdrop-blur-sm shadow-md"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sky-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">
                {language === "ar" ? "أنظمة سهلة وسريعة الاستخدام" : "Easy & Fast Systems"}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
                {language === "ar" ? "واجهات واضحة تناسب مختلف الأعمال" : "Intuitive design for all users"}
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0c1324]/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all backdrop-blur-sm shadow-lg"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white">
                {language === "ar" ? "خيارات شراء مرنة واشتراكات" : "Flexible Purchase & Subscriptions"}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {language === "ar" ? "شراء دائم أو باقات دورية مع الصيانة" : "One-time purchase or recurring plans"}
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0c1324]/80 border border-slate-800/80 hover:border-sky-500/40 transition-all backdrop-blur-sm shadow-lg"
          >
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white">
                {language === "ar" ? "دعم فني وضمان مستمر" : "Continuous Support & Warranty"}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {language === "ar" ? "متابعة وتحديثات وصيانة دورية" : "Ongoing updates & maintenance"}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};


