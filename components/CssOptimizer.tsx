import React, { useState, useCallback } from 'react';
import ResizablePanels from './ResizablePanels';
import WandIcon from './icons/WandIcon';
import CopyIcon from './icons/CopyIcon';
import TrashIcon from './icons/TrashIcon';
import { GoogleGenAI } from "@google/genai";

const CssOptimizer: React.FC = () => {
  const [inputCode, setInputCode] = useState('/* کد CSS خود را برای بهینه‌سازی اینجا وارد کنید */\n.unused-class {\n  color: red;\n}\n\n.my-box {\n  padding-top: 10px;\n  padding-right: 20px;\n  padding-bottom: 10px;\n  padding-left: 20px;\n  background: #ffffff;\n}');
  const [outputCode, setOutputCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = (code: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopySuccess('کپی شد!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  const handleOptimize = useCallback(async () => {
    if (!inputCode.trim()) {
      setError('لطفاً کد CSS را برای بهینه‌سازی وارد کنید.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutputCode('');

    try {
       if (!process.env.API_KEY) {
        throw new Error("API Key not found.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Optimize the following CSS code for performance and reduce its file size. Combine redundant selectors, remove unused styles (if it's obvious), use shorthand properties, and remove vendor prefixes that are no longer necessary for modern browsers. Provide only the optimized CSS code, without any explanation, comments, or markdown formatting.\n\nCSS Code:\n\`\`\`css\n${inputCode}\n\`\`\``;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      let resultText = response.text;
      resultText = resultText.replace(/^```(css)?\n/i, '').replace(/```$/, '');
      setOutputCode(resultText.trim());

    } catch (e: any) {
      console.error(e);
      setError(`خطا در بهینه‌سازی: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [inputCode]);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <header className="p-4 md:px-8 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">بهینه‌ساز کد CSS</h2>
      </header>
      <main className="flex-grow flex flex-col min-h-0">
        <ResizablePanels>
            {/* Input Panel */}
            <div className="h-full flex flex-col p-4 gap-2">
                 <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">ورودی</h3>
                    <div className="flex gap-2">
                        <button onClick={() => handleCopy(inputCode)} title="کپی" className="p-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-md"><CopyIcon className="w-4 h-4" /></button>
                        <button onClick={() => setInputCode('')} title="پاک کردن" className="p-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-md"><TrashIcon className="w-4 h-4" /></button>
                    </div>
                </div>
                <textarea
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-grow w-full p-3 font-mono text-sm bg-white dark:bg-slate-800 border rounded-md resize-none"
                    spellCheck="false"
                />
            </div>
            {/* Output Panel */}
            <div className="h-full flex flex-col p-4 gap-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">خروجی بهینه‌شده</h3>
                    <button onClick={() => handleCopy(outputCode)} title="کپی" className="p-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-md"><CopyIcon className="w-4 h-4" /></button>
                </div>
                <textarea
                    value={outputCode}
                    readOnly
                    className="flex-grow w-full p-3 font-mono text-sm bg-slate-100 dark:bg-slate-900/50 border rounded-md resize-none"
                    spellCheck="false"
                />
            </div>
        </ResizablePanels>
      </main>
      <footer className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-xs">{error}</div>}
          <div className="flex justify-end">
              <button onClick={handleOptimize} disabled={isLoading} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2">
                  {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <WandIcon className="w-5 h-5" />}
                  <span>{isLoading ? 'در حال پردازش...' : 'بهینه‌سازی کن'}</span>
              </button>
          </div>
          {copySuccess && <div className="fixed bottom-6 right-6 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50">{copySuccess}</div>}
      </footer>
    </div>
  );
};

export default CssOptimizer;
