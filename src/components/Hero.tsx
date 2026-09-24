import React, { useState } from 'react';
import { TEACHER_INFO } from '../data/mockData';
import { ArrowRight, Sparkles, ShieldCheck, Award, GraduationCap, MapPin, Microscope, HeartPulse, Monitor } from 'lucide-react';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onOpenPortal: () => void;
  isLoggedIn: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenRegister,
  onOpenLogin,
  onOpenPortal,
  isLoggedIn,
}) => {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section id="overview" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-emerald-600/15 via-teal-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & Value Proposition (col-span-7) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Admission Kicker */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>HSC 28 Admission Open</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-300">HSC 27 Ongoing</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-emerald-400">Chanmari Math, Radhaballabh, Rangpur</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight text-balance leading-[1.2]">
              HSC Biology and ICT with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] block sm:inline">
                Md. Moksadur Rahman (Repon)
              </span>
            </h1>

            {/* Subtitle & Teacher Credentials */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Directly mentored by <strong className="text-white font-semibold">{TEACHER_INFO.name}</strong> ({TEACHER_INFO.nickname}), <span className="text-emerald-300 font-medium">{TEACHER_INFO.designation}, {TEACHER_INFO.department}, {TEACHER_INFO.institution}</span>.
              Alumnus of <span className="text-slate-200">Govt. Azizul Haque College</span> &amp; <span className="text-slate-200">Rajshahi University</span>.
            </p>

            {/* Core Teaching Pillars (Botany, Zoology & ICT) */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/25 text-left text-xs sm:text-sm text-slate-200 space-y-2.5 backdrop-blur-sm max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Botany, Zoology &amp; ICT — Equal Mastery in All 3 Disciplines</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                As a respected faculty member at Rangpur Govt. College, Repon Sir coaches HSC students across Biology 1st Paper (Botany), 2nd Paper (Zoology), and Information &amp; Communication Technology (ICT) with exceptional care, lucidity, chapter-wise OMR tests, and medical admission foundations.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-emerald-300">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-900/60 border border-emerald-500/30 font-medium flex items-center gap-1">
                  <Microscope className="w-3 h-3" /> Botany (1st Paper)
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-900/60 border border-emerald-500/30 font-medium flex items-center gap-1">
                  <HeartPulse className="w-3 h-3" /> Zoology (2nd Paper)
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-900/60 border border-emerald-500/30 font-medium flex items-center gap-1">
                  <Monitor className="w-3 h-3" /> ICT (Full Syllabus)
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <span>HSC 28 Online Admission (2,000 BDT)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {isLoggedIn ? (
                <button
                  onClick={onOpenPortal}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-semibold text-emerald-300 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Open Student Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/40 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Student Login (Mobile Number)</span>
                </button>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center sm:text-left max-w-xl mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">1,000 <span className="text-xs font-normal text-emerald-400">BDT</span></div>
                <div className="text-[11px] text-slate-400 mt-0.5">Monthly Tuition</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">2,000 <span className="text-xs font-normal text-slate-300">BDT</span></div>
                <div className="text-[11px] text-slate-400 mt-0.5">Admission + 1st Mo. Advance</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">3 Subjects</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Botany · Zoology · ICT</div>
              </div>
            </div>
          </div>

          {/* Right Column: Teacher Portrait Photo with Glassmorphic Framing (col-span-5) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Decorative Biotech Rings */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-emerald-500/40 via-teal-400/20 to-emerald-600/40 blur-xl opacity-70 animate-pulse" />

              {/* Main Glassmorphic Card Container */}
              <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border-2 border-emerald-500/40 p-4 sm:p-5 shadow-2xl shadow-black/80 overflow-hidden">
                {/* Photo Framing */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-emerald-500/30">
                  {!photoError ? (
                    <img
                      src={TEACHER_INFO.photoUrl}
                      alt={`${TEACHER_INFO.name} (${TEACHER_INFO.nickname})`}
                      referrerPolicy="no-referrer"
                      onError={() => setPhotoError(true)}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-emerald-950 text-emerald-300">
                      <GraduationCap className="w-16 h-16 mb-2 text-emerald-400" />
                      <span className="font-bold text-lg text-white">{TEACHER_INFO.name}</span>
                      <span className="text-xs text-slate-400 mt-1">{TEACHER_INFO.designation}</span>
                    </div>
                  )}

                  {/* Glassmorphic Gradient Overlay on Bottom of Photo */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[11px] font-mono tracking-wider text-emerald-300 font-semibold">
                      Assistant Professor · Department of Zoology
                    </span>
                    <span className="text-xl font-bold text-white font-heading">
                      {TEACHER_INFO.name}
                    </span>
                    <span className="text-xs text-slate-300">
                      {TEACHER_INFO.institution}
                    </span>
                  </div>
                </div>

                {/* Sub-Card Details in English */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <GraduationCap className="w-4 h-4" />
                      <span>Qualifications:</span>
                    </span>
                    <span className="text-white font-semibold">Rajshahi University &amp; Govt. Azizul Haque College</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <MapPin className="w-4 h-4" />
                      <span>Venue:</span>
                    </span>
                    <span className="text-white">{TEACHER_INFO.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300 pt-1">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <Award className="w-4 h-4" />
                      <span>Subjects:</span>
                    </span>
                    <span className="text-emerald-300 font-semibold font-mono">Botany · Zoology · ICT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
