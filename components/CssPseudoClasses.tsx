import React, { useState } from 'react';
import { PSEUDO_DATA, PseudoItem, PseudoCategory } from '../data/css-pseudo-classes';
import CodeBlock from './CodeBlock';
import ChromeIcon from './icons/ChromeIcon';
import FirefoxIcon from './icons/FirefoxIcon';
import SafariIcon from './icons/SafariIcon';
import EdgeIcon from './icons/EdgeIcon';
import OperaIcon from './icons/OperaIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import XIcon from './icons/XIcon';

const BrowserSupportView: React.FC<{ support: PseudoItem['browserSupport'] }> = ({ support }) => {
    const browsers = [
        { name: 'Chrome', icon: ChromeIcon, version: support.chrome },
        { name: 'Firefox', icon: FirefoxIcon, version: support.firefox },
        { name: 'Safari', icon: SafariIcon, version: support.safari },
        { name: 'Edge', icon: EdgeIcon, version: support.edge },
        { name: 'Opera', icon: OperaIcon, version: support.opera },
    ];

    const renderSupport = (version: string | true) => {
        if (version === true) {
            return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
        }
        if (version === 'No') {
            return <XIcon className="w-4 h-4 text-red-500" />;
        }
        return <span>{version}+</span>;
    };

    return (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
            {browsers.map(browser => (
                <div key={browser.name} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <browser.icon className="w-10 h-10 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{browser.name}</p>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center gap-1">
                        {renderSupport(browser.version)}
                    </div>
                </div>
            ))}
        </div>
    );
};

const DetailView: React.FC<{ item: PseudoItem; onBack: () => void; }> = ({ item, onBack }) => {
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
                    text-align: right;
                }
                .dark body {
                    color: #e2e8f0;
                }
                ${item.example.css}
            </style>
        </head>
        <body>
            ${item.example.html}
        </body>
        </html>
    `;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
             <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mb-6">
                <ChevronLeftIcon className="w-5 h-5 transform rotate-180" />
                بازگشت به لیست
            </button>
            <h2 className="text-3xl font-bold font-mono text-slate-800 dark:text-slate-100 mb-2">{item.name}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{item.description}</p>
            
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold mb-3">سینتکس</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-700 dark:text-slate-200">
                        {item.syntax}
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
                           <CodeBlock title="HTML" code={item.example.html} onCopy={()=>{}}/>
                           <CodeBlock title="CSS" code={item.example.css} onCopy={()=>{}}/>
                       </div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-3">پشتیبانی مرورگرها</h3>
                    <BrowserSupportView support={item.browserSupport} />
                </div>
            </div>
        </div>
    );
};

const ListView: React.FC<{ onSelectItem: (item: PseudoItem) => void; }> = ({ onSelectItem }) => {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">شبه-کلاس‌ها و شبه-عناصر CSS</h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                شبه-کلاس‌ها و شبه-عناصر به شما این امکان را می‌دهند که به استایل‌دهی عناصری بپردازید که در حالت‌های خاصی قرار دارند (مانند هاور شدن) یا بخش‌های خاصی از یک عنصر را هدف قرار دهید (مانند حرف اول متن).
            </p>
            <div className="space-y-10">
                {PSEUDO_DATA.map(category => (
                    <div key={category.name}>
                        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-2">{category.name}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{category.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.items.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => onSelectItem(item)}
                                    className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-lg hover:ring-2 hover:ring-indigo-500 transition-all text-right"
                                >
                                    <h3 className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">{item.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-3">
                                        {item.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CssPseudoClasses: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<PseudoItem | null>(null);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
                {selectedItem ? (
                    <DetailView item={selectedItem} onBack={() => setSelectedItem(null)} />
                ) : (
                    <ListView onSelectItem={setSelectedItem} />
                )}
            </main>
            <style>{`
                @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default CssPseudoClasses;
