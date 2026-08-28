import React from "react";
import { motion } from "motion/react";
import { Users, Github, Linkedin, ShieldCheck, Phone, CheckCircle, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export const TeamSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { teamMembers, siteSettings } = useApp();

  return (
    <section id="team" className="py-12 sm:py-16 bg-[#080c17]/80 backdrop-blur-[1px] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-[10px] sm:text-xs font-bold text-sky-400 mb-2">
            <Users className="w-3 h-3" />
            <span>{language === "ar" ? "فريق العمل والمطورون" : "Our Engineering Team"}</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
            {language === "ar" ? "فريق برمجي متكامل ومتكافئ لتطوير مشاريعكم" : "Collaborative & Equal Engineering Team"}
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed px-2">
            {language === "ar"
              ? "نعمل كفريق متكامل ومتكافئ من المهندسين والمطورين لضمان أعلى جودة في كتابة الكود، سهولة الاستخدام، ودعم فني سريع ومستمر."
              : "A dedicated team of experienced software engineers working in harmony to deliver reliable, secure, and intuitive applications."}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {teamMembers.map((member, idx) => {
            const name = language === "ar" ? member.nameAr : member.nameEn;
            const role = language === "ar" ? member.roleAr : member.roleEn;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl bg-[#0c1324] border border-slate-800/90 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/60 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Photo */}
                  <div className="relative h-32 sm:h-36 md:h-40 w-full overflow-hidden bg-slate-900">
                    <img
                      src={member.avatar}
                      alt={name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] via-transparent to-transparent"></div>
                  </div>

                  {/* Profile Details */}
                  <div className="p-2.5 sm:p-3.5 space-y-1">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                        {name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-sky-400">
                        {role}
                      </p>
                    </div>

                    <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                      {member.specialization}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Contributed Projects & Contact */}
                <div className="p-2.5 sm:p-3.5 pt-0">
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px]">
                    <span className="text-slate-400 text-[9px] sm:text-[10px] truncate max-w-[90px]">
                      {member.contributedProjectsCount} {language === "ar" ? "مشروعاً" : "systems"}
                    </span>

                    <div className="flex items-center gap-1">
                      {member.whatsapp && (
                        <a
                          href={`https://wa.me/${siteSettings.contactWhatsApp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`السلام عليكم ${member.nameAr}، أود الاستفسار عن مشاريعكم البرمجية.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 transition-colors hover:scale-105 active:scale-95"
                          title="واتساب مباشر"
                        >
                          <Phone className="w-3 h-3" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors hover:scale-105 active:scale-95"
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

