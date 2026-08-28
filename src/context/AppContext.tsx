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
import { 
  db, 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  deleteDoc, 
  getDocs 
} from "../lib/firebase";

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
  addUser: (user: Omit<AppUser, "id" | "createdAt">) => Promise<void>;
  updateUser: (id: string, updated: Partial<AppUser>) => Promise<void>;
  deleteUser: (id: string) => Promise<boolean>;

  // Deep CMS & Site Customization
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  addTeamMember: (member: Omit<TeamMember, "id">) => Promise<void>;
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  addService: (service: Omit<ServiceItem, "id">) => Promise<void>;
  updateService: (id: string, updated: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addTestimonial: (test: Omit<TestimonialItem, "id">) => Promise<void>;
  updateTestimonial: (id: string, updated: Partial<TestimonialItem>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Dynamic Categories Management
  addCategory: (category: Omit<CategoryItem, "id">) => Promise<void>;
  updateCategory: (id: string, updated: Partial<CategoryItem>) => Promise<void>;
  deleteCategory: (id: string) => Promise<boolean>;

  // Project CRUD
  addProject: (project: Omit<Project, "id" | "views" | "likes">) => Promise<void>;
  updateProject: (id: string, updated: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  toggleFeaturedProject: (id: string) => Promise<void>;
  likeProject: (id: string) => Promise<void>;

  // Inquiries
  submitInquiry: (inquiryData: Omit<ClientInquiry, "id" | "createdAt" | "status">) => Promise<boolean>;
  updateInquiryStatus: (id: string, status: ClientInquiry["status"]) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;

  // Notifications
  markAllNotificationsRead: () => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  broadcastNotification: (titleAr: string, titleEn: string, messageAr: string, messageEn: string, type?: NotificationItem["type"]) => Promise<void>;

  // Toast & UX
  showToast: (title: string, description: string, type?: "success" | "info" | "warning" | "error") => void;
  removeToast: (id: string) => void;
  triggerCelebration: () => void;
  resetToDefaultData: () => Promise<void>;
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

// Helper to remove any undefined values before sending to Firestore
const sanitizeForFirestore = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj, (_, val) => {
    if (val === undefined) return "";
    return val;
  }));
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // States initialized with clean empty / default values without reading any localStorage
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [users, setUsers] = useState<AppUser[]>(DEFAULT_USERS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(INITIAL_INQUIRIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Session user (stored in sessionStorage for page refresh)
  const [teamUser, setTeamUser] = useState<TeamUser | null>(() => {
    try {
      const saved = sessionStorage.getItem("novacoders_session_user");
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

  // Clear legacy localStorage data so it never causes conflicts
  useEffect(() => {
    try {
      localStorage.removeItem("novacoders_projects_v2");
      localStorage.removeItem("novacoders_inquiries_v2");
      localStorage.removeItem("novacoders_notifs_v2");
      localStorage.removeItem("novacoders_users_list_v2");
      localStorage.removeItem("novacoders_site_settings_v2");
      localStorage.removeItem("novacoders_team_members_v2");
      localStorage.removeItem("novacoders_services_v2");
      localStorage.removeItem("novacoders_testimonials_v2");
      localStorage.removeItem("novacoders_categories_v2");
      localStorage.removeItem("novacoders_auth_user_v2");
    } catch {
      // ignore
    }
  }, []);

  // Update session storage for current logged in user
  useEffect(() => {
    try {
      if (teamUser) {
        sessionStorage.setItem("novacoders_session_user", JSON.stringify(teamUser));
      } else {
        sessionStorage.removeItem("novacoders_session_user");
      }
    } catch {
      // ignore
    }
  }, [teamUser]);

  // =========================================================================
  // 1. Direct Real-time Firestore Cloud Listeners
  // =========================================================================
  useEffect(() => {
    const unsubs: (() => void)[] = [];

    // Projects Listener
    try {
      const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
        const list: Project[] = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as Project[];
        setProjects(list);
        setIsCloudSynced(true);
      }, (err) => console.warn("Projects sync listener:", err));
      unsubs.push(unsubProjects);
    } catch (e) {
      console.warn("Projects listener err:", e);
    }

    // Team Members Listener
    try {
      const unsubTeam = onSnapshot(collection(db, "team_members"), (snapshot) => {
        const list: TeamMember[] = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as TeamMember[];
        setTeamMembers(list);
      }, (err) => console.warn("Team sync listener:", err));
      unsubs.push(unsubTeam);
    } catch (e) {
      console.warn("Team listener err:", e);
    }

    // Users Listener
    try {
      const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
        if (snapshot.empty) {
          // Seed default admin users if cloud users collection is empty
          DEFAULT_USERS.forEach((u) => {
            setDoc(doc(db, "users", u.id), sanitizeForFirestore(u)).catch(console.error);
          });
          setUsers(DEFAULT_USERS);
        } else {
          const list: AppUser[] = snapshot.docs.map((d) => ({
            ...d.data(),
            id: d.id,
          })) as AppUser[];
          setUsers(list);
        }
      }, (err) => console.warn("Users sync listener:", err));
      unsubs.push(unsubUsers);
    } catch (e) {
      console.warn("Users listener err:", e);
    }

    // Categories Listener
    try {
      const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
        const list: CategoryItem[] = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as CategoryItem[];
        setCategories(list);
      }, (err) => console.warn("Categories sync listener:", err));
      unsubs.push(unsubCategories);
    } catch (e) {
      console.warn("Categories listener err:", e);
    }

    // Services Listener
    try {
      const unsubServices = onSnapshot(collection(db, "services"), (snapshot) => {
        const list: ServiceItem[] = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as ServiceItem[];
        setServices(list);
      }, (err) => console.warn("Services sync listener:", err));
      unsubs.push(unsubServices);
    } catch (e) {
      console.warn("Services listener err:", e);
    }

    // Testimonials Listener
    try {
      const unsubTestimonials = onSnapshot(collection(db, "testimonials"), (snapshot) => {
        const list: TestimonialItem[] = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as TestimonialItem[];
        setTestimonials(list);
      }, (err) => console.warn("Testimonials sync listener:", err));
      unsubs.push(unsubTestimonials);
    } catch (e) {
      console.warn("Testimonials listener err:", e);
    }

    // Inquiries Listener
    try {
      const unsubInquiries = onSnapshot(collection(db, "inquiries"), (snapshot) => {
        const list: ClientInquiry[] = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as ClientInquiry[];
        setInquiries(list);
      }, (err) => console.warn("Inquiries sync listener:", err));
      unsubs.push(unsubInquiries);
    } catch (e) {
      console.warn("Inquiries listener err:", e);
    }

    // Notifications Listener
    try {
      const unsubNotifications = onSnapshot(collection(db, "notifications"), (snapshot) => {
        const list: NotificationItem[] = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as NotificationItem[];
        setNotifications(list);
      }, (err) => console.warn("Notifications sync listener:", err));
      unsubs.push(unsubNotifications);
    } catch (e) {
      console.warn("Notifications listener err:", e);
    }

    // Site Settings Document Listener
    try {
      const unsubSettings = onSnapshot(doc(db, "site_settings", "general"), (snapshot) => {
        if (snapshot.exists()) {
          setSiteSettings(snapshot.data() as SiteSettings);
        } else {
          setDoc(doc(db, "site_settings", "general"), sanitizeForFirestore(DEFAULT_SITE_SETTINGS)).catch(console.error);
        }
      }, (err) => console.warn("Site settings sync listener:", err));
      unsubs.push(unsubSettings);
    } catch (e) {
      console.warn("Site settings listener err:", e);
    }

    return () => {
      unsubs.forEach((u) => u());
    };
  }, []);

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

  // =========================================================================
  // 2. User Management - Cloud Firestore
  // =========================================================================
  const addUser = async (newUser: Omit<AppUser, "id" | "createdAt">) => {
    try {
      const id = `user-${Date.now()}`;
      const user: AppUser = {
        ...newUser,
        id,
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, user]);
      await setDoc(doc(db, "users", id), sanitizeForFirestore(user));
      showToast("تمت الإضافة سحابياً", `تمت إضافة المستخدم ${newUser.name} بنجاح إلى السحابة`, "success");
    } catch (err) {
      console.error("Add user error:", err);
      showToast("خطأ في الحفظ السحابي", "تعذر حفظ المستخدم في السحابة.", "error");
    }
  };

  const updateUser = async (id: string, updated: Partial<AppUser>) => {
    try {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
      await setDoc(doc(db, "users", id), sanitizeForFirestore(updated), { merge: true });
      showToast("تم التحديث سحابياً", "تم حفظ بيانات المستخدم في السحابة بنجاح.", "success");
    } catch (err) {
      console.error("Update user error:", err);
      showToast("خطأ في التحديث السحابي", "تعذر تحديث بيانات المستخدم.", "error");
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    if (users.length <= 1) {
      showToast("تنبيه", "لا يمكن حذف آخر مستخدم في لوحة التحكم.", "warning");
      return false;
    }
    try {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      await deleteDoc(doc(db, "users", id));
      showToast("تم الحذف سحابياً", "تمت إزالة المستخدم من السحابة بنجاح.", "info");
      return true;
    } catch (err) {
      console.error("Delete user error:", err);
      showToast("خطأ في الحذف السحابي", "تعذر حذف المستخدم من السحابة.", "error");
      return false;
    }
  };

  // =========================================================================
  // 3. Dynamic Categories Management - Cloud Firestore
  // =========================================================================
  const addCategory = async (newCat: Omit<CategoryItem, "id">) => {
    try {
      const id = `cat-${Date.now()}`;
      const category: CategoryItem = {
        ...newCat,
        id,
        key: newCat.key || `cat_${Date.now()}`
      };
      setCategories((prev) => [...prev, category]);
      await setDoc(doc(db, "categories", id), sanitizeForFirestore(category));
      showToast("تمت إضافة الفئة سحابياً", `تمت إضافة التصنيف "${newCat.nameAr}" في السحابة بنجاح`, "success");
    } catch (err) {
      console.error("Add category error:", err);
      showToast("خطأ في الحفظ السحابي", "تعذر حفظ التصنيف في السحابة.", "error");
    }
  };

  const updateCategory = async (idOrKey: string, updated: Partial<CategoryItem>) => {
    try {
      const target = categories.find((c) => c.id === idOrKey || c.key === idOrKey);
      const targetId = target ? target.id : idOrKey;
      setCategories((prev) => prev.map((c) => (c.id === targetId || c.key === idOrKey ? { ...c, ...updated } : c)));
      await setDoc(doc(db, "categories", targetId), sanitizeForFirestore(updated), { merge: true });
      showToast("تم تحديث التصنيف سحابياً", "تم حفظ تعديلات الفئة في السحابة بنجاح.", "success");
    } catch (err) {
      console.error("Update category error:", err);
      showToast("خطأ في التحديث السحابي", "تعذر تحديث التصنيف في السحابة.", "error");
    }
  };

  const deleteCategory = async (idOrKey: string): Promise<boolean> => {
    try {
      const target = categories.find((c) => c.id === idOrKey || c.key === idOrKey);
      const targetId = target ? target.id : idOrKey;
      setCategories((prev) => prev.filter((c) => c.id !== targetId && c.key !== idOrKey));
      await deleteDoc(doc(db, "categories", targetId));
      showToast("تم الحذف سحابياً", "تمت إزالة التصنيف من السحابة بنجاح.", "info");
      return true;
    } catch (err) {
      console.error("Delete category error:", err);
      showToast("خطأ في الحذف السحابي", "تعذر حذف التصنيف من السحابة.", "error");
      return false;
    }
  };

  // =========================================================================
  // 4. Site Settings - Cloud Firestore
  // =========================================================================
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    try {
      const nextSettings = { ...siteSettings, ...settings };
      setSiteSettings(nextSettings);
      await setDoc(doc(db, "site_settings", "general"), sanitizeForFirestore(nextSettings), { merge: true });
      showToast("تم التحديث سحابياً", "تم حفظ إعدادات الموقع وهوية المنصة في السحابة ونشرها للجميع بنجاح.", "success");
    } catch (err) {
      console.error("Update site settings error:", err);
      showToast("خطأ في التحديث السحابي", "تعذر حفظ الإعدادات في السحابة.", "error");
    }
  };

  // =========================================================================
  // 5. Team Members CRUD - Cloud Firestore
  // =========================================================================
  const addTeamMember = async (member: Omit<TeamMember, "id">) => {
    try {
      const id = `mem-${Date.now()}`;
      const fullMember: TeamMember = { ...member, id };
      setTeamMembers((prev) => [...prev, fullMember]);
      await setDoc(doc(db, "team_members", id), sanitizeForFirestore(fullMember));
      showToast("تمت الإضافة سحابياً", `تمت إضافة المهندس/ة ${member.nameAr} في السحابة ونشرها للزوار.`, "success");
    } catch (err) {
      console.error("Add team member error:", err);
      showToast("خطأ في الحفظ السحابي", "تعذر حفظ بيانات عضو الفريق في السحابة.", "error");
    }
  };

  const updateTeamMember = async (id: string, updated: Partial<TeamMember>) => {
    try {
      setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
      await setDoc(doc(db, "team_members", id), sanitizeForFirestore(updated), { merge: true });
      showToast("تم التحديث سحابياً", "تم تعديل بيانات عضو الفريق في السحابة وتحديثها للزوار.", "success");
    } catch (err) {
      console.error("Update team member error:", err);
      showToast("خطأ في التحديث السحابي", "تعذر تحديث بيانات عضو الفريق.", "error");
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      await deleteDoc(doc(db, "team_members", id));
      showToast("تم الحذف سحابياً", "تمت إزالة العضو من الفريق في السحابة.", "info");
    } catch (err) {
      console.error("Delete team member error:", err);
      showToast("خطأ في الحذف السحابي", "تعذر حذف العضو من السحابة.", "error");
    }
  };

  // =========================================================================
  // 6. Services CRUD - Cloud Firestore
  // =========================================================================
  const addService = async (service: Omit<ServiceItem, "id">) => {
    try {
      const id = `serv-${Date.now()}`;
      const fullService: ServiceItem = { ...service, id };
      setServices((prev) => [...prev, fullService]);
      await setDoc(doc(db, "services", id), sanitizeForFirestore(fullService));
      showToast("تمت الإضافة سحابياً", `تمت إضافة خدمة "${service.titleAr}" في السحابة.`, "success");
    } catch (err) {
      console.error("Add service error:", err);
      showToast("خطأ في الحفظ السحابي", "تعذر إضافة الخدمة في السحابة.", "error");
    }
  };

  const updateService = async (id: string, updated: Partial<ServiceItem>) => {
    try {
      setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
      await setDoc(doc(db, "services", id), sanitizeForFirestore(updated), { merge: true });
      showToast("تم التحديث سحابياً", "تم حفظ تعديل الخدمة في السحابة وتحديثها بالموقع.", "success");
    } catch (err) {
      console.error("Update service error:", err);
      showToast("خطأ في التحديث السحابي", "تعذر تعديل الخدمة.", "error");
    }
  };

  const deleteService = async (id: string) => {
    try {
      setServices((prev) => prev.filter((s) => s.id !== id));
      await deleteDoc(doc(db, "services", id));
      showToast("تم الحذف سحابياً", "تمت إزالة الخدمة من السحابة.", "info");
    } catch (err) {
      console.error("Delete service error:", err);
      showToast("خطأ في الحذف السحابي", "تعذر حذف الخدمة.", "error");
    }
  };

  // =========================================================================
  // 7. Testimonials / Clients Partners - Cloud Firestore
  // =========================================================================
  const addTestimonial = async (test: Omit<TestimonialItem, "id">) => {
    try {
      const id = `test-${Date.now()}`;
      const fullTest: TestimonialItem = { ...test, id };
      setTestimonials((prev) => [...prev, fullTest]);
      await setDoc(doc(db, "testimonials", id), sanitizeForFirestore(fullTest));
      showToast("تمت الإضافة سحابياً", `تمت إضافة الجهة/العميل "${test.companyAr || test.clientNameAr}" في السحابة.`, "success");
    } catch (err) {
      console.error("Add testimonial error:", err);
      showToast("خطأ في الحفظ السحابي", "تعذر حفظ الجهة في السحابة.", "error");
    }
  };

  const updateTestimonial = async (id: string, updated: Partial<TestimonialItem>) => {
    try {
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
      await setDoc(doc(db, "testimonials", id), sanitizeForFirestore(updated), { merge: true });
      showToast("تم التحديث سحابياً", "تم حفظ بيانات الجهة/العميل سحابياً.", "success");
    } catch (err) {
      console.error("Update testimonial error:", err);
      showToast("خطأ في التحديث السحابي", "تعذر تحديث بيانات العميل.", "error");
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      await deleteDoc(doc(db, "testimonials", id));
      showToast("تم الحذف سحابياً", "تمت إزالة الجهة من السحابة بنجاح.", "info");
    } catch (err) {
      console.error("Delete testimonial error:", err);
      showToast("خطأ في الحذف السحابي", "تعذر حذف الجهة من السحابة.", "error");
    }
  };

  // =========================================================================
  // 8. Project CRUD - Cloud Firestore
  // =========================================================================
  const addProject = async (newProj: Omit<Project, "id" | "views" | "likes">) => {
    try {
      const id = `proj-${Date.now()}`;
      const project: Project = {
        ...newProj,
        id,
        views: 1,
        likes: 0,
      };
      setProjects((prev) => [project, ...prev]);
      await setDoc(doc(db, "projects", id), sanitizeForFirestore(project));
      
      broadcastNotification(
        `تم إطلاق نظام جديد: ${project.titleAr}`,
        `New System Launched: ${project.titleEn}`,
        project.taglineAr,
        project.taglineEn,
        "project_added"
      );
      triggerCelebration();
      showToast("تم نشر المشروع سحابياً!", `تمت إضافة "${project.titleAr}" في السحابة وسيظهر لكل زوار الموقع فوراً.`, "success");
    } catch (err) {
      console.error("Add project error:", err);
      showToast("خطأ في الحفظ السحابي", "تعذر حفظ المشروع في السحابة.", "error");
    }
  };

  const updateProject = async (id: string, updated: Partial<Project>) => {
    try {
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      if (activeProjectDetail?.id === id) {
        setActiveProjectDetail((prev) => (prev ? { ...prev, ...updated } : null));
      }
      await setDoc(doc(db, "projects", id), sanitizeForFirestore(updated), { merge: true });
      showToast("تم التحديث سحابياً", "تم حفظ تعديلات المشروع والأسعار في السحابة ونشرها لجميع الزوار.", "success");
    } catch (err) {
      console.error("Update project error:", err);
      showToast("خطأ في التحديث السحابي", "تعذر تحديث المشروع في السحابة.", "error");
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (activeProjectDetail?.id === id) {
        setActiveProjectDetail(null);
      }
      await deleteDoc(doc(db, "projects", id));
      showToast("تم الحذف سحابياً", "تمت إزالة المشروع بنجاح من قاعدة البيانات السحابية.", "info");
    } catch (err) {
      console.error("Delete project error:", err);
      showToast("خطأ في الحذف السحابي", "تعذر حذف المشروع من السحابة.", "error");
    }
  };

  const toggleFeaturedProject = async (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (!proj) return;
    try {
      await setDoc(doc(db, "projects", id), { featured: !proj.featured }, { merge: true });
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  const likeProject = async (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (!proj) return;
    try {
      await setDoc(doc(db, "projects", id), { likes: (proj.likes || 0) + 1 }, { merge: true });
      showToast("شكراً لك!", "تم تسجيل إعجابك بالنظام سحابياً.", "info");
    } catch (err) {
      console.error("Like project error:", err);
    }
  };

  // =========================================================================
  // 9. Inquiries - Cloud Firestore
  // =========================================================================
  const submitInquiry = async (
    inquiryData: Omit<ClientInquiry, "id" | "createdAt" | "status">
  ): Promise<boolean> => {
    try {
      const id = `inq-${Date.now()}`;
      const newInquiry: ClientInquiry = {
        id,
        ...inquiryData,
        createdAt: new Date().toISOString(),
        status: "new",
      };

      await setDoc(doc(db, "inquiries", id), sanitizeForFirestore(newInquiry));

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
    } catch (err) {
      console.error("Submit inquiry error:", err);
      showToast("خطأ في الإرسال", "تعذر حفظ الطلب في السحابة. يرجى المحاولة مرة أخرى.", "error");
      return false;
    }
  };

  const updateInquiryStatus = async (id: string, status: ClientInquiry["status"]) => {
    try {
      await setDoc(doc(db, "inquiries", id), { status }, { merge: true });
      showToast("تم التحديث", `تم تعديل حالة الطلب سحابياً إلى: ${status}`, "info");
    } catch (err) {
      console.error("Update inquiry status error:", err);
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      await deleteDoc(doc(db, "inquiries", id));
      showToast("تم الحذف", "تمت إزالة الطلب من السحابة بنجاح.", "info");
    } catch (err) {
      console.error("Delete inquiry error:", err);
    }
  };

  // =========================================================================
  // 10. Notifications - Cloud Firestore
  // =========================================================================
  const markAllNotificationsRead = async () => {
    try {
      for (const n of notifications) {
        if (!n.read) {
          await setDoc(doc(db, "notifications", n.id), { read: true }, { merge: true });
        }
      }
    } catch (err) {
      console.error("Mark all notifications error:", err);
    }
  };

  const markNotificationRead = async (id: string) => {
    try {
      await setDoc(doc(db, "notifications", id), { read: true }, { merge: true });
    } catch (err) {
      console.error("Mark notification read error:", err);
    }
  };

  const broadcastNotification = async (
    titleAr: string,
    titleEn: string,
    messageAr: string,
    messageEn: string,
    type: NotificationItem["type"] = "update"
  ) => {
    try {
      const id = `notif-${Date.now()}`;
      const newNotif: NotificationItem = {
        id,
        titleAr,
        titleEn,
        messageAr,
        messageEn,
        type,
        timestamp: "الآن",
        read: false,
      };

      await setDoc(doc(db, "notifications", id), sanitizeForFirestore(newNotif));
      showToast(titleAr, messageAr, type === "project_added" ? "success" : "info");
    } catch (err) {
      console.error("Broadcast notification error:", err);
    }
  };

  // Reset Data to Empty Defaults
  const resetToDefaultData = async () => {
    try {
      // Clear projects from Firestore
      const projSnap = await getDocs(collection(db, "projects"));
      for (const d of projSnap.docs) {
        await deleteDoc(doc(db, "projects", d.id));
      }

      // Clear team members from Firestore
      const teamSnap = await getDocs(collection(db, "team_members"));
      for (const d of teamSnap.docs) {
        await deleteDoc(doc(db, "team_members", d.id));
      }

      // Clear services from Firestore
      const servSnap = await getDocs(collection(db, "services"));
      for (const d of servSnap.docs) {
        await deleteDoc(doc(db, "services", d.id));
      }

      // Clear testimonials from Firestore
      const testSnap = await getDocs(collection(db, "testimonials"));
      for (const d of testSnap.docs) {
        await deleteDoc(doc(db, "testimonials", d.id));
      }

      // Reset site settings
      await setDoc(doc(db, "site_settings", "general"), sanitizeForFirestore(DEFAULT_SITE_SETTINGS));

      showToast("تمت استعادة التهيئة الافتراضية سحابياً", "تم تفريغ البيانات وتحديث قاعدة البيانات السحابية بنجاح.", "info");
    } catch (err) {
      console.error("Reset data error:", err);
      showToast("خطأ في إعادة التعيين", "تعذر إكمال العملية في السحابة.", "error");
    }
  };

  const forceSyncToCloud = async () => {
    showToast("المزامنة السحابية الحية نشطة", "كافة العمليات تتصل مباشرة بقاعدة البيانات السحابية Firestore في الوقت الفعلي.", "success");
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
