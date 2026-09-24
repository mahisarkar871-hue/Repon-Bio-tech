import React, { useState } from 'react';
import { TEACHER_INFO } from '../data/mockData';
import { Calculator, CreditCard, Copy, Check, ArrowRight } from 'lucide-react';

interface FeeCalculatorProps {
  onOpenRegister: () => void;
}

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({ onOpenRegister }) => {
  const [isNewAdmission, setIsNewAdmission] = useState(true);
  const [monthsCount, setMonthsCount] = useState(1);
  const [copiedNumber, setCopiedNumber] = useState(false);

  const admissionBase = isNewAdmission ? TEACHER_INFO.admissionFee : 0;
  // If new admission, 1 month advance is already included in 2,000 BDT
  const additionalMonths = isNewAdmission ? Math.max(0, monthsCount - 1) : monthsCount;
  const totalAmount = admissionBase + additionalMonths * TEACHER_INFO.monthlyFee;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(TEACHER_INFO.rawPhone);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  return (
    <section id="fees" className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
            Transparent Fee Structure &amp; bKash Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Interactive Fee Calculator &amp; Instant Clearance
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Completely transparent with zero hidden costs. New admission is 2,000 BDT (covers admission fee plus 1st month tuition in advance) and regular monthly tuition is 1,000 BDT. Send Money via bKash to Repon Sir&rsquo;s personal number and confirm using your TrxID.
          </p>
        </div>

        {/* 2-Column Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left: Interactive Fee Calculator (col-span-6) */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">Calculate Tuition Fees</h3>
                <span className="text-xs text-slate-400">Estimate admission or multi-month fee clearance</span>
              </div>
            </div>

            {/* Admission Type Toggle */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Select Student Category</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewAdmission(true)}
                    className={`py-3 px-3 rounded-2xl font-bold text-center border transition-all ${
                      isNewAdmission
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    New Admission (HSC 28/27)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNewAdmission(false)}
                    className={`py-3 px-3 rounded-2xl font-bold text-center border transition-all ${
                      !isNewAdmission
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    Existing Enrolled Student
                  </button>
                </div>
              </div>

              {/* Number of Months */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-300 font-semibold">Number of Months</label>
                  <span className="font-mono text-emerald-400 font-bold">{monthsCount} {monthsCount > 1 ? 'Months' : 'Month'}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 6, 12].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setMonthsCount(num)}
                      className={`py-2 rounded-xl font-mono text-xs font-semibold border transition-all ${
                        monthsCount === num
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {num} {num > 1 ? 'Mos' : 'Mo'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2 mt-4 font-sans text-xs">
                {isNewAdmission ? (
                  <div className="flex justify-between text-slate-300">
                    <span>Admission Fee (Includes 1st Month Advance):</span>
                    <span className="font-bold text-white font-mono">2,000 BDT</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-slate-300">
                    <span>Admission Fee:</span>
                    <span className="text-slate-500">0 BDT (Already Paid)</span>
                  </div>
                )}

                {additionalMonths > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Next {additionalMonths} Months Tuition (1,000 BDT/Mo):</span>
                    <span className="font-bold text-white font-mono">{additionalMonths * 1000} BDT</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total Payable:</span>
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
                    {totalAmount} <span className="text-xs font-normal text-slate-300 font-sans">BDT</span>
                  </span>
                </div>
              </div>

              {/* Direct Registration Trigger */}
              <button
                type="button"
                onClick={onOpenRegister}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Fill Online Admission Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Integrated bKash Payment Guide (col-span-6) */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-pink-950/60 text-pink-400 border border-pink-500/30">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">bKash Payment Guide</h3>
                <span className="text-xs text-slate-400">Personal Send Money Verification</span>
              </div>
            </div>

            {/* bKash Phone Number Copy Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  bKash Personal Number
                </div>
                <div className="text-xl font-extrabold font-mono text-emerald-300">
                  {TEACHER_INFO.phone}
                </div>
                <div className="text-[10px] text-slate-400">{TEACHER_INFO.name} ({TEACHER_INFO.nickname})</div>
              </div>

              <button
                type="button"
                onClick={handleCopyNumber}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-emerald-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copiedNumber ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedNumber ? 'Copied!' : 'Copy Number'}</span>
              </button>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  Open your bKash App and select the <strong className="text-white">Send Money</strong> option.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  Enter recipient number <strong className="text-emerald-300 font-mono">{TEACHER_INFO.phone}</strong> and input <span className="text-white font-semibold">2,000 BDT</span> for new admission or <span className="text-white font-semibold">1,000 BDT</span> for monthly tuition.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  Write the student&rsquo;s name in the reference field. Complete the transaction using your PIN and copy the SMS <strong className="text-white">TrxID</strong> (e.g., BK79A1209X).
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5">
                  4
                </span>
                <p>
                  Submit the TrxID in the Online Admission Form or Student Portal to instantly activate your digital ID card, records, and student dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
