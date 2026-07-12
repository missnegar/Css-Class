import React, { useState, useEffect } from 'react';
import ResizablePanels from './ResizablePanels';

const defaultHtml = `
<h1>سلام دنیا!</h1>
<p>این یک ویرایشگر زنده است.</p>
<button class="my-button">کلیک کن</button>
`.trim();

const defaultCss = `
body {
  font-family: sans-serif;
  text-align: center;
  padding: 2rem;
  background-color: #f0f8ff;
}

.my-button {
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

.my-button:hover {
    transform: scale(1.1);
}
`.trim();

const OnlineCssEditor: React.FC = () => {
    const [htmlCode, setHtmlCode] = useState(defaultHtml);
    const [cssCode, setCssCode] = useState(defaultCss);
    const [iframeContent, setIframeContent] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIframeContent(`
                <html>
                    <head>
                        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap" rel="stylesheet">
                        <style>
                          body { font-family: 'Vazirmatn', sans-serif; direction: rtl; }
                          ${cssCode}
                        </style>
                    </head>
                    <body>${htmlCode}</body>
                </html>
            `);
        }, 300); // Debounce updates

        return () => clearTimeout(timeout);
    }, [htmlCode, cssCode]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <header className="p-4 md:px-8 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">ویرایشگر آنلاین CSS</h2>
            </header>
            <main className="flex-grow flex flex-col min-h-0">
                <div className="flex-grow flex min-h-0">
                    <ResizablePanels>
                        <div className="h-full flex flex-col p-4 gap-2">
                           <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">HTML</h3>
                            <textarea
                                value={htmlCode}
                                onChange={(e) => setHtmlCode(e.target.value)}
                                className="flex-grow w-full p-3 font-mono text-sm bg-white dark:bg-slate-800 border rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                spellCheck="false"
                            />
                        </div>
                        <div className="h-full flex flex-col p-4 gap-2">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">CSS</h3>
                            <textarea
                                value={cssCode}
                                onChange={(e) => setCssCode(e.target.value)}
                                className="flex-grow w-full p-3 font-mono text-sm bg-white dark:bg-slate-800 border rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                spellCheck="false"
                            />
                        </div>
                    </ResizablePanels>
                </div>
                 <div className="h-[40%] border-t-2 border-slate-300 dark:border-slate-700 p-4 flex flex-col gap-2 shrink-0">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">پیش‌نمایش</h3>
                     <iframe
                        srcDoc={iframeContent}
                        title="Live Preview"
                        className="w-full h-full border border-slate-300 dark:border-slate-700 rounded-md bg-white"
                        sandbox="allow-scripts"
                    />
                </div>
            </main>
        </div>
    );
};

export default OnlineCssEditor;
