import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import MenuIcon from './icons/MenuIcon';
import InfoIcon from './icons/InfoIcon';
import { CiCoffeeCup } from "react-icons/ci";
import { GrCss3 } from "react-icons/gr";

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenDonationModal: () => void;
  onOpenAboutModal: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme, onOpenDonationModal, onOpenAboutModal, onToggleSidebar }) => {
  return (
    <header className="py-4 px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200"
          aria-label="باز و بسته کردن منو"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <GrCss3 className="w-7 h-7 text-sky-500" />
        <h1 className="text-xl md:text-2xl font-lalezar tracking-wider text-slate-900 dark:text-white">
          CSS CLASS
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAboutModal}
          className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200"
          aria-label="درباره پروژه"
        >
          <InfoIcon className="w-6 h-6" />
        </button>
        <button
          onClick={onOpenDonationModal}
          className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200"
          aria-label="حمایت از پروژه"
        >
          <CiCoffeeCup className="w-6 h-6" />
        </button>
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200"
          aria-label="تغییر پوسته"
        >
          {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header;