import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import { PRESETS, FilterValues, DropShadowValues } from '../data/image-filter-presets';
import ResetIcon from './icons/ResetIcon';

const PREVIEW_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';

const INITIAL_FILTERS: FilterValues = {
  blur: 0, brightness: 100, contrast: 100, grayscale: 0, 
  'hue-rotate': 0, invert: 0, opacity: 100, saturate: 100, sepia: 0,
};

const INITIAL_SHADOW: DropShadowValues = {
    hOffset: 0, vOffset: 0, blur: 0, color: '#000000'
};

const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const ImageFilterGenerator: React.FC = () => {
    const [filters, setFilters] = useState<FilterValues>(INITIAL_FILTERS);
    const [shadow, setShadow] = useState<DropShadowValues>(INITIAL_SHADOW);
    const [copySuccess, setCopySuccess] = useState('');

    const handleFilterChange = (key: keyof FilterValues, value: number) => {
        setFilters(f => ({ ...f, [key]: value }));
    };
    
    const handleShadowChange = (key: keyof DropShadowValues, value: string | number) => {
        setShadow(s => ({ ...s, [key]: value }));
    };

    const resetFilters = () => {
        setFilters(INITIAL_FILTERS);
        setShadow(INITIAL_SHADOW);
    };

    const applyPreset = (preset: typeof PRESETS[0]) => {
        setFilters({ ...INITIAL_FILTERS, ...preset.filters });
        setShadow({ ...INITIAL_SHADOW, ...preset.dropShadow });
    }
    
    const generatedFilterValue = useMemo(() => {
        const filterParts = (Object.keys(filters) as Array<keyof FilterValues>)
            .map(key => {
                const value = filters[key];
                const initialValue = INITIAL_FILTERS[key];
                if (value === initialValue) return null;

                switch (key) {
                    case 'blur': return `blur(${value}px)`;
                    case 'hue-rotate': return `hue-rotate(${value}deg)`;
                    default: return `${key}(${value}%)`;
                }
            })
            .filter(Boolean);

        const shadowValue = (shadow.hOffset !== 0 || shadow.vOffset !== 0 || shadow.blur !== 0)
            ? `drop-shadow(${shadow.hOffset}px ${shadow.vOffset}px ${shadow.blur}px ${shadow.color})`
            : null;
        
        if (shadowValue) filterParts.push(shadowValue);

        return filterParts.join(' ') || 'none';
    }, [filters, shadow]);


    const cssCode = `
.filtered-image {
  filter: ${generatedFilterValue};
  -webkit-filter: ${generatedFilterValue};
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

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
              <ResizablePanels>
                <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                    <img
                        src={PREVIEW_IMAGE}
                        alt="Preview"
                        className="w-full h-auto max-w-[400px] object-contain rounded-lg shadow-xl"
                        style={{ filter: generatedFilterValue }}
                    />
                </div>
                <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto no-scrollbar">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                         <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">فیلترهای آماده</h3>
                         <div className="grid grid-cols-4 gap-2">
                             {PRESETS.map(preset => {
                                 const presetFilterValue = Object.entries(preset.filters)
                                    .map(([key, value]) => {
                                         switch (key) {
                                            case 'blur': return `blur(${value}px)`;
                                            case 'hue-rotate': return `hue-rotate(${value}deg)`;
                                            default: return `${key}(${value}%)`;
                                        }
                                    }).join(' ');

                                 return (
                                     <button key={preset.name} onClick={() => applyPreset(preset)} className="text-center group">
                                         <div className="aspect-square rounded-md overflow-hidden ring-2 ring-transparent group-hover:ring-indigo-500 transition-all">
                                            <img src={PREVIEW_IMAGE} className="w-full h-full object-cover" style={{ filter: presetFilterValue }} alt={preset.name} />
                                         </div>
                                         <span className="text-xs font-medium mt-1 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{preset.name}</span>
                                     </button>
                                 )
                             })}
                         </div>
                    </div>
                    <div className="flex-grow p-4 space-y-4">
                         <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">فیلترها</h3>
                            <button onClick={resetFilters} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                                <ResetIcon className="w-4 h-4"/>
                                بازنشانی
                            </button>
                        </div>
                        <ControlSlider label="Blur" value={filters.blur} onChange={v => handleFilterChange('blur', v)} min={0} max={20} step={1} unit="px" />
                        <ControlSlider label="Brightness" value={filters.brightness} onChange={v => handleFilterChange('brightness', v)} min={0} max={200} step={1} unit="%" />
                        <ControlSlider label="Contrast" value={filters.contrast} onChange={v => handleFilterChange('contrast', v)} min={0} max={200} step={1} unit="%" />
                        <ControlSlider label="Grayscale" value={filters.grayscale} onChange={v => handleFilterChange('grayscale', v)} min={0} max={100} step={1} unit="%" />
                        <ControlSlider label="Hue Rotate" value={filters['hue-rotate']} onChange={v => handleFilterChange('hue-rotate', v)} min={0} max={360} step={1} unit="deg" />
                        <ControlSlider label="Invert" value={filters.invert} onChange={v => handleFilterChange('invert', v)} min={0} max={100} step={1} unit="%" />
                        <ControlSlider label="Opacity" value={filters.opacity} onChange={v => handleFilterChange('opacity', v)} min={0} max={100} step={1} unit="%" />
                        <ControlSlider label="Saturate" value={filters.saturate} onChange={v => handleFilterChange('saturate', v)} min={0} max={200} step={1} unit="%" />
                        <ControlSlider label="Sepia" value={filters.sepia} onChange={v => handleFilterChange('sepia', v)} min={0} max={100} step={1} unit="%" />
                        
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">سایه (Drop Shadow)</h3>
                            <ControlSlider label="فاصله افقی" value={shadow.hOffset} onChange={v => handleShadowChange('hOffset', v)} min={-50} max={50} unit="px" />
                            <ControlSlider label="فاصله عمودی" value={shadow.vOffset} onChange={v => handleShadowChange('vOffset', v)} min={-50} max={50} unit="px" />
                            <ControlSlider label="میزان محو شدگی" value={shadow.blur} onChange={v => handleShadowChange('blur', v)} min={0} max={50} unit="px" />
                             <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">رنگ سایه</label>
                                <input type="color" value={shadow.color} onChange={(e) => handleShadowChange('color', e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                            </div>
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

export default ImageFilterGenerator;