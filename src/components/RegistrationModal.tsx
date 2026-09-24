import React, { useState, useEffect } from 'react';
import { BatchType, StudentProfile } from '../types';
import { BATCH_SLOTS, TEACHER_INFO } from '../data/mockData';
import { saveStudent } from '../utils/storage';
import { X, Check, Copy, AlertCircle, ShieldCheck, ArrowRight, Dna, Loader2 } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedBatch?: BatchType;
  preselectedSlot?: string;
  onRegisterSuccess: (student: StudentProfile) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preselectedBatch = 'HSC 28',
  preselectedSlot = '',
  onRegisterSuccess,
}) => {
  const [batch, setBatch] = useState<BatchType>(preselectedBatch);
  const [name, setName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [college, setCollege] = useState('');
  const [slot, setSlot] = useState(preselectedSlot);
  const [trxId, setTrxId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setBatch(preselectedBatch);
  }, [preselectedBatch]);

  useEffect(() => {
    if (preselectedSlot) {
      setSlot(preselectedSlot);
    } else {
      const defaultSlot = BATCH_SLOTS.find((s) => s.batch === batch);
      if (defaultSlot) {
        setSlot(`${defaultSlot.days} (${defaultSlot.time})`);
      }
    }
  }, [batch, preselectedSlot]);

  if (!isOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(TEACHER_INFO.rawPhone);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const availableSlots = BATCH_SLOTS.filter((s) => s.batch === batch);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter the student\'s full name.');
      return;
    }
    const cleanStudentPhone = studentPhone.replace(/\D/g, '');
    if (cleanStudentPhone.length < 11) {
      setErrorMsg('Please enter a valid 11-digit mobile number for the student.');
      return;
    }
    const cleanGuardianPhone = guardianPhone.replace(/\D/g, '');
    if (cleanGuardianPhone.length < 11) {
      setErrorMsg('Please enter a valid 11-digit mobile number for the guardian.');
      return;
    }
    if (!college.trim()) {
      setErrorMsg('Please enter the student\'s college name.');
      return;
    }
    if (!slot) {
      setErrorMsg('Please select your preferred class timing slot.');
      return;
    }
    if (!trxId.trim() || trxId.length < 6) {
      setErrorMsg('Please enter the valid bKash TrxID for the 2,000 BDT admission fee.');
      return;
    }

    setIsSubmitting(true);

    try {
      const batchCode = batch === 'HSC 28' ? '28' : batch === 'HSC 27' ? '27' : 'ICT';
      const randId = Math.floor(1000 + Math.random() * 9000);
      const newStudentId = `RS-BIO-${batchCode}-${randId}`;

      const newProfile: StudentProfile = {
        id: newStudentId,
        name: name.trim(),
        studentPhone: studentPhone.trim(),
        guardianPhone: guardianPhone.trim(),
        college: college.trim(),
        batch,
        slot,
        admissionFee: 2000,
        admissionTrxId: trxId.trim().toUpperCase(),
        registeredAt: new Date().toISOString().split('T')[0],
        status: 'Verified',
        payments: [
          {
            id: `pay-init-${Date.now()}`,
            month: 'Admission & 1st Month Advance Fee',
            year: 2026,
            amount: 2000,
            status: 'PAID',
            trxId: trxId.trim().toUpperCase(),
            paidAt: new Date().toISOString().split('T')[0],
            method: 'bKash Personal',
          },
          {
            id: `pay-next-${Date.now()}`,
            month: 'Next Month Tuition',
            year: 2026,
            amount: 1000,
            status: 'UPCOMING',
          },
        ],
        exams: [
          {
            id: `ex-welcome-${Date.now()}`,
            title: 'Orientation Baseline Diagnostic',
            subject: 'Biology & ICT',
            chapter: 'Basic Concepts & Foundation',
            date: 'Scheduled in 1st Week',
            score: 0,
            totalMarks: 25,
            highestScore: 25,
            rank: 1,
            totalStudents: 35,
            grade: 'Pending',
            remarks: 'Admission confirmed. Welcome to Repon Sir\'s Academic Family!',
          },
        ],
      };

      await saveStudent(newProfile);
      onRegisterSuccess(newProfile);
      onClose();
    } catch {
      setErrorMsg('Could not save to the cloud database. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 my-8 shadow-2xl text-slate-100 animate-curtain-slide">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Dna className="w-4 h-4" />
            <span>Repon Sir · Biology &amp; ICT Academy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Online Student Admission Form
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Admission Fee: 2,000 BDT (Admission + 1st Month Tuition in Advance). Chanmari Math, Radhaballabh, Rangpur.
          </p>
        </div>

        {/* bKash Instructions Banner */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs space-y-1">
            <div className="text-white font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Send Money 2,000 BDT via bKash Personal</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Number: <strong className="text-emerald-300 font-mono">{TEACHER_INFO.phone}</strong> (Md. Moksadur Rahman Repon).
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyNumber}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-emerald-300 hover:bg-slate-800 transition-colors shrink-0"
          >
            {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedNumber ? 'Copied!' : 'Copy Number'}</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Target Batch */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Target Batch</label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setBatch('HSC 28')}
                className={`py-2.5 px-3 rounded-xl font-bold text-center border transition-all ${
                  batch === 'HSC 28'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                HSC 28 (Open)
              </button>
              <button
                type="button"
                onClick={() => setBatch('HSC 27')}
                className={`py-2.5 px-3 rounded-xl font-bold text-center border transition-all ${
                  batch === 'HSC 27'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                HSC 27
              </button>
              <button
                type="button"
                onClick={() => setBatch('ICT Special')}
                className={`py-2.5 px-3 rounded-xl font-bold text-center border transition-all ${
                  batch === 'ICT Special'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                ICT Special
              </button>
            </div>
          </div>

          {/* Student Full Name */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Student&rsquo;s Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tanvir Ahmed"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          {/* Phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Student&rsquo;s Mobile Number (Login Credential) *
              </label>
              <input
                type="tel"
                required
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Guardian&rsquo;s Mobile Number *</label>
              <input
                type="tel"
                required
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>
          </div>

          {/* College Name */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">College Name *</label>
            <input
              type="text"
              required
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="e.g. Rangpur Govt. College / Cantonment Public / Carmichael"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Slot Selector */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Preferred Batch Schedule (Slot) *</label>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
            >
              {availableSlots.map((s) => (
                <option key={s.id} value={`${s.days} (${s.time})`}>
                  {s.days} · {s.time} ({s.totalSeats - s.enrolledCount} seats available)
                </option>
              ))}
            </select>
          </div>

          {/* bKash Transaction ID */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-slate-300 font-semibold">
                bKash Transaction ID (TrxID) - 2,000 BDT *
              </label>
              <span className="text-[11px] text-emerald-400 font-bold">Fee: 2,000 BDT</span>
            </div>
            <input
              type="text"
              required
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="e.g. BK79A1209X"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 font-mono uppercase font-bold tracking-wider placeholder-slate-600 focus:outline-none focus:border-emerald-400"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Input the exact TrxID received via SMS from bKash after completing Send Money.
            </p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Cloud Database...</span>
                </>
              ) : (
                <>
                  <span>Confirm Admission &amp; Open Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
