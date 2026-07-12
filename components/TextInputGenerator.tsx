import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

// Helper components
const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const ColorInput: React.FC<{label: string, value: string, onChange: (v: string) => void}> = 
({ label, value, onChange }) => (
    <div className="flex-1">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
    </div>
);

const TextInputGenerator: React.FC = () => {
    // General
    const [paddingY, setPaddingY] = useState(10);
    const [paddingX, setPaddingX] = useState(12);
    const [fontSize, setFontSize] = useState(16);
    const [borderRadius, setBorderRadius] = useState(8);

    // Default state
    const [bgColor, setBgColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#1e293b');
    const [borderColor, setBorderColor] = useState('#cbd5e1');
    const [borderWidth, setBorderWidth] = useState(1);
    const [placeholderColor, setPlaceholderColor] = useState('#94a3b8');

    // Focus state
    const [focusBorderColor, setFocusBorderColor] = useState('#6366f1');
    const [focusShadow, setFocusShadow] = useState(true);

    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const { cssCode, previewStyle } = useMemo(() => {
        const focusBoxShadow = focusShadow ? `0 0 0 3px ${focusBorderColor}40` : 'none';
        const css = `
.custom-input {
  padding: ${paddingY}px ${paddingX}px;
  font-size: ${fontSize}px;
  color: ${textColor};
  background-color: ${bgColor};
  border: ${borderWidth}px solid ${borderColor};
  border-radius: ${borderRadius}px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
}

.custom-input:focus {
  border-color: ${focusBorderColor};
  box-shadow: ${focusBoxShadow};
}

.custom-input::placeholder {
  color: ${placeholderColor};
  opacity: 1; /* Firefox */
}
        `.trim();

        const preview = `
#preview-input.custom-input {
  padding: ${paddingY}px ${paddingX}px;
  font-size: ${fontSize}px;
  color: ${textColor};
  background-color: ${bgColor};
  border: ${borderWidth}px solid ${borderColor};
  border-radius: ${borderRadius}px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
}
#preview-input.custom-input:focus {
  border-color: ${focusBorderColor};
  box-shadow: ${focusBoxShadow};
}
#preview-input.custom-input::placeholder {
  color: ${placeholderColor};
  opacity: 1;
}
        `.trim();
        return { cssCode: css, previewStyle: preview };
    }, [paddingY, paddingX, fontSize, borderRadius, bgColor, textColor, borderColor, borderWidth, placeholderColor, focusBorderColor, focusShadow]);
    
    const htmlCode = `<input type="text" class="custom-input" placeholder="متن نمونه...">`;
    
    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
             <style>{previewStyle}</style>
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <input id="preview-input" type="text" className="custom-input max-w-sm" placeholder="متن نمونه..." />
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات کلی</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <ControlSlider label="فاصله داخلی عمودی" value={paddingY} onChange={setPaddingY} min={0} max={20} unit="px" />
                                    <ControlSlider label="فاصله داخلی افقی" value={paddingX} onChange={setPaddingX} min={0} max={20} unit="px" />
                                    <ControlSlider label="اندازه فونت" value={fontSize} onChange={setFontSize} min={12} max={24} unit="px" />
                                    <ControlSlider label="گردی گوشه" value={borderRadius} onChange={setBorderRadius} min={0} max={20} unit="px" />
                                </div>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">حالت عادی</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <ColorInput label="رنگ پس‌زمینه" value={bgColor} onChange={setBgColor} />
                                        <ColorInput label="رنگ متن" value={textColor} onChange={setTextColor} />
                                    </div>
                                    <ControlSlider label="ضخامت حاشیه" value={borderWidth} onChange={setBorderWidth} min={0} max={4} unit="px" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <ColorInput label="رنگ حاشیه" value={borderColor} onChange={setBorderColor} />
                                        <ColorInput label="رنگ Placeholder" value={placeholderColor} onChange={setPlaceholderColor} />
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">حالت Focus</h3>
                                <div className="space-y-4">
                                    <ColorInput label="رنگ حاشیه" value={focusBorderColor} onChange={setFocusBorderColor} />
                                    <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={focusShadow} onChange={e => setFocusShadow(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded"/>فعال‌سازی سایه</label>
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
export default TextInputGenerator;
