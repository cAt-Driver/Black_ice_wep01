import React from "react";
import { motion } from "motion/react";
import { Users, Star, Building2, UserCheck, Sparkles, Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const TestimonialsSection: React.FC = () => {
  const { language } = useLanguage();
  const { testimonials } = useApp();

  // Client avatar placeholders for realistic visual delight
  const clientAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-[#080c17]/80 backdrop-blur-[1px] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-[10px] sm:text-xs font-bold text-sky-400 mb-2">
            <Users className="w-3 h-3" />
            <span>{language === "ar" ? "عملاؤنا ومستخدمو أنظمتنا" : "Clients & Systems Users"}</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
            {language === "ar" 
              ? "الشركات والمؤسسات والأفراد الذين يستخدمون أنظمتنا" 
              : "Companies & Individuals Using Our Software Solutions"}
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === "ar"
              ? "نفخر بتقديم خدماتنا وحلولنا البرمجية المبتكرة ومرافقة عملائنا في نجاح مشاريعهم وتقديم الدعم الفني المستمر."
              : "Proud to serve leading businesses with customized software, reliable POS systems, and continuous technical support."}
          </p>
        </motion.div>

        {/* Testimonials & Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {testimonials.map((item, idx) => {
            const rawAvatar = (item.logoUrl?.trim() || item.avatar?.trim() || "");
            const avatar = rawAvatar || clientAvatars[idx % clientAvatars.length];
            const author = language === "ar" 
              ? (item.clientNameAr || item.authorAr || item.companyAr || "عميل موثوق")
              : (item.clientNameEn || item.authorEn || item.companyEn || "Valued Client");
            const feedback = language === "ar"
              ? (item.feedbackAr || item.quoteAr || "نظام متميز ودعم فني متواصل.")
              : (item.feedbackEn || item.quoteEn || "Outstanding software solution and responsive support.");
            const roleOrSector = language === "ar"
              ? (item.roleAr || item.sectorAr || item.partnershipTypeAr || "")
              : (item.roleEn || item.sectorEn || item.partnershipTypeEn || "");
            const company = language === "ar"
              ? (item.companyAr || item.companyName || "")
              : (item.companyEn || item.companyName || "");
            const system = language === "ar"
              ? (item.systemUsedAr || item.projectUsed || "")
              : (item.systemUsedEn || item.projectUsed || "");

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
                className="p-4 sm:p-5 rounded-2xl bg-[#0c1324] border border-slate-800/90 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/60 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current drop-shadow-sm" />
                      ))}
                    </div>

                    {system && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-950/70 border border-blue-500/30 text-sky-300 truncate max-w-[170px]" title={system}>
                        {system}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic relative z-10">
                    "{feedback}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={avatar} 
                      alt={author}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = clientAvatars[idx % clientAvatars.length];
                      }}
                      className="w-8 h-8 rounded-full object-cover border border-blue-500/40 shadow-sm shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                        {author}
                      </h4>
                      {roleOrSector && (
                        <p className="text-[10px] sm:text-[11px] text-sky-400 font-medium mt-0.5 truncate">
                          {roleOrSector}
                        </p>
                      )}
                      {company && (
                        <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 truncate">
                          {company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                    {company ? (
                      <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    ) : (
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


