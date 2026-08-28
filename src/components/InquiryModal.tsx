import React, { useState } from "react";
import { X, Send, Sparkles, Building, Mail, User, Phone, DollarSign, Clock, MessageSquare } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const InquiryModal: React.FC = () => {
  const { language, isRtl } = useLanguage();
  const { isInquiryModalOpen, setIsInquiryModalOpen, submitInquiry, siteSettings } = useApp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("برنامج محاسبة ونقاط بيع");
  const [budget, setBudget] = useState("3,000 - 6,000 ريال");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isInquiryModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);
    await submitInquiry({
      name,
      phone,
      email: email || "direct@client.com",
      company: company || "عميل مباشر",
      projectType,
      budget,
      timeline: "خلال أسبوعين",
      message,
    });

    setIsSubmitting(false);
    setIsInquiryModalOpen(false);
    setName("");
    setPhone("");
    setEmail("");
    setCompany("");
    setMessage("");
  };

  const handleWhatsAppSend = () => {
    if (!name.trim() || !message.trim()) return;
    const text = `السلام عليكم م. عبد الكريم،\nأنا ${name} من (${company || "مؤسسة خاصة"}).\nنوع النظام المطلوب: ${projectType}\nالميزانية المقترحة: ${budget}\nتفاصيل الطلب: ${message}\nرقم التواصل: ${phone}`;
    window.open(`https://wa.me/${siteSettings.contactWhatsApp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsInquiryModalOpen(false)}
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#0c1324] border border-blue-500/40 shadow-2xl shadow-blue-950/80 overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-950/60 to-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "طلب نظام أو استشارة برمجية سريعة" : "Custom Project Inquiry"}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {language === "ar" ? "أخبرنا باحتياجاتك وسنتواصل معك فوراً" : "Tell Us About Your Project"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === "ar" ? "نقوم بدراسة متطلباتك وتقديم أفضل باقة وسعر مناسب." : "We'll study your specs and offer the optimal package & price."}
            </p>
          </div>

          <button
            onClick={() => setIsInquiryModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-full border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {language === "ar" ? "الاسم الكريم *" : "Your Name *"}
              </label>
              <div className="relative">
                <User className={`w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 ${isRtl ? "right-3.5" : "left-3.5"}`} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === "ar" ? "مثال: عبد الله السعيد" : "e.g. Abdullah"}
                  className={`w-full py-2.5 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 ${isRtl ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {language === "ar" ? "رقم الهاتف / الواتساب *" : "Phone / WhatsApp *"}
              </label>
              <div className="relative">
                <Phone className={`w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 ${isRtl ? "right-3.5" : "left-3.5"}`} />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+967 77..."
                  className={`w-full py-2.5 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 ${isRtl ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {language === "ar" ? "اسم الشركة / النشاط التجاري" : "Company / Business Name"}
              </label>
              <div className="relative">
                <Building className={`w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 ${isRtl ? "right-3.5" : "left-3.5"}`} />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={language === "ar" ? "مثال: سوبرماركت النور / متجر أزياء" : "e.g. Supermarket / Fashion Store"}
                  className={`w-full py-2.5 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 ${isRtl ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {language === "ar" ? "نوع النظام أو البرنامج المطلوب" : "Project / System Type"}
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="برنامج محاسبة ونقاط بيع (POS/ERP)">برنامج محاسبة ونقاط بيع (POS / ERP)</option>
                <option value="تطبيق جوال (iOS & Android)">تطبيق جوال (iOS & Android)</option>
                <option value="متجر إلكتروني مع بوابات دفع">متجر إلكتروني متكامل مع بوابات الدفع</option>
                <option value="نظام إدارة عيادات ومراكز طبية">نظام إدارة عيادات ومراكز طبية</option>
                <option value="منصة ويب مخصصة / نظام خاص">منصة ويب مخصصة / نظام خاص</option>
                <option value="تطوير وتحديث نظام موجود">تطوير وتحديث نظام موجود مسبقاً</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {language === "ar" ? "الميزانية التقريبية" : "Estimated Budget"}
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="1,500 - 3,000 ريال">1,500 - 3,000 ريال (برامج جاهزة خفيفة)</option>
              <option value="3,000 - 6,000 ريال">3,000 - 6,000 ريال (أنظمة متكاملة ونقاط بيع)</option>
              <option value="6,000 - 15,000 ريال">6,000 - 15,000 ريال (تطبيقات مخصصة ومتاجر كبرى)</option>
              <option value="أكثر من 15,000 ريال">أكثر من 15,000 ريال (منظومات مؤسسية متكاملة)</option>
              <option value="اشتراك شهري / سنوي">أفضل نظام الاشتراك الشهري أو السنوي</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {language === "ar" ? "تفاصيل إضافية أو مميزات تريدها في البرنامج *" : "Project Requirements / Details *"}
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={language === "ar" ? "اكتب هنا تفاصيل عملك وما تريده في البرنامج أو التطبيق..." : "Describe your system needs, features, or questions..."}
              className="w-full p-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 leading-relaxed"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? (language === "ar" ? "جاري الإرسال..." : "Sending...") : (language === "ar" ? "إرسال الطلب للفريق" : "Send Inquiry")}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppSend}
              className="flex items-center justify-center gap-2 py-3 px-5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{language === "ar" ? "إرسال عبر الواتساب مباشرة" : "Send via WhatsApp"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
