import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

type RibbonStyle = 'angle' | 'fork' | 'straight';

const FONT_FAMILIES = ['Vazirmatn', 'Lalezar', 'Cairo', 'Roboto', 'Poppins', 'sans-serif'];

interface Preset {
    name: string;
    style: RibbonStyle;
    bgColor: string;
    textColor: string;
    hasBorder: boolean;
    borderColor: string;
    borderWidth: number;
    height: number;
}

const PRESETS: Preset[] = [
    { name: 'اعلان', style: 'fork', bgColor: '#ef4444', textColor: '#ffffff', hasBorder: false, borderColor: '#000000', borderWidth: 2, height: 50 },
    { name: 'جدید', style: 'angle', bgColor: '#3b82f6', textColor: '#ffffff', hasBorder: true, borderColor: '#1d4ed8', borderWidth: 2, height: 45 },
    { name: 'تخفیف', style: 'angle', bgColor: '#f59e0b', textColor: '#000000', hasBorder: false, borderColor: '#000000', borderWidth: 2, height: 55 },
    { name: 'ساده', style: 'straight', bgColor: '#22c55e', textColor: '#ffffff', hasBorder: true, borderColor: '#ffffff', borderWidth: 1, height: 40 },
    { name: 'شیک', style: 'fork', bgColor: '#8b5cf6', textColor: '#ffffff', hasBorder: false, borderColor: '#000000', borderWidth: 2, height: 50 },
    { name: 'تیره', style: 'angle', bgColor: '#374151', textColor: '#e5e7eb', hasBorder: true, borderColor: '#9ca3af', borderWidth: 1, height: 45 },
];

const darkenColor = (hex: string, percent: number): string => {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = parseInt(String(R * (100 - percent) / 100));
    G = parseInt(String(G * (100 - percent) / 100));
    B = parseInt(String(B * (100 - percent) / 100));

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
};


const RibbonBannerGenerator: React.FC = () => {
    const [text, setText] = useState('بنر روبانی');
    const [style, setStyle] = useState<RibbonStyle>('fork');
    const [width, setWidth] = useState(300);
    const [widthMode, setWidthMode] = useState<'auto' | 'fixed'>('auto');
    const [height, setHeight] = useState(50);
    const [bgColor, setBgColor] = useState('#ef4444');
    const [textColor, setTextColor] = useState('#ffffff');
    const [hasBorder, setHasBorder] = useState(false);
    const [borderWidth, setBorderWidth] = useState(2);
    const [borderColor, setBorderColor] = useState('#000000');
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Vazirmatn');
    const [copySuccess, setCopySuccess] = useState('');

    const applyPreset = (p: Preset) => {
        setStyle(p.style);
        setBgColor(p.bgColor);
        setTextColor(p.textColor);
        setHasBorder(p.hasBorder);
        setBorderColor(p.borderColor);
        setBorderWidth(p.borderWidth);
        setHeight(p.height);
        setWidthMode('auto');
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

    const { previewStyle, cssCode, htmlCode } = useMemo(() => {
        const darkerBg = darkenColor(bgColor, 20);
        let baseStyle: React.CSSProperties = {
            height: `${height}px`,
            lineHeight: `${height}px`,
            backgroundColor: bgColor,
            color: textColor,
            fontFamily: `'${fontFamily}', sans-serif`,
            fontSize: `${fontSize}px`,
            position: 'relative',
            display: 'inline-block',
            textAlign: 'center',
            padding: `0 ${height / 2}px`,
            boxSizing: 'border-box',
        };

        if (widthMode === 'fixed') {
            baseStyle.width = `${width}px`;
        }

        if(hasBorder) {
            baseStyle.border = `${borderWidth}px solid ${borderColor}`;
            baseStyle.lineHeight = `${height - borderWidth * 2}px`;
        }

        const pseudoStyle = {
            '--h': `${height}px`,
            '--h-half': `${height/2}px`,
            '--border-w': `${borderWidth}px`,
            '--darker-bg': darkerBg,
            '--tail-width': `${height * 0.4}px`,
            '--border-color': borderColor,
            '--bg-color': bgColor,
        } as React.CSSProperties;

        const html = `<div class="ribbon-banner"><span>${text}</span></div>`;

        let css = `
.ribbon-banner {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: ${height}px;
  line-height: ${hasBorder ? height - borderWidth * 2 : height}px;
  text-align: center;
  padding: 0 ${height / 2}px;
  background-color: ${bgColor};
  color: ${textColor};
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  ${widthMode === 'fixed' ? `width: ${width}px;` : ''}
  ${hasBorder ? `border: ${borderWidth}px solid ${borderColor};` : ''}
}

.ribbon-banner span {
  position: relative;
  z-index: 1;
}
        `;

        const beforeAfterBase = `
  content: '';
  position: absolute;
  top: 0;
  border-style: solid;
  z-index: 0;`;

        if (style === 'angle') {
            css += `
.ribbon-banner::before {${beforeAfterBase}
  left: -${height * 0.5}px;
  border-width: ${height / 2}px;
  border-color: ${darkerBg};
  border-left-color: transparent;
}
.ribbon-banner::after {${beforeAfterBase}
  right: -${height * 0.5}px;
  border-width: ${height / 2}px;
  border-color: ${darkerBg};
  border-right-color: transparent;
}`;
        } else if (style === 'fork') {
            css += `
.ribbon-banner {
  padding: 0 ${height * 0.75}px;
}
.ribbon-banner::before {${beforeAfterBase}
  left: ${height * 0.25}px;
  border-width: ${height / 2}px 0 ${height / 2}px ${height * 0.5}px;
  border-color: transparent transparent transparent ${darkerBg};
}
.ribbon-banner::after {${beforeAfterBase}
  right: ${height * 0.25}px;
  border-width: ${height / 2}px ${height * 0.5}px ${height / 2}px 0;
  border-color: transparent ${darkerBg} transparent transparent;
}`;
        }


        return { previewStyle: {...baseStyle, ...pseudoStyle}, cssCode: css.trim(), htmlCode: html };

    }, [text, style, height, width, widthMode, bgColor, textColor, hasBorder, borderWidth, borderColor, fontSize, fontFamily]);


    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <style>{cssCode}</style>
                        <div className="ribbon-banner">
                            <span>{text}</span>
                        </div>
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">طرح‌های آماده</h3>
                             <div className="grid grid-cols-3 gap-2">
                                 {PRESETS.map(p => (
                                     <button key={p.name} onClick={() => applyPreset(p)} className={`p-2 rounded-md transition-colors text-sm font-semibold ${p.bgColor === bgColor && p.style === style ? 'ring-2 ring-indigo-500' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`} style={{backgroundColor: p.bgColor, color: p.textColor, border: p.hasBorder ? `${p.borderWidth}px solid ${p.borderColor}`: 'none'}}>
                                         {p.name}
                                     </button>
                                 ))}
                            </div>
                        </div>
                         <div className="flex-grow p-6 overflow-y-auto no-scrollbar space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات</h3>
                                <label className="block text-sm font-medium">متن بنر<input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" /></label>
                                <div className="mt-4">
                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">استایل انتها</label>
                                     <div className="flex gap-2 text-sm">
                                         <button onClick={() => setStyle('fork')} className={`flex-1 p-2 rounded-md ${style === 'fork' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>دالبور</button>
                                         <button onClick={() => setStyle('angle')} className={`flex-1 p-2 rounded-md ${style === 'angle' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>زاویه‌دار</button>
                                         <button onClick={() => setStyle('straight')} className={`flex-1 p-2 rounded-md ${style === 'straight' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>صاف</button>
                                     </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">عرض بنر</label>
                                    <div className="flex gap-2 text-sm">
                                        <button onClick={() => setWidthMode('auto')} className={`flex-1 p-2 rounded-md transition-colors ${widthMode === 'auto' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                                            خودکار
                                        </button>
                                        <button onClick={() => setWidthMode('fixed')} className={`flex-1 p-2 rounded-md transition-colors ${widthMode === 'fixed' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                                            ثابت
                                        </button>
                                    </div>
                                </div>
                                <div className={`mt-4 ${widthMode === 'auto' ? 'opacity-50' : ''}`}>
                                    <label className="block text-sm font-medium">عرض ({width}px)
                                        <input 
                                            type="range" 
                                            min="100" max="800" 
                                            value={width} 
                                            onChange={e => setWidth(Number(e.target.value))} 
                                            disabled={widthMode === 'auto'}
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mt-1" 
                                        />
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium">ارتفاع ({height}px)<input type="range" min="30" max="100" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mt-1" /></label>
                                </div>
                            </div>

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">رنگ و فونت</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="block text-sm font-medium">رنگ پس‌زمینه<input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                    <label className="block text-sm font-medium">رنگ متن<input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                </div>
                                <label className="block text-sm font-medium">فونت<select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}</select></label>
                                <label className="block text-sm font-medium">اندازه فونت ({fontSize}px)<input type="range" min="10" max="40" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mt-1" /></label>
                             </div>

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">حاشیه (Border)</h3>
                                <label className="flex items-center gap-2"><input type="checkbox" checked={hasBorder} onChange={e => setHasBorder(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded"/>حاشیه داشته باشد</label>
                                <div className={`grid grid-cols-2 gap-4 ${!hasBorder ? 'opacity-50' : ''}`}>
                                    <label className="block text-sm font-medium">ضخامت ({borderWidth}px)<input type="range" disabled={!hasBorder} min="1" max="10" value={borderWidth} onChange={e => setBorderWidth(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mt-1" /></label>
                                    <label className="block text-sm font-medium">رنگ حاشیه<input type="color" disabled={!hasBorder} value={borderColor} onChange={e => setBorderColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
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
                      <CodeBlock title="کد HTML" code={htmlCode} onCopy={() => handleCopy(htmlCode)} />
                      <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default RibbonBannerGenerator;