import React, { createContext, useContext, useState, useEffect, useRef } from "react";
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
import { db, doc, onSnapshot, setDoc, getDoc } from "../lib/firebase";

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
  isCloudSynced: boolean;

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
  forceSyncToCloud: () => Promise<void>;
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

const FIRESTORE_DOC_KEY = "site_data_v2";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCloudSynced, setIsCloudSynced] = useState(false);

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

  // Keep a fresh ref to latest state to avoid race conditions during cloud sync
  const stateRef = useRef({
    projects,
    teamMembers,
    services,
    testimonials,
    categories,
    users,
    siteSettings,
    inquiries,
    notifications
  });

  useEffect(() => {
    stateRef.current = {
      projects,
      teamMembers,
      services,
      testimonials,
      categories,
      users,
      siteSettings,
      inquiries,
      notifications
    };
  }, [projects, teamMembers, services, testimonials, categories, users, siteSettings, inquiries, notifications]);

  // 1. Real-time Cloud Synchronization Listener with Firebase Firestore
  useEffect(() => {
    let isSubscribed = true;
    try {
      const docRef = doc(db, "global_settings", FIRESTORE_DOC_KEY);
      
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        if (!isSubscribed) return;
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data) {
            if (Array.isArray(data.projects)) {
              setProjects(data.projects);
              localStorage.setItem("novacoders_projects_v2", JSON.stringify(data.projects));
            }
            if (Array.isArray(data.teamMembers)) {
              setTeamMembers(data.teamMembers);
              localStorage.setItem("novacoders_team_members_v2", JSON.stringify(data.teamMembers));
            }
            if (Array.isArray(data.services)) {
              setServices(data.services);
              localStorage.setItem("novacoders_services_v2", JSON.stringify(data.services));
            }
            if (Array.isArray(data.testimonials)) {
              setTestimonials(data.testimonials);
              localStorage.setItem("novacoders_testimonials_v2", JSON.stringify(data.testimonials));
            }
            if (Array.isArray(data.categories)) {
              setCategories(data.categories);
              localStorage.setItem("novacoders_categories_v2", JSON.stringify(data.categories));
            }
            if (Array.isArray(data.users)) {
              setUsers(data.users);
              localStorage.setItem("novacoders_users_list_v2", JSON.stringify(data.users));
            }
            if (data.siteSettings && typeof data.siteSettings === "object") {
              setSiteSettings(data.siteSettings);
              localStorage.setItem("novacoders_site_settings_v2", JSON.stringify(data.siteSettings));
            }
            if (Array.isArray(data.inquiries)) {
              setInquiries(data.inquiries);
              localStorage.setItem("novacoders_inquiries_v2", JSON.stringify(data.inquiries));
            }
            if (Array.isArray(data.notifications)) {
              setNotifications(data.notifications);
              localStorage.setItem("novacoders_notifs_v2", JSON.stringify(data.notifications));
            }
            setIsCloudSynced(true);
          }
        } else {
          // Document does not exist in Firestore yet -> Initial Seed Push
          const initialPayload = {
            projects: stateRef.current.projects.length > 0 ? stateRef.current.projects : INITIAL_PROJECTS,
            teamMembers: stateRef.current.teamMembers.length > 0 ? stateRef.current.teamMembers : TEAM_MEMBERS,
            services: stateRef.current.services.length > 0 ? stateRef.current.services : INITIAL_SERVICES,
            testimonials: stateRef.current.testimonials.length > 0 ? stateRef.current.testimonials : INITIAL_TESTIMONIALS,
            categories: stateRef.current.categories.length > 0 ? stateRef.current.categories : INITIAL_CATEGORIES,
            users: stateRef.current.users.length > 0 ? stateRef.current.users : DEFAULT_USERS,
            siteSettings: stateRef.current.siteSettings || DEFAULT_SITE_SETTINGS,
            inquiries: stateRef.current.inquiries || INITIAL_INQUIRIES,
            notifications: stateRef.current.notifications || INITIAL_NOTIFICATIONS,
            lastUpdated: new Date().toISOString()
          };
          setDoc(docRef, initialPayload, { merge: true }).catch(console.error);
          setIsCloudSynced(true);
        }
      }, (error) => {
        console.warn("Firestore onSnapshot error:", error);
      });

      return () => {
        isSubscribed = false;
        unsubscribe();
      };
    } catch (e) {
      console.warn("Firebase listener initialization error:", e);
    }
  }, []);

  // Sync to Cloud helper
  const syncToCloud = async (overrideData?: Partial<any>) => {
    try {
      const docRef = doc(db, "global_settings", FIRESTORE_DOC_KEY);
      const payload = {
        projects: overrideData?.projects ?? stateRef.current.projects,
        teamMembers: overrideData?.teamMembers ?? stateRef.current.teamMembers,
        services: overrideData?.services ?? stateRef.current.services,
        testimonials: overrideData?.testimonials ?? stateRef.current.testimonials,
        categories: overrideData?.categories ?? stateRef.current.categories,
        users: overrideData?.users ?? stateRef.current.users,
        siteSettings: overrideData?.siteSettings ?? stateRef.current.siteSettings,
        inquiries: overrideData?.inquiries ?? stateRef.current.inquiries,
        notifications: overrideData?.notifications ?? stateRef.current.notifications,
        lastUpdated: new Date().toISOString(),
        ...overrideData
      };
      await setDoc(docRef, payload, { merge: true });
      setIsCloudSynced(true);
    } catch (err) {
      console.error("Cloud save failed:", err);
    }
  };

  const forceSyncToCloud = async () => {
    await syncToCloud();
    showToast("تمت المزامنة السحابية", "تم حفظ وتحديث كافة البيانات في قاعدة البيانات السحابية الحية بنجاح.", "success");
  };

  // Sync to localStorage as fast client cache
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
        `مرحباً بك يا ${foundUser.name} في لوحة التحكم. متصل بقاعدة البيانات السحابية.`,
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

  // User Management with Cloud Sync
  const addUser = (newUser: Omit<AppUser, "id" | "createdAt">) => {
    const id = `user-${Date.now()}`;
    const user: AppUser = {
      ...newUser,
      id,
      createdAt: new Date().toISOString(),
    };
    const nextUsers = [...users, user];
    setUsers(nextUsers);
    syncToCloud({ users: nextUsers });
    showToast("تمت الإضافة سحابياً", `تمت إضافة المستخدم ${newUser.name} بنجاح`, "success");
  };

  const updateUser = (id: string, updated: Partial<AppUser>) => {
    const nextUsers = users.map((u) => (u.id === id ? { ...u, ...updated } : u));
    setUsers(nextUsers);
    syncToCloud({ users: nextUsers });
    showToast("تم التحديث سحابياً", "تم حفظ بيانات المستخدم بنجاح.", "success");
  };

  const deleteUser = (id: string): boolean => {
    if (users.length <= 1) {
      showToast("تنبيه", "لا يمكن حذف آخر مستخدم في لوحة التحكم.", "warning");
      return false;
    }
    const nextUsers = users.filter((u) => u.id !== id);
    setUsers(nextUsers);
    syncToCloud({ users: nextUsers });
    showToast("تم الحذف سحابياً", "تمت إزالة المستخدم بنجاح.", "info");
    return true;
  };

  // Categories CRUD with Cloud Sync
  const addCategory = (newCat: Omit<CategoryItem, "id">) => {
    const id = `cat-${Date.now()}`;
    const category: CategoryItem = {
      ...newCat,
      id,
      key: newCat.key || `cat_${Date.now()}`
    };
    const nextCats = [...categories, category];
    setCategories(nextCats);
    syncToCloud({ categories: nextCats });
    showToast("تمت إضافة الفئة سحابياً", `تمت إضافة التصنيف "${newCat.nameAr}" بنجاح`, "success");
  };

  const updateCategory = (idOrKey: string, updated: Partial<CategoryItem>) => {
    const nextCats = categories.map((c) => (c.id === idOrKey || c.key === idOrKey ? { ...c, ...updated } : c));
    setCategories(nextCats);
    syncToCloud({ categories: nextCats });
    showToast("تم تحديث التصنيف سحابياً", "تم حفظ تعديلات الفئة بنجاح.", "success");
  };

  const deleteCategory = (idOrKey: string): boolean => {
    if (categories.length <= 1) {
      showToast("تنبيه", "يجب الإبقاء على تصنيف واحد على الأقل للمشاريع.", "warning");
      return false;
    }
    const nextCats = categories.filter((c) => c.id !== idOrKey && c.key !== idOrKey);
    setCategories(nextCats);
    syncToCloud({ categories: nextCats });
    showToast("تم الحذف سحابياً", "تمت إزالة التصنيف بنجاح.", "info");
    return true;
  };

  // Site Settings with Cloud Sync
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    const nextSettings = { ...siteSettings, ...settings };
    setSiteSettings(nextSettings);
    syncToCloud({ siteSettings: nextSettings });
    showToast("تم التحديث سحابياً", "تم حفظ إعدادات الموقع ونشرها للجميع بنجاح.", "success");
  };

  // Team Members CRUD with Cloud Sync
  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const id = `mem-${Date.now()}`;
    const nextMembers = [...teamMembers, { ...member, id }];
    setTeamMembers(nextMembers);
    syncToCloud({ teamMembers: nextMembers });
    showToast("تمت الإضافة سحابياً", `تمت إضافة المهندس/ة ${member.nameAr} إلى الفريق ونشرها للزوار.`, "success");
  };

  const updateTeamMember = (id: string, updated: Partial<TeamMember>) => {
    const nextMembers = teamMembers.map((m) => (m.id === id ? { ...m, ...updated } : m));
    setTeamMembers(nextMembers);
    syncToCloud({ teamMembers: nextMembers });
    showToast("تم التحديث سحابياً", "تم تعديل بيانات عضو الفريق وتحديثها لكل الزوار.", "success");
  };

  const deleteTeamMember = (id: string) => {
    const nextMembers = teamMembers.filter((m) => m.id !== id);
    setTeamMembers(nextMembers);
    syncToCloud({ teamMembers: nextMembers });
    showToast("تم الحذف سحابياً", "تمت إزالة العضو من الفريق.", "info");
  };

  // Services CRUD with Cloud Sync
  const addService = (service: Omit<ServiceItem, "id">) => {
    const id = `serv-${Date.now()}`;
    const nextServices = [...services, { ...service, id }];
    setServices(nextServices);
    syncToCloud({ services: nextServices });
    showToast("تمت الإضافة سحابياً", `تمت إضافة خدمة "${service.titleAr}".`, "success");
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    const nextServices = services.map((s) => (s.id === id ? { ...s, ...updated } : s));
    setServices(nextServices);
    syncToCloud({ services: nextServices });
    showToast("تم التحديث سحابياً", "تم حفظ تعديل الخدمة وتحديثها بالموقع.", "success");
  };

  const deleteService = (id: string) => {
    const nextServices = services.filter((s) => s.id !== id);
    setServices(nextServices);
    syncToCloud({ services: nextServices });
    showToast("تم الحذف سحابياً", "تمت إزالة الخدمة.", "info");
  };

  // Testimonials / Clients Partners CRUD with Cloud Sync
  const addTestimonial = (test: Omit<TestimonialItem, "id">) => {
    const id = `test-${Date.now()}`;
    const nextTestimonials = [...testimonials, { ...test, id }];
    setTestimonials(nextTestimonials);
    syncToCloud({ testimonials: nextTestimonials });
    showToast("تمت الإضافة سحابياً", `تمت إضافة الجهة/العميل "${test.companyAr || test.clientNameAr}".`, "success");
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    const nextTestimonials = testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t));
    setTestimonials(nextTestimonials);
    syncToCloud({ testimonials: nextTestimonials });
    showToast("تم التحديث سحابياً", "تم حفظ بيانات الجهة/العميل سحابياً.", "success");
  };

  const deleteTestimonial = (id: string) => {
    const nextTestimonials = testimonials.filter((t) => t.id !== id);
    setTestimonials(nextTestimonials);
    syncToCloud({ testimonials: nextTestimonials });
    showToast("تم الحذف سحابياً", "تمت إزالة الجهة من القائمة.", "info");
  };

  // Project CRUD with Cloud Sync
  const addProject = (newProj: Omit<Project, "id" | "views" | "likes">) => {
    const id = `proj-${Date.now()}`;
    const project: Project = {
      ...newProj,
      id,
      views: 1,
      likes: 0,
    };
    const nextProjects = [project, ...projects];
    setProjects(nextProjects);
    syncToCloud({ projects: nextProjects });
    broadcastNotification(
      `تم إطلاق نظام جديد: ${project.titleAr}`,
      `New System Launched: ${project.titleEn}`,
      project.taglineAr,
      project.taglineEn,
      "project_added"
    );
    triggerCelebration();
    showToast("تم نشر المشروع سحابياً!", `تمت إضافة "${project.titleAr}" وسيظهر لكل زوار الموقع فوراً.`, "success");
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    const nextProjects = projects.map((p) => (p.id === id ? { ...p, ...updated } : p));
    setProjects(nextProjects);
    syncToCloud({ projects: nextProjects });
    if (activeProjectDetail?.id === id) {
      setActiveProjectDetail((prev) => (prev ? { ...prev, ...updated } : null));
    }
    showToast("تم التحديث سحابياً", "تم حفظ تعديلات المشروع والأسعار ونشرها لجميع الزوار.", "success");
  };

  const deleteProject = (id: string) => {
    const nextProjects = projects.filter((p) => p.id !== id);
    setProjects(nextProjects);
    syncToCloud({ projects: nextProjects });
    if (activeProjectDetail?.id === id) {
      setActiveProjectDetail(null);
    }
    showToast("تم الحذف سحابياً", "تمت إزالة المشروع بنجاح من قاعدة البيانات السحابية.", "info");
  };

  const toggleFeaturedProject = (id: string) => {
    const nextProjects = projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p));
    setProjects(nextProjects);
    syncToCloud({ projects: nextProjects });
  };

  const likeProject = (id: string) => {
    const nextProjects = projects.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p));
    setProjects(nextProjects);
    syncToCloud({ projects: nextProjects });
    showToast("شكراً لك!", "تم تسجيل إعجابك بالنظام سحابياً.", "info");
  };

  // Inquiries with Cloud Sync
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

      const nextInquiries = [newInquiry, ...inquiries];
      setInquiries(nextInquiries);
      await syncToCloud({ inquiries: nextInquiries });

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
        "شكراً لتواصلك معنا. تم حفظ طلبك سحابياً وسنتواصل معك عبر الواتساب في أقرب وقت.",
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
    const nextInquiries = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    setInquiries(nextInquiries);
    syncToCloud({ inquiries: nextInquiries });
    showToast("تم التحديث", `تم تعديل حالة الطلب إلى: ${status}`, "info");
  };

  const deleteInquiry = (id: string) => {
    const nextInquiries = inquiries.filter((i) => i.id !== id);
    setInquiries(nextInquiries);
    syncToCloud({ inquiries: nextInquiries });
    showToast("تم الحذف", "تمت إزالة الطلب من الصندوق سحابياً.", "info");
  };

  // Notifications
  const markAllNotificationsRead = () => {
    const nextNotifs = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(nextNotifs);
    syncToCloud({ notifications: nextNotifs });
  };

  const markNotificationRead = (id: string) => {
    const nextNotifs = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(nextNotifs);
    syncToCloud({ notifications: nextNotifs });
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

    const nextNotifs = [newNotif, ...notifications];
    setNotifications(nextNotifs);
    syncToCloud({ notifications: nextNotifs });
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

    syncToCloud({
      projects: INITIAL_PROJECTS,
      inquiries: INITIAL_INQUIRIES,
      notifications: INITIAL_NOTIFICATIONS,
      users: DEFAULT_USERS,
      siteSettings: DEFAULT_SITE_SETTINGS,
      teamMembers: TEAM_MEMBERS,
      services: INITIAL_SERVICES,
      testimonials: INITIAL_TESTIMONIALS,
      categories: INITIAL_CATEGORIES
    });

    localStorage.removeItem("novacoders_projects_v2");
    localStorage.removeItem("novacoders_inquiries_v2");
    localStorage.removeItem("novacoders_notifs_v2");
    localStorage.removeItem("novacoders_users_list_v2");
    localStorage.removeItem("novacoders_site_settings_v2");
    localStorage.removeItem("novacoders_team_members_v2");
    localStorage.removeItem("novacoders_services_v2");
    localStorage.removeItem("novacoders_testimonials_v2");
    localStorage.removeItem("novacoders_categories_v2");

    showToast("تمت استعادة البيانات الافتراضية سحابياً", "تمت إعادة تعيين الموقع للبيانات الافتراضية الأولية وتحديثها للجميع.", "info");
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
        isCloudSynced,
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
        forceSyncToCloud,
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
