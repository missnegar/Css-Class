import React, { useState, useMemo, useEffect } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import FullScreenIcon from './icons/FullScreenIcon';
import XIcon from './icons/XIcon';
import { PATTERN_CATEGORIES, PatternPreset } from '../data/patterns';

// --- Helper Functions & Components ---

function hexToRgba(hex: string, opacity: number): string {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        c = '0x' + c.join('');
        return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255}, ${opacity})`;
    }
    return `rgba(0, 0, 0, ${opacity})`;
}

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

const generatePatternImage = (type: string, config: any, colors: any): string => {
    const { patternColor, opacity } = colors;
    const pColor = hexToRgba(patternColor, opacity);

    switch (type) {
        case 'dots':
            return `radial-gradient(${pColor} ${config.size}px, transparent 0)`;
        case 'plus':
            return `radial-gradient(circle at center, ${pColor} ${config.stroke}px, transparent ${config.stroke}px),
                    linear-gradient(to right, ${pColor} ${config.stroke}px, transparent ${config.stroke}px),
                    linear-gradient(to bottom, ${pColor} ${config.stroke}px, transparent ${config.stroke}px)`;
        case 'lines-horizontal':
            return `repeating-linear-gradient(0, ${pColor}, ${pColor} ${config.stroke}px, transparent ${config.stroke}px, transparent ${config.spacing}px)`;
        case 'lines-vertical':
            return `repeating-linear-gradient(90deg, ${pColor}, ${pColor} ${config.stroke}px, transparent ${config.stroke}px, transparent ${config.spacing}px)`;
        case 'lines-diagonal':
            return `repeating-linear-gradient(${config.angle}deg, ${pColor}, ${pColor} ${config.stroke}px, transparent ${config.stroke}px, transparent ${config.spacing}px)`;
        case 'grid':
            return `linear-gradient(${pColor} ${config.stroke}px, transparent ${config.stroke}px),
                    linear-gradient(90deg, ${pColor} ${config.stroke}px, transparent ${config.stroke}px)`;
        case 'checkers':
            return `repeating-conic-gradient(${pColor} 0% 25%, transparent 0% 50%)`;
        case 'triangles':
            return `linear-gradient(${config.angle}deg, transparent ${config.size}px, ${pColor} ${config.size}px),
                    linear-gradient(${config.angle-180}deg, transparent ${config.size}px, ${pColor} ${config.size}px)`;
        case 'zigzag':
            const grad1 = `linear-gradient(${config.angle}deg, ${pColor} ${config.stroke}px, transparent ${config.stroke}px)`;
            const grad2 = `linear-gradient(${config.angle * -1}deg, ${pColor} ${config.stroke}px, transparent ${config.stroke}px)`;
            return `${grad1}, ${grad2}`;
        case 'waves':
            return `radial-gradient(circle at ${config.size}px ${config.size}px, ${pColor} ${config.stroke}px, transparent ${config.stroke}px)`;
        default:
            return '';
    }
};

const getBackgroundSize = (type: string, config: any): string => {
     switch (type) {
        case 'dots': return `${config.spacing}px ${config.spacing}px`;
        case 'plus': return `${config.spacing}px ${config.spacing}px, ${config.spacing}px ${config.spacing}px, ${config.spacing}px ${config.spacing}px`;
        case 'grid': return `${config.spacing}px ${config.spacing}px`;
        case 'checkers': return `${config.size}px ${config.size}px`;
        case 'triangles': return `${config.spacing}px ${config.spacing}px`;
        case 'zigzag': return `${config.size}px ${config.size/2}px`;
        case 'waves': return `${config.spacing}px ${config.spacing}px`;
        default: return '';
    }
}


const PatternGenerator: React.FC = () => {
    const [activePreset, setActivePreset] = useState<PatternPreset>(PATTERN_CATEGORIES[0].presets[0]);
    const [config, setConfig] = useState<Record<string, number>>({});
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    // Color state
    const [colorMode, setColorMode] = useState<'solid'|'gradient'>('solid');
    const [bgColor1, setBgColor1] = useState('#f3f4f6');
    const [bgColor2, setBgColor2] = useState('#e5e7eb');
    const [gradientAngle, setGradientAngle] = useState(90);
    const [patternColor, setPatternColor] = useState('#9ca3af');
    const [opacity, setOpacity] = useState(0.8);
    
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        const newConfig: Record<string, number> = {};
        for (const key in activePreset.controls) {
            newConfig[key] = activePreset.controls[key].defaultValue;
        }
        setConfig(newConfig);
    }, [activePreset]);
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') setIsFullscreen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleConfigChange = (key: string, value: number) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const backgroundValue = useMemo(() => {
        const colors = { patternColor, opacity };
        const patternImage = generatePatternImage(activePreset.type, config, colors);
        const patternSize = getBackgroundSize(activePreset.type, config);
        
        const backgroundStyle: React.CSSProperties = {};

        if (colorMode === 'gradient') {
            const gradientImage = `linear-gradient(${gradientAngle}deg, ${bgColor1}, ${bgColor2})`;
            backgroundStyle.backgroundImage = `${patternImage}, ${gradientImage}`;
             if (patternSize) {
                backgroundStyle.backgroundSize = `${patternSize}, auto`;
            }
            backgroundStyle.backgroundColor = bgColor1; // Fallback color
        } else {
            backgroundStyle.backgroundColor = bgColor1;
            backgroundStyle.backgroundImage = patternImage;
            if (patternSize) {
                backgroundStyle.backgroundSize = patternSize;
            }
        }
        
        return backgroundStyle;
    }, [activePreset, config, colorMode, bgColor1, bgColor2, gradientAngle, patternColor, opacity]);

    const cssCode = useMemo(() => {
        const style = backgroundValue;
        let css = `.pattern-background {\n`;
        if (style.backgroundColor) {
            css += `  background-color: ${style.backgroundColor};\n`;
        }
        if (style.backgroundImage) {
            css += `  background-image: ${style.backgroundImage};\n`;
        }
        if (style.backgroundSize) {
            css += `  background-size: ${style.backgroundSize};\n`;
        }
        css += `}`;
        return css.trim();
    }, [backgroundValue]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const renderControls = () => {
        if (Object.keys(config).length === 0) return null;
        return Object.keys(activePreset.controls).map((key) => {
            const control = activePreset.controls[key];
            return (
                <ControlSlider
                    key={key}
                    label={control.label}
                    value={config[key]}
                    onChange={value => handleConfigChange(key, value)}
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    unit={control.unit}
                />
            );
        });
    };

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            {isFullscreen && (
                <div className="fixed inset-0 z-50" style={backgroundValue}>
                    <button onClick={() => setIsFullscreen(false)} className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
            )}
            <div className="flex-1 flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 relative">
                        <div className="w-full h-full rounded-lg shadow-inner" style={backgroundValue}></div>
                        <button onClick={() => setIsFullscreen(true)} className="absolute bottom-6 right-6 p-3 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors z-10">
                            <FullScreenIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">الگوهای آماده</h3>
                             <div className="h-48 overflow-y-auto no-scrollbar pr-1">
                                {PATTERN_CATEGORIES.map(category => (
                                    <div key={category.name}>
                                        <h4 className="font-semibold text-slate-600 dark:text-slate-300 my-2">{category.name}</h4>
                                        <div className="grid grid-cols-4 gap-2">
                                            {category.presets.map(preset => (
                                                <button key={preset.name} onClick={() => setActivePreset(preset)} title={preset.name} className={`aspect-square rounded-md border-2 transition-all ${activePreset.name === preset.name ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}>
                                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-sm" style={{ backgroundImage: generatePatternImage(preset.type, Object.fromEntries(Object.entries(preset.controls).map(([k,v])=>[k,v.defaultValue])), {patternColor: '#9ca3af', opacity: 0.8}), backgroundSize: getBackgroundSize(preset.type, Object.fromEntries(Object.entries(preset.controls).map(([k,v])=>[k,v.defaultValue]))) }}></div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-grow p-6 overflow-y-auto no-scrollbar space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات الگو</h3>
                                <div className="space-y-4">{renderControls()}</div>
                            </div>
                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات رنگ</h3>
                                <div className="space-y-4">
                                     <div className="flex gap-2 text-sm p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
                                        <button onClick={() => setColorMode('solid')} className={`flex-1 p-2 rounded-md transition-colors ${colorMode === 'solid' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>تک رنگ</button>
                                        <button onClick={() => setColorMode('gradient')} className={`flex-1 p-2 rounded-md transition-colors ${colorMode === 'gradient' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>گرادیانت</button>
                                    </div>
                                    {colorMode === 'solid' ? (
                                        <ColorInput label="رنگ پس‌زمینه" value={bgColor1} onChange={setBgColor1} />
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex gap-4">
                                                <ColorInput label="رنگ اول" value={bgColor1} onChange={setBgColor1} />
                                                <ColorInput label="رنگ دوم" value={bgColor2} onChange={setBgColor2} />
                                            </div>
                                            <ControlSlider label="زاویه گرادیانت" value={gradientAngle} onChange={setGradientAngle} min={0} max={360} step={1} unit="deg" />
                                        </div>
                                    )}
                                    <ColorInput label="رنگ الگو" value={patternColor} onChange={setPatternColor} />
                                    <ControlSlider label="شفافیت الگو" value={opacity} onChange={setOpacity} min={0} max={1} step={0.05} unit="" />
                                </div>
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </div>
            <ResizableFooter>
                 {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                 <div className="h-full pt-2">
                    <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                </div>
            </ResizableFooter>
        </div>
    );
};

export default PatternGenerator;