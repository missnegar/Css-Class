import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const TextRotateGenerator: React.FC = () => {
    const [text, setText] = useState('چرخش متن');
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [skewX, setSkewX] = useState(0);
    const [skewY, setSkewY] = useState(0);
    const [copySuccess, setCopySuccess] = useState('');

    const transformValue = useMemo(() => {
        return `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg) skewX(${skewX}deg) skewY(${skewY}deg)`;
    }, [translateX, translateY, scale, rotate, skewX, skewY]);
    
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    const htmlCode = `<div class="transformed-text">${text}</div>`;
    const cssCode = `.transformed-text {\n  transform: ${transformValue};\n}`;
    
    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="h-full w-full p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 overflow-hidden">
                        <div className="text-5xl font-bold text-slate-800 dark:text-slate-200 transition-transform duration-200" style={{ transform: transformValue }}>
                            {text}
                        </div>
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">محتوا</h3>
                                <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" />
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Transform Properties</h3>
                                <div className="space-y-4">
                                    <ControlSlider label="جابجایی افقی (TranslateX)" value={translateX} onChange={setTranslateX} min={-100} max={100} unit="px" />
                                    <ControlSlider label="جابجایی عمودی (TranslateY)" value={translateY} onChange={setTranslateY} min={-100} max={100} unit="px" />
                                    <ControlSlider label="مقیاس (Scale)" value={scale} onChange={setScale} min={0.5} max={2} step={0.05} unit="" />
                                    <ControlSlider label="چرخش (Rotate)" value={rotate} onChange={setRotate} min={-180} max={180} unit="deg" />
                                    <ControlSlider label="کج شدن افقی (SkewX)" value={skewX} onChange={setSkewX} min={-45} max={45} unit="deg" />
                                    <ControlSlider label="کج شدن عمودی (SkewY)" value={skewY} onChange={setSkewY} min={-45} max={45} unit="deg" />
                                </div>
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>
             <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full z-50">{copySuccess}</div>}
                <div className="h-full pt-2">
                    <ResizablePanels>
                        <CodeBlock title="کد HTML" code={htmlCode} onCopy={() => handleCopy(htmlCode)} />
                        <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};
export default TextRotateGenerator;
