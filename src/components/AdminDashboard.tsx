import React, { useState } from "react";
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Star, 
  Inbox, 
  Check, 
  Layers, 
  User, 
  Users, 
  Tag, 
  DollarSign, 
  Clock, 
  Wrench, 
  Image as ImageIcon, 
  CheckCircle2, 
  Phone, 
  Building2, 
  KeyRound, 
  ShieldCheck, 
  Settings, 
  FolderPlus,
  FolderEdit,
  UserCheck,
  Building,
  HeartHandshake,
  LayoutDashboard,
  ExternalLink,
  Globe,
  Upload,
  RotateCcw,
  Eye
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { 
  Project, 
  ProjectCategory, 
  PricingType, 
  SubscriptionPlan, 
  AppUser, 
  TeamMember, 
  TestimonialItem,
  ClientPartnerItem,
  CategoryItem
} from "../types";

export const AdminDashboard: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const { 
    isDashboardOpen, 
    setIsDashboardOpen, 
    teamUser, 
    projects, 
    addProject, 
    updateProject, 
    deleteProject, 
    toggleFeaturedProject, 
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    inquiries, 
    updateInquiryStatus, 
    deleteInquiry,
    broadcastNotification,
    resetToDefaultData,
    users,
    addUser,
    updateUser,
    deleteUser,
    siteSettings,
    updateSiteSettings,
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    showToast,
    isCloudSynced,
    forceSyncToCloud
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    "projects" | "addEditProject" | "categories" | "users" | "siteSettings" | "team" | "testimonials" | "inbox" | "aiGenerator"
  >("projects");

  // Project Add / Edit State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [taglineAr, setTaglineAr] = useState("");
  const [taglineEn, setTaglineEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("pos_accounting");
  const [tagsInput, setTagsInput] = useState("محاسبة, فواتير, كاشير, تطبيقات");
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80");
  
  // Screenshots & Gallery state
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  ]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  // Pricing Fields
  const [pricingType, setPricingType] = useState<PricingType>("both");
  const [price, setPrice] = useState("3,500 ريال");
  const [hasDiscount, setHasDiscount] = useState(true);
  const [originalPrice, setOriginalPrice] = useState("5,000 ريال");
  const [discountPercent, setDiscountPercent] = useState("30% خصم");
  const [offerTag, setOfferTag] = useState("🔥 عرض خاص مع التدريب والتركيب المجاني");
  const [annualMaintenancePrice, setAnnualMaintenancePrice] = useState("500 ريال / سنوياً (شامل التحديثات والدعم الفني ومجاناً أول سنة)");

  // Subscription Plans
  const [plans, setPlans] = useState<SubscriptionPlan[]>([
    {
      id: "p1",
      nameAr: "الباقة الشهرية الميسرة",
      nameEn: "Starter Monthly",
      price: "199 ريال / شهرياً",
      periodAr: "اشتراك شهري",
      periodEn: "Monthly",
      featuresAr: ["مستخدم واحد + فرع واحد", "فواتير ومبيعات غير محدودة", "دعم فني واتساب"],
      featuresEn: ["1 User + 1 Branch", "Unlimited Invoices", "WhatsApp Support"],
    },
    {
      id: "p2",
      nameAr: "الباقة السنوية الشاملة (الأكثر طلباً)",
      nameEn: "Pro Annual",
      price: "1,990 ريال / سنوياً",
      periodAr: "اشتراك سنوي (أوفر شهرين)",
      periodEn: "Annual (Save 20%)",
      featuresAr: ["حتى 5 مستخدمين + 3 فروع", "تطبيق جوال للمدير", "دعم فني على مدار الساعة"],
      featuresEn: ["Up to 5 Users", "Mobile App for Manager", "24/7 Priority Support"],
      isPopular: true,
    }
  ]);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanPrice, setNewPlanPrice] = useState("");
  const [newPlanPeriod, setNewPlanPeriod] = useState("");
  const [newPlanFeatures, setNewPlanFeatures] = useState("");

  const [simpleFeaturesInput, setSimpleFeaturesInput] = useState("واجهة سهلة بالعربي, طباعة فواتير حرارية وQR, تطبيق جوال للمتابعة, دعم الدفع الإلكتروني");
  const [liveUrl, setLiveUrl] = useState("https://demo.novacoders.io");
  const [githubUrl, setGithubUrl] = useState("");
  const [clientName, setClientName] = useState("شركة أعمال تجارية");
  const [completionDate, setCompletionDate] = useState("2026-02");
  const [featured, setFeatured] = useState(true);

  // Category Management State
  const [editingCategoryKey, setEditingCategoryKey] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState<Omit<CategoryItem, "id">>({
    key: "",
    nameAr: "",
    nameEn: "",
    icon: "Layers",
  });
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);

  // User Management State
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("مهندس برمجيات");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);

  // Site Settings Form State
  const [siteForm, setSiteForm] = useState(siteSettings);

  // Team Member Form State
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState<Omit<TeamMember, "id">>({
    nameAr: "",
    nameEn: "",
    roleAr: "",
    roleEn: "",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    specialization: "",
    whatsapp: "+966501234567",
    contributedProjectsCount: 10,
  });
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);

  // Client / Testimonial State
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Omit<ClientPartnerItem, "id">>({
    clientNameAr: "",
    clientNameEn: "",
    companyAr: "",
    companyEn: "",
    systemUsedAr: "",
    systemUsedEn: "",
    sectorAr: "تجاري / خدمات",
    sectorEn: "Commercial & Services",
    partnershipTypeAr: "شراء وتمليك نظام",
    partnershipTypeEn: "System Ownership",
    logoUrl: "",
    rating: 5,
    feedbackAr: "",
    feedbackEn: "",
    year: "2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    location: "الرياض، السعودية",
  });
  const [isTestimonialFormOpen, setIsTestimonialFormOpen] = useState(false);

  // AI Generator state
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Broadcast state
  const [broadcastTitleAr, setBroadcastTitleAr] = useState("");
  const [broadcastMsgAr, setBroadcastMsgAr] = useState("");

  if (!isDashboardOpen) return null;

  // Project Edit Handlers
  const handleEditProjectClick = (proj: Project) => {
    setEditingProjectId(proj.id);
    setTitleAr(proj.titleAr);
    setTitleEn(proj.titleEn);
    setTaglineAr(proj.taglineAr || "");
    setTaglineEn(proj.taglineEn || "");
    setDescriptionAr(proj.descriptionAr);
    setDescriptionEn(proj.descriptionEn);
    setCategory(proj.category);
    setTagsInput(proj.tags.join(", "));
    setCoverImage(proj.coverImage);
    setGalleryImages(proj.galleryImages && proj.galleryImages.length > 0 ? proj.galleryImages : [proj.coverImage]);
    setPricingType(proj.pricingType || "both");
    setPrice(proj.price || "3,500 ريال");
    setHasDiscount(Boolean(proj.hasDiscount));
    setOriginalPrice(proj.originalPrice || "");
    setDiscountPercent(proj.discountPercent || "");
    setOfferTag(proj.offerTag || "");
    setAnnualMaintenancePrice(proj.annualMaintenancePrice || "500 ريال / سنوياً");
    setPlans(proj.subscriptionPlans && proj.subscriptionPlans.length > 0 ? proj.subscriptionPlans : []);
    setSimpleFeaturesInput(proj.simpleFeaturesAr?.join(", ") || "");
    setLiveUrl(proj.liveUrl || "");
    setGithubUrl(proj.githubUrl || "");
    setClientName(proj.clientName);
    setCompletionDate(proj.completionDate);
    setFeatured(proj.featured);

    setActiveTab("addEditProject");
  };

  const handleResetProjectForm = () => {
    setEditingProjectId(null);
    setTitleAr("");
    setTitleEn("");
    setTaglineAr("");
    setTaglineEn("");
    setDescriptionAr("");
    setDescriptionEn("");
    setCategory("pos_accounting");
    setTagsInput("محاسبة, فواتير, كاشير");
    setCoverImage("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80");
    setGalleryImages(["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"]);
    setPricingType("both");
    setPrice("3,500 ريال");
    setHasDiscount(true);
    setOriginalPrice("5,000 ريال");
    setDiscountPercent("30% خصم");
    setOfferTag("🔥 عرض خاص لفترة محدودة");
    setAnnualMaintenancePrice("500 ريال / سنوياً (شامل التحديثات والدعم الفني)");
    setPlans([]);
    setSimpleFeaturesInput("واجهة عربية سهلة, طباعة إلكترونية, تطبيق جوال");
    setLiveUrl("https://demo.novacoders.io");
    setGithubUrl("");
    setClientName("شركة أعمال تجارية");
    setCompletionDate("2026-03");
    setFeatured(false);
  };

  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setGalleryImages((prev) => [...prev, newGalleryUrl.trim()]);
      setNewGalleryUrl("");
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPlan = () => {
    if (!newPlanName.trim() || !newPlanPrice.trim()) {
      showToast("تنبيه", "يرجى كتابة اسم الباقة وسعرها.", "warning");
      return;
    }
    const newP: SubscriptionPlan = {
      id: `plan-${Date.now()}`,
      nameAr: newPlanName,
      nameEn: newPlanName,
      price: newPlanPrice,
      periodAr: newPlanPeriod || "دوري",
      periodEn: newPlanPeriod || "Recurring",
      featuresAr: newPlanFeatures ? newPlanFeatures.split(",").map((f) => f.trim()) : ["دعم فني", "تحديثات دورية"],
      featuresEn: ["Technical Support", "Regular Updates"],
      isPopular: plans.length === 1,
    };
    setPlans((prev) => [...prev, newP]);
    setNewPlanName("");
    setNewPlanPrice("");
    setNewPlanPeriod("");
    setNewPlanFeatures("");
  };

  const handleRemovePlan = (id: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim() || !descriptionAr.trim()) {
      showToast("تنبيه", "يرجى تعبئة اسم المشروع والوصف بالعربية.", "warning");
      return;
    }

    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const simpleFeatures = simpleFeaturesInput.split(",").map((f) => f.trim()).filter(Boolean);

    const projectPayload: Omit<Project, "id" | "views" | "likes"> = {
      titleAr,
      titleEn: titleEn || titleAr,
      taglineAr: taglineAr || titleAr,
      taglineEn: taglineEn || titleEn || titleAr,
      descriptionAr,
      descriptionEn: descriptionEn || descriptionAr,
      category,
      tags: tags.length > 0 ? tags : ["تطوير برمجيات", "حلول ذكية"],
      coverImage: coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      galleryImages: galleryImages.length > 0 ? galleryImages : [coverImage],
      pricingType,
      price: price || "حسب الاتفاق",
      hasDiscount,
      originalPrice: hasDiscount ? originalPrice : undefined,
      discountPercent: hasDiscount ? discountPercent : undefined,
      offerTag: hasDiscount ? offerTag : undefined,
      annualMaintenancePrice: annualMaintenancePrice || "مجاناً أول سنة",
      subscriptionPlans: plans,
      simpleFeaturesAr: simpleFeatures,
      simpleFeaturesEn: simpleFeatures,
      liveUrl,
      githubUrl,
      clientName: clientName || "عميل مميز",
      completionDate: completionDate || "2026-03",
      featured,
      status: "live",
      metrics: [
        { labelAr: "سرعة الإنجاز", labelEn: "Speed", value: "فورية" },
        { labelAr: "التوافرية", labelEn: "Uptime", value: "99.99%" },
        { labelAr: "رضا العملاء", labelEn: "Satisfaction", value: "100%" },
      ],
      caseStudy: {
        challengeAr: "تسهيل العمليات وتحويلها من الإدارة اليدوية أو البرامج المعقدة إلى نظام رقمي سريع وسهل الاستخدام.",
        challengeEn: "Streamlining complex manual workflows into an intuitive, high-speed digital solution.",
        solutionAr: "تطوير منظومة حديثة متكاملة تواكب أحدث المعايير مع توفير الدعم الفني والتدريب الكامل.",
        solutionEn: "Architected a modern solution tailored for peak ease of use and zero friction.",
        outcomeAr: "زيادة كفاءة العمل وتوفير الوقت والجهد مع رضا تام من المستخدمين.",
        outcomeEn: "Elevated business performance and saved operating hours.",
        architecturePointsAr: ["تطوير متقدم", "أمان وحفظ سحابي", "دعم الشاشات والهواتف"],
        architecturePointsEn: ["Cloud Security", "Mobile Responsive", "High Scalability"],
      },
      teamContributors: teamMembers.map((m) => m.nameAr),
    };

    if (editingProjectId) {
      updateProject(editingProjectId, projectPayload);
    } else {
      addProject(projectPayload);
    }

    handleResetProjectForm();
    setActiveTab("projects");
  };

  // Category CRUD Handlers
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.nameAr.trim() || !categoryForm.key.trim()) {
      showToast("تنبيه", "يرجى كتابة رمز وتسمية القسم بالعربية.", "warning");
      return;
    }

    if (editingCategoryKey) {
      updateCategory(editingCategoryKey, categoryForm);
    } else {
      addCategory(categoryForm);
    }

    setEditingCategoryKey(null);
    setCategoryForm({ key: "", nameAr: "", nameEn: "", icon: "Layers" });
    setIsCategoryFormOpen(false);
  };

  const handleEditCategoryClick = (cat: CategoryItem) => {
    setEditingCategoryKey(cat.key);
    setCategoryForm(cat);
    setIsCategoryFormOpen(true);
  };

  // Testimonial / Client CRUD Handlers
  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.clientNameAr.trim() || !testimonialForm.companyAr.trim()) {
      showToast("تنبيه", "يرجى كتابة اسم العميل واسم المؤسسة أو الشركة بالعربية.", "warning");
      return;
    }

    if (editingTestimonialId) {
      updateTestimonial(editingTestimonialId, testimonialForm);
    } else {
      addTestimonial(testimonialForm);
    }

    setEditingTestimonialId(null);
    setTestimonialForm({
      clientNameAr: "",
      clientNameEn: "",
      companyAr: "",
      companyEn: "",
      systemUsedAr: "",
      systemUsedEn: "",
      sectorAr: "تجاري / خدمات",
      sectorEn: "Commercial & Services",
      partnershipTypeAr: "شراء وتمليك نظام",
      partnershipTypeEn: "System Ownership",
      logoUrl: "",
      rating: 5,
      feedbackAr: "",
      feedbackEn: "",
      year: "2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      location: "الرياض، السعودية",
    });
    setIsTestimonialFormOpen(false);
  };

  const handleEditTestimonialClick = (item: TestimonialItem) => {
    setEditingTestimonialId(item.id);
    setTestimonialForm({
      clientNameAr: item.clientNameAr,
      clientNameEn: item.clientNameEn || "",
      companyAr: item.companyAr,
      companyEn: item.companyEn || "",
      roleAr: item.roleAr || "",
      roleEn: item.roleEn || "",
      systemUsedAr: item.systemUsedAr,
      systemUsedEn: item.systemUsedEn || "",
      sectorAr: item.sectorAr || "خدمات",
      sectorEn: item.sectorEn || "Services",
      partnershipTypeAr: item.partnershipTypeAr || "شراء وتمليك نظام",
      partnershipTypeEn: item.partnershipTypeEn || "System Ownership",
      logoUrl: item.logoUrl || "",
      rating: item.rating,
      feedbackAr: item.feedbackAr,
      feedbackEn: item.feedbackEn || "",
      year: item.year || "2026",
      avatar: item.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      location: item.location || "الرياض، السعودية",
    });
    setIsTestimonialFormOpen(true);
  };

  // User CRUD Handlers
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userUsername.trim() || !userPassword.trim()) {
      showToast("تنبيه", "يرجى كتابة الاسم، واسم المستخدم، وكلمة المرور.", "warning");
      return;
    }

    if (editingUserId) {
      updateUser(editingUserId, {
        name: userName,
        username: userUsername,
        password: userPassword,
        role: userRole,
        email: userEmail || `${userUsername}@novacoders.io`,
        avatar: userAvatar,
      });
    } else {
      addUser({
        name: userName,
        username: userUsername,
        password: userPassword,
        role: userRole,
        email: userEmail || `${userUsername}@novacoders.io`,
        avatar: userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      });
    }

    setEditingUserId(null);
    setUserName("");
    setUserUsername("");
    setUserPassword("");
    setUserRole("مشرف أنظمة");
    setUserEmail("");
    setIsUserFormOpen(false);
  };

  const handleEditUserClick = (u: AppUser) => {
    setEditingUserId(u.id);
    setUserName(u.name);
    setUserUsername(u.username);
    setUserPassword(u.password || "");
    setUserRole(u.role);
    setUserEmail(u.email);
    setUserAvatar(u.avatar);
    setIsUserFormOpen(true);
  };

  // Site Settings Save
  const handleSaveSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      ...siteForm,
      siteNameAr: siteForm.siteNameAr,
      siteNameEn: siteForm.siteNameEn,
      teamNameAr: siteForm.siteNameAr,
      teamNameEn: siteForm.siteNameEn,
      siteSloganAr: siteForm.siteSloganAr,
      siteSloganEn: siteForm.siteSloganEn,
      taglineAr: siteForm.siteSloganAr,
      taglineEn: siteForm.siteSloganEn,
      heroSubtitleAr: siteForm.heroSubtitleAr,
      heroSubtitleEn: siteForm.heroSubtitleEn,
      heroDescriptionAr: siteForm.heroSubtitleAr,
      heroDescriptionEn: siteForm.heroSubtitleEn,
      contactAddressAr: siteForm.contactAddressAr,
      address: siteForm.contactAddressAr,
    });
  };

  // AI Spec Generator
  const handleGenerateAi = async () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAi(true);
    try {
      const res = await fetch("/api/ai/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, category }),
      });
      const data = await res.json();
      
      setTitleAr(data.titleAr || `برنامج ${aiPrompt}`);
      setTitleEn(data.titleEn || `System for ${aiPrompt}`);
      setDescriptionAr(data.descriptionAr || "برنامج رقمي متطور وسهل الاستخدام مصمم خصيصاً لتطوير أعمالك.");
      setDescriptionEn(data.descriptionEn || "Advanced custom software solution.");
      if (data.tags) setTagsInput(data.tags.join(", "));
      
      showToast("تم توليد المواصفات بالذكاء الاصطناعي!", "تم ملء الحقول تلقائياً، يمكنك الآن مراجعتها وحفظ المشروع.", "success");
      setActiveTab("addEditProject");
    } catch {
      showToast("خطأ", "تعذر الاتصال بخدمة الذكاء الاصطناعي حالياً.", "error");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl rounded-3xl bg-[#090e1c] border border-blue-500/30 shadow-2xl shadow-blue-950/90 overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Navbar in Admin */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0c1427] via-[#0f172a] to-[#0c1427] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-sky-400 shadow-lg shadow-blue-600/20">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {language === "ar" ? "لوحة التحكم والتعديل الشامل" : "Full Management & CMS Studio"}
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold">
                  {teamUser?.name || "المشرف"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === "ar" 
                  ? "تعديل المشاريع والأسعار والباقات، إدارة المستخدمين، وتغيير كل محتويات الموقع بسهولة" 
                  : "Edit projects, pricing, packages, users, and full website content dynamically"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cloud Realtime Status Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${isCloudSynced ? "bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" : "bg-amber-400"}`} />
              <span className="text-slate-300 font-medium">
                {isCloudSynced 
                  ? (language === "ar" ? "قاعدة البيانات السحابية: متصلة ونشطة" : "Cloud DB: Connected & Synced") 
                  : (language === "ar" ? "جارٍ المزامنة السحابية..." : "Connecting to Cloud...")}
              </span>
            </div>

            <button
              onClick={() => forceSyncToCloud()}
              title={language === "ar" ? "مزامنة فورية لكل البيانات إلى السحابة" : "Force sync all data to cloud"}
              className="px-3 py-2 text-xs font-semibold text-sky-300 hover:text-white bg-blue-950/40 hover:bg-blue-900/50 rounded-xl border border-blue-500/30 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{language === "ar" ? "مزامنة سحابية" : "Sync Cloud"}</span>
            </button>

            <button
              onClick={() => setIsDashboardOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>{language === "ar" ? "معاينة الموقع" : "View Live Site"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsDashboardOpen(false)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-full border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-[#060a14] border-b border-slate-800 overflow-x-auto custom-scrollbar flex-shrink-0">
          
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "projects"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Layers className="w-4 h-4 text-sky-300" />
            <span>{language === "ar" ? "المشاريع والأنظمة" : "Projects & Systems"} ({projects.length})</span>
          </button>

          <button
            onClick={() => {
              handleResetProjectForm();
              setActiveTab("addEditProject");
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "addEditProject"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-500/30"
            }`}
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>{editingProjectId ? (language === "ar" ? "تعديل المشروع" : "Edit Project") : (language === "ar" ? "+ إضافة مشروع جديد" : "+ Add New Project")}</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "categories"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <FolderEdit className="w-4 h-4 text-cyan-400" />
            <span>{language === "ar" ? "أقسام وتصنيفات الأنظمة" : "Categories"} ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "users"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>{language === "ar" ? "إدارة المستخدمين والمشرفين" : "Users & Admins"} ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("siteSettings")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "siteSettings"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Settings className="w-4 h-4 text-indigo-400" />
            <span>{language === "ar" ? "تعديل هوية ومعلومات الموقع" : "Site Identity & CMS"}</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "team"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>{language === "ar" ? "أعضاء الفريق" : "Team Members"} ({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "testimonials"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Building className="w-4 h-4 text-teal-400" />
            <span>{language === "ar" ? "العملاء ومستخدمو الأنظمة" : "Clients & Users"} ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inbox")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "inbox"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Inbox className="w-4 h-4 text-sky-400" />
            <span>{language === "ar" ? "طلبات الزوار" : "Inquiries Inbox"} ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("aiGenerator")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "aiGenerator"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{language === "ar" ? "المساعد الذكي (Gemini AI)" : "AI Project Generator"}</span>
          </button>

        </div>

        {/* Tab Content Container */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          {/* TAB 1: PROJECTS LIST */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === "ar" ? "سجل المشاريع والأنظمة المعروضة" : "Published Systems & Projects"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar" ? "يمكنك تعديل أي مشروع، تغيير الأسعار، إضافة باقات، أو حذف المشاريع." : "Manage live showcase, edit pricing models, screenshot galleries and packages."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleResetProjectForm();
                    setActiveTab("addEditProject");
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === "ar" ? "إضافة مشروع جديد" : "Add New System"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-[#0c1427] border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.coverImage}
                            alt={proj.titleAr}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                              {proj.titleAr}
                            </h4>
                            <span className="text-[11px] text-sky-400 font-mono">
                              {proj.category.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{language === "ar" ? "مميز" : "Featured"}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                        {proj.descriptionAr}
                      </p>

                      {/* Pricing & Offer Badges */}
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-bold">{proj.price}</span>
                          {proj.hasDiscount && proj.originalPrice && (
                            <span className="text-[11px] text-slate-500 line-through">
                              {proj.originalPrice}
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-sky-300">
                          {proj.pricingType === "both" 
                            ? (language === "ar" ? "شراء أو اشتراك" : "Buy / Subscribe") 
                            : proj.pricingType === "subscription" 
                              ? (language === "ar" ? "اشتراك دوري وباقات" : "Subscription") 
                              : (language === "ar" ? "شراء لمرة واحدة" : "One-Time Buy")}
                        </span>
                      </div>

                      {/* Maintenance price & screenshots count */}
                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Wrench className="w-3.5 h-3.5 text-slate-500" />
                          {proj.annualMaintenancePrice}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-sky-400">
                          <ImageIcon className="w-3.5 h-3.5" />
                          {proj.galleryImages?.length || 1} {language === "ar" ? "صور شاشات" : "Screens"}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleFeaturedProject(proj.id)}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          proj.featured
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                        }`}
                        title="تبديل التمييز"
                      >
                        <Star className={`w-3.5 h-3.5 ${proj.featured ? "fill-current" : ""}`} />
                        <span>{proj.featured ? (language === "ar" ? "إلغاء التمييز" : "Unfeature") : (language === "ar" ? "تمييز" : "Feature")}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProjectClick(proj)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-sky-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{language === "ar" ? "تعديل" : "Edit"}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(language === "ar" ? "هل أنت متأكد من رغبتك في حذف هذا المشروع؟" : "Delete this project?")) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors"
                          title="حذف المشروع"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADD / EDIT PROJECT (With Pricing, Subscriptions, Maintenance, & Screenshots) */}
          {activeTab === "addEditProject" && (
            <form onSubmit={handleSaveProject} className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-sky-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {editingProjectId ? (language === "ar" ? `تعديل المشروع: ${titleAr}` : "Edit Project Details") : (language === "ar" ? "إضافة مشروع جديد للمعرض" : "Add New System to Portfolio")}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetProjectForm}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                  >
                    {language === "ar" ? "إعادة تعيين الحقول" : "Reset"}
                  </button>
                </div>
              </div>

              {/* SECTION A: Basic Info */}
              <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>{language === "ar" ? "1. المعلومات الأساسية للمشروع" : "1. Basic System Info"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      {language === "ar" ? "اسم المشروع (بالعربية)" : "Project Name (Arabic)"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      placeholder="مثال: نظام الأفق المحاسبي السحابي"
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      {language === "ar" ? "اسم المشروع (بالإنجليزية)" : "Project Name (English)"}
                    </label>
                    <input
                      type="text"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Nova ERP Cloud"
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      {language === "ar" ? "تصنيف المشروع" : "Category"}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-bold text-sky-300"
                    >
                      {categories.map((cat) => (
                        <option key={cat.key} value={cat.key}>
                          {cat.nameAr} ({cat.nameEn})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      {language === "ar" ? "الكلمات الدلالية والتقنيات (مفصولة بفواصل)" : "Tags"}
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="محاسبة, فواتير إلكترونية, تطبيق جوال"
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {language === "ar" ? "وصف المشروع السهل (يفهمه جميع العملاء)" : "Plain Description (Arabic)"} *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    placeholder="اشرح ميزات النظام وكيف يفيد صاحب العمل والزبائن بلغة مبسطة وواضحة..."
                    className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {language === "ar" ? "أهم المميزات السريعة (مفصولة بفواصل)" : "Key Quick Features"}
                  </label>
                  <input
                    type="text"
                    value={simpleFeaturesInput}
                    onChange={(e) => setSimpleFeaturesInput(e.target.value)}
                    placeholder="لوحة تحكم بالعربي سهلة, طباعة فواتير حرارية, متوافق مع الضريبة, تطبيق جوال"
                    className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* SECTION B: Pricing, Offers, Maintenance & Plans */}
              <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{language === "ar" ? "2. الأسعار، العروض، الصيانة السنوية، وباقات الاشتراك" : "2. Pricing, Maintenance & Subscriptions"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      {language === "ar" ? "طريقة الشراء / نموذج الدفع" : "Pricing Model"}
                    </label>
                    <select
                      value={pricingType}
                      onChange={(e) => setPricingType(e.target.value as PricingType)}
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-bold text-sky-300"
                    >
                      <option value="both">متوفر كلاهما (شراء مرة واحدة أو اشتراك دوري)</option>
                      <option value="one_time">شراء لمرة واحدة فقط (امتلاك كامل للكود)</option>
                      <option value="subscription">اشتراك دوري فقط (شهري أو سنوي)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      {language === "ar" ? "السعر الأساسي للمشروع" : "Main Base Price"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="مثال: 3,500 ريال أو $1,200"
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-bold text-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      {language === "ar" ? "سعر الصيانة السنوية والدعم الفني" : "Annual Maintenance Price"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={annualMaintenancePrice}
                      onChange={(e) => setAnnualMaintenancePrice(e.target.value)}
                      placeholder="مثال: 500 ريال / سنوياً (شامل التحديثات ومجاناً أول سنة)"
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none text-amber-300"
                    />
                  </div>
                </div>

                {/* Discount & Offers Box */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="hasDiscountCheck"
                      checked={hasDiscount}
                      onChange={(e) => setHasDiscount(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded bg-slate-800 border-slate-700"
                    />
                    <label htmlFor="hasDiscountCheck" className="text-xs font-bold text-white cursor-pointer flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === "ar" ? "هل يوجد عرض ترويجي أو خصم خاص على هذا المشروع؟" : "Is there a promotional offer/discount?"}</span>
                    </label>
                  </div>

                  {hasDiscount && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {language === "ar" ? "السعر قبل الخصم (مشطوب)" : "Original Price"}
                        </label>
                        <input
                          type="text"
                          value={originalPrice}
                          onChange={(e) => setOriginalPrice(e.target.value)}
                          placeholder="مثال: 5,000 ريال"
                          className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {language === "ar" ? "نسبة الخصم" : "Discount Tag"}
                        </label>
                        <input
                          type="text"
                          value={discountPercent}
                          onChange={(e) => setDiscountPercent(e.target.value)}
                          placeholder="مثال: 30% خصم"
                          className="w-full py-2 px-3 text-xs text-emerald-400 font-bold bg-slate-950 border border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {language === "ar" ? "عبارة العرض الخاص" : "Offer Promo Text"}
                        </label>
                        <input
                          type="text"
                          value={offerTag}
                          onChange={(e) => setOfferTag(e.target.value)}
                          placeholder="🔥 عرض التدشين الخاص"
                          className="w-full py-2 px-3 text-xs text-amber-300 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Subscription Plans Manager */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{language === "ar" ? "باقات الاشتراك الدوري (اختياري / في حال توفر باقات)" : "Subscription Packages & Plans"}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {plans.length} {language === "ar" ? "باقات مضافة" : "plans"}
                    </span>
                  </div>

                  {plans.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {plans.map((p) => (
                        <div key={p.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{p.nameAr}</span>
                              {p.isPopular && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">الأكثر طلباً</span>
                              )}
                            </div>
                            <div className="text-emerald-400 font-mono text-[11px]">{p.price} • {p.periodAr}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemovePlan(p.id)}
                            className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Plan Mini Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
                    <input
                      type="text"
                      value={newPlanName}
                      onChange={(e) => setNewPlanName(e.target.value)}
                      placeholder="اسم الباقة (مثال: الشهرية)"
                      className="py-1.5 px-2.5 text-xs text-white bg-slate-950 border border-slate-700 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newPlanPrice}
                      onChange={(e) => setNewPlanPrice(e.target.value)}
                      placeholder="السعر (مثال: 199 ريال)"
                      className="py-1.5 px-2.5 text-xs text-white bg-slate-950 border border-slate-700 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newPlanPeriod}
                      onChange={(e) => setNewPlanPeriod(e.target.value)}
                      placeholder="الدورية (شهري / سنوي)"
                      className="py-1.5 px-2.5 text-xs text-white bg-slate-950 border border-slate-700 rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddPlan}
                      className="py-1.5 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      + إضافة الباقة
                    </button>
                  </div>
                </div>

              </div>

              {/* SECTION C: Screenshots & Gallery of Project Pages */}
              <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>{language === "ar" ? "3. صور صفحات وشاشات المشروع (Gallery Screenshots)" : "3. Screenshots & Page Gallery"}</span>
                </h4>

                {/* Cover Image Selection (Upload from device or URL or Presets) */}
                <div className="p-4 rounded-2xl bg-[#070c18] border border-blue-500/30 space-y-4">
                  <label className="block text-xs font-bold text-sky-400 uppercase tracking-wider">
                    {language === "ar" ? "الصورة الرئيسية لغلاف المشروع (اختر من جهازك، رابط مباشر، أو نماذج جاهزة):" : "Project Cover Image (Upload from device / URL / Templates):"} *
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Cover Preview */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-sky-400/50 shadow-lg shadow-blue-500/20 bg-slate-950">
                        {coverImage ? (
                          <img
                            src={coverImage}
                            alt="Cover Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2">
                        {language === "ar" ? "معاينة صورة الغلاف الأساسية" : "Live Cover Preview"}
                      </span>
                    </div>

                    {/* Upload Controls */}
                    <div className="md:col-span-8 space-y-3">
                      {/* File Upload Zone */}
                      <label className="flex items-center gap-3 p-3.5 border-2 border-dashed border-blue-500/40 hover:border-sky-400 rounded-xl bg-blue-950/20 hover:bg-blue-950/40 cursor-pointer transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shrink-0">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-sky-300">
                            {language === "ar" ? "اضغط لاختيار صورة الغلاف من هاتفك أو جهازك" : "Upload cover image from your phone / computer"}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {language === "ar" ? "يمكنك اختيار أي صورة من المعرض أو ملفات الكمبيوتر" : "Select PNG, JPG, or WebP files"}
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const res = ev.target?.result as string;
                                if (res) {
                                  setCoverImage(res);
                                  // Also add to gallery if gallery only has default or is empty
                                  setGalleryImages((prev) => prev.length === 0 ? [res] : prev);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>

                      {/* URL input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          required
                          value={coverImage}
                          onChange={(e) => setCoverImage(e.target.value)}
                          placeholder={language === "ar" ? "أو ضع رابط صورة مباشر (URL)..." : "Or enter direct image URL..."}
                          className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl font-mono focus:border-sky-400 focus:outline-none"
                        />
                      </div>

                      {/* Quick preset banners */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] text-slate-400">{language === "ar" ? "أو نماذج جاهزة:" : "Or ready covers:"}</span>
                        {[
                          { label: "كاشير ونقاط بيع", url: "https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1200&q=80" },
                          { label: "برنامج محاسبة", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
                          { label: "تطبيق متجر", url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80" },
                          { label: "إدارة مطاعم", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" },
                        ].map((preset, pidx) => (
                          <button
                            key={pidx}
                            type="button"
                            onClick={() => setCoverImage(preset.url)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-sky-300 font-semibold border border-slate-700"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screenshots List & Device Upload for Screenshots */}
                <div className="p-4 rounded-2xl bg-[#070c18] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-white">
                      {language === "ar" ? "صور صفحات وشاشات المشروع المعروضة للزبائن (معرض الشاشات):" : "Project Screens & Page Screenshots:"}
                    </label>
                    <span className="text-[11px] text-sky-400 font-mono">
                      {galleryImages.length} {language === "ar" ? "صور مضافة" : "screens"}
                    </span>
                  </div>

                  {/* Multi-file upload from device button */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 p-3 border border-dashed border-sky-500/50 hover:border-sky-400 rounded-xl bg-sky-950/20 hover:bg-sky-950/40 cursor-pointer transition-all">
                      <div className="w-8 h-8 rounded-lg bg-sky-600/30 border border-sky-500/40 flex items-center justify-center text-sky-300 shrink-0">
                        <Upload className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-sky-300">
                          {language === "ar" ? "رفع شاشات إضافية من جهازك" : "Upload screen shots from device"}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {language === "ar" ? "يمكنك اختيار عدة صور دفعة واحدة" : "Select multiple images"}
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            Array.from(files).forEach((file) => {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const res = ev.target?.result as string;
                                if (res) {
                                  setGalleryImages((prev) => [...prev, res]);
                                }
                              };
                              reader.readAsDataURL(file);
                            });
                          }
                        }}
                      />
                    </label>

                    {/* Or URL input */}
                    <div className="flex gap-2 items-center">
                      <input
                        type="url"
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        placeholder={language === "ar" ? "أو أدخل رابط صورة شاشة..." : "Or enter screen image URL..."}
                        className="flex-1 py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleAddGalleryImage}
                        className="px-3.5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{language === "ar" ? "إضافة" : "Add"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Preset Sample Gallery Images Helper */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-400">{language === "ar" ? "نماذج جاهزة سريعة:" : "Quick samples:"}</span>
                    <button
                      type="button"
                      onClick={() => setGalleryImages((prev) => [...prev, "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"])}
                      className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-sky-300 hover:bg-slate-700"
                    >
                      + شاشة تقارير
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryImages((prev) => [...prev, "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80"])}
                      className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-sky-300 hover:bg-slate-700"
                    >
                      + تطبيق جوال
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryImages((prev) => [...prev, "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"])}
                      className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-sky-300 hover:bg-slate-700"
                    >
                      + شاشة كاشير
                    </button>
                  </div>

                  {/* Screenshots Grid Preview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {galleryImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-700 group h-24 bg-slate-950">
                        <img src={imgUrl} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-500"
                            title="حذف الصورة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION D: Project Links & Status */}
              <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>{language === "ar" ? "4. روابط المشروع والموقع" : "4. Project Links & Visibility"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      {language === "ar" ? "رابط موقع أو تطبيق المشروع" : "Project Live URL"}
                    </label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      {language === "ar" ? "رابط المستودع أو كود المشروع (اختياري)" : "GitHub / Source URL (Optional)"}
                    </label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="featuredCheck"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded bg-slate-800 border-slate-700"
                  />
                  <label htmlFor="featuredCheck" className="text-xs font-bold text-white cursor-pointer">
                    {language === "ar" ? "تثبيت المشروع في قائمة المشاريع المميزة في الصفحة الرئيسية" : "Feature this system on the homepage"}
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("projects")}
                  className="px-5 py-3 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 rounded-xl"
                >
                  {language === "ar" ? "إلغاء والعودة" : "Cancel"}
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingProjectId ? (language === "ar" ? "حفظ التعديلات على المشروع" : "Save Changes") : (language === "ar" ? "نشر المشروع فوراً في المعرض" : "Publish Project Live")}</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB: CATEGORIES MANAGEMENT */}
          {activeTab === "categories" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderEdit className="w-5 h-5 text-cyan-400" />
                    <span>{language === "ar" ? "إدارة أقسام وتصنيفات الأنظمة" : "System Categories & Sectors"}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar" ? "إضافة تصنيفات جديدة (مثل محاسبة، تطبيقات، عيادات...) وتعديل التسميات بالعربي والإنجليزي." : "Manage dynamic project categories and sector tags."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingCategoryKey(null);
                    setCategoryForm({
                      key: `cat_${Date.now()}`,
                      nameAr: "",
                      nameEn: "",
                      icon: "Layers",
                    });
                    setIsCategoryFormOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === "ar" ? "إضافة قسم جديد" : "Add New Category"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const count = projects.filter((p) => p.category === cat.key).length;
                  return (
                    <div
                      key={cat.key}
                      className="p-4 rounded-2xl bg-[#0c1427] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                            <FolderPlus className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{cat.nameAr}</h4>
                            <div className="text-[11px] text-slate-400 font-sans">{cat.nameEn}</div>
                            <span className="text-[10px] text-sky-400 font-mono">key: {cat.key}</span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {count} {language === "ar" ? "أنظمة" : "systems"}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <button
                          onClick={() => handleEditCategoryClick(cat)}
                          className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>تعديل</span>
                        </button>

                        <button
                          onClick={() => deleteCategory(cat.key)}
                          className="text-xs text-red-400 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>حذف</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add / Edit Category Form Modal */}
              {isCategoryFormOpen && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FolderEdit className="w-4 h-4 text-cyan-400" />
                      <span>{editingCategoryKey ? "تعديل بيانات القسم" : "إضافة قسم وتصنيف جديد"}</span>
                    </h4>
                    <button onClick={() => setIsCategoryFormOpen(false)} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCategory} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">اسم القسم (بالعربية) *</label>
                      <input
                        type="text"
                        required
                        value={categoryForm.nameAr}
                        onChange={(e) => setCategoryForm({ ...categoryForm, nameAr: e.target.value })}
                        placeholder="مثال: أنظمة عيادات ومراكز طبية"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">اسم القسم (بالإنجليزية)</label>
                      <input
                        type="text"
                        value={categoryForm.nameEn}
                        onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                        placeholder="e.g. Medical & Clinic Systems"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:outline-none font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">معرف القسم (Key) *</label>
                      <input
                        type="text"
                        required
                        disabled={Boolean(editingCategoryKey)}
                        value={categoryForm.key}
                        onChange={(e) => setCategoryForm({ ...categoryForm, key: e.target.value })}
                        placeholder="medical_clinics"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:outline-none font-mono disabled:opacity-60"
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCategoryFormOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-lg shadow-cyan-600/30"
                      >
                        {editingCategoryKey ? "حفظ تعديل القسم" : "إضافة القسم"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: USERS & ADMINS MANAGEMENT */}
          {activeTab === "users" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-amber-400" />
                    <span>{language === "ar" ? "إدارة مستخدمي ومشرفي الفريق" : "Team Accounts & Access"}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar" 
                      ? "إضافة حسابات جديدة لكافة أعضاء الفريق بالتكافؤ، وتعديل اسم المستخدم وكلمة المرور."
                      : "Manage team member access with equal credentials and roles."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingUserId(null);
                    setUserName("");
                    setUserUsername("");
                    setUserPassword("");
                    setUserRole("مهندس برمجيات");
                    setUserEmail("");
                    setIsUserFormOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === "ar" ? "إضافة مستخدم جديد" : "Add New User"}</span>
                </button>
              </div>

              {/* Users List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="p-4 rounded-2xl bg-[#0c1427] border border-slate-800 hover:border-slate-700 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{u.name}</h4>
                          <span className="text-[10px] text-sky-400">{u.role}</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono space-y-1">
                        <div className="text-slate-300">
                          user: <strong className="text-sky-300">{u.username}</strong>
                        </div>
                        <div className="text-slate-300">
                          pass: <strong className="text-amber-300">{u.password ? "••••••••" : "محمي"}</strong>
                        </div>
                        <div className="text-slate-400 text-[10px]">{u.email}</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handleEditUserClick(u)}
                        className="text-xs text-sky-400 hover:underline flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>تعديل</span>
                      </button>

                      {users.length > 1 && (
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="text-xs text-red-400 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>حذف</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add / Edit User Modal / Form */}
              {isUserFormOpen && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-blue-500/40 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-sky-400" />
                      <span>{editingUserId ? "تعديل بيانات المستخدم" : "إضافة مستخدم جديد"}</span>
                    </h4>
                    <button onClick={() => setIsUserFormOpen(false)} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveUser} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">الاسم الكامل *</label>
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="مثال: م. أحمد الغامدي"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">اسم المستخدم (Username) *</label>
                      <input
                        type="text"
                        required
                        value={userUsername}
                        onChange={(e) => setUserUsername(e.target.value)}
                        placeholder="ahmed"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">كلمة المرور (Password) *</label>
                      <input
                        type="text"
                        required
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">المسمى الوظيفي / الصلاحية</label>
                      <input
                        type="text"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        placeholder="مهندس برمجيات / مدير مشاريع"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="user@novacoders.io"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:outline-none font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-200">الصورة الرمزية للمستخدم (رفع من الجهاز أو اختيار):</label>
                        {userAvatar && (
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-sky-400">
                            <img src={userAvatar} alt="User Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <label className="flex-1 flex items-center justify-center gap-2 p-2 border border-dashed border-blue-500/50 hover:border-sky-400 rounded-xl bg-blue-950/20 hover:bg-blue-950/40 cursor-pointer text-xs text-sky-300 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>رفع صورة من الجهاز</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const res = ev.target?.result as string;
                                  if (res) setUserAvatar(res);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>

                        <input
                          type="url"
                          value={userAvatar}
                          onChange={(e) => setUserAvatar(e.target.value)}
                          placeholder="أو رابط الصورة..."
                          className="flex-1 py-2 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsUserFormOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl"
                      >
                        {editingUserId ? "حفظ تعديل المستخدم" : "إنشاء المستخدم"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SITE SETTINGS & DEEP CMS */}
          {activeTab === "siteSettings" && (
            <form onSubmit={handleSaveSiteSettings} className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-indigo-400" />
                    <span>{language === "ar" ? "تعديل هوية ومعلومات ومحتوى الموقع بالكامل" : "Complete Site Identity & Content Editor"}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar" ? "يمكنك هنا تعديل الشعارات، أرقام الواتساب، العناوين، والنصوص في الصفحة الرئيسية." : "Dynamically modify branding, contacts, hero headers, announcements, and socials."}
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{language === "ar" ? "حفظ كافة الإعدادات وتطبيقها" : "Save All Site Settings"}</span>
                </button>
              </div>

              {/* Software Group Logo & Visual Identity */}
              <div className="p-5 rounded-2xl bg-[#0c1427] border border-blue-500/40 space-y-5 shadow-xl relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      <span>{language === "ar" ? "شعار وهوية المجموعة البرمجية (الظاهر كبيراً في بداية الموقع)" : "Software Group Logo & Hero Emblem"}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {language === "ar" 
                        ? "يمكنك رفع صورة من جهازك، إدخال رابط مباشر، أو الاختيار من نماذج الشعارات البرمجية الجاهزة أدناه." 
                        : "Upload a file from your computer/phone, enter an image URL, or choose a ready cyber emblem preset."}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {siteForm.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setSiteForm({ ...siteForm, logoUrl: "" })}
                        className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl border border-red-800/40 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === "ar" ? "إزالة الشعار" : "Remove Logo"}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSiteForm({ ...siteForm, logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" })}
                      className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === "ar" ? "الشعار الافتراضي" : "Default"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Upload / URL & Quick Presets (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    
                    {/* Direct File Upload Zone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        {language === "ar" ? "1. رفع شعار من جهازك مباشرة (PNG, JPG, SVG, WebP)" : "1. Direct Image File Upload"}
                      </label>
                      <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-500/40 hover:border-sky-400/80 rounded-2xl bg-blue-950/20 hover:bg-blue-950/30 cursor-pointer transition-all group">
                        <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-sky-300">
                              {language === "ar" ? "اضغط هنا لاختيار صورة من جهازك" : "Click to browse & upload image file"}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {language === "ar" ? "يتم حفظ الصورة ومعاينتها فوراً بأعلى جودة" : "Auto-converted and stored for instant live preview"}
                            </div>
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const res = ev.target?.result as string;
                                if (res) {
                                  setSiteForm((prev) => ({ ...prev, logoUrl: res }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* URL Input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        {language === "ar" ? "2. أو كتابة رابط الشعار (Image URL)" : "2. Or Enter Image URL"}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={siteForm.logoUrl}
                          onChange={(e) => setSiteForm({ ...siteForm, logoUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-mono"
                        />
                        {siteForm.logoUrl && (
                          <button
                            type="button"
                            onClick={() => setSiteForm({ ...siteForm, logoUrl: "" })}
                            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                            title="مسح الرابط"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Ready Tech Presets */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                        <span>{language === "ar" ? "3. نماذج شعارات برمجية وتقنية جاهزة (اختر بضغطة واحدة):" : "3. Ready Cyber & Tech Logo Presets (One-click apply):"}</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {[
                          {
                            nameAr: "كوانتوم نيون",
                            nameEn: "Quantum Blue",
                            url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
                          },
                          {
                            nameAr: "معالج سيليكون",
                            nameEn: "Silicon CPU",
                            url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80"
                          },
                          {
                            nameAr: "نواة هولوجرام",
                            nameEn: "Holo Sphere",
                            url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80"
                          },
                          {
                            nameAr: "ماتريكس كود",
                            nameEn: "Code Matrix",
                            url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80"
                          },
                          {
                            nameAr: "ذكاء اصطناعي",
                            nameEn: "AI Nexus",
                            url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80"
                          },
                          {
                            nameAr: "درع الأمان",
                            nameEn: "Cyber Shield",
                            url: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=400&q=80"
                          }
                        ].map((preset, idx) => {
                          const isSelected = siteForm.logoUrl === preset.url;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSiteForm({ ...siteForm, logoUrl: preset.url })}
                              className={`p-1.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                                isSelected 
                                  ? "bg-blue-600/30 border-sky-400 ring-2 ring-sky-400/50 scale-105" 
                                  : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:scale-102"
                              }`}
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700/60 bg-black">
                                <img src={preset.url} alt={preset.nameAr} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[10px] text-slate-300 font-medium truncate w-full">
                                {language === "ar" ? preset.nameAr : preset.nameEn}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Live Real-Time Preview (5 cols) */}
                  <div className="lg:col-span-5 p-4 rounded-2xl bg-gradient-to-b from-[#080d1a] to-[#04070f] border border-blue-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === "ar" ? "معاينة الشعار في الواجهة الرئيسية" : "Live Hero Logo Preview"}</span>
                    </div>

                    {/* Logo Preview Stage */}
                    <div className="relative my-2">
                      <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full" />
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-b from-sky-400/40 via-blue-600/30 to-indigo-600/40 border border-sky-400/50 shadow-2xl shadow-blue-500/30 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-[#080d1a] rounded-[22px] flex items-center justify-center p-2">
                          {siteForm.logoUrl ? (
                            <img
                              src={siteForm.logoUrl}
                              alt="Logo Preview"
                              className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex flex-col items-center text-sky-400">
                              <ImageIcon className="w-10 h-10 stroke-1" />
                              <span className="text-[9px] text-slate-400 mt-1">بدون صورة</span>
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 border border-slate-900 shadow">
                          <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs font-bold text-white">
                      {siteForm.siteNameAr || "مجموعة نوفا كودرز"}
                    </div>
                    <div className="text-[11px] text-sky-400">
                      {language === "ar" ? "شعار المجموعة البرمجية المعتمد" : "Verified Group Emblem"}
                    </div>
                  </div>

                </div>
              </div>

              {/* Branding & Name */}
              <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {language === "ar" ? "اسم الموقع والشعار اللفظي" : "Site Branding"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">اسم الموقع (بالعربية)</label>
                    <input
                      type="text"
                      value={siteForm.siteNameAr}
                      onChange={(e) => setSiteForm({ ...siteForm, siteNameAr: e.target.value })}
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">اسم الموقع (بالإنجليزية)</label>
                    <input
                      type="text"
                      value={siteForm.siteNameEn}
                      onChange={(e) => setSiteForm({ ...siteForm, siteNameEn: e.target.value })}
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">الشعار اللفظي والنبذة المختصرة</label>
                  <input
                    type="text"
                    value={siteForm.siteSloganAr}
                    onChange={(e) => setSiteForm({ ...siteForm, siteSloganAr: e.target.value })}
                    className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* Hero Headlines */}
              <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {language === "ar" ? "نصوص الواجهة الرئيسية (Hero Section)" : "Hero Section Texts"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">بداية العنوان</label>
                    <input
                      type="text"
                      value={siteForm.heroTitleLine1Ar}
                      onChange={(e) => setSiteForm({ ...siteForm, heroTitleLine1Ar: e.target.value })}
                      className="w-full py-2 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">النص البارز الملوّن</label>
                    <input
                      type="text"
                      value={siteForm.heroTitleHighlightAr}
                      onChange={(e) => setSiteForm({ ...siteForm, heroTitleHighlightAr: e.target.value })}
                      className="w-full py-2 px-3 text-xs text-sky-400 font-bold bg-slate-900 border border-slate-700 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">تكملة العنوان</label>
                    <input
                      type="text"
                      value={siteForm.heroTitleLine2Ar}
                      onChange={(e) => setSiteForm({ ...siteForm, heroTitleLine2Ar: e.target.value })}
                      className="w-full py-2 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">الشرح التفصيلي في الواجهة</label>
                  <textarea
                    rows={3}
                    value={siteForm.heroSubtitleAr}
                    onChange={(e) => setSiteForm({ ...siteForm, heroSubtitleAr: e.target.value })}
                    className="w-full py-2 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{language === "ar" ? "معلومات الاتصال المباشر والواتساب" : "Direct Contacts & WhatsApp"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">رقم الواتساب المباشر</label>
                    <input
                      type="text"
                      value={siteForm.contactWhatsApp}
                      onChange={(e) => setSiteForm({ ...siteForm, contactWhatsApp: e.target.value })}
                      placeholder="+966501234567"
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none font-mono text-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">رقم الهاتف / الجوال</label>
                    <input
                      type="text"
                      value={siteForm.contactPhone}
                      onChange={(e) => setSiteForm({ ...siteForm, contactPhone: e.target.value })}
                      placeholder="+966 50 123 4567"
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">البريد الإلكتروني الرسمي</label>
                    <input
                      type="email"
                      value={siteForm.contactEmail}
                      onChange={(e) => setSiteForm({ ...siteForm, contactEmail: e.target.value })}
                      placeholder="contact@novacoders.io"
                      className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">العنوان والموقع الجغرافي</label>
                  <input
                    type="text"
                    value={siteForm.contactAddressAr}
                    onChange={(e) => setSiteForm({ ...siteForm, contactAddressAr: e.target.value })}
                    placeholder="الرياض - المملكة العربية السعودية"
                    className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* Announcement Bar */}
              <div className="p-5 rounded-2xl bg-[#0c1427] border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="announceCheck"
                    checked={siteForm.announcement.enabled}
                    onChange={(e) => setSiteForm({
                      ...siteForm,
                      announcement: { ...siteForm.announcement, enabled: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded bg-slate-800 border-slate-700"
                  />
                  <label htmlFor="announceCheck" className="text-xs font-bold text-white cursor-pointer">
                    {language === "ar" ? "تفعيل شريط التنبيهات والعروض في أعلى الموقع" : "Enable Top Announcement / Promo Bar"}
                  </label>
                </div>

                {siteForm.announcement.enabled && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={siteForm.announcement.textAr}
                      onChange={(e) => setSiteForm({
                        ...siteForm,
                        announcement: { ...siteForm.announcement, textAr: e.target.value }
                      })}
                      placeholder="نص العرض أو التنبيه..."
                      className="w-full py-2 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{language === "ar" ? "حفظ التعديلات" : "Save Settings"}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: TEAM MEMBERS */}
          {activeTab === "team" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === "ar" ? "إدارة أعضاء الفريق البرمجي" : "Team Members Management"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar" ? "إضافة أعضاء جدد، وتعديل المسميات والتخصصات والصور وروابط التواصل." : "Manage team profiles, roles, and specializations."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingMemberId(null);
                    setMemberForm({
                      nameAr: "",
                      nameEn: "",
                      roleAr: "",
                      roleEn: "",
                      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                      specialization: "",
                      whatsapp: "+966501234567",
                      contributedProjectsCount: 5,
                    });
                    setIsMemberFormOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === "ar" ? "إضافة عضو جديد" : "Add Member"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl bg-[#0c1427] border border-slate-800 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <img src={m.avatar} alt={m.nameAr} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{m.nameAr}</h4>
                          <span className="text-[11px] text-sky-400">{m.roleAr}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{m.specialization}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingMemberId(m.id);
                          setMemberForm({
                            nameAr: m.nameAr,
                            nameEn: m.nameEn,
                            roleAr: m.roleAr,
                            roleEn: m.roleEn,
                            avatar: m.avatar,
                            specialization: m.specialization,
                            whatsapp: m.whatsapp || "",
                            contributedProjectsCount: m.contributedProjectsCount,
                          });
                          setIsMemberFormOpen(true);
                        }}
                        className="text-xs text-sky-400 hover:underline flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => deleteTeamMember(m.id)}
                        className="text-xs text-red-400 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Member Form Modal */}
              {isMemberFormOpen && (
                <div className="p-5 sm:p-6 rounded-3xl bg-[#0c1427] border border-blue-500/50 space-y-5 shadow-2xl animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      <span>{editingMemberId ? (language === "ar" ? "تعديل بيانات وصورة عضو الفريق" : "Edit Team Member Profile & Photo") : (language === "ar" ? "إضافة عضو جديد للفريق البرمجي" : "Add New Team Member")}</span>
                    </h4>
                    <button onClick={() => setIsMemberFormOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Photo Upload & Preview Section */}
                  <div className="p-4 rounded-2xl bg-[#070c18] border border-blue-500/30 space-y-4">
                    <label className="block text-xs font-bold text-sky-400 uppercase tracking-wider">
                      {language === "ar" ? "صورة عضو الفريق (رفع من الجهاز، اختيار نموذج جاهز، أو رابط مباشر):" : "Team Member Photo & Avatar:"}
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Avatar Preview */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-sky-400/50 shadow-lg shadow-blue-500/20 bg-slate-950">
                          {memberForm.avatar ? (
                            <img
                              src={memberForm.avatar}
                              alt="Avatar Preview"
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-2">
                          {language === "ar" ? "معاينة صورة العضو" : "Live Photo Preview"}
                        </span>
                      </div>

                      {/* Upload Controls */}
                      <div className="md:col-span-8 space-y-3">
                        {/* File Upload Zone */}
                        <label className="flex items-center gap-3 p-3.5 border-2 border-dashed border-blue-500/40 hover:border-sky-400 rounded-xl bg-blue-950/20 hover:bg-blue-950/40 cursor-pointer transition-all group">
                          <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shrink-0">
                            <Upload className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-sky-300">
                              {language === "ar" ? "اضغط لاختيار صورة من هاتفك أو جهازك" : "Upload picture from your device / phone"}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {language === "ar" ? "يتم حفظ الصورة فورياً وتحديثها في الموقع" : "Instant base64 conversion & live update"}
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const res = ev.target?.result as string;
                                  if (res) {
                                    setMemberForm((prev) => ({ ...prev, avatar: res }));
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>

                        {/* URL input */}
                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            placeholder={language === "ar" ? "أو ضع رابط صورة مباشر (Image URL)..." : "Or enter direct image URL..."}
                            value={memberForm.avatar}
                            onChange={(e) => setMemberForm({ ...memberForm, avatar: e.target.value })}
                            className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl font-mono focus:border-sky-400 focus:outline-none"
                          />
                          {memberForm.avatar && (
                            <button
                              type="button"
                              onClick={() => setMemberForm({ ...memberForm, avatar: "" })}
                              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                              title="مسح الصورة"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Ready Developer Avatar Presets */}
                        <div>
                          <span className="text-[11px] text-slate-400 block mb-1.5">
                            {language === "ar" ? "أو اختر من صور المطورين الجاهزة بضغطة واحدة:" : "Or pick from ready engineer avatars:"}
                          </span>
                          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                            {[
                              { label: "مطور 1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
                              { label: "مطور 2", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
                              { label: "مطور 3", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
                              { label: "مطور 4", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
                              { label: "مطور 5", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
                              { label: "مطور 6", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" },
                              { label: "مطور 7", url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80" },
                              { label: "مطور 8", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
                            ].map((preset, pidx) => (
                              <button
                                key={pidx}
                                type="button"
                                onClick={() => setMemberForm({ ...memberForm, avatar: preset.url })}
                                className={`w-10 h-10 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                                  memberForm.avatar === preset.url ? "border-sky-400 scale-110 ring-2 ring-sky-400/40" : "border-slate-700 hover:border-slate-500 opacity-80 hover:opacity-100"
                                }`}
                              >
                                <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Text Details Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">الاسم بالعربية *</label>
                      <input
                        type="text"
                        placeholder="مثال: م. فهد الشمري"
                        value={memberForm.nameAr}
                        onChange={(e) => setMemberForm({ ...memberForm, nameAr: e.target.value })}
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">الاسم بالإنجليزية (اختياري)</label>
                      <input
                        type="text"
                        placeholder="e.g. Eng. Fahad Al-Shammari"
                        value={memberForm.nameEn}
                        onChange={(e) => setMemberForm({ ...memberForm, nameEn: e.target.value })}
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">المسمى الوظيفي بالعربية *</label>
                      <input
                        type="text"
                        placeholder="مثال: كبير مهندسي النظم / مهندس تطبيقات"
                        value={memberForm.roleAr}
                        onChange={(e) => setMemberForm({ ...memberForm, roleAr: e.target.value })}
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">المسمى الوظيفي بالإنجليزية</label>
                      <input
                        type="text"
                        placeholder="e.g. Lead Systems Engineer"
                        value={memberForm.roleEn}
                        onChange={(e) => setMemberForm({ ...memberForm, roleEn: e.target.value })}
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">رقم الواتساب للتواصل</label>
                      <input
                        type="text"
                        placeholder="+966501234567"
                        value={memberForm.whatsapp}
                        onChange={(e) => setMemberForm({ ...memberForm, whatsapp: e.target.value })}
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl font-mono focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">عدد المشاريع المنجزة</label>
                      <input
                        type="number"
                        value={memberForm.contributedProjectsCount}
                        onChange={(e) => setMemberForm({ ...memberForm, contributedProjectsCount: Number(e.target.value) || 0 })}
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl font-mono focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">التخصص الدقيق والخبرات البرمجية</label>
                      <textarea
                        placeholder="مثال: خبير في تطوير وتعميم برامج نقاط البيع، إدارة قواعد البيانات السحابية، وربط بوابات الدفع الإلكتروني."
                        rows={2}
                        value={memberForm.specialization}
                        onChange={(e) => setMemberForm({ ...memberForm, specialization: e.target.value })}
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsMemberFormOpen(false)}
                      className="px-4 py-2.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                    >
                      {language === "ar" ? "إلغاء" : "Cancel"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!memberForm.nameAr.trim()) {
                          showToast("تنبيه", "يرجى إدخال اسم عضو الفريق.", "warning");
                          return;
                        }
                        if (editingMemberId) {
                          updateTeamMember(editingMemberId, memberForm);
                        } else {
                          addTeamMember(memberForm);
                        }
                        setIsMemberFormOpen(false);
                      }}
                      className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>{language === "ar" ? "حفظ وتثبيت العضو" : "Save Team Member"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: TESTIMONIALS & CLIENTS */}
          {activeTab === "testimonials" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building className="w-5 h-5 text-teal-400" />
                    <span>{language === "ar" ? "الشركات والجهات التي تعاملت معنا ومراجعاتهم" : "Clients & Customer Feedback"}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar" ? "إضافة وتعديل المؤسسات والشركات والأفراد الذين لديهم من أنظمتنا أو تلقوا خدماتنا البرمجية." : "Manage client partnerships, system users, and authentic feedback."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingTestimonialId(null);
                    setTestimonialForm({
                      clientNameAr: "",
                      clientNameEn: "",
                      companyAr: "",
                      companyEn: "",
                      roleAr: "",
                      roleEn: "",
                      systemUsedAr: "",
                      systemUsedEn: "",
                      sectorAr: "تجاري / خدمات",
                      sectorEn: "Commercial & Services",
                      partnershipTypeAr: "شراء وتمليك نظام",
                      partnershipTypeEn: "System Ownership",
                      feedbackAr: "",
                      feedbackEn: "",
                      rating: 5,
                      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
                      logoUrl: "",
                      location: "الرياض، السعودية",
                    });
                    setIsTestimonialFormOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl flex items-center gap-1.5 shadow-md shadow-teal-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === "ar" ? "إضافة عميل / جهة جديدة" : "Add Client Feedback"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-[#0c1427] border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={t.avatar}
                          alt={t.clientNameAr}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{t.clientNameAr}</h4>
                          <div className="text-[11px] text-teal-400 font-semibold">{t.companyAr}</div>
                          <div className="text-[10px] text-slate-400">{t.roleAr} • {t.location}</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-200 leading-relaxed">
                        <div className="text-[10px] font-bold text-sky-400 mb-1">
                          النظام المستخدم: {t.systemUsedAr}
                        </div>
                        <p className="line-clamp-3">"{t.feedbackAr}"</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handleEditTestimonialClick(t)}
                        className="text-xs text-teal-400 hover:underline flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => deleteTestimonial(t.id)}
                        className="text-xs text-red-400 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Form Modal */}
              {isTestimonialFormOpen && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-teal-500/40 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-teal-400" />
                      <span>{editingTestimonialId ? "تعديل بيانات العميل / الشريك" : "إضافة عميل أو جهة تعاملت معنا"}</span>
                    </h4>
                    <button onClick={() => setIsTestimonialFormOpen(false)} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveTestimonial} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">اسم العميل / المسؤول *</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.clientNameAr}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, clientNameAr: e.target.value })}
                        placeholder="مثال: أ. فهد المري"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">اسم الشركة / المؤسسة *</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.companyAr}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, companyAr: e.target.value })}
                        placeholder="مثال: سلسلة مطاعم الضيافة"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">الصفة أو المنصب</label>
                      <input
                        type="text"
                        value={testimonialForm.roleAr}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, roleAr: e.target.value })}
                        placeholder="مثال: المدير التنفيذي / مالك النشاط"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">النظام أو الخدمة التي حصل عليها *</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.systemUsedAr}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, systemUsedAr: e.target.value })}
                        placeholder="مثال: نظام نقاط البيع السحابي والكاشير"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl text-teal-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">المدينة / الدولة</label>
                      <input
                        type="text"
                        value={testimonialForm.location}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                        placeholder="الرياض، السعودية"
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl"
                      />
                    </div>

                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <label className="block text-xs font-semibold text-teal-300">
                        {language === "ar" ? "صورة العميل أو شعار الشركة (رفع من الجهاز أو رابط):" : "Client Avatar / Company Logo:"}
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                          {testimonialForm.avatar ? (
                            <img src={testimonialForm.avatar} alt="Client" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              <Building className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-teal-500/40 hover:border-teal-400 rounded-xl bg-teal-950/20 hover:bg-teal-950/40 cursor-pointer transition-all text-xs text-teal-300 font-semibold">
                          <Upload className="w-4 h-4" />
                          <span>{language === "ar" ? "رفع صورة من جهازك" : "Upload from device"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const res = ev.target?.result as string;
                                  if (res) {
                                    setTestimonialForm((prev) => ({ ...prev, avatar: res }));
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        <input
                          type="url"
                          value={testimonialForm.avatar}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                          placeholder="أو رابط مباشر..."
                          className="flex-1 w-full py-2 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl font-mono"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">رأي العميل وتجربته مع النظام وفريق العمل *</label>
                      <textarea
                        rows={3}
                        required
                        value={testimonialForm.feedbackAr}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, feedbackAr: e.target.value })}
                        placeholder="اكتب تجربة العميل، مثل: النظام وفر علينا وقتاً كبيراً وسهل إدارة المبيعات والفروع بدقة عالية والدعم الفني متجاوب وسريع..."
                        className="w-full py-2 px-3 text-xs text-white bg-slate-950 border border-slate-700 rounded-xl leading-relaxed"
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsTestimonialFormOpen(false)}
                        className="px-4 py-2 text-xs text-slate-300 bg-slate-800 rounded-xl"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-lg shadow-teal-600/30"
                      >
                        {editingTestimonialId ? "حفظ التعديلات" : "إضافة العميل"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: INQUIRIES INBOX */}
          {activeTab === "inbox" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Inbox className="w-5 h-5 text-sky-400" />
                    <span>{language === "ar" ? "طلبات الزوار ورسائل العملاء" : "Client Inquiries Inbox"}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar" ? "الطلبات الواردة من نموذج 'اطلب مشروعاً' مع إمكانية التواصل المباشر بالواتساب." : "Incoming project briefs with one-tap direct WhatsApp reply."}
                  </p>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs bg-slate-900/40 rounded-2xl border border-slate-800">
                  لا توجد طلبات جديدة حالياً.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-2xl bg-[#0c1427] border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-sky-400 font-bold flex items-center justify-center text-xs">
                            {inq.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{inq.name}</div>
                            <div className="text-[11px] text-slate-400">{inq.company} • {inq.email}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            className="py-1 px-2 text-[11px] font-bold rounded-lg bg-slate-900 border border-slate-700 text-sky-300 focus:outline-none"
                          >
                            <option value="new">جديد (New)</option>
                            <option value="contacted">تم التواصل (Contacted)</option>
                            <option value="in_progress">قيد التنفيذ (In Progress)</option>
                            <option value="archived">مؤرشف (Archived)</option>
                          </select>

                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(`أهلاً بك أخي ${inq.name}، معك فريق نوفا كودرز البرمجي بخصوص طلبكم لمنظومة: ${inq.projectType}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-1 shadow"
                          >
                            <Phone className="w-3 h-3" />
                            <span>واتساب</span>
                          </a>

                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1 text-slate-500 hover:text-red-400"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-200 leading-relaxed">
                        <div className="font-semibold text-sky-300 mb-1 flex items-center gap-2">
                          <span>المنظومة: {inq.projectType}</span>
                          <span>•</span>
                          <span>الميزانية: {inq.budget}</span>
                        </div>
                        {inq.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: GEMINI AI GENERATOR */}
          {activeTab === "aiGenerator" && (
            <div className="p-5 rounded-2xl bg-[#0c1427] border border-blue-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {language === "ar" ? "المساعد الذكي لبناء مواصفات المشاريع (Gemini AI)" : "AI Project Specification Generator"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar" ? "اكتب فكرة سريعة عن البرنامج أو التطبيق وسيقوم الذكاء الاصطناعي بتوليد كافة تفاصيله تلقائياً." : "Type a short concept and Gemini will auto-generate specifications, tags, and descriptions."}
                  </p>
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="مثال: تطبيق توصيل طلبات مطاعم مع كاشير للمطعم وتتبع سائقين مباشر..."
                  className="w-full py-2.5 px-3 text-xs text-white bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="button"
                disabled={isGeneratingAi || !aiPrompt.trim()}
                onClick={handleGenerateAi}
                className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                {isGeneratingAi ? (
                  <span>جاري التوليد بالذكاء الاصطناعي...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>توليد ونقل البيانات إلى نموذج المشروع فوراً</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
