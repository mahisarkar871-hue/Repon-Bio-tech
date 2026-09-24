import React, { useState } from 'react';
import { BatchType, BatchSlot } from '../types';
import { BATCH_SLOTS } from '../data/mockData';
import { Calendar, Clock, Check, ArrowRight, Monitor, BookOpen } from 'lucide-react';

interface BatchSchedulesProps {
  onSelectSlot: (batch: BatchType, slotString: string) => void;
  onOpenRegister: () => void;
}

export const BatchSchedules: React.FC<BatchSchedulesProps> = ({ onSelectSlot, onOpenRegister }) => {
  const [activeBatch, setActiveBatch] = useState<BatchType>('HSC 28');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const currentSlots = BATCH_SLOTS.filter((s) => s.batch === activeBatch);

  const handleSlotClick = (slot: BatchSlot) => {
    setSelectedSlotId(slot.id);
    const slotStr = `${slot.days} (${slot.time})`;
    onSelectSlot(slot.batch, slotStr);
  };

  return (
    <section id="batches" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
            Class Timing &amp; Batch Schedules
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            HSC 28, HSC 27 &amp; ICT Special Batches
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Admissions for HSC 28 are in full swing. Capped at a strict 35 seats per slot to ensure personal attention, individual paper scrutiny, and regular feedback.
          </p>
        </div>

        {/* Batch Switcher Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
            <button
              onClick={() => {
                setActiveBatch('HSC 28');
                setSelectedSlotId(null);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeBatch === 'HSC 28'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>HSC 28 (Biology)</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/20 uppercase">
                Admissions Open
              </span>
            </button>

            <button
              onClick={() => {
                setActiveBatch('HSC 27');
                setSelectedSlotId(null);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeBatch === 'HSC 27'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>HSC 27 (Biology)</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/20 uppercase">
                Ongoing
              </span>
            </button>

            <button
              onClick={() => {
                setActiveBatch('ICT Special');
                setSelectedSlotId(null);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeBatch === 'ICT Special'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>ICT Special Batch</span>
            </button>
          </div>
        </div>

        {/* Schedule Slots Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {currentSlots.map((slot) => {
            const seatsLeft = slot.totalSeats - slot.enrolledCount;
            const isSelected = selectedSlotId === slot.id;

            return (
              <div
                key={slot.id}
                onClick={() => handleSlotClick(slot)}
                className={`cursor-pointer rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-900 to-emerald-950/70 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{slot.days}</span>
                    </span>
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        seatsLeft <= 5
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {seatsLeft} Seats Available
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-white font-mono">
                    <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{slot.time}</span>
                  </div>

                  {slot.subject && (
                    <div className="text-xs text-slate-300 mt-2 flex items-center gap-1.5 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Subject: {slot.subject}</span>
                    </div>
                  )}

                  {/* Seat Progress Bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
                      <span>Enrolled: {slot.enrolledCount} / {slot.totalSeats} students</span>
                      <span>{Math.round((slot.enrolledCount / slot.totalSeats) * 100)}% Filled</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${(slot.enrolledCount / slot.totalSeats) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Chanmari Math, Radhaballabh
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSlotClick(slot);
                      onOpenRegister();
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Selected · Register</span>
                      </>
                    ) : (
                      <>
                        <span>Select Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
