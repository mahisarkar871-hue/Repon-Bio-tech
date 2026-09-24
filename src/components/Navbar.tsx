import React, { useState, useEffect } from 'react';
import { Phone, UserCheck, ArrowRight, Menu, X, Dna, LogIn } from 'lucide-react';
import { TEACHER_INFO } from '../data/mockData';
import { StudentProfile } from '../types';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onOpenPortal: () => void;
  loggedInStudent: StudentProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenLogin,
  onOpenPortal,
  loggedInStudent,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Faculty Profile', href: '#profile' },
    { label: 'Batch Schedules', href: '#batches' },
    { label: 'Fees & bKash', href: '#fees' },
    { label: 'Venue & Contact', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-emerald-500/20 py-3 shadow-xl shadow-black/60'
          : 'bg-transparent border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <a href="#overview" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-900 to-slate-950 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.25)] group-hover:border-emerald-300 transition-colors">
            <Dna className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold font-heading text-white tracking-tight flex items-center gap-1.5">
              Repon Sir <span className="text-emerald-400 text-base font-semibold">· Biology &amp; ICT</span>
            </span>
            <span className="text-[11px] tracking-wide text-slate-400 font-medium">
              Assistant Professor, Zoology · Rangpur Govt. College
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${TEACHER_INFO.rawPhone}`}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-emerald-500/40 hover:text-white transition-all whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono tabular-nums">{TEACHER_INFO.phone}</span>
          </a>

          {loggedInStudent ? (
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 rounded-xl hover:bg-emerald-900/80 transition-all whitespace-nowrap"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{loggedInStudent.name.split(' ')[0]}&rsquo;s Portal</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:text-white hover:bg-slate-800 border border-slate-800 rounded-xl transition-all whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Student Login</span>
            </button>
          )}

          <button
            onClick={onOpenRegister}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
          >
            <span>Admission Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          {loggedInStudent ? (
            <button
              onClick={onOpenPortal}
              className="px-2.5 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-950 rounded-lg border border-emerald-500/30"
            >
              Portal
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-900 rounded-lg border border-slate-800"
            >
              Login
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-emerald-500/20 px-6 py-5 mt-2 shadow-2xl flex flex-col gap-4 animate-curtain-slide">
          <nav className="flex flex-col gap-3 text-base font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-400 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <a
              href={`tel:${TEACHER_INFO.rawPhone}`}
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-800 rounded-xl font-mono"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{TEACHER_INFO.phone}</span>
            </a>

            {loggedInStudent ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 text-sm font-bold text-emerald-300 bg-emerald-950 border border-emerald-500/30 rounded-xl"
              >
                View {loggedInStudent.name}&rsquo;s Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
              >
                Student Login (Mobile Number)
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <span>HSC 28 Online Admission (2,000 BDT)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
