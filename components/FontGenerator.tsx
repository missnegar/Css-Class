import React, { useState, useMemo, useEffect } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

type FontMode = 'google' | 'custom';

const FONT_WEIGHTS = ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold'];
const FONT_STYLES = ['normal', 'italic', 'oblique'];

const FontGenerator: React.FC = () => {
    const [mode, setMode] = useState<FontMode>('google');
    const [copySuccess, setCopySuccess] = useState('');
    const [previewText, setPreviewText] = useState('کلاس CSS یک ابزار عالی است');
    
    // Google Fonts State
    const [googleFontUrl, setGoogleFontUrl] = useState('https://fonts.googleapis.com/css2?family=Lalezar&display=swap');
    
    // Custom Font State
    const [customFontName, setCustomFontName] = useState('MyCustomFont');
    const [customFontSrc, setCustomFontSrc] = useState('/fonts/my-font.woff2');
    const [customFontWeight, setCustomFontWeight] = useState('normal');
    const [customFontStyle, setCustomFontStyle] = useState('normal');

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    const { htmlCode, cssCode, previewFontFamily } = useMemo(() => {
        if (mode === 'google') {
            const familyNames = (googleFontUrl.match(/family=([^&:]+)/g) || [])
                .map(s => s.replace('family=', '').replace(/\+/g, ' '));
                
            const mainFamily = familyNames[0] || 'sans-serif';

            return {
                htmlCode: `<link href="${googleFontUrl}" rel="stylesheet">`,
                cssCode: `.my-element {\n  font-family: '${mainFamily}', sans-serif;\n}`,
                previewFontFamily: mainFamily,
            };
        } else { // Custom mode
            const fontFaceRule = `
@font-face {
  font-family: '${customFontName}';
  src: url('${customFontSrc}') format('woff2'); /* Or other formats */
  font-weight: ${customFontWeight};
  font-style: ${customFontStyle};
}`;
            return {
                htmlCode: `<style>\n${fontFaceRule.trim()}\n</style>`,
                cssCode: `.my-element {\n  font-family: '${customFontName}', sans-serif;\n}`,
                previewFontFamily: customFontName,
            };
        }
    }, [mode, googleFontUrl, customFontName, customFontSrc, customFontWeight, customFontStyle]);

    useEffect(() => {
        const styleId = 'dynamic-font-preview-style';
        let styleElement = document.getElementById(styleId) as HTMLStyleElement | null;
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        if (mode === 'google' && googleFontUrl) {
            styleElement.innerHTML = `@import url('${googleFontUrl}');`;
        } else if (mode === 'custom' && customFontName && customFontSrc) {
            styleElement.innerHTML = `
                @font-face {
                    font-family: '${customFontName}';
                    src: url('${customFontSrc}');
                    font-weight: ${customFontWeight};
                    font-style: ${customFontStyle};
                }
            `;
        } else {
            styleElement.innerHTML = '';
        }

        return () => {
            // Optional: remove style on component unmount if desired
            // styleElement?.remove();
        };
    }, [mode, googleFontUrl, customFontName, customFontSrc, customFontWeight, customFontStyle]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 space-y-4">
                        <textarea
                            value={previewText}
                            onChange={(e) => setPreviewText(e.target.value)}
                            className="w-full max-w-2xl h-64 p-4 text-3xl leading-relaxed text-center bg-white dark:bg-slate-800 rounded-lg shadow-inner resize-none"
                            style={{ fontFamily: `'${previewFontFamily}', Vazirmatn, sans-serif` }}
                        />
                         <input
                            type="text"
                            value={previewText}
                            onChange={(e) => setPreviewText(e.target.value)}
                            className="w-full max-w-2xl p-2 text-center bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 rounded-b-lg"
                            placeholder="متن پیش‌نمایش را اینجا ویرایش کنید"
                        />
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">نوع فونت</h3>
                                <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                                    <button onClick={() => setMode('google')} className={`flex-1 p-2 text-sm rounded-md transition-colors ${mode === 'google' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                        فونت‌های گوگل
                                    </button>
                                    <button onClick={() => setMode('custom')} className={`flex-1 p-2 text-sm rounded-md transition-colors ${mode === 'custom' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                        فونت اختصاصی
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                {mode === 'google' ? (
                                    <div className="space-y-4">
                                        <h4 className="text-md font-semibold">تنظیمات فونت گوگل</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">لینک کامل را از <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Google Fonts</a> کپی کرده و در کادر زیر قرار دهید.</p>
                                        <label className="block">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">آدرس لینک (URL)</span>
                                            <input
                                                type="url"
                                                value={googleFontUrl}
                                                onChange={(e) => setGoogleFontUrl(e.target.value)}
                                                placeholder="https://fonts.googleapis.com/css2?family=..."
                                                className="mt-1 w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md"
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <h4 className="text-md font-semibold">تنظیمات فونت اختصاصی</h4>
                                        <label className="block">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">نام فونت (font-family)</span>
                                            <input type="text" value={customFontName} onChange={(e) => setCustomFontName(e.target.value)} className="mt-1 w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" />
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">آدرس فایل فونت (src)</span>
                                            <input type="text" value={customFontSrc} onChange={(e) => setCustomFontSrc(e.target.value)} placeholder="/path/to/your/font.woff2" className="mt-1 w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" />
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <label className="block">
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">وزن (font-weight)</span>
                                                <select value={customFontWeight} onChange={(e) => setCustomFontWeight(e.target.value)} className="mt-1 w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">
                                                    {FONT_WEIGHTS.map(w => <option key={w} value={w}>{w}</option>)}
                                                </select>
                                            </label>
                                             <label className="block">
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">استایل (font-style)</span>
                                                <select value={customFontStyle} onChange={(e) => setCustomFontStyle(e.target.value)} className="mt-1 w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">
                                                    {FONT_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>

            <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                 <div className="h-full pt-2">
                    <ResizablePanels>
                      <CodeBlock title="کد HTML (برای قرار دادن در <head>)" code={htmlCode} onCopy={() => handleCopy(htmlCode)} />
                      <CodeBlock title="کد CSS (برای استفاده در استایل‌ها)" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default FontGenerator;