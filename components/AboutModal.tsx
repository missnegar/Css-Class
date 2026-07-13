import React, { useEffect } from 'react';
import XIcon from './icons/XIcon';
import HeartIcon from './icons/HeartIcon';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col animate-scale-up relative" onClick={e => e.stopPropagation()}>
            <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
                <h2 className="text-lg font-bold font-lalezar text-slate-800 dark:text-slate-100">داستان CSS CLASS</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <XIcon className="w-5 h-5 text-slate-500" />
                </button>
            </header>
            
            <main className="p-6 flex-grow overflow-y-auto no-scrollbar text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                    اینجا جایی است که کدنویسی با هنر ملاقات می‌کند. <strong>CSS CLASS</strong> در سال <strong>۱۴۰۴</strong> با یک هدف متولد شد: ساده‌سازی فرآیند پیچیده طراحی وب و توانمندسازی توسعه‌دهندگان فرانت‌اند، از تازه‌کاران تا حرفه‌ای‌ها، برای خلق تجربیات کاربری بی‌نظیر.
                </p>
                
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">یادداشتی از بنیان‌گذار</p>
                    <blockquote className="mt-2 pr-4 border-r-4 border-indigo-500 text-slate-500 dark:text-slate-400">
                        "من، <strong>نگار کاظم نژاد</strong>، به عنوان بنیان‌گذار این پلتفرم، همیشه به دنبال راهی برای پر کردن شکاف بین ایده‌های خلاقانه و اجرای فنی آن‌ها بوده‌ام. CSS CLASS حاصل این دغدغه است؛ جعبه ابزاری که به شما کمک می‌کند تا به جای درگیر شدن با پیچیدگی‌های سینتکس، بر روی جادوی طراحی تمرکز کنید. امیدوارم این ابزار در مسیر حرفه‌ای شما، همراهی خلاق و کارآمد باشد."
                    </blockquote>
                </div>

                {/* راه‌های ارتباطی */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 space-y-3">
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">راه‌های ارتباطی با من:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <a 
                            href="https://www.linkedin.com/in/negarkazemnejad/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-slate-800/80 transition-all text-left"
                            dir="ltr"
                        >
                            <span className="text-base">🔗</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500">LinkedIn</span>
                                <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">negarkazemnejad</span>
                            </div>
                        </a>

                        <a 
                            href="mailto:hi@egar.agency" 
                            className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-slate-800/80 transition-all text-left"
                            dir="ltr"
                        >
                            <span className="text-base">✉️</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500">Email</span>
                                <span className="font-semibold text-slate-700 dark:text-slate-200 truncate font-mono">hi@egar.agency</span>
                            </div>
                        </a>

                        <a 
                            href="https://wa.me/905550508425" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-slate-800/80 transition-all text-left"
                            dir="ltr"
                        >
                            <span className="text-base">💬</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500">WhatsApp (TR)</span>
                                <span className="font-semibold text-slate-700 dark:text-slate-200 font-mono">+90 555 050 8425</span>
                            </div>
                        </a>

                        <a 
                            href="https://wa.me/989123447142" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-slate-800/80 transition-all text-left"
                            dir="ltr"
                        >
                            <span className="text-base">💬</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500">WhatsApp (IR)</span>
                                <span className="font-semibold text-slate-700 dark:text-slate-200 font-mono">+98 912 344 7142</span>
                            </div>
                        </a>
                    </div>
                </div>

                <p>
                    این مسیر ادامه دارد و با همراهی و حمایت شما، کامل‌تر خواهد شد.
                </p>

            </main>
             <footer className="p-4 border-t border-slate-200 dark:border-slate-700 shrink-0 text-center text-xs text-slate-500 dark:text-slate-400">
                ساخته شده با <HeartIcon className="w-3 h-3 inline text-red-500" /> و هوش مصنوعی
            </footer>
        </div>
        <style>{`
          @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
          @keyframes scale-up { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
          .animate-fade-in { animation: fade-in 0.2s ease-out; }
          .animate-scale-up { animation: scale-up 0.2s ease-out; }
        `}</style>
    </div>
  );
};

export default AboutModal;
