import React, { useState, useMemo } from 'react';
import { CSS_SHAPES } from '../data/css-shapes';
import CodeBlock from './CodeBlock';

const CssShapes: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code.trim());
    setCopySuccess('کپی شد!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  // Generate all CSS rules needed for the preview area
  const allPreviewCss = useMemo(() => {
    return CSS_SHAPES.map(shape => 
        // Replace the generic ".shape" class with a unique one for the preview
        shape.css.replace(/\.shape/g, `.shape-preview-${shape.id}`)
    ).join('\n\n');
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <style>{allPreviewCss}</style>
      <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">اشکال CSS</h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            مجموعه‌ای از اشکال هندسی که تنها با استفاده از HTML و CSS ساخته شده‌اند. می‌توانید کد هر شکل را کپی کرده و در پروژه‌های خود استفاده کنید.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CSS_SHAPES.map(shape => (
              <div key={shape.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col">
                <h3 className="text-lg font-semibold p-4 border-b border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">{shape.name}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[250px] flex-grow">
                  <div className="p-6 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                    <div className={`shape-preview-${shape.id}`}></div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex flex-col">
                    <CodeBlock title="CSS" code={shape.css.trim()} onCopy={() => handleCopy(shape.css.trim())} />
                  </div>
                </div>
              </div>
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

export default CssShapes;
