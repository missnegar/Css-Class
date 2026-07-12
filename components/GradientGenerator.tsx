import React, { useState, useMemo, useRef } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import { PRESET_GRADIENTS } from '../data/gradient-presets';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

type GradientType = 'linear' | 'radial';
interface ColorStop {
  id: number;
  color: string;
  position: number;
}

const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);


const GradientGenerator: React.FC = () => {
    const [gradientType, setGradientType] = useState<GradientType>('linear');
    const [angle, setAngle] = useState(90);
    const [colorStops, setColorStops] = useState<ColorStop[]>([
        { id: 1, color: '#6366f1', position: 0 },
        { id: 2, color: '#ec4899', position: 100 },
    ]);
    const [activeStopId, setActiveStopId] = useState<number | null>(1);
    const [copySuccess, setCopySuccess] = useState('');
    const gradientBarRef = useRef<HTMLDivElement>(null);

    const activeColorStop = useMemo(() => colorStops.find(c => c.id === activeStopId), [colorStops, activeStopId]);

    const generatedGradient = useMemo(() => {
        const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
        const stopsString = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');

        if (gradientType === 'linear') {
            return `linear-gradient(${angle}deg, ${stopsString})`;
        }
        return `radial-gradient(circle, ${stopsString})`;
    }, [gradientType, angle, colorStops]);

    const cssCode = `
.gradient-element {
  background: ${colorStops.length > 0 ? colorStops[0].color : '#ffffff'}; /* Fallback for old browsers */
  background: ${generatedGradient};
}`.trim();

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    const applyPreset = (gradientCss: string) => {
        const linearMatch = gradientCss.match(/linear-gradient\(([^,]+),(.+)\)/);
        const radialMatch = gradientCss.match(/radial-gradient\((.+)\)/);

        if (linearMatch) {
            setGradientType('linear');
            setAngle(parseInt(linearMatch[1], 10) || 0);
            const stops = linearMatch[2].trim().split(/,(?![^(]*\))/);
            const newStops = stops.map((stop, index) => {
                const parts = stop.trim().split(/\s+/);
                return {
                    id: Date.now() + index,
                    color: parts[0],
                    position: parseFloat(parts[1])
                };
            });
            setColorStops(newStops);
            setActiveStopId(newStops[0]?.id || null);
        } else if (radialMatch) {
             setGradientType('radial');
             const stops = radialMatch[1].replace('circle,', '').trim().split(/,(?![^(]*\))/);
             const newStops = stops.map((stop, index) => {
                const parts = stop.trim().split(/\s+/);
                return {
                    id: Date.now() + index,
                    color: parts[0],
                    position: parseFloat(parts[1])
                };
            });
            setColorStops(newStops);
            setActiveStopId(newStops[0]?.id || null);
        }
    };
    
    const updateActiveColor = (color: string) => {
        if (!activeStopId) return;
        setColorStops(stops => stops.map(s => s.id === activeStopId ? { ...s, color } : s));
    };
    
    const addColorStop = () => {
        const newStop: ColorStop = {
            id: Date.now(),
            color: '#ffffff',
            position: 50,
        };
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
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="w-full h-full max-w-xl max-h-xl aspect-square rounded-lg shadow-lg" style={{ background: generatedGradient }}></div>
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto no-scrollbar">
                         <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">گرادیانت‌های آماده</h3>
                             <div className="grid grid-cols-4 gap-2">
                                 {PRESET_GRADIENTS.map(preset => (
                                     <button key={preset.name} onClick={() => applyPreset(preset.gradient)} className="group">
                                         <div className="aspect-square rounded-md ring-2 ring-transparent group-hover:ring-indigo-500 transition-all" style={{ background: preset.gradient }}></div>
                                         <span className="text-xs font-medium mt-1 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{preset.name}</span>
                                     </button>
                                 ))}
                             </div>
                        </div>
                        <div className="flex-grow p-4 space-y-4">
                             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">گرادیانت سفارشی</h3>
                             <div className="flex gap-2 text-sm p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
                                <button onClick={() => setGradientType('linear')} className={`flex-1 p-2 rounded-md transition-colors ${gradientType === 'linear' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>خطی</button>
                                <button onClick={() => setGradientType('radial')} className={`flex-1 p-2 rounded-md transition-colors ${gradientType === 'radial' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>دایره‌ای</button>
                            </div>
                            {gradientType === 'linear' && (
                                <ControlSlider label="زاویه" value={angle} onChange={setAngle} min={0} max={360} step={1} unit="deg" />
                            )}
                             <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">توقف‌های رنگی</label>
                                <div ref={gradientBarRef} className="h-8 rounded-md relative" style={{ background: generatedGradient }}>
                                    {colorStops.map(stop => (
                                        <button key={stop.id} onClick={() => setActiveStopId(stop.id)} className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 bg-white transition-all ${activeStopId === stop.id ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-slate-900 border-indigo-500 scale-125' : 'border-slate-400'}`} style={{ left: `${stop.position}%` }}></button>
                                    ))}
                                </div>
                            </div>
                            {activeColorStop && (
                                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg space-y-4">
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
                             <button onClick={addColorStop} className="w-full flex items-center justify-center gap-2 p-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors">
                                <PlusIcon className="w-4 h-4" /> افزودن رنگ
                            </button>
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

export default GradientGenerator;