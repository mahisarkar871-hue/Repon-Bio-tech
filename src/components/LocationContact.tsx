import React, { useState } from 'react';
import { TEACHER_INFO } from '../data/mockData';
import { MapPin, Phone, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';

export const LocationContact: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMsg('');
      setInquirySent(false);
    }, 4000);
  };

  return (
    <section id="location" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Location & Contact Cards (col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
                Venue &amp; Direct Inquiries
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                Chanmari Math, Radhaballabh, Rangpur
              </h2>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Guardians and students are warmly welcome to visit our classroom premises in person to consult with Assistant Professor Md. Moksadur Rahman (Repon Sir) and observe our focused learning environment.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Teaching Venue</div>
                  <div className="text-base font-bold text-white">{TEACHER_INFO.location}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Quiet, distraction-free environment with individual seating</div>
                </div>
              </div>

              {/* Phone Card */}
              <a
                href={`tel:${TEACHER_INFO.rawPhone}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all group"
              >
                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Direct Phone &amp; bKash Number</div>
                  <div className="text-base font-bold text-white font-mono">{TEACHER_INFO.phone}</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Call anytime for batch schedules and admissions inquiry</div>
                </div>
              </a>

              {/* Schedule Hours */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="p-3 rounded-xl bg-teal-950/70 border border-teal-500/30 text-teal-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Classes &amp; Academic Counseling</div>
                  <div className="text-sm font-bold text-white">Saturday to Thursday: 2:00 PM – 7:00 PM</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Friday: Special doubt-clearing sessions &amp; consultations</div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/88${TEACHER_INFO.rawPhone}?text=Hello%20Repon%20Sir,%20I%20would%20like%20to%20inquire%20about%20HSC%20Biology%20and%20ICT%20admissions.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Message ({TEACHER_INFO.phone})</span>
            </a>
          </div>

          {/* Right Column: Callback Request Form (col-span-6) */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white font-heading mb-1">
              Send an Admission Inquiry
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Leave your name and contact number; our academic coordinator will reach out promptly regarding batch availability.
            </p>

            {inquirySent ? (
              <div className="p-6 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-white">Inquiry Received Successfully!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Repon Sir&rsquo;s academic team will call you at {inquiryPhone} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Student / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Ahsan Habib"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Batch or Query</label>
                  <textarea
                    rows={3}
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    placeholder="e.g. Inquiring about HSC 28 Sat/Mon/Wed 3:00 PM slot vacancy..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
