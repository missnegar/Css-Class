
import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

type GradientType = 'linear' | 'radial';
interface ColorStop {
  id: number;
  color: string;
  position: number;
}

const FONT_FAMILIES = ['Vazirmatn', 'Lalezar', 'Cairo', 'Roboto', 'Poppins'];
const FONT_WEIGHTS = ['300', '400', '500', '700', 'bold'];

const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const TextGradientGenerator: React.FC = () => {
    const [text, setText] = useState('گرادیانت متن');
    const [gradientType, setGradientType] = useState<GradientType>('linear');
    const [angle, setAngle] = useState(45);
    const [colorStops, setColorStops] = useState<ColorStop[]>([
        { id: 1, color: '#8b5cf6', position: 0 },
        { id: 2, color: '#ec4899', position: 100 },
    ]);
    const [activeStopId, setActiveStopId] = useState<number | null>(1);
    const [fontSize, setFontSize] = useState(72);
    const [fontWeight, setFontWeight] = useState('700');
    const [fontFamily, setFontFamily] = useState('Lalezar');
    const [bgColor, setBgColor] = useState('#1e293b');
    const [copySuccess, setCopySuccess] = useState('');

    const activeColorStop = useMemo(() => colorStops.find(c => c.id === activeStopId), [colorStops, activeStopId]);

    const generatedGradient = useMemo(() => {
        const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
        const stopsString = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
        if (gradientType === 'linear') {
            return `linear-gradient(${angle}deg, ${stopsString})`;
        }
        return `radial-gradient(circle, ${stopsString})`;
    }, [gradientType, angle, colorStops]);

    const previewStyle: React.CSSProperties = {
        fontFamily: `'${fontFamily}', sans-serif`,
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        background: generatedGradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
    };

    const cssCode = `
.gradient-text {
  background: ${generatedGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* Additional font styles */
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
}`.trim();
    
     const htmlCode = `<h1 class="gradient-text">${text}</h1>`;

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    const updateActiveColor = (color: string) => {
        if (!activeStopId) return;
        setColorStops(stops => stops.map(s => s.id === activeStopId ? { ...s, color } : s));
    };
    
    const addColorStop = () => {
        const newStop: ColorStop = { id: Date.now(), color: '#ffffff', position: 50 };
        const newStops = [...colorStops, newStop].sort((a,b) => a.position - b.position);
        setColorStops(newStops);
        setActiveStopId(newStop.id);
    };

    const removeActiveColorStop = () => {
        if (!activeStopId || colorStops.length <= 2) return;
        const newStops = colorStops.filter(s => s.id !== activeStopId);
        setColorStops(newStops);
        setActiveStopId(newStops[0]?.id || null);
    };

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center transition-colors" style={{backgroundColor: bgColor}}>
                        <h1 style={previewStyle} className="text-center break-words">{text}</h1>
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات متن</h3>
                                <label className="block text-sm font-medium mb-2">متن نمایشی<input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" /></label>
                                <ControlSlider label="اندازه فونت" value={fontSize} onChange={setFontSize} min={24} max={150} unit="px" />
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        فونت
                                        <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">
                                            {FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
                                        </select>
                                    </label>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        وزن فونت
                                        <select value={fontWeight} onChange={e => setFontWeight(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">
                                            {FONT_WEIGHTS.map(w => <option key={w} value={w}>{w}</option>)}
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات گرادیانت</h3>
                                <div className="flex gap-2 text-sm p-1 bg-slate-100 dark:bg-slate-900 rounded-lg mb-4">
                                    <button onClick={() => setGradientType('linear')} className={`flex-1 p-2 rounded-md transition-colors ${gradientType === 'linear' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>خطی</button>
                                    <button onClick={() => setGradientType('radial')} className={`flex-1 p-2 rounded-md transition-colors ${gradientType === 'radial' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>دایره‌ای</button>
                                </div>
                                {gradientType === 'linear' && (
                                    <ControlSlider label="زاویه" value={angle} onChange={setAngle} min={0} max={360} step={1} unit="deg" />
                                )}
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">توقف‌های رنگی</label>
                                    <div className="h-8 rounded-md relative" style={{ background: generatedGradient }}>
                                        {colorStops.map(stop => (
                                            <button key={stop.id} onClick={() => setActiveStopId(stop.id)} className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 bg-white transition-all ${activeStopId === stop.id ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-slate-900 border-indigo-500 scale-125' : 'border-slate-400'}`} style={{ left: `${stop.position}%` }}></button>
                                        ))}
                                    </div>
                                </div>
                                {activeColorStop && (
                                    <div className="p-4 mt-4 bg-slate-100 dark:bg-slate-900 rounded-lg space-y-4">
                                        <div className="flex justify-between items-center">
                                           <h4 className="font-semibold">ویرایش رنگ</h4>
                                           <button onClick={removeActiveColorStop} disabled={colorStops.length <= 2} className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
                                               <TrashIcon className="w-4 h-4" />
                                           </button>
                                        </div>
                                        <input type="color" value={activeColorStop.color} onChange={e => updateActiveColor(e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                                        <ControlSlider label="موقعیت" value={activeColorStop.position} onChange={v => setColorStops(stops => stops.map(s => s.id === activeStopId ? { ...s, position: v } : s))} min={0} max={100} step={1} unit="%" />
                                    </div>
                                )}
                                <button onClick={addColorStop} className="w-full mt-4 flex items-center justify-center gap-2 p-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors">
                                    <PlusIcon className="w-4 h-4" /> افزودن رنگ
                                </button>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">پس‌زمینه پیش‌نمایش</h3>
                                <label className="flex-1">
                                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                                </label>
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
                      <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default TextGradientGenerator;
