import React, { useState } from "react";
import { X, Lock, KeyRound, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const TeamAuthModal: React.FC = () => {
  const { language, isRtl } = useLanguage();
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithCredentials } = useApp();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      loginWithCredentials(username, password);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div 
        className="relative w-full max-w-md rounded-3xl bg-[#0c1324] border border-blue-500/30 shadow-2xl shadow-blue-950/90 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-b from-blue-950/70 to-transparent border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400 shadow-md shadow-blue-600/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {language === "ar" ? "تسجيل دخول أعضاء الفريق" : "Team Member Login"}
              </h3>
              <p className="text-xs text-slate-400">
                {language === "ar" ? "لوحة إدارة وتعديل محتوى ومشاريع المنصة" : "Content & project management"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-full border border-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                {language === "ar" ? "اسم المستخدم أو البريد الإلكتروني" : "Username or Email"}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-slate-400`}>
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={language === "ar" ? "أدخل اسم المستخدم" : "Enter username"}
                  className={`w-full py-3 ${isRtl ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} text-sm text-white bg-slate-900/90 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans transition-all`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                {language === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-slate-400`}>
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full py-3 ${isRtl ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} text-sm text-white bg-slate-900/90 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans transition-all`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <span>{language === "ar" ? "جاري التحقق..." : "Authenticating..."}</span>
              ) : (
                <>
                  <span>{language === "ar" ? "تسجيل الدخول" : "Sign In"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

