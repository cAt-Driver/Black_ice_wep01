import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Sparkles, 
  Heart, 
  ArrowUpRight, 
  Layers, 
  DollarSign, 
  Wrench, 
  Image as ImageIcon, 
  Phone
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const ProjectGrid: React.FC = () => {
  const { language, isRtl } = useLanguage();
  const { 
    projects, 
    categories,
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setActiveProjectDetail,
    likeProject,
    siteSettings
  } = useApp();

  const [sortBy, setSortBy] = useState<"featured" | "newest" | "views">("featured");

  const dynamicCategories = useMemo(() => {
    return [
      { key: "all", label: language === "ar" ? "جميع الأنظمة والبرامج" : "All Solutions" },
      ...categories.map((c) => ({
        key: c.key,
        label: language === "ar" ? c.nameAr : c.nameEn,
      })),
    ];
  }, [categories, language]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((proj) => {
        const matchCategory = selectedCategory === "all" || proj.category === selectedCategory;
        if (!searchQuery.trim()) return matchCategory;
        const q = searchQuery.toLowerCase();
        const matchTitle = 
          proj.titleAr.toLowerCase().includes(q) || 
          proj.titleEn.toLowerCase().includes(q);
        const matchDesc = 
          proj.descriptionAr.toLowerCase().includes(q) || 
          proj.descriptionEn.toLowerCase().includes(q);
        const matchClient = proj.clientName.toLowerCase().includes(q);
        const matchTags = proj.tags.some((tag) => tag.toLowerCase().includes(q));

        return matchCategory && (matchTitle || matchDesc || matchClient || matchTags);
      })
      .sort((a, b) => {
        if (sortBy === "featured") {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.views - a.views;
        }
        if (sortBy === "newest") {
          return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
        }
        if (sortBy === "views") {
          return b.views - a.views;
        }
        return 0;
      });
  }, [projects, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="projects" className="py-16 md:py-24 bg-[#080c17]/80 backdrop-blur-[1px] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-[11px] sm:text-xs font-bold text-sky-400 mb-2.5 sm:mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "معرض أعمالنا والأنظمة الجاهزة" : "Our Ready & Custom Systems"}</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {language === "ar" ? "أنظمة برمجية جاهزة للتشغيل والتخصيص" : "Ready-to-Launch & Custom Software"}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed px-2">
            {language === "ar"
              ? "استعرض برامجنا وتطبيقاتنا مع الأسعار الشفافة، الباقات، خيارات الشراء الدائم أو الاشتراك، ومعاينة صور الشاشات."
              : "Explore our software portfolio with upfront pricing, subscription packages, maintenance options, and screen galleries."}
          </p>
        </motion.div>

        {/* Filter Controls: Category Tabs & Search Bar */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {dynamicCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs md:text-sm font-bold rounded-xl transition-all duration-200 border relative ${
                  selectedCategory === cat.key
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30 scale-[1.02]"
                    : "bg-[#0c1324] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and Sort Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 bg-[#0c1324] p-2.5 sm:p-3 rounded-2xl border border-slate-800 shadow-md">
            <div className="relative w-full sm:w-80">
              <Search className={`absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "ar" ? "ابحث عن برنامج أو تطبيق..." : "Search software, apps, POS..."}
                className={`w-full py-1.5 sm:py-2 ${isRtl ? "pr-9 sm:pr-10 pl-3 sm:pl-4" : "pl-9 sm:pl-10 pr-3 sm:pr-4"} text-[11px] sm:text-xs md:text-sm text-white bg-slate-900/90 border border-slate-700/80 rounded-xl focus:outline-none focus:border-blue-500 transition-colors`}
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto text-[11px] sm:text-xs text-slate-400">
              <span className="font-mono bg-slate-900/90 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-800 text-slate-300 text-[10px] sm:text-xs">
                {language === "ar" ? `النتائج: ${filteredProjects.length}` : `${filteredProjects.length} Systems`}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] sm:text-[11px] text-slate-400">{language === "ar" ? "ترتيب:" : "Sort:"}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-900 text-slate-200 border border-slate-700 py-1 px-2 rounded-lg text-[10px] sm:text-xs focus:outline-none"
                >
                  <option value="featured">{language === "ar" ? "المميزة أولاً" : "Featured"}</option>
                  <option value="newest">{language === "ar" ? "الأحدث" : "Newest"}</option>
                  <option value="views">{language === "ar" ? "الأكثر مشاهدة" : "Most Viewed"}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-10 bg-[#0c1324] rounded-2xl border border-slate-800 p-4 sm:p-6"
          >
            <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-slate-500 mx-auto mb-2" />
            <h3 className="text-xs sm:text-sm font-bold text-white mb-1">
              {language === "ar" ? "لا توجد نتائج مطابقة لبحثك" : "No matching systems found"}
            </h3>
            <p className="text-[11px] text-slate-400">
              {language === "ar" ? "جرب البحث بكلمات أخرى أو اختر قسماً مختلفاً." : "Try adjusting your search keywords."}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => {
                const title = language === "ar" ? project.titleAr : project.titleEn;
                const description = language === "ar" ? project.descriptionAr : project.descriptionEn;
                const screenshotCount = project.galleryImages?.length || 1;

                // Find category label
                const catObj = categories.find((c) => c.key === project.category);
                const catLabel = catObj ? (language === "ar" ? catObj.nameAr : catObj.nameEn) : project.category;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.25) }}
                    whileHover={{ y: -3 }}
                    className="group relative rounded-2xl bg-[#0c1324] border border-slate-800/90 hover:border-blue-500/60 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-blue-950/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    
                    <div>
                      {/* Compact Cover Image & Ribbons */}
                      <div className="relative h-32 sm:h-36 md:h-38 w-full overflow-hidden bg-slate-950">
                        <img
                          src={project.coverImage}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] via-black/20 to-black/40"></div>

                        {/* Top Badges */}
                        <div className="absolute top-2 right-2 left-2 flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1">
                            {project.hasDiscount && project.discountPercent && (
                              <span className="px-1.5 py-0.5 rounded-md bg-rose-600 text-white font-bold text-[9px] sm:text-[10px] shadow-sm animate-pulse">
                                {project.discountPercent}
                              </span>
                            )}
                            {project.featured && (
                              <span className="px-1.5 py-0.5 rounded-md bg-amber-500/90 text-slate-950 font-bold text-[9px] flex items-center gap-1 shadow-sm">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>{language === "ar" ? "مميز" : "Featured"}</span>
                              </span>
                            )}
                          </div>

                          <span className="px-1.5 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-sm border border-slate-700/80 text-sky-300 font-mono text-[9px] flex items-center gap-1 shadow-sm">
                            <ImageIcon className="w-2.5 h-2.5 text-sky-400" />
                            <span>{screenshotCount} {language === "ar" ? "شاشات" : "screens"}</span>
                          </span>
                        </div>

                        {/* Offer tag banner if available */}
                        {project.offerTag && (
                          <div className="absolute bottom-1.5 right-2 left-2">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-amber-500/30 backdrop-blur-xs border border-amber-500/50 text-amber-200 text-[9px] font-bold">
                              {project.offerTag}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-3 sm:p-3.5 space-y-2">
                        
                        {/* Title & Category */}
                        <div>
                          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-sky-400 font-mono mb-0.5">
                            <span className="truncate max-w-[120px] font-semibold">{catLabel}</span>
                            <span className="text-slate-400 truncate max-w-[90px]">{project.clientName}</span>
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2">
                            {title}
                          </h3>
                        </div>

                        {/* Plain Description */}
                        <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                          {description}
                        </p>

                        {/* Commercial Details Box: Price, Type, Maintenance */}
                        <div className="p-2 rounded-xl bg-[#070b14] border border-slate-800/90 space-y-1">
                          
                          {/* Price Row */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                              <DollarSign className="w-3 h-3 text-emerald-400" />
                              <span>{language === "ar" ? "السعر:" : "Price:"}</span>
                            </span>
                            <div className="flex items-center gap-1 font-sans">
                              {project.hasDiscount && project.originalPrice && (
                                <span className="text-[9px] text-slate-500 line-through">
                                  {project.originalPrice}
                                </span>
                              )}
                              <span className="text-xs sm:text-sm font-extrabold text-emerald-400">
                                {project.price}
                              </span>
                            </div>
                          </div>

                          {/* Model & Maintenance */}
                          <div className="flex items-center justify-between text-[9px] sm:text-[10px] pt-1 border-t border-slate-800/80">
                            <span className="text-sky-300 font-medium truncate max-w-[110px]">
                              {project.pricingType === "both"
                                ? (language === "ar" ? "شراء أو باقات اشتراك" : "Buy / Subscription")
                                : project.pricingType === "subscription"
                                  ? (language === "ar" ? "اشتراك دوري وباقات" : "Subscription Plans")
                                  : (language === "ar" ? "شراء لمرة واحدة" : "One-Time Buy")}
                            </span>

                            <span className="text-[9px] text-slate-400 flex items-center gap-1">
                              <Wrench className="w-2.5 h-2.5 text-slate-500" />
                              <span className="line-clamp-1 max-w-[80px]">{project.annualMaintenancePrice}</span>
                            </span>
                          </div>

                        </div>

                      </div>
                    </div>

                    {/* Card Bottom CTA Actions */}
                    <div className="p-3 sm:p-3.5 pt-0 flex items-center gap-1.5">
                      
                      <button
                        onClick={() => setActiveProjectDetail(project)}
                        className="flex-1 py-1.5 sm:py-2 px-2 text-[11px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-sm shadow-blue-600/30 flex items-center justify-center gap-1 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>{language === "ar" ? "معاينة الشاشات" : "Screens & Specs"}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>

                      <a
                        href={`https://wa.me/${siteSettings.contactWhatsApp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار عن تفاصيل وطلب منظومة: "${project.titleAr}" المحددة بسعر ${project.price}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition-colors hover:scale-105 active:scale-95 shrink-0"
                        title={language === "ar" ? "طلب مباشر عبر الواتساب" : "Direct WhatsApp inquiry"}
                      >
                        <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>

                      <button
                        onClick={() => likeProject(project.id)}
                        className="p-1.5 sm:p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors flex items-center gap-1 hover:scale-105 active:scale-95 shrink-0"
                        title="إعجاب"
                      >
                        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="text-[9px] sm:text-[10px] font-mono">{project.likes}</span>
                      </button>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};

