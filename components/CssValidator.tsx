import React, { useState, useCallback } from 'react';
import WandIcon from './icons/WandIcon';
import TrashIcon from './icons/TrashIcon';
import { GoogleGenAI } from "@google/genai";

const CssValidator: React.FC = () => {
  const [inputCode, setInputCode] = useState('a {\n  color: #ff0000;\n  padding: 10px\n}\n\ndiv {\n  backgroud: blue;\n}');
  const [validationResult, setValidationResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleValidate = useCallback(async () => {
    if (!inputCode.trim()) {
      setError('لطفاً کد CSS را برای اعتبارسنجی وارد کنید.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setValidationResult('');

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key not found.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Validate the following CSS code. Identify any syntax errors, potential issues (like typos in property names), or bad practices. Provide a list of findings with line numbers and clear explanations in Persian. If there are no issues, state that the code is valid.\n\nCSS Code:\n\`\`\`css\n${inputCode}\n\`\`\``;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setValidationResult(response.text.trim());

    } catch (e: any) {
      console.error(e);
      setError(`خطا در اعتبارسنجی: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [inputCode]);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <header className="p-4 md:px-8 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">اعتبارسنج کد CSS</h2>
      </header>
      <main className="flex-grow p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">کد CSS</h3>
                <button onClick={() => setInputCode('')} title="پاک کردن" className="p-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-md"><TrashIcon className="w-4 h-4" /></button>
            </div>
            <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-grow w-full p-3 font-mono text-sm bg-white dark:bg-slate-800 border rounded-md resize-none"
                spellCheck="false"
            />
        </div>
        <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">نتیجه اعتبارسنجی</h3>
            <div className="flex-grow w-full p-4 bg-slate-100 dark:bg-slate-900/50 border rounded-md overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    </div>
                ) : validationResult ? (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 dark:text-slate-300">{validationResult}</pre>
                ) : (
                    <p className="text-slate-500 text-center mt-8">نتیجه در اینجا نمایش داده می‌شود.</p>
                )}
            </div>
        </div>
      </main>
      <footer className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-xs">{error}</div>}
          <div className="flex justify-end">
              <button onClick={handleValidate} disabled={isLoading} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2">
                  <WandIcon className="w-5 h-5" />
                  <span>{isLoading ? 'در حال بررسی...' : 'اعتبارسنجی کن'}</span>
              </button>
          </div>
      </footer>
    </div>
  );
};

export default CssValidator;