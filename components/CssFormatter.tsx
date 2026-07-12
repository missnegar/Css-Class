
import React, { useState, useCallback } from 'react';
import ResizablePanels from './ResizablePanels';
import WandIcon from './icons/WandIcon';
import CopyIcon from './icons/CopyIcon';
import TrashIcon from './icons/TrashIcon';
import { VscSparkle } from "react-icons/vsc";

const SAMPLES = {
  css: `
body{font-family: 'Vazirmatn'; padding: 20px;background:#f0f0f0}
a { color: #6366f1; text-decoration:none}
a:hover{text-decoration: underline}
.card{padding:1rem;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);background:white; }
`.trim(),
};

const CssFormatter: React.FC = () => {
  const [inputCode, setInputCode] = useState(SAMPLES.css);
  const [outputCode, setOutputCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<'format' | 'minify' | null>(null);
  const [copySuccess, setCopySuccess] = useState('');
  
  const [indentType, setIndentType] = useState<'spaces' | 'tabs'>('spaces');
  const [indentSize, setIndentSize] = useState(2);

  const handleCopy = (code: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code.trim()).then(() => {
        setCopySuccess('کپی شد!');
        setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
        setCopySuccess('خطا در کپی!');
        setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  const processCode = useCallback(async (action: 'format' | 'minify') => {
    if (!inputCode.trim()) {
        setError("لطفا مقداری کد CSS برای پردازش وارد کنید.");
        return;
    }
    setIsLoading(true);
    setLoadingAction(action);
    setError(null);
    setOutputCode('');

    try {
        const { default: prettier } = await import('https://esm.sh/prettier/standalone');
        const { default: parserCss } = await import('https://esm.sh/prettier/plugins/postcss');
        
        const options = action === 'minify'
            ? { parser: 'css', plugins: [parserCss], printWidth: 0 }
            : { parser: 'css', plugins: [parserCss], useTabs: indentType === 'tabs', tabWidth: indentSize };

        const processedCode = await prettier.format(inputCode, options);

        setOutputCode(processedCode);
    } catch (e: any) {
      setError(`خطا در پردازش کد: ${e.message}`);
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  }, [inputCode, indentType, indentSize]);
  
  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <main className="flex-grow flex flex-col min-h-0">
        <div className="p-4 md:px-8 shrink-0">
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">فرمت‌دهنده کد CSS</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                کد CSS فشرده یا نامرتب خود را با این ابزار آنلاین رایگان فرمت‌دهی کنید. با استفاده از این ابزار، خواندن و ویرایش کد شما بسیار آسان‌تر خواهد شد. ویرایشگر همچنین دارای شماره‌گذاری خطوط و هایلایت کردن سینتکس است. اگر می‌خواهید پهنای باند را ذخیره کنید، با این ویرایشگر گزینه فشرده‌سازی (minify) کد CSS خود را خواهید داشت.
            </p>
        </div>
        <div className="flex-grow flex min-h-0">
            <ResizablePanels>
                <div className="h-full flex flex-col p-4 pt-0 gap-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">ورودی</h3>
                        <div className="flex gap-2">
                            <button onClick={() => handleCopy(inputCode)} className="p-1.5 bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors" title="کپی کردن">
                                <CopyIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => setInputCode('')} className="p-1.5 bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors" title="پاک کردن">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="flex-grow w-full p-3 font-mono text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="کد CSS نامرتب خود را اینجا وارد کنید..."
                        spellCheck="false"
                    />
                </div>
                <div className="h-full flex flex-col p-4 pt-0 gap-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">خروجی</h3>
                        <button onClick={() => handleCopy(outputCode)} className="p-1.5 bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors" title="کپی کردن">
                            <CopyIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <textarea
                        value={outputCode}
                        readOnly
                        className="flex-grow w-full p-3 font-mono text-sm bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-md resize-none focus:outline-none"
                        placeholder="کد فرمت‌شده در اینجا نمایش داده می‌شود..."
                        spellCheck="false"
                    />
                </div>
            </ResizablePanels>
        </div>
      </main>
      <footer className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
          {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-md font-mono text-xs whitespace-pre-wrap">
                  {error}
              </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="font-semibold text-slate-700 dark:text-slate-300">تورفتگی (Indentation):</span>
                <div className="flex gap-2 text-sm bg-slate-200 dark:bg-slate-700/50 p-1 rounded-lg">
                    <button onClick={() => setIndentType('spaces')} className={`px-3 py-1 rounded-md transition-colors ${indentType === 'spaces' ? 'bg-white dark:bg-slate-800 shadow' : ''}`}>فاصله (Space)</button>
                    <button onClick={() => setIndentType('tabs')} className={`px-3 py-1 rounded-md transition-colors ${indentType === 'tabs' ? 'bg-white dark:bg-slate-800 shadow' : ''}`}>تب (Tab)</button>
                </div>
                 <div className="flex items-center gap-2">
                     <label htmlFor="indent-size">اندازه:</label>
                     <input 
                        id="indent-size"
                        type="number" 
                        value={indentSize}
                        onChange={e => setIndentSize(Number(e.target.value))}
                        min="1" max="8"
                        className="w-16 p-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md"
                     />
                 </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => processCode('minify')}
                    disabled={isLoading}
                    className="px-4 py-3 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-wait flex items-center gap-2 transition-colors"
                >
                    {isLoading && loadingAction === 'minify' ? (
                        <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            <span>...</span>
                        </>
                    ) : (
                        <>
                            <VscSparkle className="w-5 h-5" />
                            <span>فشرده‌سازی</span>
                        </>
                    )}
                </button>
                <button
                    onClick={() => processCode('format')}
                    disabled={isLoading}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-wait flex items-center gap-2 transition-colors"
                >
                    {isLoading && loadingAction === 'format' ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>در حال پردازش...</span>
                        </>
                    ) : (
                        <>
                            <WandIcon className="w-5 h-5" />
                            <span>فرمت کد</span>
                        </>
                    )}
                </button>
            </div>
          </div>
          {copySuccess && (
              <div className="fixed bottom-6 right-6 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg animate-fade-in-up z-50">
                {copySuccess}
              </div>
          )}
      </footer>
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
export default CssFormatter;