import React, { useState, useMemo } from 'react';
import { CSS_FUNCTIONS_DATA, CssFunction } from '../data/css-functions';
import CodeBlock from './CodeBlock';
import ChromeIcon from './icons/ChromeIcon';
import FirefoxIcon from './icons/FirefoxIcon';
import SafariIcon from './icons/SafariIcon';
import EdgeIcon from './icons/EdgeIcon';
import OperaIcon from './icons/OperaIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

const BrowserSupportView: React.FC<{ support: CssFunction['browserSupport'] }> = ({ support }) => {
    const browsers = [
        { name: 'Chrome', icon: ChromeIcon, version: support.chrome },
        { name: 'Firefox', icon: FirefoxIcon, version: support.firefox },
        { name: 'Safari', icon: SafariIcon, version: support.safari },
        { name: 'Edge', icon: EdgeIcon, version: support.edge },
        { name: 'Opera', icon: OperaIcon, version: support.opera },
    ];
    return (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
            {browsers.map(browser => (
                <div key={browser.name} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <browser.icon className="w-10 h-10 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{browser.name}</p>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center gap-1">
                        {browser.version === true ? <CheckCircleIcon className="w-4 h-4 text-green-500" /> : <span>{browser.version}+</span>}
                    </div>
                </div>
            ))}
        </div>
    );
};

const DetailView: React.FC<{ func: CssFunction; onBack: () => void; }> = ({ func, onBack }) => {
    const isDark = document.documentElement.classList.contains('dark');
    const iframeContent = `
        <!DOCTYPE html>
        <html lang="fa" dir="rtl" class="${isDark ? 'dark' : ''}">
        <head>
            <meta charset="UTF-8">
            <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap" rel="stylesheet">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body {
                    margin: 0;
                    padding: 1rem;
                    font-family: 'Vazirmatn', sans-serif;
                    background-color: transparent;
                    color: #334155;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100%;
                    box-sizing: border-box;
                }
                .dark body {
                    color: #e2e8f0;
                }
                ${func.example.css}
            </style>
        </head>
        <body>
            ${func.example.html}
        </body>
        </html>
    `;
    
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
             <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mb-6">
                <ChevronLeftIcon className="w-5 h-5 transform rotate-180" />
                بازگشت به لیست
            </button>
            <h2 className="text-3xl font-bold font-mono text-slate-800 dark:text-slate-100 mb-2">{func.name}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{func.description}</p>
            
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold mb-3">سینتکس</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-700 dark:text-slate-200">
                        {func.syntax}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-3">مثال کاربردی</h3>
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                       <div className="p-4 bg-white dark:bg-slate-800">
                           <h4 className="text-sm font-bold mb-2">پیش‌نمایش</h4>
                            <iframe
                                srcDoc={iframeContent}
                                title="CSS Preview"
                                className="w-full h-48 border-0 rounded-md bg-transparent"
                                loading="lazy"
                            />
                       </div>
                       <div className="h-full flex flex-col gap-4 bg-slate-50 dark:bg-slate-800/50 p-4">
                           <CodeBlock title="HTML" code={func.example.html} onCopy={()=>{}}/>
                           <CodeBlock title="CSS" code={func.example.css} onCopy={()=>{}}/>
                       </div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-3">پشتیبانی مرورگرها</h3>
                    <BrowserSupportView support={func.browserSupport} />
                </div>
            </div>
        </div>
    );
};

const ListView: React.FC<{ onSelectFunction: (func: CssFunction) => void; }> = ({ onSelectFunction }) => {
    const sortedFunctions = useMemo(() =>
        [...CSS_FUNCTIONS_DATA].sort((a, b) => a.name.localeCompare(b.name)),
        []
    );
    
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">توابع CSS</h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                توابع CSS مقادیری هستند که می‌توانند پارامترهایی را برای پردازش و بازگرداندن یک مقدار برای یک ویژگی CSS بپذیرند. این توابع به شما اجازه می‌دهند تا مقادیر پویا، محاسبات ریاضی و عملیات پیچیده‌تری را مستقیماً در کدهای CSS خود انجام دهید.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {sortedFunctions.map(func => (
                    <button 
                        key={func.id}
                        onClick={() => onSelectFunction(func)}
                        className="p-3 bg-white dark:bg-slate-800 rounded-md shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-right font-mono text-sm"
                    >
                        {func.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

const CssFunctions: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = useState<CssFunction | null>(null);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
        {selectedFunction ? (
          <DetailView func={selectedFunction} onBack={() => setSelectedFunction(null)} />
        ) : (
          <ListView onSelectFunction={setSelectedFunction} />
        )}
      </main>
       <style>{`
            @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
            .animate-fade-in { animation: fade-in 0.3s ease-out; }
        `}</style>
    </div>
  );
};

export default CssFunctions;