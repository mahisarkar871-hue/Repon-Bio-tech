import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { updateStudentPayment, logoutStudent } from '../utils/storage';
import { TEACHER_INFO } from '../data/mockData';
import {
  X,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Calendar,
  School,
  Printer,
  LogOut,
  Dna,
  Loader2,
} from 'lucide-react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onStudentUpdated: (updated: StudentProfile) => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  student,
  onStudentUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'exams' | 'card'>('overview');
  const [payDueMonth, setPayDueMonth] = useState<string | null>(null);
  const [payTrxId, setPayTrxId] = useState('');
  const [paymentSuccessNotice, setPaymentSuccessNotice] = useState('');
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);

  if (!isOpen) return null;

  const handlePrintCard = () => {
    window.print();
  };

  const handleConfirmMonthlyPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payDueMonth || !payTrxId.trim()) return;

    setIsUpdatingPayment(true);
    try {
      const updated = await updateStudentPayment(student.id, payDueMonth, payTrxId.trim().toUpperCase());
      if (updated) {
        onStudentUpdated(updated);
        setPaymentSuccessNotice(`Payment of 1,000 BDT for ${payDueMonth} recorded successfully!`);
        setTimeout(() => {
          setPayDueMonth(null);
          setPayTrxId('');
          setPaymentSuccessNotice('');
        }, 2500);
      }
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  const handleLogout = () => {
    logoutStudent();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-8 my-6 shadow-2xl text-slate-100 animate-curtain-slide">
        {/* Top Bar inside Modal */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <span>{student.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  {student.batch}
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Student ID: <span className="text-emerald-300 font-bold">{student.id}</span> · {student.college}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 mb-6 overflow-x-auto scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Academic Overview
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'payments'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Tuition &amp; Payment Status
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'exams'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Exam Marks &amp; Ranks
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'card'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Digital Student Card
          </button>
        </div>

        {/* Tab 1: Academic Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-xs">
            {/* Personal Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Batch &amp; Class Timing</div>
                <div className="text-sm font-bold text-white mt-1 font-mono">{student.batch}</div>
                <div className="text-emerald-400 text-xs mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{student.slot}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">College &amp; Student ID</div>
                <div className="text-sm font-bold text-white mt-1 line-clamp-1">{student.college}</div>
                <div className="text-slate-400 text-xs mt-0.5 font-mono">ID: {student.id}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Phone &amp; Verification</div>
                <div className="text-sm font-bold text-white mt-1 font-mono">{student.studentPhone}</div>
                <div className="text-emerald-400 text-xs mt-0.5 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified · Trx: {student.admissionTrxId}</span>
                </div>
              </div>
            </div>

            {/* Quick Status Cards: Payment & Exam Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment Summary */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Tuition Payment Status</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    View All Months
                  </button>
                </div>
                <div className="space-y-2">
                  {student.payments.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                      <span className="text-slate-300 font-medium">{p.month}</span>
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === 'PAID'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            : p.status === 'DUE'
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {p.status} ({p.amount} BDT)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Performance Summary */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Latest Exam Performance</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('exams')}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    All Exam Records
                  </button>
                </div>
                {student.exams.length > 0 ? (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{student.exams[0].title}</span>
                      <span className="text-emerald-400 font-bold font-mono">{student.exams[0].grade}</span>
                    </div>
                    <div className="flex items-baseline justify-between font-mono">
                      <span className="text-xl font-extrabold text-white">
                        {student.exams[0].score} / {student.exams[0].totalMarks}
                      </span>
                      <span className="text-slate-400 text-[11px]">Rank in Batch: #{student.exams[0].rank}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">&ldquo;{student.exams[0].remarks}&rdquo;</p>
                  </div>
                ) : (
                  <p className="text-slate-400 text-center py-4">No exam records published yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Payment Clearance */}
        {activeTab === 'payments' && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Monthly Tuition Clearance Records</h3>
                <p className="text-slate-400 mt-0.5">
                  Monthly fee is 1,000 BDT. Send Money via bKash to: <strong className="text-emerald-300 font-mono">{TEACHER_INFO.phone}</strong>
                </p>
              </div>
              <span className="font-mono text-emerald-400 text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-500/30">
                1,000 BDT / Month
              </span>
            </div>

            {paymentSuccessNotice && (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold">{paymentSuccessNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {student.payments.map((pm, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${
                    pm.status === 'PAID'
                      ? 'bg-slate-950/70 border-emerald-500/30'
                      : pm.status === 'DUE'
                      ? 'bg-rose-950/40 border-rose-500/40'
                      : 'bg-slate-950/40 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{pm.month}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        pm.status === 'PAID'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : pm.status === 'DUE'
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {pm.status}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between font-mono pt-2 border-t border-slate-800/80">
                    <span className="text-slate-300 font-bold">{pm.amount} BDT</span>
                    {pm.trxId && (
                      <span className="text-[11px] text-emerald-400 truncate max-w-[140px]">
                        Trx: {pm.trxId}
                      </span>
                    )}
                  </div>

                  {pm.status === 'DUE' && (
                    <button
                      onClick={() => setPayDueMonth(pm.month)}
                      className="mt-1 w-full py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold transition-colors"
                    >
                      Clear 1,000 BDT Due via bKash
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Monthly Fee Payment Modal Form */}
            {payDueMonth && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 animate-curtain-slide">
                <h4 className="font-bold text-white text-sm mb-1">
                  Tuition Clearance for {payDueMonth} (1,000 BDT)
                </h4>
                <p className="text-slate-400 text-[11px] mb-3">
                  Send Money to Repon Sir&rsquo;s bKash number <strong className="text-emerald-300 font-mono">{TEACHER_INFO.phone}</strong> and enter the Transaction ID (TrxID) below:
                </p>

                <form onSubmit={handleConfirmMonthlyPay} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    value={payTrxId}
                    onChange={(e) => setPayTrxId(e.target.value)}
                    placeholder="Enter bKash TrxID (e.g. BK880129KA)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 uppercase font-mono font-bold focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isUpdatingPayment}
                      className="px-5 py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold hover:bg-emerald-300 transition-colors flex items-center gap-1.5 disabled:opacity-60"
                    >
                      {isUpdatingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <span>Verify &amp; Update Record</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayDueMonth(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Exam Marks & Results */}
        {activeTab === 'exams' && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Exam Results &amp; Evaluation History</h3>
                <p className="text-slate-400 mt-0.5">
                  Regular records of Chapter Tests, Creative Questions (CQ), and Multiple Choice (MCQ) speed drills.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {student.exams.map((ex) => {
                const pct = Math.round((ex.score / ex.totalMarks) * 100);
                return (
                  <div
                    key={ex.id}
                    className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-mono text-[10px] font-bold">
                          {ex.subject}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">{ex.date}</span>
                      </div>

                      <h4 className="font-bold text-white text-sm">{ex.title}</h4>
                      <div className="text-slate-400 text-xs mt-0.5">Chapter: {ex.chapter}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 font-mono">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <div>
                          <span className="text-2xl font-extrabold text-white tabular-nums">{ex.score}</span>
                          <span className="text-slate-400 text-xs"> / {ex.totalMarks}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-emerald-400 text-sm">{pct}% ({ex.grade})</span>
                          <div className="text-[10px] text-slate-400">Rank: #{ex.rank} of {ex.totalStudents} students</div>
                        </div>
                      </div>

                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 italic bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                      &ldquo;{ex.remarks}&rdquo;
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Printable Digital Student ID Card */}
        {activeTab === 'card' && (
          <div className="flex flex-col items-center py-4">
            {/* Printable ID Card */}
            <div
              id="printable-student-card"
              className="w-full max-w-[390px] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 border-2 border-emerald-400/60 p-6 shadow-2xl relative overflow-hidden text-slate-100"
            >
              {/* Watermark glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-400 font-bold">
                    <Dna className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm tracking-tight text-white block">Repon Sir Academy</span>
                    <span className="text-[9px] text-emerald-400">Biology &amp; ICT</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-400">Official Student ID</span>
              </div>

              {/* Roll ID banner */}
              <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 mb-4 font-mono">
                <span className="text-[10px] text-slate-400">Roll / ID Number:</span>
                <span className="text-sm font-bold text-emerald-300 tracking-wider">{student.id}</span>
              </div>

              {/* Student Details */}
              <div className="space-y-2 text-xs">
                <div>
                  <div className="text-[9px] uppercase text-slate-400 font-semibold">Student Name</div>
                  <div className="text-base font-bold text-white">{student.name}</div>
                </div>

                <div className="flex items-start gap-2">
                  <School className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase">College</div>
                    <div className="font-semibold text-slate-200">{student.college}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase">Batch</div>
                    <div className="font-bold text-emerald-400 font-mono">{student.batch}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase">Class Slot</div>
                    <div className="font-mono text-slate-200 text-[11px] truncate">{student.slot}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-400 font-mono">Phone: {student.studentPhone}</span>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    Verified
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                <div>
                  <div className="text-[8px] text-slate-400">Classroom Venue</div>
                  <div className="text-[10px] font-semibold text-white">Chanmari Math, Radhaballabh, Rangpur</div>
                </div>

                <div className="text-right">
                  <div className="text-[8px] text-slate-400">Teacher Signature</div>
                  <div className="text-xs font-serif italic text-emerald-300 font-bold">Repon Sir</div>
                  <div className="text-[7px] text-slate-400">Assistant Professor, Rangpur Govt. College</div>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrintCard}
              className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg hover:bg-emerald-300 transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save ID Card</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
