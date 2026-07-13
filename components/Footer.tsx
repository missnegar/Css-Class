import React from 'react';
import HeartIcon from './icons/HeartIcon';
import CopyrightIcon from './icons/CopyrightIcon';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-4 border-t border-slate-200 dark:border-slate-800 text-xs md:text-sm text-slate-500 dark:text-slate-400 shrink-0" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-3 px-4">
        {/* Contact Links */}
        <div className="flex items-center gap-3.5 flex-wrap text-xs font-sans">
          <a href="https://www.linkedin.com/in/negarkazemnejad/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors flex items-center gap-1 font-semibold">
            <span>🔗</span>
            <span>LinkedIn</span>
          </a>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <a href="mailto:hi@egar.agency" className="hover:text-indigo-500 transition-colors flex items-center gap-1 font-semibold">
            <span>✉️</span>
            <span className="font-mono">hi@egar.agency</span>
          </a>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <div className="flex items-center gap-2 font-semibold">
            <span>💬 WhatsApp:</span>
            <a href="https://wa.me/905550508425" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-mono">
              TR (+90)
            </a>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <a href="https://wa.me/989123447142" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-mono">
              IR (+98)
            </a>
          </div>
        </div>

        {/* Credits */}
        <div className="flex items-center gap-x-2 flex-wrap text-xs">
          <span>Made With</span>
          <HeartIcon className="w-3.5 h-3.5 text-red-500" />
          <span>& Ai</span>
          <span className="mx-1 text-slate-300 dark:text-slate-600">|</span>
          <a href="https://negar.agency" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors font-semibold">
            Negar.Agency
          </a>
          <span className="mx-1 text-slate-300 dark:text-slate-600">|</span>
          <div className="flex items-center gap-1">
            <span>2025</span>
            <CopyrightIcon className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
