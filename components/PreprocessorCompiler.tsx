import React, { useState, useCallback, useMemo } from 'react';
import ResizablePanels from './ResizablePanels';
import WandIcon from './icons/WandIcon';
import CopyIcon from './icons/CopyIcon';
import TrashIcon from './icons/TrashIcon';

type CompilerType = 'less' | 'scss' | 'stylus';

interface PreprocessorCompilerProps {
  type: CompilerType;
}

const SAMPLES: Record<CompilerType, string> = {
  less: `@width: 10px;\n@height: @width + 10px;\n\n#header {\n  width: @width;\n  height: @height;\n  color: darken(#444, 20%);\n}`,
  scss: `$font-stack: Helvetica, sans-serif;\n$primary-color: #333;\n\nbody {\n  font: 100% $font-stack;\n  color: $primary-color;\n}\n\nnav {\n  ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n  }\n  li { display: inline-block; }\n  a {\n    display: block;\n    padding: 6px 12px;\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n}`,
  stylus: `font-size = 14px\nprimary-color = #333\n\nbody\n  font font-size Arial, sans-serif\n  color primary-color\n\na\n  color primary-color\n  &:hover\n    color darken(primary-color, 25%)`,
};

const TITLES: Record<CompilerType, string> = {
  less: 'کامپایلر LESS به CSS',
  scss: 'کامپایلر SCSS به CSS',
  stylus: 'کامپایلر Stylus به CSS',
};

const PreprocessorCompiler: React.FC<PreprocessorCompilerProps> = ({ type }) => {
  const [inputCode, setInputCode] = useState(SAMPLES[type]);
  const [outputCode, setOutputCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
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

  const handleCompile = useCallback(async () => {
    setIsCompiling(true);
    setError(null);
    setOutputCode('');

    try {
      if (type === 'less') {
        const { default: less } = await import('https://esm.sh/less');
        less.render(inputCode, (err, output) => {
          if (err) {
            setError(`Error: ${err.message}\nLine: ${err.line}, Column: ${err.column}`);
          } else if (output) {
            setOutputCode(output.css);
          }
          setIsCompiling(false);
        });
      } else if (type === 'scss') {
        const { default: Sass } = await import('https://esm.sh/sass.js/dist/sass.sync.js');
        Sass.compile(inputCode, (result) => {
          if (result.status === 0) {
            setOutputCode(result.text || '');
          } else {
            setError(result.formatted || 'An unknown SCSS error occurred.');
          }
          setIsCompiling(false);
        });
      } else if (type === 'stylus') {
        const { default: stylus } = await import('https://esm.sh/stylus');
        stylus(inputCode).render((err, css) => {
          if (err) {
            setError(err.message);
          } else {
            setOutputCode(css);
          }
          setIsCompiling(false);
        });
      }
    } catch (e: any) {
      setError(`Failed to load compiler: ${e.message}`);
      setIsCompiling(false);
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
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{type.toUpperCase()}</h3>
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
                    placeholder={`کد ${type.toUpperCase()} خود را اینجا وارد کنید...`}
                    spellCheck="false"
                />
            </div>
            <div className="h-full flex flex-col p-4 gap-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">CSS</h3>
                    <button onClick={() => handleCopy(outputCode)} className="p-1.5 bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors" title="کپی کردن">
                        <CopyIcon className="w-4 h-4" />
                    </button>
                </div>
                <textarea
                    value={outputCode}
                    readOnly
                    className="flex-grow w-full p-3 font-mono text-sm bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-md resize-none focus:outline-none"
                    placeholder="خروجی CSS در اینجا نمایش داده می‌شود..."
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
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-wait flex items-center gap-2 transition-colors"
              >
                  {isCompiling ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>در حال کامپایل...</span>
                    </>
                  ) : (
                    <>
                        <WandIcon className="w-5 h-5" />
                        <span>کامپایل کن</span>
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

export default PreprocessorCompiler;