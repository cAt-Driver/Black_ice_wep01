import React from "react";
import { motion } from "motion/react";
import { 
  Smartphone, 
  ShoppingBag, 
  Calculator, 
  Globe, 
  CheckCircle2, 
  Phone, 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  Workflow
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const ServicesSection: React.FC = () => {
  const { isRtl, language } = useLanguage();
  const { services, setIsInquiryModalOpen, siteSettings } = useApp();

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "Smartphone": return Smartphone;
      case "ShoppingBag": return ShoppingBag;
      case "Calculator": return Calculator;
      case "Globe": return Globe;
      default: return Sparkles;
    }
  };

  // Visual background image assets for each service category to add delightful aesthetic
  const serviceImages: Record<string, string> = {
    "srv-1": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    "srv-2": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
    "srv-3": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    "srv-4": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  };

  return (
    <section id="services" className="py-20 bg-[#060a14]/80 backdrop-blur-[1px] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-[11px] sm:text-xs font-bold text-sky-400 mb-2.5 sm:mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "خدماتنا البرمجية المتكاملة" : "Our Software Solutions"}</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {language === "ar" ? "حلول برمجية مبسطة وعصرية لتنمية وتطوير أعمالك" : "Modern Software Built for Business Growth"}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed px-2">
            {language === "ar"
              ? "نساعدك في تحويل أفكار مشروعك إلى تطبيقات ومتاجر وأنظمة محاسبية سهلة وسريعة مع التدريب والصيانة المستمرة."
              : "We transform your business ideas into high-performance mobile apps, e-commerce stores, and accounting ERP systems."}
          </p>
        </motion.div>

        {/* Services 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {services.map((srv, idx) => {
            const Icon = getServiceIcon(srv.iconName);
            const title = language === "ar" ? srv.titleAr : srv.titleEn;
            const desc = language === "ar" ? srv.descriptionAr : srv.descriptionEn;
            const features = language === "ar" ? srv.featuresAr : srv.featuresEn;
            const tag = language === "ar" ? srv.tagAr : srv.tagEn;
            const bgImage = (serviceImages[srv.id] && serviceImages[srv.id].trim().length > 0) 
              ? serviceImages[srv.id] 
              : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";

            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-[#0b1120] border border-slate-800/90 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-950/80 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Image Header Banner */}
                <div className="relative h-28 sm:h-36 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 md:-mx-7 md:-mt-7 mb-4 sm:mb-6 overflow-hidden bg-slate-950 border-b border-slate-800/80">
                  <img 
                    src={bgImage} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-40 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/60 to-transparent"></div>
                  
                  {/* Floating Icon & Tag */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600/30 backdrop-blur-md border border-blue-400/40 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-blue-500/40 text-sky-300 shadow-md">
                      {tag}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-sky-300 transition-colors mb-1.5 sm:mb-2">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3.5 sm:mb-5">
                    {desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                    {features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setIsInquiryModalOpen(true)}
                    className="text-[11px] sm:text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{language === "ar" ? "طلب هذه الخدمة وتحديد المواصفات" : "Request this service"}</span>
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href={`https://wa.me/${siteSettings.contactWhatsApp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار عن خدمة: "${srv.titleAr}"`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition-colors hover:scale-105 active:scale-95"
                    title="استفسار واتساب مباشر"
                  >
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

