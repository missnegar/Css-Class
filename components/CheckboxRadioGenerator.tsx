import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

// Helper component for sliders
const ControlSlider: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={onChange} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

// Helper component for color inputs
const ColorInput: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = 
({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <input type="color" value={value} onChange={onChange} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
    </div>
);

const CheckboxRadioGenerator: React.FC = () => {
    // State for controls
    const [size, setSize] = useState(24);
    const [borderRadius, setBorderRadius] = useState(6);
    const [borderWidth, setBorderWidth] = useState(2);
    
    // Default state colors
    const [bgColor, setBgColor] = useState('#ffffff');
    const [borderColor, setBorderColor] = useState('#94a3b8');
    
    // Checked state colors
    const [checkedBgColor, setCheckedBgColor] = useState('#6366f1');
    const [checkedBorderColor, setCheckedBorderColor] = useState('#6366f1');
    const [iconColor, setIconColor] = useState('#ffffff');

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

    const generatedCss = useMemo(() => {
        const checkmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="${encodeURIComponent(iconColor)}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-7"/></svg>`;
        const checkmarkDataUri = `url("data:image/svg+xml,${encodeURIComponent(checkmarkSvg)}")`;

        return `
.custom-checkbox, .custom-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem; /* 8px */
  font-size: 1rem; /* 16px */
}

.custom-checkbox input,
.custom-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-checkbox .checkmark,
.custom-radio .checkmark {
  position: relative;
  display: inline-block;
  width: ${size}px;
  height: ${size}px;
  background-color: ${bgColor};
  border: ${borderWidth}px solid ${borderColor};
  transition: all 0.2s ease;
}

/* Checkbox specific styles */
.custom-checkbox .checkmark {
  border-radius: ${borderRadius}px;
}

.custom-checkbox input:checked + .checkmark {
  background-color: ${checkedBgColor};
  border-color: ${checkedBorderColor};
  background-image: ${checkmarkDataUri};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
}

/* Radio specific styles */
.custom-radio .checkmark {
  border-radius: 50%;
}

.custom-radio .checkmark::after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${Math.round(size * 0.5)}px;
  height: ${Math.round(size * 0.5)}px;
  border-radius: 50%;
  background-color: ${iconColor};
}

.custom-radio input:checked + .checkmark {
  background-color: ${checkedBgColor};
  border-color: ${checkedBorderColor};
}

.custom-radio input:checked + .checkmark::after {
  display: block;
}

/* Focus styles */
.custom-checkbox input:focus-visible + .checkmark,
.custom-radio input:focus-visible + .checkmark {
  outline: 2px solid ${checkedBorderColor};
  outline-offset: 2px;
}
        `.trim();
    }, [size, borderRadius, borderWidth, bgColor, borderColor, checkedBgColor, checkedBorderColor, iconColor]);
    
    const generatedHtml = `
<!-- Checkbox Example -->
<label class="custom-checkbox">
  <input type="checkbox" name="option" checked>
  <span class="checkmark"></span>
  گزینه اول
</label>

<!-- Radio Button Example -->
<label class="custom-radio">
  <input type="radio" name="radio-group">
  <span class="checkmark"></span>
  انتخاب اول
</label>
<label class="custom-radio">
  <input type="radio" name="radio-group" checked>
  <span class="checkmark"></span>
  انتخاب دوم
</label>
    `.trim();

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    {/* Preview Pane */}
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <style>{generatedCss}</style>
                        <div className="flex flex-col gap-6 items-start p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                             <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 self-center">پیش‌نمایش</h3>
                             <label className="custom-checkbox text-slate-800 dark:text-slate-200">
                                <input type="checkbox" name="preview-checkbox"/>
                                <span className="checkmark"></span>
                                Checkbox (Unchecked)
                            </label>
                            <label className="custom-checkbox text-slate-800 dark:text-slate-200">
                                <input type="checkbox" name="preview-checkbox" defaultChecked/>
                                <span className="checkmark"></span>
                                Checkbox (Checked)
                            </label>
                            <div className="w-full border-t border-slate-300 dark:border-slate-700 my-2"></div>
                            <label className="custom-radio text-slate-800 dark:text-slate-200">
                                <input type="radio" name="preview-radio-group"/>
                                <span className="checkmark"></span>
                                Radio (Unchecked)
                            </label>
                            <label className="custom-radio text-slate-800 dark:text-slate-200">
                                <input type="radio" name="preview-radio-group" defaultChecked/>
                                <span className="checkmark"></span>
                                Radio (Checked)
                            </label>
                        </div>
                    </div>

                    {/* Controls Pane */}
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات کلی</h3>
                                <ControlSlider label="اندازه" value={size} onChange={(e) => setSize(parseInt(e.target.value, 10))} min={12} max={48} step={1} unit="px" />
                                <ControlSlider label="ضخامت حاشیه" value={borderWidth} onChange={(e) => setBorderWidth(parseInt(e.target.value, 10))} min={0} max={10} step={1} unit="px" />
                                <ControlSlider label="گردی گوشه (Checkbox)" value={borderRadius} onChange={(e) => setBorderRadius(parseInt(e.target.value, 10))} min={0} max={size / 2} step={1} unit="px" />
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">حالت عادی</h3>
                                 <div className="grid grid-cols-2 gap-4">
                                    <ColorInput label="رنگ پس‌زمینه" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                                    <ColorInput label="رنگ حاشیه" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
                                 </div>
                            </div>
                            
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                 <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">حالت انتخاب شده</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <ColorInput label="رنگ پس‌زمینه" value={checkedBgColor} onChange={(e) => setCheckedBgColor(e.target.value)} />
                                    <ColorInput label="رنگ حاشیه" value={checkedBorderColor} onChange={(e) => setCheckedBorderColor(e.target.value)} />
                                    <div className="col-span-2">
                                        <ColorInput label="رنگ آیکون (تیک/نقطه)" value={iconColor} onChange={(e) => setIconColor(e.target.value)} />
                                    </div>
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
                      <CodeBlock title="کد HTML" code={generatedHtml} onCopy={() => handleCopy(generatedHtml)} />
                      <CodeBlock title="کد CSS" code={generatedCss} onCopy={() => handleCopy(generatedCss)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default CheckboxRadioGenerator;