import React, { useState } from 'react';
import { findStudentAsync, setLoggedInStudentPhone } from '../utils/storage';
import { StudentProfile } from '../types';
import { X, Phone, LogIn, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: StudentProfile) => void;
  onOpenRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenRegister,
}) => {
  const [phoneInput, setPhoneInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phoneInput.trim()) {
      setErrorMsg('Please enter your registered 11-digit mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const student = await findStudentAsync(phoneInput.trim());
      if (student) {
        setLoggedInStudentPhone(student.studentPhone);
        onLoginSuccess(student);
        onClose();
      } else {
        setErrorMsg(
          'No student profile found with this mobile number. Please verify the number or complete online admission first.'
        );
      }
    } catch {
      setErrorMsg('Could not connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (demoPhone: string) => {
    setErrorMsg('');
    setIsLoading(true);
    try {
      const student = await findStudentAsync(demoPhone);
      if (student) {
        setLoggedInStudentPhone(student.studentPhone);
        onLoginSuccess(student);
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 animate-curtain-slide">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 mb-3">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">Student Portal Login</h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your dashboard using the 11-digit mobile phone number submitted during admission.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Registered Mobile Number
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono text-sm"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span>Access Student Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Test Logins */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <span className="text-[11px] text-slate-400 block text-center mb-2.5">
            One-click Demo Test Accounts:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('01712345678')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-left transition-all group"
            >
              <div className="font-bold text-white group-hover:text-emerald-300">Tanvir Ahmed</div>
              <div className="text-[10px] text-emerald-400 font-mono">HSC 28 · 01712345678</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('01898765432')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-left transition-all group"
            >
              <div className="font-bold text-white group-hover:text-emerald-300">Nusrat Jahan</div>
              <div className="text-[10px] text-emerald-400 font-mono">HSC 27 · 01898765432</div>
            </button>
          </div>
        </div>

        {/* Not registered yet? */}
        <div className="mt-5 text-center text-xs text-slate-400">
          <span>Not registered yet? </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="text-emerald-400 font-bold hover:underline"
          >
            Fill Online Admission Form
          </button>
        </div>
      </div>
    </div>
  );
};
