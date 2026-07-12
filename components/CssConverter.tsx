import React, { useState, useCallback } from 'react';
import ResizablePanels from './ResizablePanels';
import WandIcon from './icons/WandIcon';
import CopyIcon from './icons/CopyIcon';
import TrashIcon from './icons/TrashIcon';
import { GoogleGenAI } from "@google/genai";

type ConverterType = 'less' | 'scss' | 'stylus';

interface CssConverterProps {
  type: ConverterType;
}

const SAMPLES: Record<string, string> = {
  css: `
.nav {
  background-color: #333;
  color: white;
}
.nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav ul li {
  display: inline-block;
}
.nav ul li a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
.nav ul li a:hover {
  background-color: #555;
}`.trim(),
};

const TITLES: Record<ConverterType, string> = {
  less: 'مبدل CSS به LESS',
  scss: 'مبدل CSS به SCSS',
  stylus: 'مبدل CSS به Stylus',
};

const CssConverter: React.FC<CssConverterProps> = ({ type }) => {
  const [inputCode, setInputCode] = useState(SAMPLES['css']);
  const [outputCode, setOutputCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

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

  const handleConvert = useCallback(async () => {
    if (!inputCode.trim()) {
      setError('لطفاً کد CSS را برای تبدیل وارد کنید.');
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
      const prompt = `Convert the following CSS code to ${type.toUpperCase()} syntax. Provide only the converted code, without any explanation, comments, or markdown formatting.\n\nCSS Code:\n\`\`\`css\n${inputCode}\n\`\`\``;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      let resultText = response.text;
      // Clean up the response to remove markdown fences if they exist
      resultText = resultText.replace(/^```(scss|less|stylus|css)?\n/i, '').replace(/```$/, '');
      setOutputCode(resultText.trim());

    } catch (e: any) {
      console.error(e);
      setError(`An error occurred during conversion: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [inputCode, type]);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <header className="p-4 md:px-8 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{TITLES[type]}</h2>
      </header>
      <main className="flex-grow flex flex-col min-h-0">
        <ResizablePanels>
            <div className="h-full flex flex-col p-4 gap-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">CSS</h3>
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
                    placeholder="کد CSS خود را اینجا وارد کنید..."
                    spellCheck="false"
                />
            </div>
            <div className="h-full flex flex-col p-4 gap-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{type.toUpperCase()}</h3>
                    <button onClick={() => handleCopy(outputCode)} className="p-1.5 bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors" title="کپی کردن">
                        <CopyIcon className="w-4 h-4" />
                    </button>
                </div>
                <textarea
                    value={outputCode}
                    readOnly
                    className="flex-grow w-full p-3 font-mono text-sm bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-md resize-none focus:outline-none"
                    placeholder={`خروجی ${type.toUpperCase()} در اینجا نمایش داده می‌شود...`}
                    spellCheck="false"
                />
            </div>
        </ResizablePanels>
      </main>
      <footer className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
          {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-md font-mono text-xs whitespace-pre-wrap">
                  {error}
              </div>
          )}
          <div className="flex justify-end">
              <button
                  onClick={handleConvert}
                  disabled={isLoading}
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-wait flex items-center gap-2 transition-colors"
              >
                  {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>در حال تبدیل...</span>
                    </>
                  ) : (
                    <>
                        <WandIcon className="w-5 h-5" />
                        <span>تبدیل کن</span>
                    </>
                  )}
              </button>
          </div>
          {copySuccess && (
              <div className="absolute bottom-[100px] right-6 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg animate-fade-in-up z-50">
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

export default CssConverter;
