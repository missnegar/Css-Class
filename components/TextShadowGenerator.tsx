import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface ShadowLayer {
    id: number;
    hOffset: number;
    vOffset: number;
    blur: number;
    color: string;
}

const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const TextShadowGenerator: React.FC = () => {
    const [text, setText] = useState('سایه متن');
    const [textColor, setTextColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#1e293b');
    const [layers, setLayers] = useState<ShadowLayer[]>([
        { id: 1, hOffset: 2, vOffset: 2, blur: 4, color: '#000000' }
    ]);
    const [activeLayerId, setActiveLayerId] = useState<number>(1);
    const [copySuccess, setCopySuccess] = useState('');

    const activeLayer = useMemo(() => layers.find(l => l.id === activeLayerId), [layers, activeLayerId]);

    const textShadowValue = useMemo(() => {
        if (layers.length === 0) return 'none';
        return layers.map(l => `${l.hOffset}px ${l.vOffset}px ${l.blur}px ${l.color}`).join(', ');
    }, [layers]);
    
    const handleLayerChange = (prop: keyof Omit<ShadowLayer, 'id'>, value: string | number) => {
        setLayers(current => current.map(l => l.id === activeLayerId ? { ...l, [prop]: value } : l));
    };

    const addLayer = () => {
        const newLayer: ShadowLayer = {
            id: Date.now(),
            hOffset: 0, vOffset: 0, blur: 5, color: '#000000'
        };
        setLayers(current => [...current, newLayer]);
        setActiveLayerId(newLayer.id);
    };

    const removeLayer = (id: number) => {
        const newLayers = layers.filter(l => l.id !== id);
        setLayers(newLayers);
        if (activeLayerId === id) {
            setActiveLayerId(newLayers[0]?.id || 0);
        }
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
    
    const htmlCode = `<h1 class="shadowed-text">${text}</h1>`;
    const cssCode = `.shadowed-text {\n  color: ${textColor};\n  text-shadow: ${textShadowValue};\n}`;
    
    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center transition-colors" style={{ backgroundColor: bgColor }}>
                        <h1 className="text-7xl font-bold text-center" style={{ color: textColor, textShadow: textShadowValue }}>
                            {text}
                        </h1>
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات اصلی</h3>
                                <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full p-2 mb-4 bg-white dark:bg-slate-900 border rounded-md" placeholder="متن شما" />
                                <div className="grid grid-cols-2 gap-4">
                                    <label>رنگ متن<input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                    <label>رنگ پس‌زمینه<input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                </div>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">لایه‌های سایه</h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                    {layers.map((layer, index) => (
                                        <button key={layer.id} onClick={() => setActiveLayerId(layer.id)} className={`w-full text-right p-2 rounded-md flex items-center justify-between ${activeLayerId === layer.id ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: layer.color }}></div>
                                                <span className="text-sm">سایه {index + 1}</span>
                                            </div>
                                            <button onClick={(e) => { e.stopPropagation(); removeLayer(layer.id); }} className="p-1 text-red-500 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </button>
                                    ))}
                                </div>
                                <button onClick={addLayer} className="w-full mt-2 flex items-center justify-center gap-2 p-2 text-sm font-semibold bg-slate-200 dark:bg-slate-700 rounded-md">
                                    <PlusIcon className="w-4 h-4" /> افزودن لایه
                                </button>
                                {activeLayer && (
                                    <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg space-y-4">
                                        <h4 className="font-semibold">ویرایش لایه {layers.findIndex(l => l.id === activeLayer.id) + 1}</h4>
                                        <ControlSlider label="فاصله افقی" value={activeLayer.hOffset} onChange={v => handleLayerChange('hOffset', v)} min={-20} max={20} unit="px" />
                                        <ControlSlider label="فاصله عمودی" value={activeLayer.vOffset} onChange={v => handleLayerChange('vOffset', v)} min={-20} max={20} unit="px" />
                                        <ControlSlider label="میزان محو شدن" value={activeLayer.blur} onChange={v => handleLayerChange('blur', v)} min={0} max={40} unit="px" />
                                        <label>رنگ سایه<input type="color" value={activeLayer.color} onChange={e => handleLayerChange('color', e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                    </div>
                                )}
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
export default TextShadowGenerator;
