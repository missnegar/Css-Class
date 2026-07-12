import React, { useState, useMemo, useCallback, useEffect } from 'react';
import CopyIcon from './icons/CopyIcon';

interface RgbaColor { r: number; g: number; b: number; a: number; }
interface HslaColor { h: number; s: number; l: number; a: number; }

// --- Color Conversion Utilities ---
const parseRgba = (rgba: string): RgbaColor | null => {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return null;
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] !== undefined ? parseFloat(match[4]) : 1,
  };
};

const parseHsla = (hsla: string): RgbaColor | null => {
    const match = hsla.match(/hsla?\((\d+),\s*(\d+)%?,\s*(\d+)%?(?:,\s*([\d.]+))?\)/);
    if (!match) return null;
    let h = parseInt(match[1], 10), s = parseInt(match[2], 10) / 100, l = parseInt(match[3], 10) / 100;
    const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h / 360 + 1 / 3);
        g = hue2rgb(p, q, h / 360);
        b = hue2rgb(p, q, h / 360 - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a };
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) };
};

const rgbToHex = (r: number, g: number, b: number): string => 
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

const rgbToHsl = (r: number, g: number, b: number): Omit<HslaColor, 'a'> => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const ColorInputRow: React.FC<{ label: string; value: string; onCopy: () => void; onChange: (v: string) => void }> = 
({ label, value, onCopy, onChange }) => (
    <div className="flex items-center gap-2">
        <label className="w-16 text-sm font-semibold text-slate-600 dark:text-slate-400">{label}</label>
        <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="flex-grow p-2 font-mono text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button onClick={onCopy} className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md" title={`کپی کردن ${label}`}>
            <CopyIcon className="w-4 h-4" />
        </button>
    </div>
);


const CssColorConverter: React.FC = () => {
    const [color, setColor] = useState<RgbaColor>({ r: 99, g: 102, b: 241, a: 1 });
    const [copySuccess, setCopySuccess] = useState('');

    const colorFormats = useMemo(() => {
        const hex = rgbToHex(color.r, color.g, color.b);
        const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a.toFixed(2)})`;
        const { h, s, l } = rgbToHsl(color.r, color.g, color.b);
        const hsla = `hsla(${h}, ${s}%, ${l}%, ${color.a.toFixed(2)})`;
        return { hex, rgba, hsla };
    }, [color]);

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        setCopySuccess('کپی شد!');
        setTimeout(() => setCopySuccess(''), 2000);
    };

    const updateColor = (newColor: Partial<RgbaColor>) => {
        setColor(prev => ({ ...prev, ...newColor }));
    };

    const handleHexChange = (hex: string) => {
        const rgb = hexToRgb(hex);
        if (rgb) updateColor(rgb);
    };
    
    const handleRgbaChange = (rgbaStr: string) => {
        const rgba = parseRgba(rgbaStr);
        if (rgba) updateColor(rgba);
    };

    const handleHslaChange = (hslaStr: string) => {
        const rgba = parseHsla(hslaStr);
        if (rgba) updateColor(rgba);
    }
    
    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <header className="p-4 md:px-8 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">مبدل رنگ CSS</h2>
            </header>
            <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
                <div className="max-w-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-48 h-48 rounded-full shadow-lg" style={{ backgroundColor: colorFormats.rgba }}></div>
                        <input 
                            type="color"
                            value={colorFormats.hex}
                            onChange={(e) => handleHexChange(e.target.value)}
                            className="w-full h-12 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"
                        />
                    </div>
                    <div className="space-y-4">
                        <ColorInputRow label="HEX" value={colorFormats.hex} onCopy={() => handleCopy(colorFormats.hex)} onChange={handleHexChange}/>
                        <ColorInputRow label="RGBA" value={colorFormats.rgba} onCopy={() => handleCopy(colorFormats.rgba)} onChange={handleRgbaChange}/>
                        <ColorInputRow label="HSLA" value={colorFormats.hsla} onCopy={() => handleCopy(colorFormats.hsla)} onChange={handleHslaChange}/>
                        <div className="pt-4">
                            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">شفافیت (Alpha): {color.a.toFixed(2)}</label>
                             <input
                                type="range"
                                min="0" max="1" step="0.01"
                                value={color.a}
                                onChange={(e) => updateColor({ a: parseFloat(e.target.value) })}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600"
                            />
                        </div>
                    </div>
                </div>
                 {copySuccess && (
                    <div className="fixed bottom-6 right-6 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 animate-fade-in-up">
                        {copySuccess}
                    </div>
                )}
            </main>
             <style>{`
                @keyframes fade-in-up { 
                    0% { opacity: 0; transform: translateY(10px); } 
                    100% { opacity: 1; transform: translateY(0); } 
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default CssColorConverter;
