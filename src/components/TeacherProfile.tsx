import React, { useState } from 'react';
import { TEACHER_INFO, TEACHING_PILLARS } from '../data/mockData';
import { GraduationCap, CheckCircle2, Sparkles, Microscope, Check } from 'lucide-react';

export const TeacherProfile: React.FC = () => {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section id="profile" className="py-20 bg-slate-950/70 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
            Faculty Profile &amp; Pedagogy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Academic Mentorship from Rangpur Govt. College Faculty
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            At the HSC level, Biology and ICT demand lucid conceptual diagrams, analytical thinking, and scientific precision rather than rote memorization. Under the direct supervision of Assistant Professor Md. Moksadur Rahman (Repon Sir), students achieve peak marks in both Board and Medical admission exams.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Glassmorphic Profile Card (col-span-5) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Photo */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-slate-950">
                {!photoError ? (
                  <img
                    src={TEACHER_INFO.photoUrl}
                    alt={TEACHER_INFO.name}
                    referrerPolicy="no-referrer"
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-emerald-400 text-center p-2">
                    <GraduationCap className="w-8 h-8 mb-1" />
                    <span className="text-[10px] font-bold">{TEACHER_INFO.nickname}</span>
                  </div>
                )}
                <div className="absolute bottom-1 right-1 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {TEACHER_INFO.name}
                </div>
                <div className="text-emerald-400 text-sm font-semibold mt-0.5">
                  ({TEACHER_INFO.nickname})
                </div>
                <div className="text-xs text-slate-300 mt-1 font-medium">
                  {TEACHER_INFO.designation} · {TEACHER_INFO.department}
                </div>
                <div className="text-xs text-slate-400">
                  {TEACHER_INFO.institution}
                </div>
              </div>
            </div>

            {/* Academic Credentials List */}
            <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-3 text-xs">
              <div className="font-semibold uppercase tracking-wider text-slate-400 text-[11px]">
                Educational Background &amp; Alma Mater
              </div>
              {TEACHER_INFO.education.map((edu, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{edu}</span>
                </div>
              ))}
            </div>

            {/* Teaching Philosophy */}
            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <div className="font-semibold text-white text-xs mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Botany, Zoology &amp; ICT Specialization</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/20">
                &ldquo;{TEACHER_INFO.expertise}&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Teaching Pillars & Showcase (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Banner Showcase */}
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl group">
              <img
                src="/src/assets/images/biotech_dna_botany_banner_1790276353238.jpg"
                alt="Repon Sir Biology & ICT"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono mb-2">
                  <Microscope className="w-3.5 h-3.5" />
                  <span>Botany · Zoology · ICT Instruction</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-balance">
                  Structured Conceptual Depth, Board Exam Excellence &amp; Medical Entrance Readiness
                </h3>
              </div>
            </div>

            {/* Teaching Pillars */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Core Distinctive Features
                </span>
                <span className="text-xs text-emerald-400 font-mono">Regular Class Tests</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TEACHING_PILLARS.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{pillar.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed pl-7">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
