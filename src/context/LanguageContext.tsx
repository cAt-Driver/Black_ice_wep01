import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "../types";

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const DICTIONARY: Translations = {
  // Navigation & Branding
  teamBrand: { ar: "بلاك آيس", en: "Black Ice" },
  teamSubBrand: { ar: "استوديو هندسة البرمجيات والحلول الرقمية", en: "Software Engineering & Digital Solutions Studio" },
  navProjects: { ar: "أعمالنا والأنظمة", en: "Portfolio & Systems" },
  navServices: { ar: "الخدمات الهندسية", en: "Engineering Capabilities" },
  navTechStack: { ar: "التقنيات والمعمارية", en: "Tech & Architecture" },
  navTeam: { ar: "الفريق", en: "Engineering Team" },
  navTestimonials: { ar: "شركاء النجاح", en: "Client Impact" },
  navInquiryBtn: { ar: "اطلب مشروعاً", en: "Request a System" },
  teamLoginBtn: { ar: "دخول الفريق", en: "Team Portal" },
  adminDashboard: { ar: "لوحة تحكم الفريق", en: "Team Workspace" },
  logout: { ar: "تسجيل الخروج", en: "Sign Out" },

  // Hero Section
  heroBadge: { ar: "استوديو هندسة برمجيات عالي الدقة", en: "High-Caliber Engineering Studio" },
  heroTitleLine1: { ar: "نصمم ونبني", en: "We Engineer & Architect" },
  heroTitleHighlight: { ar: "أنظمة برمجية موزعة فائقة الأداء", en: "Mission-Critical Enterprise Systems" },
  heroTitleLine2: { ar: "تقود مستقبل الأعمال الرقمية", en: "That Power Modern Industry" },
  heroSubtitle: {
    ar: "فريق برمجي نخبوي متخصص في المعماريات السحابية، الذكاء الاصطناعي، التقنية المالية، والأنظمة المؤسسية المعقدة ذات التوافرية العالية.",
    en: "An elite software engineering team crafting high-throughput distributed architectures, edge AI pipelines, fintech infrastructure, and custom cloud ecosystems.",
  },
  heroCtaExplore: { ar: "استكشف أعمالنا المنجزة", en: "Explore Our Systems" },
  heroCtaBrief: { ar: "ابدأ مشروعك البرمجي معنا", en: "Launch Your Project" },
  systemStatusOnline: { ar: "جميع الأنظمة تعمل بكفاءة 99.99%", en: "All Cluster Systems Nominal • 99.99% SLA" },

  // Stats
  statProjectsCount: { ar: "45+ نظام منجز وموثق", en: "45+ Production Systems Shipped" },
  statUptime: { ar: "99.99% التوافرية المضمونة", en: "99.99% Guaranteed Availability" },
  statTransactions: { ar: "12M+ استعلام يومي نشط", en: "12M+ Daily Real-time Requests" },
  statSecurity: { ar: "100% امتثال لمعايير الأمان", en: "100% Zero-Trust Compliance" },

  // Categories
  catAll: { ar: "جميع الأعمال", en: "All Systems" },
  catEnterprise: { ar: "أنظمة مؤسسية وسحابية (ERP)", en: "Enterprise & Cloud ERP" },
  catAiMl: { ar: "الذكاء الاصطناعي والرؤية", en: "AI & Computer Vision" },
  catFintech: { ar: "التقنية المالية والمدفوعات", en: "Fintech & Payments" },
  catCloudDevops: { ar: "البنية التحتية والسحاب", en: "Cloud Mesh & DevOps" },
  catMobileIot: { ar: "إنترنت الأشياء وتطبيقات الجوال", en: "IoT & Mobile Telemetry" },
  catSaas: { ar: "منصات SaaS التخصصية", en: "Specialized SaaS Platforms" },

  // Project Grid & Filters
  sectionProjectsTitle: { ar: "سجل أعمالنا وهندسة الأنظمة", en: "Production Systems Portfolio" },
  sectionProjectsSubtitle: { ar: "نظرة دقيقة على الأنظمة السحابية والحلول البرمجية التي قمنا ببنائها لعملائنا في مختلف القطاعات الحيوية", en: "A showcase of resilient, high-load systems engineered for enterprise clients across critical sectors" },
  searchPlaceholder: { ar: "ابحث عن نظام، تقنية، أو قطاع...", en: "Search by system name, tech stack, or industry..." },
  filterCategory: { ar: "التصنيف", en: "Category" },
  sortBy: { ar: "الترتيب", en: "Sort By" },
  sortFeatured: { ar: "المشاريع المميزة", en: "Featured First" },
  sortNewest: { ar: "الأحدث إنجازاً", en: "Latest Shipped" },
  sortViews: { ar: "الأكثر تفاعلاً", en: "Most Viewed" },
  viewCaseStudy: { ar: "دراسة الحالة والمعمارية", en: "System Architecture & Case Study" },
  liveDemo: { ar: "معاينة المنظومة", en: "Live Preview" },
  githubCode: { ar: "المستودع البرمجي", en: "Source Code" },
  client: { ar: "الجهة المستفيدة:", en: "Client:" },
  completed: { ar: "تاريخ التدشين:", en: "Shipped:" },
  statusLive: { ar: "نظام نشط في الإنتاج", en: "Live in Production" },
  featuredBadge: { ar: "مشروع مميز", en: "Featured System" },
  noProjectsFound: { ar: "لم يتم العثور على أنظمة تطابق بحثك.", en: "No systems match your filter criteria." },

  // Case Study Modal
  caseStudyTitle: { ar: "المعمارية الهندسية ودراسة الحالة", en: "Technical Case Study & Architecture" },
  overviewTab: { ar: "نظرة عامة والنتائج", en: "Overview & Impact" },
  architectureTab: { ar: "المعمارية والتقنيات", en: "System Architecture" },
  challengeHeading: { ar: "التحدي التقني والتشغيلي", en: "Engineering & Operational Challenge" },
  solutionHeading: { ar: "الحل الهندسي والمعمارية البرمجية", en: "Software Architecture & Solution" },
  outcomeHeading: { ar: "الأثر الملموس والنتائج المحققة", en: "Quantified Impact & Business Outcomes" },
  techStackHeading: { ar: "الحزمة البرمجية المعتمدة", en: "Implemented Tech Stack" },
  teamContributorsHeading: { ar: "الفريق الهندسي القائم على المنظومة", en: "Core Engineering Contributors" },
  interactiveDemoNotice: { ar: "بيئة محاكاة تفاعلية للأنظمة البرمجية", en: "Live Interactive System Simulation Sandbox" },
  close: { ar: "إغلاق", en: "Close" },

  // Capabilities & Services
  sectionServicesTitle: { ar: "قدراتنا وخدماتنا الهندسية", en: "Engineering Capabilities" },
  sectionServicesSubtitle: { ar: "نقدم حلولاً برمجية صلبة تجمع بين الأداء الأقصى، الأمان المتكامل، والمعماريات القابلة للتوسع", en: "We design and deploy robust software solutions combining maximum performance, bulletproof security, and horizontal scalability." },
  service1Title: { ar: "تصميم وبناء الأنظمة الموزعة والمؤسسية", en: "Distributed Systems & Enterprise Architecture" },
  service1Desc: { ar: "تطوير أنظمة ERP وسلاسل إمداد سحابية مصممة لتحمل ملايين العمليات المتزامنة بزمن استجابة أقل من 50 ميلي ثانية.", en: "Building enterprise ERPs and cloud supply-chains engineered to endure millions of concurrent requests under 50ms latency." },
  service2Title: { ar: "حلول الذكاء الاصطناعي ونماذج LLM المتخصصة", en: "AI Integrations & Custom Edge Pipelines" },
  service2Desc: { ar: "دمج نماذج الرؤية الحاسوبية، الوكلاء الأذكياء (AI Agents)، ومحركات التوصية في بيئات الإنتاج الحية.", en: "Embedding computer vision, autonomous AI agents, and custom inference pipelines into live high-load production environments." },
  service3Title: { ar: "التقنية المالية وبوابات الدفع المشفرة", en: "Fintech Infrastructure & Payment Gateways" },
  service3Desc: { ar: "بناء مسارات معالجة مدفوعات متوافقة مع PCI-DSS مع توجيه ذكي وكشف احتيال فوري فائق السرعة.", en: "Architecting PCI-DSS compliant transaction pipelines with sub-millisecond fraud scoring and intelligent multi-gateway routing." },
  service4Title: { ar: "البنية التحتية السحابية و DevOps & SRE", en: "Cloud Mesh, DevOps & Reliability Engineering" },
  service4Desc: { ar: "أتمتة البنية التحتية بالكود (IaC)، خطوط CI/CD مؤمنة، وملاحظة شاملة لضمان توافرية 99.99%.", en: "Full Infrastructure as Code, zero-trust service meshes, resilient CI/CD, and 24/7 observability for 99.99% uptime." },

  // Tech Stack Radar
  sectionTechTitle: { ar: "معماريتنا وتقنياتنا البرمجية", en: "Our Technology Stack & Ecosystem" },
  sectionTechSubtitle: { ar: "نستخدم أحدث لغات البرمجة وأطر العمل العالمية لضمان أعلى مستويات الكفاءة والأمان", en: "Leveraging cutting-edge languages, distributed engines, and modern frameworks for peak resilience." },

  // Testimonials
  sectionTestimonialsTitle: { ar: "ماذا يقول شركاؤنا وعملاؤنا", en: "Client Testimonials & Enterprise Trust" },
  sectionTestimonialsSubtitle: { ar: "شهادات من قادة التقنية والرؤساء التنفيذيين الذين قمنا ببناء أنظمتهم الحيوية", en: "Endorsements from CTOs and engineering leaders whose critical operations run on our systems" },

  // Notifications
  notificationsTitle: { ar: "مركز الإشعارات والتحديثات", en: "Real-time Notification Center" },
  markAllRead: { ar: "تحديد الكل كمقروء", en: "Mark all as read" },
  noNotifications: { ar: "لا توجد إشعارات جديدة حالياً", en: "No new notifications at this time" },
  notificationSentToast: { ar: "تم بث التنبيه الفوري بنجاح لجميع المستخدمين", en: "Broadcast notification dispatched successfully" },

  // Request Project Modal
  inquiryModalTitle: { ar: "طلب بناء نظام أو مشروع برمجي جديد", en: "Request a New Software System" },
  inquiryModalSubtitle: { ar: "شاركنا تفاصيل فكرتك أو التحدي التقني وسيقوم مهندسو الفريق بدراسة المتطلبات والرد بعرض فني", en: "Share your system requirements or technical challenges for our lead architects to review and prepare a technical roadmap." },
  nameLabel: { ar: "الاسم الكريم", en: "Full Name" },
  emailLabel: { ar: "البريد الإلكتروني للعمل", en: "Work Email" },
  companyLabel: { ar: "اسم الشركة / الجهة", en: "Company / Organization" },
  projectTypeLabel: { ar: "نوع المنظومة المطلوبة", en: "System Category" },
  budgetLabel: { ar: "الميزانية التقديرية", en: "Estimated Investment Budget" },
  timelineLabel: { ar: "الجدول الزمني المستهدف", en: "Target Timeline" },
  messageLabel: { ar: "شرح المتطلبات والتحديات التقنية", en: "Project Scope & Architecture Requirements" },
  submitInquiryBtn: { ar: "إرسال طلب المشروع للمراجعة الفورية", en: "Submit System Brief" },
  submittingInquiry: { ar: "جاري الإرسال وتأكيد الطلب...", en: "Submitting & Syncing Brief..." },
  inquirySuccessMsg: { ar: "تم استلام طلب المشروع بنجاح! سيتواصل معك أحد مهندسينا خلال 24 ساعة.", en: "Project brief submitted successfully! One of our engineers will reach out within 24 hours." },

  // Team Member Login Modal
  teamLoginTitle: { ar: "بوابة أعضاء الفريق الهندسي", en: "Engineering Team Portal" },
  teamLoginSubtitle: { ar: "تسجيل دخول مخصص لإدارة المشاريع، نشر الأنظمة، وتحديث المحتوى", en: "Restricted portal for authorized team members to publish, update systems, and broadcast live alerts." },
  loginEmailPlaceholder: { ar: "البريد الإلكتروني للفريق", en: "Team Member Email" },
  loginPasswordPlaceholder: { ar: "كلمة المرور أو رمز المرور", en: "Access Passcode" },
  loginBtn: { ar: "دخول لوحة التحكم", en: "Authenticate & Enter Workspace" },
  quickLoginHeading: { ar: "أو الدخول السريع بحساب تجريبي (Demo Profiles):", en: "Or Select a Quick Demo Profile:" },

  // Admin Dashboard
  dashboardTitle: { ar: "لوحة تحكم وإدارة المشاريع", en: "Team Management Workspace" },
  dashboardSubtitle: { ar: "إدارة ونشر الأعمال البرمجية، تتبع طلبات العملاء، وبث التحديثات الفورية", en: "Manage systems showcase, review incoming client briefs, and broadcast team updates." },
  tabProjectsManager: { ar: "إدارة المشاريع والأنظمة", en: "Systems Showcase" },
  tabAddProject: { ar: "إضافة مشروع جديد", en: "Add New Project" },
  tabAiGenerator: { ar: "المساعد الذكي (Gemini AI)", en: "AI System Architect" },
  tabInquiries: { ar: "صندوق طلبات العملاء", en: "Client Briefs Inbox" },
  tabBroadcaster: { ar: "بث إشعار فوري", en: "Live Alert Broadcaster" },
  addNewProjectBtn: { ar: "+ إضافة نظام جديد للواجهة", en: "+ Add New System" },
  editProject: { ar: "تعديل النظام", en: "Edit System" },
  deleteProject: { ar: "حذف", en: "Delete" },
  toggleFeatured: { ar: "تبديل حالة التميز", en: "Toggle Featured" },
  projectAddedSuccess: { ar: "تمت إضافة النظام الجديد بنجاح إلى سجل الأعمال!", en: "New system added to portfolio successfully!" },
  projectUpdatedSuccess: { ar: "تم تحديث بيانات النظام بنجاح!", en: "System details updated successfully!" },
  projectDeletedSuccess: { ar: "تم حذف النظام من سجل الأعمال.", en: "System removed from portfolio." },

  // AI Generator in Admin
  aiGeneratorTitle: { ar: "المساعد الذكي لبناء دراسات الحالة والمواصفات", en: "AI-Powered Technical Specification Generator" },
  aiGeneratorDesc: { ar: "اكتب وصفاً أو فكرة مختصرة عن النظام الذي قمتم ببرمجته، وسيقوم الذكاء الاصطناعي (Gemini) بتوليد المواصفات التقنية الكاملة باللغتين العربية والإنجليزية ودراسة الحالة والمعمارية فوراً!", en: "Enter a brief project concept, and Gemini AI will architect complete bilingual specifications, metrics, challenge/solution case study, and tech stack tags!" },
  aiPromptPlaceholder: { ar: "مثال: نظام ذكي لإدارة غرف العمليات الجراحية وتتبع توافر الفرق الطبية والمعدات في الوقت الفعلي...", en: "E.g. A real-time telemetry and surgical suite orchestration engine tracking medical staff and biometric IoT hardware..." },
  generateWithAiBtn: { ar: "توليد المواصفات الكاملة بالذكاء الاصطناعي", en: "Generate Complete Specs with AI" },
  generatingWithAi: { ar: "جاري التحليل وتوليد المعمارية ودراسة الحالة...", en: "Architecting Specs & Case Study with Gemini..." },
  applyAiToForm: { ar: "تطبيق المواصفات في نموذج المشروع", en: "Apply to Project Form" },

  // Footer
  footerRights: { ar: "جميع الحقوق محفوظة © 2026. تم البناء بأعلى معايير هندسة البرمجيات.", en: "All Rights Reserved © 2026. Engineered with precision & modern cloud standards." },
  footerTagline: { ar: "فريق برمجي يطور أنظمة ترتقي بمستقبل الصناعة الرقمية.", en: "Engineering software systems that elevate the digital enterprise." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof DICTIONARY | string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("novacoders_lang");
    return (saved === "en" || saved === "ar") ? saved : "ar";
  });

  useEffect(() => {
    localStorage.setItem("novacoders_lang", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = (key: string): string => {
    const entry = (DICTIONARY as Record<string, Record<Language, string>>)[key];
    if (entry) {
      return entry[language] || entry.ar || key;
    }
    return String(key);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isRtl: language === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
