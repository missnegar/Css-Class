import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

function hexToRgb(hex: string): {r: number, g: number, b: number} | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const RgbaGenerator: React.FC = () => {
    const [color, setColor] = useState('#6366f1');
    const [opacity, setOpacity] = useState(0.75);
    const [copySuccess, setCopySuccess] = useState('');

    const { rgbString, rgbaString } = useMemo(() => {
        const rgb = hexToRgb(color);
        if (!rgb) return { rgbString: 'rgb(0, 0, 0)', rgbaString: 'rgba(0, 0, 0, 1)' };
        return {
            rgbString: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            rgbaString: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity.toFixed(2)})`
        };
    }, [color, opacity]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    const htmlCode = `<div class="my-element">محتوای من</div>`;
    
    const cssHexCode = `
.my-element {
  /* 
    کد هگزادسیمال (HEX) به تنهایی شفافیت را پشتیبانی نمی‌کند.
    برای افزودن شفافیت به رنگ HEX، باید از ویژگی 'opacity' به صورت جداگانه استفاده کنید.
    مقدار 1 کاملاً مات و 0 کاملاً شفاف است.
  */
  background-color: ${color};
  opacity: ${opacity.toFixed(2)};
}
    `.trim();

    const cssRgbaCode = `
.my-element {
  /*
    فرمت RGBA (Red, Green, Blue, Alpha) بهترین راه برای تعریف رنگ به همراه شفافیت است.
    سه مقدار اول (R, G, B) بین 0 تا 255 هستند.
    مقدار چهارم (Alpha) برای شفافیت است و بین 0.0 (شفاف) تا 1.0 (مات) قرار می‌گیرد.
  */
  background-color: ${rgbaString};
}
    `.trim();

    const previewStyle: React.CSSProperties = {
        backgroundColor: rgbaString,
    };

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    {/* Preview Pane */}
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div 
                            className="w-72 h-48 rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold transition-colors"
                            style={{
                                ...previewStyle,
                                color: opacity > 0.5 ? '#FFFFFF' : '#000000'
                             }}
                        >
                            دکمه نمونه
                        </div>
                    </div>

                    {/* Controls Pane */}
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">تنظیمات رنگ</h3>
                            <div>
                                <label htmlFor="color-picker" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">انتخاب رنگ</label>
                                <input 
                                    type="color" 
                                    id="color-picker"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full h-12 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"
                                />
                            </div>
                            <div>
                                <label htmlFor="opacity-slider" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">شفافیت (Opacity): {opacity.toFixed(2)}</label>
                                <input
                                    type="range"
                                    id="opacity-slider"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={opacity}
                                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600"
                                />
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-3">
                                <h4 className="text-md font-semibold text-slate-800 dark:text-slate-100">مقادیر رنگ</h4>
                                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-md font-mono text-sm text-slate-700 dark:text-slate-200">
                                    <p><span className="font-semibold">HEX:</span> {color}</p>
                                </div>
                                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-md font-mono text-sm text-slate-700 dark:text-slate-200">
                                    <p><span className="font-semibold">RGB:</span> {rgbString}</p>
                                </div>
                                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-md font-mono text-sm text-slate-700 dark:text-slate-200">
                                    <p><span className="font-semibold">RGBA:</span> {rgbaString}</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>
            
            <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                <div className="h-full pt-2">
                    <ResizablePanels>
                      <CodeBlock title="کد HTML" code={htmlCode} onCopy={() => handleCopy(htmlCode)} />
                      <div className="h-full flex flex-col gap-2">
                        <CodeBlock title="CSS (روش HEX + Opacity)" code={cssHexCode} onCopy={() => handleCopy(cssHexCode)} />
                        <CodeBlock title="CSS (روش RGBA)" code={cssRgbaCode} onCopy={() => handleCopy(cssRgbaCode)} />
                      </div>
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default RgbaGenerator;