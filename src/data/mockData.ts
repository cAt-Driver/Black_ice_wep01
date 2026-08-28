import { 
  Project, 
  TeamMember, 
  NotificationItem, 
  ClientInquiry, 
  AppUser, 
  SiteSettings, 
  ServiceItem, 
  TestimonialItem,
  CategoryItem
} from "../types";

export const INITIAL_CATEGORIES: CategoryItem[] = [];

export const DEFAULT_USERS: AppUser[] = [
  {
    id: "user-abdo",
    username: "abdo",
    password: "password123",
    name: "م. عبد الكريم جمال القطواني",
    role: "مهندس نظم وبرمجيات (Software Engineer)",
    email: "abdo@novacoders.io",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "user-anas",
    username: "anas",
    password: "password123",
    name: "م. أنس الفضلي",
    role: "مهندس نظم سحابية وأمان البنية التحتية",
    email: "anas@novacoders.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    createdAt: "2026-01-15T00:00:00Z",
  }
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteNameAr: "بلاك آيس للبرمجيات والحلول الرقمية",
  siteNameEn: "Black Ice Software Studio",
  siteSloganAr: "تطوير تطبيقات الجوال، المتاجر الإلكترونية، والأنظمة المحاسبية والإدارية بأعلى جودة وأفضل الأسعار",
  siteSloganEn: "Smart Mobile Apps, E-Commerce Stores & Business Software Solutions",
  logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
  heroBadgeAr: "🚀 برامج وتطبيقات جاهزة ومخصصة لتطوير تجارتك وأعمالك",
  heroBadgeEn: "🚀 Ready & Custom Software Solutions to Grow Your Business",
  heroTitleLine1Ar: "نصمم ونبني لك",
  heroTitleLine1En: "We Build & Deliver",
  heroTitleHighlightAr: "أقوى التطبيقات والمتاجر والبرامج",
  heroTitleHighlightEn: "Top-Tier Apps, Web & Business Systems",
  heroTitleLine2Ar: "بسهولة تامة ودعم فني مستمر لنجاحك",
  heroTitleLine2En: "Engineered for Growth with Reliable Ongoing Support",
  heroSubtitleAr: "سواء كنت صاحب متجر، مطعم، عيادة، شركة ناشئة، أو مؤسسة كبرى، نوفر لك برامج جاهزة للتشغيل الفوري مع إمكانية الشراء لمرة واحدة أو الاشتراك الدوري، مع صيانة سنوية ميسرة وضمان تشغيل مستمر.",
  heroSubtitleEn: "Whether you run an online store, restaurant, clinic, enterprise, or startup, we provide ready-to-launch software available for one-time ownership or flexible subscriptions with dedicated maintenance.",
  contactWhatsApp: "+966501234567",
  contactPhone: "+966 50 123 4567",
  contactEmail: "contact@blackice.io",
  contactAddressAr: "المملكة العربية السعودية (خدماتنا متوفرة لجميع الدول العربية والعالم)",
  contactAddressEn: "Saudi Arabia • Global Delivery Across All Arab & International Markets",
  socialLinks: {
    whatsapp: "https://wa.me/966501234567",
    twitter: "https://x.com/blackice",
    linkedin: "https://linkedin.com/company/blackice",
    github: "https://github.com/blackice",
    telegram: "https://t.me/blackice",
    instagram: "https://instagram.com/blackice",
  },
  announcement: {
    enabled: true,
    textAr: "🎉 خصومات خاصة تصل إلى 30% على الأنظمة المحاسبية ومتاجر الجوال بمناسبة الموسم الجديد!",
    textEn: "🎉 Special limited-time discount up to 30% on ERP systems & Mobile E-Commerce apps!",
    linkTextAr: "استكشف العروض",
    linkTextEn: "Explore Offers",
    linkUrl: "#projects",
  },
};

export const INITIAL_SERVICES: ServiceItem[] = [];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [];

export const TEAM_MEMBERS: TeamMember[] = [];

export const INITIAL_PROJECTS: Project[] = [];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];

export const INITIAL_INQUIRIES: ClientInquiry[] = [];
