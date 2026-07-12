import React, { useState } from 'react';
import { CSS_CURSORS } from '../data/css-cursors';

const CssCursorViewer: React.FC = () => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = (value: string) => {
        const cssRule = `cursor: ${value};`;
        navigator.clipboard.writeText(cssRule);
        setCopySuccess(`${cssRule} کپی شد!`);
        setTimeout(() => setCopySuccess(''), 2000);
    };

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">نمایشگر نشانگر (Cursor) CSS</h1>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                        ویژگی `cursor` در CSS نوع نشانگر ماوس را هنگام قرار گرفتن روی یک عنصر مشخص می‌کند. در این بخش می‌توانید پیش‌نمایش تمام مقادیر ممکن را ببینید. روی هر مورد هاور کنید تا نشانگر تغییر کند و برای کپی کردن کد CSS کلیک کنید.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {CSS_CURSORS.map(cursor => (
                            <button
                                key={cursor.name}
                                onClick={() => handleCopy(cursor.name)}
                                className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md hover:ring-2 hover:ring-indigo-500 transition-all text-center flex flex-col items-center justify-center h-28"
                                style={{ cursor: cursor.name }}
                                title={`کپی: cursor: ${cursor.name};`}
                            >
                                <span className="font-mono text-sm text-slate-700 dark:text-slate-200 mb-2">{cursor.name}</span>
                                <code className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded w-full text-center">
                                    cursor: {cursor.name};
                                </code>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            {copySuccess && (
              <div className="fixed bottom-6 right-6 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 animate-fade-in-up">
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

export default CssCursorViewer;