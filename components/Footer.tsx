import React from 'react';
import HeartIcon from './icons/HeartIcon';
import CopyrightIcon from './icons/CopyrightIcon';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-4 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 shrink-0">
      <div className="flex items-center justify-center gap-x-2 flex-wrap">
        <span>Made With</span>
        <HeartIcon className="w-4 h-4 text-red-500" />
        <span>& Ai</span>
        <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>
        <a href="https://negar.agency" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors font-semibold">
          Negar.Agency
        </a>
        <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>
        <div className="flex items-center gap-1">
          <span>2025</span>
          <CopyrightIcon className="w-4 h-4" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
