import React, { useState, useMemo, useEffect } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import { PRESETS } from '../data/input-range-presets';

type ThumbShape = 'circle' | 'square';

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


const InputRangeGenerator: React.FC = () => {
    const [trackHeight, setTrackHeight] = useState(8);
    const [trackBg, setTrackBg] = useState('#d1d5db');
    const [trackProgressBg, setTrackProgressBg] = useState('#6366f1');
    const [trackBorderRadius, setTrackBorderRadius] = useState(4);

    const [thumbSize, setThumbSize] = useState(20);
    const [thumbShape, setThumbShape] = useState<ThumbShape>('circle');
    const [thumbBg, setThumbBg] = useState('#4f46e5');
    const [thumbShadow, setThumbShadow] = useState('0 0 5px rgba(0,0,0,0.3)');

    const [hasTooltip, setHasTooltip] = useState(false);
    const [hasProgress, setHasProgress] = useState(true);
    
    const [copySuccess, setCopySuccess] = useState('');
    const [previewValue, setPreviewValue] = useState(50);

    const applyPreset = (preset: typeof PRESETS[0]) => {
        setTrackHeight(preset.styles.trackHeight);
        setTrackBg(preset.styles.trackBg);
        setTrackProgressBg(preset.styles.trackProgressBg);
        setTrackBorderRadius(preset.styles.trackBorderRadius);
        setThumbSize(preset.styles.thumbSize);
        setThumbShape(preset.styles.thumbShape);
        setThumbBg(preset.styles.thumbBg);
        setThumbShadow(preset.styles.thumbShadow);
        setHasTooltip(preset.tooltip);
        setHasProgress(preset.progress);
    };

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
        const thumbBorderRadius = thumbShape === 'circle' ? '50%' : '4px';
        const progressStyle = hasProgress 
            ? `background: linear-gradient(to right, ${trackProgressBg} var(--progress), ${trackBg} var(--progress));`
            : `background: ${trackBg};`;

        return `
.custom-range-container {
  position: relative;
  width: 100%;
}

.custom-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${trackHeight}px;
  border-radius: ${trackBorderRadius}px;
  ${progressStyle}
  outline: none;
  transition: opacity .2s;
  cursor: pointer;
}

/* Thumb Styles */
.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: ${thumbSize}px;
  height: ${thumbSize}px;
  background: ${thumbBg};
  border-radius: ${thumbBorderRadius};
  box-shadow: ${thumbShadow};
  border: none;
  margin-top: ${-(thumbSize - trackHeight) / 2}px; /* Center thumb */
}

.custom-range::-moz-range-thumb {
  width: ${thumbSize}px;
  height: ${thumbSize}px;
  background: ${thumbBg};
  border-radius: ${thumbBorderRadius};
  box-shadow: ${thumbShadow};
  border: none;
}
${hasTooltip ? `
.range-tooltip {
  position: absolute;
  bottom: 100%;
  left: var(--pos);
  transform: translateX(-50%) translateY(-8px);
  background-color: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}
` : ''}
`.trim();
    }, [trackHeight, trackBg, trackProgressBg, trackBorderRadius, thumbSize, thumbShape, thumbBg, thumbShadow, hasProgress, hasTooltip]);
    
    const generatedHtml = `
<div class="custom-range-container">
  <input type="range" min="0" max="100" value="50" class="custom-range" id="myRange">
  ${hasTooltip ? '<output class="range-tooltip" for="myRange"></output>' : ''}
</div>`.trim();

    const generatedJs = useMemo(() => {
        if (!hasProgress && !hasTooltip) return '';
        return `
const rangeInput = document.getElementById('myRange');
${hasTooltip ? `const tooltip = document.querySelector('.range-tooltip');` : ''}

function updateRangeVisuals(input) {
  const min = input.min || 0;
  const max = input.max || 100;
  const value = input.value;
  const progress = ((value - min) / (max - min)) * 100;
  
  ${hasProgress ? `input.style.setProperty('--progress', progress + '%');` : ''}
  
  ${hasTooltip ? `
  tooltip.textContent = value;
  const thumbWidth = ${thumbSize}; // as set in CSS
  const trackWidth = input.offsetWidth;
  const thumbPosition = (progress / 100) * (trackWidth - thumbWidth) + (thumbWidth / 2);
  tooltip.style.setProperty('--pos', thumbPosition + 'px');
  ` : ''}
}

// Initial update
updateRangeVisuals(rangeInput);

// Update on input
rangeInput.addEventListener('input', (e) => {
  updateRangeVisuals(e.target);
});
`.trim();
    }, [hasProgress, hasTooltip, thumbSize]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                         <div className="w-full max-w-sm p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                             <style>{generatedCss}</style>
                             <div className="custom-range-container">
                                <input 
                                    type="range" 
                                    min="0" max="100" 
                                    value={previewValue}
                                    onChange={e => setPreviewValue(Number(e.target.value))}
                                    className="custom-range"
                                    style={{ '--progress': hasProgress ? `${previewValue}%` : '0%' } as React.CSSProperties}
                                />
                                {hasTooltip && (
                                    <output className="range-tooltip" style={{'--pos': `calc(${previewValue}% + (${10 - previewValue * 0.2}px))` } as React.CSSProperties}>
                                        {previewValue}
                                    </output>
                                )}
                             </div>
                         </div>
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto no-scrollbar">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">قالب‌های آماده</h3>
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                 {PRESETS.map(preset => (
                                     <button key={preset.name} onClick={() => applyPreset(preset)} className="text-center group p-3 bg-slate-100 dark:bg-slate-900 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                                         <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{preset.name}</span>
                                     </button>
                                 ))}
                             </div>
                        </div>
                         <div className="flex-grow p-4 space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">سفارشی‌سازی</h3>
                             <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg space-y-3">
                                <h4 className="font-semibold">نوار (Track)</h4>
                                <ControlSlider label="ارتفاع" value={trackHeight} onChange={setTrackHeight} min={2} max={20} unit="px" />
                                <ControlSlider label="گردی گوشه" value={trackBorderRadius} onChange={setTrackBorderRadius} min={0} max={trackHeight / 2} unit="px" />
                                <div className="flex gap-4">
                                    <ColorInput label="پس‌زمینه" value={trackBg} onChange={setTrackBg} />
                                    <ColorInput label="پس‌زمینه پیشرفت" value={trackProgressBg} onChange={setTrackProgressBg} />
                                </div>
                             </div>
                             <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg space-y-3">
                                <h4 className="font-semibold">دستگیره (Thumb)</h4>
                                 <ControlSlider label="اندازه" value={thumbSize} onChange={setThumbSize} min={10} max={40} unit="px" />
                                 <ColorInput label="رنگ" value={thumbBg} onChange={setThumbBg} />
                                 <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">شکل</label>
                                    <div className="flex gap-2 text-sm">
                                        <button onClick={() => setThumbShape('circle')} className={`flex-1 p-2 rounded-md transition-colors ${thumbShape === 'circle' ? 'bg-indigo-600 text-white shadow' : 'bg-white dark:bg-slate-800'}`}>گرد</button>
                                        <button onClick={() => setThumbShape('square')} className={`flex-1 p-2 rounded-md transition-colors ${thumbShape === 'square' ? 'bg-indigo-600 text-white shadow' : 'bg-white dark:bg-slate-800'}`}>مربع</button>
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
                      <div className="h-full flex flex-col gap-2">
                        <CodeBlock title="کد CSS" code={generatedCss} onCopy={() => handleCopy(generatedCss)} />
                        {generatedJs && <CodeBlock title="کد JavaScript (اختیاری)" code={generatedJs} onCopy={() => handleCopy(generatedJs)} />}
                      </div>
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default InputRangeGenerator;