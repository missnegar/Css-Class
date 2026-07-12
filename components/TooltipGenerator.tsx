import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

type Position = 'top' | 'bottom' | 'left' | 'right';
type Animation = 'fade' | 'scale';

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

const TooltipGenerator: React.FC = () => {
    const [elementText, setElementText] = useState('روی من هاور کن');
    const [tooltipText, setTooltipText] = useState('این یک Tooltip است!');
    const [position, setPosition] = useState<Position>('top');
    
    // Style
    const [bgColor, setBgColor] = useState('#1e293b');
    const [textColor, setTextColor] = useState('#ffffff');
    const [padding, setPadding] = useState(8);
    const [borderRadius, setBorderRadius] = useState(6);
    const [fontSize, setFontSize] = useState(14);
    const [showArrow, setShowArrow] = useState(true);

    // Animation
    const [animation, setAnimation] = useState<Animation>('fade');
    const [duration, setDuration] = useState(0.2);
    const [delay, setDelay] = useState(0);

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

    const { htmlCode, cssCode, previewStyle } = useMemo(() => {
        const arrowSize = 6;
        const positionStyles: { [key in Position]: { tooltip: string, arrow: string, transform: string }} = {
            top: {
                tooltip: `bottom: 100%; left: 50%; margin-bottom: ${arrowSize}px;`,
                arrow: `top: 100%; left: 50%; border-color: ${bgColor} transparent transparent transparent;`,
                transform: `translateX(-50%) translateY(${animation === 'scale' ? '10px' : '0'})`
            },
            bottom: {
                tooltip: `top: 100%; left: 50%; margin-top: ${arrowSize}px;`,
                arrow: `bottom: 100%; left: 50%; border-color: transparent transparent ${bgColor} transparent;`,
                transform: `translateX(-50%) translateY(${animation === 'scale' ? '-10px' : '0'})`
            },
            left: {
                tooltip: `right: 100%; top: 50%; margin-right: ${arrowSize}px;`,
                arrow: `left: 100%; top: 50%; border-color: transparent transparent transparent ${bgColor};`,
                transform: `translateY(-50%) translateX(${animation === 'scale' ? '10px' : '0'})`
            },
            right: {
                tooltip: `left: 100%; top: 50%; margin-left: ${arrowSize}px;`,
                arrow: `right: 100%; top: 50%; border-color: transparent ${bgColor} transparent transparent;`,
                transform: `translateY(-50%) translateX(${animation === 'scale' ? '-10px' : '0'})`
            }
        };

        const css = `
.tooltip-container {
  position: relative;
  display: inline-block;
}

/* Tooltip bubble */
.tooltip-container::before {
  content: attr(data-tooltip);
  position: absolute;
  ${positionStyles[position].tooltip}
  transform: ${positionStyles[position].transform};
  
  /* Styling */
  background-color: ${bgColor};
  color: ${textColor};
  padding: ${padding}px;
  border-radius: ${borderRadius}px;
  font-size: ${fontSize}px;
  white-space: nowrap;
  
  /* Hiding and animation */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s;
}

/* Tooltip arrow */
${showArrow ? `.tooltip-container::after {
  content: '';
  position: absolute;
  ${positionStyles[position].tooltip} /* Same position as bubble */
  ${positionStyles[position].arrow}
  transform: ${position.includes('X') ? 'translateY(-50%)' : 'translateX(-50%)'};
  border-width: ${arrowSize}px;
  border-style: solid;

  /* Hiding and animation */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s;
}` : ''}


/* Show on hover */
.tooltip-container:hover::before,
.tooltip-container:hover::after {
  opacity: 1;
  visibility: visible;
  transform: ${position.includes('X') ? 'translateY(-50%)' : 'translateX(-50%)'} scale(1);
}
        `.trim();
        
        return {
            htmlCode: `<div class="tooltip-container" data-tooltip="${tooltipText}">\n  <button class="your-element">${elementText}</button>\n</div>`,
            cssCode: css,
            previewStyle: css
        };
    }, [tooltipText, elementText, position, bgColor, textColor, padding, borderRadius, fontSize, showArrow, animation, duration, delay]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <style>{previewStyle}</style>
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="tooltip-container" data-tooltip={tooltipText}>
                            <button className="your-element px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                                {elementText}
                            </button>
                        </div>
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">محتوا</h3>
                                <label className="block text-sm font-medium mb-2">متن عنصر<input type="text" value={elementText} onChange={e => setElementText(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border rounded-md"/></label>
                                <label className="block text-sm font-medium">متن Tooltip<input type="text" value={tooltipText} onChange={e => setTooltipText(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border rounded-md"/></label>
                            </div>
                            
                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">موقعیت</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <button onClick={() => setPosition('top')} className={`p-2 rounded-md ${position === 'top' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>بالا</button>
                                    <button onClick={() => setPosition('bottom')} className={`p-2 rounded-md ${position === 'bottom' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>پایین</button>
                                    <button onClick={() => setPosition('left')} className={`p-2 rounded-md ${position === 'left' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>چپ</button>
                                    <button onClick={() => setPosition('right')} className={`p-2 rounded-md ${position === 'right' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>راست</button>
                                </div>
                            </div>

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                                <h3 className="text-lg font-semibold">استایل</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <ColorInput label="رنگ پس‌زمینه" value={bgColor} onChange={setBgColor} />
                                    <ColorInput label="رنگ متن" value={textColor} onChange={setTextColor} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <ControlSlider label="فاصله داخلی" value={padding} onChange={setPadding} min={4} max={20} unit="px" />
                                    <ControlSlider label="گردی گوشه" value={borderRadius} onChange={setBorderRadius} min={0} max={20} unit="px" />
                                </div>
                                <ControlSlider label="اندازه فونت" value={fontSize} onChange={setFontSize} min={10} max={24} unit="px" />
                                <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={showArrow} onChange={e => setShowArrow(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded"/>نمایش پیکان</label>
                            </div>
                            
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                                <h3 className="text-lg font-semibold">انیمیشن</h3>
                                <div className="flex gap-2 text-sm">
                                    <button onClick={() => setAnimation('fade')} className={`flex-1 p-2 rounded-md ${animation === 'fade' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>محو شدن</button>
                                    <button onClick={() => setAnimation('scale')} className={`flex-1 p-2 rounded-md ${animation === 'scale' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>بزرگنمایی</button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <ControlSlider label="سرعت" value={duration} onChange={setDuration} min={0.1} max={1} step={0.1} unit="s" />
                                    <ControlSlider label="تاخیر" value={delay} onChange={setDelay} min={0} max={1} step={0.1} unit="s" />
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
export default TooltipGenerator;