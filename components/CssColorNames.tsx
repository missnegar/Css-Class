import React, { useState, useMemo } from 'react';
import { CSS_COLORS, COLOR_GROUPS } from '../data/css-colors';
import SearchIcon from './icons/SearchIcon';

// --- Helper Functions ---
function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : 'rgb(0, 0, 0)';
}

function getContrastingTextColor(hex: string): string {
    if (!hex) return '#000000';
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#1e293b' : '#ffffff';
}

const CssColorNames: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        setCopySuccess(`${value} کپی شد!`);
        setTimeout(() => setCopySuccess(''), 2000);
    };

    const filteredColors = useMemo(() => {
        return CSS_COLORS
            .filter(color => !activeFilter || color.group === activeFilter)
            .filter(color => color.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, activeFilter]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">نام رنگ‌ها در CSS</h1>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                       در این بخش می‌توانید لیستی از ۱۴۸ نام رنگ استاندارد تعریف شده در CSS را مشاهده کنید. برای دسترسی سریع‌تر، از جستجو و فیلترهای رنگی استفاده کنید. با کلیک بر روی نام، کد HEX یا RGB، مقدار آن در کلیپ‌بورد شما کپی می‌شود.
                    </p>

                    <div className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm py-4 mb-6">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="جستجوی نام رنگ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 pr-10 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button onClick={() => setActiveFilter(null)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${!activeFilter ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                همه
                            </button>
                            {COLOR_GROUPS.map(group => (
                                <button key={group} onClick={() => setActiveFilter(group)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeFilter === group ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                    {group}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredColors.map(color => {
                            const textColor = getContrastingTextColor(color.hex);
                            const rgbValue = hexToRgb(color.hex);
                            return (
                                <div key={color.name} className="rounded-lg shadow-md overflow-hidden flex flex-col" style={{ backgroundColor: color.hex }}>
                                    <div className="h-24 w-full"></div>
                                    <div className="p-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm flex-grow">
                                        <button onClick={() => handleCopy(color.name)} className="block w-full text-right font-bold text-lg hover:opacity-75" style={{ color: textColor }}>{color.name}</button>
                                        <div className="mt-2 text-sm font-mono space-y-1">
                                            <button onClick={() => handleCopy(color.hex)} className="block w-full text-right hover:opacity-75" style={{ color: textColor }}>{color.hex}</button>
                                            <button onClick={() => handleCopy(rgbValue)} className="block w-full text-right hover:opacity-75" style={{ color: textColor }}>{rgbValue}</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                     {filteredColors.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">هیچ رنگی با این مشخصات یافت نشد.</p>
                        </div>
                     )}
                </div>
            </main>
            {copySuccess && (
              <div className="fixed bottom-6 right-6 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg animate-fade-in-up z-50">
                {copySuccess}
              </div>
            )}
            <style>{`
                @keyframes fade-in-up { 
                    0% { opacity: 0; transform: translateY(10px); } 
                    100% { opacity: 1; transform: translateY(0); } 
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default CssColorNames;