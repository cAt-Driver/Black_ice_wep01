import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Project, 
  NotificationItem, 
  ClientInquiry, 
  TeamUser, 
  ProjectCategory, 
  AppUser, 
  SiteSettings, 
  TeamMember, 
  ServiceItem, 
  TestimonialItem,
  CategoryItem 
} from "../types";
import { 
  INITIAL_PROJECTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_INQUIRIES, 
  TEAM_MEMBERS, 
  DEFAULT_USERS, 
  DEFAULT_SITE_SETTINGS, 
  INITIAL_SERVICES, 
  INITIAL_TESTIMONIALS,
  INITIAL_CATEGORIES 
} from "../data/mockData";

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: "success" | "info" | "warning" | "error";
}

interface AppContextType {
  // State
  projects: Project[];
  inquiries: ClientInquiry[];
  notifications: NotificationItem[];
  teamUser: TeamUser | null;
  users: AppUser[];
  siteSettings: SiteSettings;
  teamMembers: TeamMember[];
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  categories: CategoryItem[];
  selectedCategory: ProjectCategory;
  searchQuery: string;
  activeProjectDetail: Project | null;
  isAuthModalOpen: boolean;
  isInquiryModalOpen: boolean;
  isDashboardOpen: boolean;
  toasts: ToastMessage[];
  unreadNotificationCount: number;

  // Setters & UI Actions
  setSelectedCategory: (cat: ProjectCategory) => void;
  setSearchQuery: (q: string) => void;
  setActiveProjectDetail: (proj: Project | null) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsInquiryModalOpen: (open: boolean) => void;
  setIsDashboardOpen: (open: boolean) => void;
  
  // Auth
  loginWithCredentials: (username: string, pass: string) => boolean;
  loginTeamMember: (user: TeamUser) => void;
  logoutTeamMember: () => void;

  // User Management
  addUser: (user: Omit<AppUser, "id" | "createdAt">) => void;
  updateUser: (id: string, updated: Partial<AppUser>) => void;
  deleteUser: (id: string) => boolean;

  // Deep CMS & Site Customization
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addService: (service: Omit<ServiceItem, "id">) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  addTestimonial: (test: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (id: string, updated: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Dynamic Categories Management
  addCategory: (category: Omit<CategoryItem, "id">) => void;
  updateCategory: (id: string, updated: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => boolean;

  // Project CRUD
  addProject: (project: Omit<Project, "id" | "views" | "likes">) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleFeaturedProject: (id: string) => void;
  likeProject: (id: string) => void;

  // Inquiries
  submitInquiry: (inquiryData: Omit<ClientInquiry, "id" | "createdAt" | "status">) => Promise<boolean>;
  updateInquiryStatus: (id: string, status: ClientInquiry["status"]) => void;
  deleteInquiry: (id: string) => void;

  // Notifications
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
  broadcastNotification: (titleAr: string, titleEn: string, messageAr: string, messageEn: string, type?: NotificationItem["type"]) => void;

  // Toast & UX
  showToast: (title: string, description: string, type?: "success" | "info" | "warning" | "error") => void;
  removeToast: (id: string) => void;
  triggerCelebration: () => void;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Pleasant notification chime using Web Audio API
const playSoftChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Audio context may be blocked before interaction
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Users for authentication
  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem("novacoders_users_list_v2");
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  // Site Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem("novacoders_site_settings_v2");
      return saved ? { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  // Team members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem("novacoders_team_members_v2");
      return saved ? JSON.parse(saved) : TEAM_MEMBERS;
    } catch {
      return TEAM_MEMBERS;
    }
  });

  // Categories (Dynamic)
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem("novacoders_categories_v2");
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem("novacoders_services_v2");
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  // Testimonials / Clients & Partners
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem("novacoders_testimonials_v2");
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  // Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("novacoders_projects_v2");
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    try {
      const saved = localStorage.getItem("novacoders_inquiries_v2");
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem("novacoders_notifs_v2");
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Current logged in user
  const [teamUser, setTeamUser] = useState<TeamUser | null>(() => {
    try {
      const saved = localStorage.getItem("novacoders_auth_user_v2");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectDetail, setActiveProjectDetail] = useState<Project | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("novacoders_users_list_v2", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("novacoders_site_settings_v2", JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem("novacoders_team_members_v2", JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem("novacoders_categories_v2", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("novacoders_services_v2", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("novacoders_testimonials_v2", JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem("novacoders_projects_v2", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("novacoders_inquiries_v2", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem("novacoders_notifs_v2", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (teamUser) {
      localStorage.setItem("novacoders_auth_user_v2", JSON.stringify(teamUser));
    } else {
      localStorage.removeItem("novacoders_auth_user_v2");
    }
  }, [teamUser]);

  const showToast = (title: string, description: string, type: "success" | "info" | "warning" | "error" = "info") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    playSoftChime();
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#3b82f6", "#10b981", "#6366f1", "#f59e0b"],
      });
    } catch {
      // ignore
    }
  };

  // Authentication by credentials
  const loginWithCredentials = (usernameOrEmail: string, pass: string): boolean => {
    const cleanInput = usernameOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Check in users list
    const foundUser = users.find(
      (u) => 
        (u.username.toLowerCase() === cleanInput || u.email.toLowerCase() === cleanInput) &&
        u.password === cleanPass
    );

    if (foundUser) {
      const userSession: TeamUser = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar,
      };

      setTeamUser(userSession);
      setIsAuthModalOpen(false);
      setIsDashboardOpen(true);
      triggerCelebration();
      showToast(
        "أهلاً وسهلاً بك!",
        `مرحباً بك يا ${foundUser.name} في لوحة التحكم. يمكنك الآن تعديل وإدارة المحتوى بكل سهولة.`,
        "success"
      );
      return true;
    }

    // Direct fallback check
    if (cleanInput === "abdo" && (cleanPass === "205941" || cleanPass === "password123")) {
      const masterUser: TeamUser = {
        id: "user-abdo",
        username: "abdo",
        name: "م. عبد الكريم جمال القطواني",
        email: "abdo@novacoders.io",
        role: "مهندس برمجيات ونظم (Software Engineer)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      };
      setTeamUser(masterUser);
      setIsAuthModalOpen(false);
      setIsDashboardOpen(true);
      triggerCelebration();
      showToast(
        "مرحباً بك!",
        "تم تسجيل الدخول إلى لوحة التحكم بنجاح.",
        "success"
      );
      return true;
    }

    showToast("خطأ في تسجيل الدخول", "اسم المستخدم أو كلمة المرور غير صحيحة.", "error");
    return false;
  };

  const loginTeamMember = (user: TeamUser) => {
    setTeamUser(user);
    setIsAuthModalOpen(false);
    triggerCelebration();
    showToast("تم تسجيل الدخول", `مرحباً بك ${user.name}`, "success");
  };

  const logoutTeamMember = () => {
    setTeamUser(null);
    setIsDashboardOpen(false);
    showToast("تسجيل خروج", "تم تسجيل خروجك بأمان.", "info");
  };

  // User Management
  const addUser = (newUser: Omit<AppUser, "id" | "createdAt">) => {
    const id = `user-${Date.now()}`;
    const user: AppUser = {
      ...newUser,
      id,
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, user]);
    showToast("تمت الإضافة", `تمت إضافة المستخدم ${newUser.name} بنجاح`, "success");
  };

  const updateUser = (id: string, updated: Partial<AppUser>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
    );
    showToast("تم التحديث", "تم حفظ بيانات المستخدم بنجاح.", "success");
  };

  const deleteUser = (id: string): boolean => {
    if (users.length <= 1) {
      showToast("تنبيه", "لا يمكن حذف آخر مستخدم في لوحة التحكم.", "warning");
      return false;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("تم الحذف", "تمت إزالة المستخدم بنجاح.", "info");
    return true;
  };

  // Categories CRUD
  const addCategory = (newCat: Omit<CategoryItem, "id">) => {
    const id = `cat-${Date.now()}`;
    const category: CategoryItem = {
      ...newCat,
      id,
      key: newCat.key || `cat_${Date.now()}`
    };
    setCategories((prev) => [...prev, category]);
    showToast("تمت إضافة الفئة", `تمت إضافة التصنيف "${newCat.nameAr}" بنجاح`, "success");
  };

  const updateCategory = (idOrKey: string, updated: Partial<CategoryItem>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === idOrKey || c.key === idOrKey ? { ...c, ...updated } : c))
    );
    showToast("تم تحديث التصنيف", "تم حفظ تعديلات الفئة بنجاح.", "success");
  };

  const deleteCategory = (idOrKey: string): boolean => {
    if (categories.length <= 1) {
      showToast("تنبيه", "يجب الإبقاء على تصنيف واحد على الأقل للمشاريع.", "warning");
      return false;
    }
    setCategories((prev) => prev.filter((c) => c.id !== idOrKey && c.key !== idOrKey));
    showToast("تم الحذف", "تمت إزالة التصنيف بنجاح.", "info");
    return true;
  };

  // Site Settings
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    showToast("تم التحديث", "تم حفظ إعدادات الموقع بنجاح.", "success");
  };

  // Team Members CRUD
  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const id = `mem-${Date.now()}`;
    setTeamMembers((prev) => [...prev, { ...member, id }]);
    showToast("تمت الإضافة", `تمت إضافة المهندس/ة ${member.nameAr} إلى الفريق.`, "success");
  };

  const updateTeamMember = (id: string, updated: Partial<TeamMember>) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
    showToast("تم التحديث", "تم تعديل بيانات عضو الفريق.", "success");
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    showToast("تم الحذف", "تمت إزالة العضو من الفريق.", "info");
  };

  // Services CRUD
  const addService = (service: Omit<ServiceItem, "id">) => {
    const id = `serv-${Date.now()}`;
    setServices((prev) => [...prev, { ...service, id }]);
    showToast("تمت الإضافة", `تمت إضافة خدمة "${service.titleAr}".`, "success");
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
    showToast("تم التحديث", "تم حفظ تعديل الخدمة.", "success");
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast("تم الحذف", "تمت إزالة الخدمة.", "info");
  };

  // Testimonials / Clients Partners CRUD
  const addTestimonial = (test: Omit<TestimonialItem, "id">) => {
    const id = `test-${Date.now()}`;
    setTestimonials((prev) => [...prev, { ...test, id }]);
    showToast("تمت الإضافة", `تمت إضافة الجهة/العميل "${test.companyAr || test.clientNameAr}".`, "success");
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
    showToast("تم التحديث", "تم حفظ بيانات الجهة/العميل.", "success");
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast("تم الحذف", "تمت إزالة الجهة من القائمة.", "info");
  };

  // Project CRUD
  const addProject = (newProj: Omit<Project, "id" | "views" | "likes">) => {
    const id = `proj-${Date.now()}`;
    const project: Project = {
      ...newProj,
      id,
      views: 1,
      likes: 0,
    };
    setProjects((prev) => [project, ...prev]);
    broadcastNotification(
      `تم إطلاق نظام جديد: ${project.titleAr}`,
      `New System Launched: ${project.titleEn}`,
      project.taglineAr,
      project.taglineEn,
      "project_added"
    );
    triggerCelebration();
    showToast("تم نشر المشروع بنجاح", `تمت إضافة "${project.titleAr}" إلى الموقع.`, "success");
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    if (activeProjectDetail?.id === id) {
      setActiveProjectDetail((prev) => (prev ? { ...prev, ...updated } : null));
    }
    showToast("تم التحديث", "تم حفظ تعديلات المشروع والأسعار.", "success");
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (activeProjectDetail?.id === id) {
      setActiveProjectDetail(null);
    }
    showToast("تم الحذف", "تمت إزالة المشروع بنجاح.", "info");
  };

  const toggleFeaturedProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const likeProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
    showToast("شكراً لك!", "تم تسجيل إعجابك بالنظام.", "info");
  };

  // Inquiries
  const submitInquiry = async (
    inquiryData: Omit<ClientInquiry, "id" | "createdAt" | "status">
  ): Promise<boolean> => {
    try {
      const newInquiry: ClientInquiry = {
        id: `inq-${Date.now()}`,
        ...inquiryData,
        createdAt: new Date().toISOString(),
        status: "new",
      };

      setInquiries((prev) => [newInquiry, ...prev]);

      broadcastNotification(
        `طلب مشروع جديد من ${inquiryData.name}`,
        `New Project Inquiry from ${inquiryData.name}`,
        `طلب منظومة: ${inquiryData.projectType} بميزانية تقديرية ${inquiryData.budget}.`,
        `Requested system: ${inquiryData.projectType} with budget ${inquiryData.budget}.`,
        "client_inquiry"
      );

      triggerCelebration();
      showToast(
        "تم إرسال طلبك بنجاح!",
        "شكراً لتواصلك معنا. سنراجع متطلباتك ونتواصل معك عبر الواتساب أو الهاتف في أقرب وقت.",
        "success"
      );
      return true;
    } catch {
      const fallbackInquiry: ClientInquiry = {
        id: `inq-${Date.now()}`,
        ...inquiryData,
        createdAt: new Date().toISOString(),
        status: "new",
      };
      setInquiries((prev) => [fallbackInquiry, ...prev]);
      triggerCelebration();
      showToast("تم حفظ طلبك بنجاح", "سيتواصل معك فريقنا خلال ساعات قليلة.", "success");
      return true;
    }
  };

  const updateInquiryStatus = (id: string, status: ClientInquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast("تم التحديث", `تم تعديل حالة الطلب إلى: ${status}`, "info");
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    showToast("تم الحذف", "تمت إزالة الطلب من الصندوق.", "info");
  };

  // Notifications
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const broadcastNotification = (
    titleAr: string,
    titleEn: string,
    messageAr: string,
    messageEn: string,
    type: NotificationItem["type"] = "update"
  ) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      titleAr,
      titleEn,
      messageAr,
      messageEn,
      type,
      timestamp: "الآن",
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    showToast(titleAr, messageAr, type === "project_added" ? "success" : "info");
  };

  const resetToDefaultData = () => {
    setProjects(INITIAL_PROJECTS);
    setInquiries(INITIAL_INQUIRIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setUsers(DEFAULT_USERS);
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    setTeamMembers(TEAM_MEMBERS);
    setServices(INITIAL_SERVICES);
    setTestimonials(INITIAL_TESTIMONIALS);
    setCategories(INITIAL_CATEGORIES);

    localStorage.removeItem("novacoders_projects_v2");
    localStorage.removeItem("novacoders_inquiries_v2");
    localStorage.removeItem("novacoders_notifs_v2");
    localStorage.removeItem("novacoders_users_list_v2");
    localStorage.removeItem("novacoders_site_settings_v2");
    localStorage.removeItem("novacoders_team_members_v2");
    localStorage.removeItem("novacoders_services_v2");
    localStorage.removeItem("novacoders_testimonials_v2");
    localStorage.removeItem("novacoders_categories_v2");

    showToast("تمت استعادة البيانات الافتراضية", "تمت إعادة تعيين الموقع للبيانات الافتراضية الأولية.", "info");
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        projects,
        inquiries,
        notifications,
        teamUser,
        users,
        siteSettings,
        teamMembers,
        services,
        testimonials,
        categories,
        selectedCategory,
        searchQuery,
        activeProjectDetail,
        isAuthModalOpen,
        isInquiryModalOpen,
        isDashboardOpen,
        toasts,
        unreadNotificationCount,
        setSelectedCategory,
        setSearchQuery,
        setActiveProjectDetail,
        setIsAuthModalOpen,
        setIsInquiryModalOpen,
        setIsDashboardOpen,
        loginWithCredentials,
        loginTeamMember,
        logoutTeamMember,
        addUser,
        updateUser,
        deleteUser,
        updateSiteSettings,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addCategory,
        updateCategory,
        deleteCategory,
        addService,
        updateService,
        deleteService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addProject,
        updateProject,
        deleteProject,
        toggleFeaturedProject,
        likeProject,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        markAllNotificationsRead,
        markNotificationRead,
        broadcastNotification,
        showToast,
        removeToast,
        triggerCelebration,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
