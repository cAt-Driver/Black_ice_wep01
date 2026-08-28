import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export const NotificationToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200 ${
              isSuccess
                ? "bg-[#0b162c]/95 border-blue-500/50 shadow-blue-950/80 text-white"
                : isWarning
                ? "bg-[#1c1212]/95 border-rose-500/50 shadow-rose-950/80 text-white"
                : "bg-[#0c1324]/95 border-slate-700/80 shadow-slate-950/80 text-white"
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex-shrink-0">
                {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isWarning && <AlertCircle className="w-4 h-4 text-rose-400" />}
                {!isSuccess && !isWarning && <Info className="w-4 h-4 text-sky-400" />}
              </div>
              <div>
                <h6 className="text-xs font-bold text-white leading-tight">
                  {toast.title}
                </h6>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
