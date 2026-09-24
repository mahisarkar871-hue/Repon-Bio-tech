import React from 'react';
import { TEACHER_INFO } from '../data/mockData';
import { Dna, Phone, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister, onOpenLogin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Faculty info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Dna className="w-4 h-4" />
              </div>
              <span className="font-bold font-heading text-lg text-white">
                Repon Sir <span className="text-emerald-400">· Biology &amp; ICT</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Premier academic institution for HSC Botany, Zoology, and Information &amp; Communication Technology (ICT). Director: Md. Moksadur Rahman (Repon), Assistant Professor, Department of Zoology, Rangpur Govt. College.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{TEACHER_INFO.location}</span>
              </span>
              <span className="text-slate-600">·</span>
              <a href={`tel:${TEACHER_INFO.rawPhone}`} className="hover:text-emerald-400 flex items-center gap-1.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{TEACHER_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-white font-semibold mb-3 font-heading uppercase text-xs tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#overview" className="hover:text-emerald-400 transition-colors">Overview</a></li>
              <li><a href="#profile" className="hover:text-emerald-400 transition-colors">Faculty &amp; Teaching Philosophy</a></li>
              <li><a href="#batches" className="hover:text-emerald-400 transition-colors">Batches &amp; Timings (HSC 28 &amp; 27)</a></li>
              <li><a href="#fees" className="hover:text-emerald-400 transition-colors">Fee Calculator &amp; bKash</a></li>
              <li><a href="#location" className="hover:text-emerald-400 transition-colors">Venue &amp; Direct Inquiries</a></li>
            </ul>
          </div>

          {/* Student Hub */}
          <div>
            <div className="text-white font-semibold mb-3 font-heading uppercase text-xs tracking-wider">
              Student Corner
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenLogin} className="text-emerald-400 hover:text-emerald-300 transition-colors text-left font-semibold">
                  Student Portal Login
                </button>
              </li>
              <li>
                <button onClick={onOpenRegister} className="text-slate-300 hover:text-white transition-colors text-left">
                  Online Admission Form (2,000 BDT)
                </button>
              </li>
              <li>
                <a href="#batches" className="hover:text-emerald-400 transition-colors">
                  Batch Vacancy &amp; Seat Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Repon Sir &middot; HSC Biology &amp; ICT Academy. Supervised by Md. Moksadur Rahman (Repon), Assistant Professor, Rangpur Govt. College.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-500">Chanmari Math, Radhaballabh, Rangpur</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
