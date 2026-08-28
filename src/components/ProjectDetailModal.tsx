import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ExternalLink, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Tag, 
  DollarSign, 
  Clock, 
  Wrench, 
  Image as ImageIcon, 
  Phone, 
  Sparkles, 
  KeyRound, 
  Check, 
  Calendar, 
  User, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const ProjectDetailModal: React.FC = () => {
  const { language, t, isRtl } = useLanguage();
  const { activeProjectDetail, setActiveProjectDetail, setIsInquiryModalOpen, siteSettings } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!activeProjectDetail) return null;

  const project = activeProjectDetail;
  const title = language === "ar" ? project.titleAr : project.titleEn;
  const tagline = language === "ar" ? project.taglineAr : project.taglineEn;
  const description = language === "ar" ? project.descriptionAr : project.descriptionEn;
  const images = project.galleryImages && project.galleryImages.length > 0 
    ? project.galleryImages 
    : [project.coverImage];

  const currentImage = images[activeImageIndex] || project.coverImage;

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const whatsappOrderUrl = `https://wa.me/${siteSettings.contactWhatsApp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار وطلب منظومة: "${project.titleAr}" المحددة بسعر ${project.price}. هل يمكن تزويدنا بتفاصيل البدء والتركيب؟`)}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
      onClick={() => setActiveProjectDetail(null)}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-5xl rounded-3xl bg-[#090e1c] border border-blue-500/30 shadow-2xl shadow-blue-950/90 overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0c1427] via-[#0f172a] to-[#0c1427] border-b border-slate-800 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-blue-600/30 text-sky-300 border border-blue-500/40 text-xs font-bold font-mono uppercase">
              {project.category}
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {title}
              </h2>
              <span className="text-[11px] text-slate-400">
                {project.clientName} • {project.completionDate}
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveProjectDetail(null)}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-full border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          {/* 1. SCREENSHOTS GALLERY CAROUSEL */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
              <motion.img
                key={currentImage}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={currentImage}
                alt={`Screen ${activeImageIndex + 1}`}
                className="w-full h-full object-contain sm:object-cover bg-slate-950"
              />
              
              {/* Image Navigation Overlay */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-blue-600 text-white transition-all backdrop-blur-sm shadow-lg hover:scale-110 active:scale-90"
                    title="الصورة السابقة"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-blue-600 text-white transition-all backdrop-blur-sm shadow-lg hover:scale-110 active:scale-90"
                    title="الصورة التالية"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Indicator count */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-mono backdrop-blur-sm border border-slate-700">
                    {activeImageIndex + 1} / {images.length} {language === "ar" ? "صور الشاشات" : "Screens"}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? "border-sky-400 scale-105 shadow-md shadow-sky-500/20"
                        : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>


          {/* 2. COMMERCIAL SUMMARY & PRICE BREAKDOWN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/50 to-slate-900/90 border border-blue-500/40 space-y-2">
              <div className="flex items-center justify-between text-xs text-sky-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>{language === "ar" ? "السعر وعروض الشراء" : "Pricing & Purchase"}</span>
                </span>
                {project.hasDiscount && project.discountPercent && (
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px]">
                    {project.discountPercent}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-400 font-sans">
                  {project.price}
                </span>
                {project.hasDiscount && project.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    {project.originalPrice}
                  </span>
                )}
              </div>

              {project.offerTag && (
                <p className="text-[11px] text-amber-300 font-bold">
                  {project.offerTag}
                </p>
              )}
            </div>

            {/* Maintenance Cost Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1427] border border-slate-800 space-y-2">
              <div className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>{language === "ar" ? "الصيانة السنوية والدعم" : "Annual Maintenance"}</span>
              </div>
              <div className="text-sm font-bold text-amber-300">
                {project.annualMaintenancePrice}
              </div>
              <p className="text-[11px] text-slate-400">
                {language === "ar" ? "تشمل التحديثات وحل أي مشكلات فنية ونسخ احتياطي للبيانات." : "Includes regular updates, bug fixes and cloud backups."}
              </p>
            </div>

            {/* Payment Model Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1427] border border-slate-800 space-y-2">
              <div className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>{language === "ar" ? "طريقة التملك والتشغيل" : "Ownership & Mode"}</span>
              </div>
              <div className="text-sm font-bold text-sky-300">
                {project.pricingType === "both" 
                  ? (language === "ar" ? "شراء لمرة واحدة أو باقات اشتراك" : "One-Time or Subscription")
                  : project.pricingType === "subscription"
                    ? (language === "ar" ? "باقات اشتراك دوري" : "Subscription Packages")
                    : (language === "ar" ? "شراء وتمليك كامل" : "Lifetime Full Ownership")}
              </div>
              <p className="text-[11px] text-slate-400">
                {language === "ar" ? "خيارات مرنة ومريحة تلبي متطلبات عملكم." : "Tailored to fit your business size & cash flow."}
              </p>
            </div>

          </div>

          {/* 3. SUBSCRIPTION PACKAGES TABLE (If available) */}
          {project.subscriptionPlans && project.subscriptionPlans.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  {language === "ar" ? "باقات وخيارات الاشتراك المتاحة للمنظومة:" : "Available Subscription Packages:"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 rounded-xl flex flex-col justify-between gap-3 border ${
                      plan.isPopular
                        ? "bg-blue-950/40 border-blue-500/50 shadow-md shadow-blue-600/10"
                        : "bg-slate-900/80 border-slate-800"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-white">{plan.nameAr}</h4>
                        {plan.isPopular && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold">
                            الأكثر طلباً
                          </span>
                        )}
                      </div>
                      <div className="text-base font-extrabold text-emerald-400 font-sans my-1">
                        {plan.price}
                      </div>
                      <div className="text-[11px] text-slate-400 mb-3">{plan.periodAr}</div>

                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {plan.featuresAr.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={`https://wa.me/${siteSettings.contactWhatsApp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`السلام عليكم، أود الاشتراك في باقة: "${plan.nameAr}" لمنظومة "${project.titleAr}" بسعر ${plan.price}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      طلب هذه الباقة
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. EASY FEATURES & SPECIFICATIONS */}
          <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === "ar" ? "أهم مميزات ومواصفات النظام:" : "Key System Features:"}</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {description}
            </p>

            {project.simpleFeaturesAr && project.simpleFeaturesAr.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {project.simpleFeaturesAr.map((feat, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Bottom Sticky CTA Footer */}
        <div className="p-4 sm:p-5 bg-[#080c17] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{language === "ar" ? "السعر:" : "Price:"}</span>
            <span className="text-base font-black text-emerald-400">{project.price}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{language === "ar" ? "طلب وشراء عبر واتساب مباشرة" : "Order via WhatsApp"}</span>
            </a>

            <button
              onClick={() => {
                setActiveProjectDetail(null);
                setIsInquiryModalOpen(true);
              }}
              className="px-4 py-2.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              {language === "ar" ? "طلب تخصيص أو استشارة" : "Request Customization"}
            </button>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
};

