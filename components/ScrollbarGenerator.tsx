import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

// Helper components
const ControlSlider: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={onChange} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const ColorInput: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = 
({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <input type="color" value={value} onChange={onChange} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
    </div>
);

// Darken color helper for hover effect
const darkenColor = (hex: string, percent: number): string => {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);
    R = parseInt(String(R * (100 - percent) / 100));
    G = parseInt(String(G * (100 - percent) / 100));
    B = parseInt(String(B * (100 - percent) / 100));
    R = (R < 255) ? R : 255; G = (G < 255) ? G : 255; B = (B < 255) ? B : 255;
    const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
    const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
    const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);
    return '#' + RR + GG + BB;
};


const ScrollbarGenerator: React.FC = () => {
    const [thumbColor, setThumbColor] = useState('#6366f1');
    const [trackColor, setTrackColor] = useState('#e5e7eb');
    const [thickness, setThickness] = useState(12);
    const [borderRadius, setBorderRadius] = useState(6);
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
        const thumbHoverColor = darkenColor(thumbColor, 15);
        const thumbBorderWidth = Math.max(1, Math.floor(thickness / 4));

        return `
/* For Webkit-based browsers (Chrome, Safari, Edge) */
.custom-scrollbar::-webkit-scrollbar {
  width: ${thickness}px;
  height: ${thickness}px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: ${trackColor};
  border-radius: ${borderRadius}px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: ${thumbColor};
  border-radius: ${borderRadius}px;
  border: ${thumbBorderWidth}px solid ${trackColor};
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: ${thumbHoverColor};
}

/* For Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: ${thumbColor} ${trackColor};
}
        `.trim();
    }, [thumbColor, trackColor, thickness, borderRadius]);
    
    const htmlCode = `
<div class="custom-scrollbar">
  <!-- Your scrollable content here -->
</div>
    `.trim();

    const previewContent = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ".repeat(10);


    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <style>{generatedCss}</style>
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    {/* Preview Pane */}
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="w-full max-w-lg h-96 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-inner overflow-auto custom-scrollbar">
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-right">{previewContent}</p>
                        </div>
                    </div>

                    {/* Controls Pane */}
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">تنظیمات اسکرول‌بار</h3>
                            
                            <ControlSlider label="ضخامت" value={thickness} onChange={(e) => setThickness(parseInt(e.target.value, 10))} min={4} max={24} step={1} unit="px" />
                            <ControlSlider label="گردی گوشه" value={borderRadius} onChange={(e) => setBorderRadius(parseInt(e.target.value, 10))} min={0} max={thickness/2} step={1} unit="px" />

                            <div className="grid grid-cols-2 gap-4">
                                <ColorInput label="رنگ دستگیره" value={thumbColor} onChange={(e) => setThumbColor(e.target.value)} />
                                <ColorInput label="رنگ نوار" value={trackColor} onChange={(e) => setTrackColor(e.target.value)} />
                            </div>
                            
                            <div className="text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg">
                                <h4 className="font-bold mb-1">سازگاری مرورگر</h4>
                                <p>استایل‌دهی اسکرول‌بار عمدتاً در مرورگرهای مبتنی بر WebKit (کروم، سافاری، اج) و فایرفاکس پشتیبانی می‌شود. کد تولید شده شامل پیشوندهای لازم برای این مرورگرها است.</p>
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
                      <CodeBlock title="کد CSS" code={generatedCss} onCopy={() => handleCopy(generatedCss)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default ScrollbarGenerator;