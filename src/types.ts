export type Language = "ar" | "en";

export type ProjectCategory = string;

export interface CategoryItem {
  id: string;
  key: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  icon?: string;
}

export type PricingType = "one_time" | "subscription" | "both";

export interface SubscriptionPlan {
  id: string;
  nameAr: string;
  nameEn: string;
  price: string;
  periodAr: string;
  periodEn: string;
  featuresAr: string[];
  featuresEn: string[];
  isPopular?: boolean;
}

export interface ProjectMetric {
  labelAr: string;
  labelEn: string;
  value: string;
}

export interface CaseStudy {
  challengeAr: string;
  challengeEn: string;
  solutionAr: string;
  solutionEn: string;
  outcomeAr: string;
  outcomeEn: string;
  architecturePointsAr: string[];
  architecturePointsEn: string[];
}

export interface Project {
  id: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  tags: string[];
  coverImage: string;
  galleryImages: string[]; // صور لصفحات وشاشات المشروع
  liveUrl?: string;
  githubUrl?: string;
  clientName: string;
  completionDate: string;
  featured: boolean;
  
  // Pricing & Commercial Details
  pricingType: PricingType; // شراء مرة واحدة أو اشتراك دوري
  price: string; // السعر الأساسي
  hasDiscount?: boolean; // هل يوجد عرض/خصم
  originalPrice?: string; // السعر قبل الخصم
  discountPercent?: string; // نسبة الخصم
  offerTag?: string; // شارة العرض الخاص
  annualMaintenancePrice: string; // سعر الصيانة السنوية والدعم الفني
  subscriptionPlans?: SubscriptionPlan[]; // باقات الاشتراك الدوري
  
  simpleFeaturesAr?: string[];
  simpleFeaturesEn?: string[];

  metrics: ProjectMetric[];
  caseStudy: CaseStudy;
  teamContributors: string[];
  views: number;
  likes: number;
  status: "live" | "in_development" | "maintenance";
}

export interface AppUser {
  id: string;
  username: string;
  password?: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  avatar: string;
  specialization: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  contributedProjectsCount: number;
}

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: string;
  tagAr: string;
  tagEn: string;
  featuresAr: string[];
  featuresEn: string[];
}

export interface ClientPartnerItem {
  id: string;
  clientNameAr: string;
  clientNameEn: string;
  companyAr: string;
  companyEn: string;
  roleAr?: string;
  roleEn?: string;
  systemUsedAr: string; // النظام أو الحل البرمجي المستخدم
  systemUsedEn: string;
  sectorAr: string; // قطاع العمل (تجاري، طبي، لوجستي، عقاري...)
  sectorEn: string;
  partnershipTypeAr: string; // شراء وتمليك نظام / اشتراك سحابي / تطوير برمجي خاص
  partnershipTypeEn: string;
  logoUrl?: string;
  logo?: string;
  avatar?: string;
  authorAr?: string;
  authorEn?: string;
  quoteAr?: string;
  quoteEn?: string;
  companyName?: string;
  projectUsed?: string;
  location?: string;
  rating: number;
  feedbackAr: string;
  feedbackEn: string;
  year?: string;
}

export type TestimonialItem = ClientPartnerItem;

export interface SiteSettings {
  siteNameAr: string;
  siteNameEn: string;
  siteSloganAr: string;
  siteSloganEn: string;
  logoUrl: string;
  heroBadgeAr: string;
  heroBadgeEn: string;
  heroTitleLine1Ar: string;
  heroTitleLine1En: string;
  heroTitleHighlightAr: string;
  heroTitleHighlightEn: string;
  heroTitleLine2Ar: string;
  heroTitleLine2En: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  contactWhatsApp: string;
  contactPhone: string;
  contactEmail: string;
  contactAddressAr: string;
  contactAddressEn: string;
  socialLinks: {
    whatsapp?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    telegram?: string;
    instagram?: string;
  };
  announcement: {
    enabled: boolean;
    textAr: string;
    textEn: string;
    linkTextAr?: string;
    linkTextEn?: string;
    linkUrl?: string;
  };
  teamNameAr?: string;
  teamNameEn?: string;
  taglineAr?: string;
  taglineEn?: string;
  heroDescriptionAr?: string;
  heroDescriptionEn?: string;
  address?: string;
}

export interface NotificationItem {
  id: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  type: "project_added" | "client_inquiry" | "system_alert" | "update";
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "in_progress" | "archived";
}

export interface TeamUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

