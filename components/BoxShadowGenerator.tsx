import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

const ControlSlider: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={onChange} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

function hexToRgba(hex: string, opacity: number): string {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255}, ${opacity})`;
    }
    // Fallback for invalid hex
    return `rgba(0, 0, 0, ${opacity})`;
}


const BoxShadowGenerator: React.FC = () => {
    const [hOffset, setHOffset] = useState(10);
    const [vOffset, setVOffset] = useState(10);
    const [blur, setBlur] = useState(5);
    const [spread, setSpread] = useState(0);
    const [color, setColor] = useState('#000000');
    const [opacity, setOpacity] = useState(0.5);
    const [inset, setInset] = useState(false);
    const [previewColor, setPreviewColor] = useState('#6366f1');
    const [copySuccess, setCopySuccess] = useState('');

    const boxShadowStyle = useMemo(() => {
        const rgbaColor = hexToRgba(color, opacity);
        return `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${rgbaColor}`;
    }, [hOffset, vOffset, blur, spread, color, opacity, inset]);
    
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const cssCode = `
.element {
  box-shadow: ${boxShadowStyle};
  /* For older browsers */
  -webkit-box-shadow: ${boxShadowStyle};
  -moz-box-shadow: ${boxShadowStyle};
}`.trim();

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    {/* Preview Pane */}
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="w-60 h-60 flex items-center justify-center text-white font-bold text-xl rounded-lg" style={{ boxShadow: boxShadowStyle, backgroundColor: previewColor }}>
                            پیش‌نمایش
                        </div>
                    </div>

                    {/* Controls Pane */}
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-5">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">تنظیمات سایه</h3>
                            
                            <ControlSlider label="فاصله افقی" value={hOffset} onChange={(e) => setHOffset(parseInt(e.target.value, 10))} min={-100} max={100} step={1} unit="px" />
                            <ControlSlider label="فاصله عمودی" value={vOffset} onChange={(e) => setVOffset(parseInt(e.target.value, 10))} min={-100} max={100} step={1} unit="px" />
                            <ControlSlider label="میزان محو شدگی" value={blur} onChange={(e) => setBlur(parseInt(e.target.value, 10))} min={0} max={100} step={1} unit="px" />
                            <ControlSlider label="میزان گستردگی" value={spread} onChange={(e) => setSpread(parseInt(e.target.value, 10))} min={-50} max={100} step={1} unit="px" />
                            <ControlSlider label="شفافیت" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} min={0} max={1} step={0.01} unit="" />

                            <div>
                                <label htmlFor="shadow-color-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">رنگ سایه</label>
                                <input type="color" id="shadow-color-input" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                            </div>
                            
                             <div>
                                <label htmlFor="preview-color-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">رنگ پیش‌نمایش</label>
                                <input type="color" id="preview-color-input" value={previewColor} onChange={(e) => setPreviewColor(e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="inset-checkbox"
                                    checked={inset}
                                    onChange={(e) => setInset(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inset-checkbox" className="text-sm font-medium text-slate-700 dark:text-slate-300">سایه داخلی (Inset)</label>
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>
            
            <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                <div className="h-full pt-2">
                    <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                </div>
            </ResizableFooter>
        </div>
    );
};

export default BoxShadowGenerator;