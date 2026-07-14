import React, { useState } from 'react';
import HeartIcon from './icons/HeartIcon';
import CopyrightIcon from './icons/CopyrightIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

const Footer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md transition-all duration-300" dir="rtl">
      {/* Footer Toggle Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2.5 flex items-center justify-between text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
          <span className="font-semibold text-xs text-right">راه‌های ارتباطی و کپی‌رایت</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">© ۲۰۲۵ Negar.Agency</span>
          <ChevronDownIcon 
            className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${
              isExpanded ? 'rotate-180 text-indigo-500' : ''
            }`} 
          />
        </div>
      </button>

      {/* Collapsible Content */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded 
            ? 'max-h-96 opacity-100 border-t border-slate-100 dark:border-slate-800/60 p-4 md:p-6' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact Links */}
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start text-xs font-sans w-full md:w-auto">
            <a href="https://www.linkedin.com/in/negarkazemnejad/" target="_blank" rel="noopener noreferrer" className="bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 border border-slate-200/60 dark:border-slate-700/50 py-1.5 px-3 rounded-full hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-1.5 font-semibold">
              <span>🔗</span>
              <span>LinkedIn</span>
            </a>
            <a href="mailto:hi@egar.agency" className="bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 border border-slate-200/60 dark:border-slate-700/50 py-1.5 px-3 rounded-full hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-1.5 font-semibold">
              <span>✉️</span>
              <span className="font-mono text-[11px]">hi@egar.agency</span>
            </a>
            <div className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 py-1.5 px-3 rounded-full flex flex-wrap items-center justify-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
              <span>💬 WhatsApp:</span>
              <a href="https://wa.me/905550508425" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono">
                TR (+90)
              </a>
              <span className="text-slate-300 dark:text-slate-700 font-normal">/</span>
              <a href="https://wa.me/989123447142" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono">
                IR (+98)
              </a>
            </div>
          </div>

          {/* Credits */}
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end text-xs w-full md:w-auto">
            <span className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 py-1.5 px-3 rounded-full flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <span>Made With</span>
              <HeartIcon className="w-3 h-3 text-red-500" />
              <span>& Ai</span>
            </span>
            <a href="https://negar.agency" target="_blank" rel="noopener noreferrer" className="bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 border border-slate-200/60 dark:border-slate-700/50 py-1.5 px-3 rounded-full hover:text-indigo-600 dark:hover:text-indigo-400 transition-all font-semibold">
              Negar.Agency
            </a>
            <span className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 py-1.5 px-3 rounded-full flex items-center gap-1.5 font-mono text-slate-500 dark:text-slate-400">
              <span>2025</span>
              <CopyrightIcon className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
