import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

// --- Helper Components & Types ---

const ControlGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-100/50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <h4 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-4">{title}</h4>
        <div className="space-y-4">{children}</div>
    </div>
);

const FONT_FAMILIES = ['Vazirmatn', 'Lalezar', 'Cairo', 'Roboto', 'Poppins', 'sans-serif', 'serif', 'monospace'];

interface ShadowConfig {
  hOffset: number;
  vOffset: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const hexToRgba = (hex: string, opacity: number) => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        c = '0x' + c.join('');
        return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255}, ${opacity})`;
    }
    return `rgba(0,0,0, ${opacity})`;
};

const formatShadow = (s: ShadowConfig) => `${s.inset ? 'inset ' : ''}${s.hOffset}px ${s.vOffset}px ${s.blur}px ${s.spread}px ${hexToRgba(s.color, s.opacity)}`;

// --- Main Component ---

const ButtonGenerator: React.FC = () => {
    const [text, setText] = useState('کلیک کنید');
    const [textColor, setTextColor] = useState('#ffffff');
    const [fontFamily, setFontFamily] = useState('Vazirmatn');
    const [fontSize, setFontSize] = useState(16);
    const [fontWeight, setFontWeight] = useState('700');
    
    const [paddingY, setPaddingY] = useState(12);
    const [paddingX, setPaddingX] = useState(24);
    
    const [borderWidth, setBorderWidth] = useState(1);
    const [borderColor, setBorderColor] = useState('#4f46e5');
    const [borderRadius, setBorderRadius] = useState(8);

    const [bgColor1, setBgColor1] = useState('#6366f1');
    const [bgColor2, setBgColor2] = useState('#818cf8');
    
    const [boxShadow, setBoxShadow] = useState<ShadowConfig>({ hOffset: 0, vOffset: 4, blur: 6, spread: -1, color: '#000000', opacity: 0.1, inset: false });

    // Hover State
    const [hoverTextColor, setHoverTextColor] = useState('#ffffff');
    const [hoverBgColor1, setHoverBgColor1] = useState('#4f46e5');
    const [hoverBgColor2, setHoverBgColor2] = useState('#6366f1');
    const [hoverBorderColor, setHoverBorderColor] = useState('#3730a3');

    // Link State
    const [linkUrl, setLinkUrl] = useState('#');
    const [linkTarget, setLinkTarget] = useState<'_self' | '_blank'>('_self');

    const [copySuccess, setCopySuccess] = useState('');
    
    const previewStyle = useMemo(() => {
        const css = `
            .preview-button {
                color: ${textColor};
                font-family: '${fontFamily}', sans-serif;
                font-size: ${fontSize}px;
                font-weight: ${fontWeight};
                padding: ${paddingY}px ${paddingX}px;
                border: ${borderWidth}px solid ${borderColor};
                border-radius: ${borderRadius}px;
                background: linear-gradient(to right, ${bgColor1}, ${bgColor2});
                box-shadow: ${formatShadow(boxShadow)};
                transition: all 0.2s ease-in-out;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
            }
            .preview-button:hover {
                color: ${hoverTextColor};
                border-color: ${hoverBorderColor};
                background: linear-gradient(to right, ${hoverBgColor1}, ${hoverBgColor2});
            }
        `;
        return css;
    }, [text, textColor, fontFamily, fontSize, fontWeight, paddingY, paddingX, borderWidth, borderColor, borderRadius, bgColor1, bgColor2, boxShadow, hoverTextColor, hoverBgColor1, hoverBgColor2, hoverBorderColor]);

    const finalHtml = `<a href="${linkUrl}" target="${linkTarget}" class="my-button">${text}</a>`;

    const finalCss = `
.my-button {
  color: ${textColor};
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  padding: ${paddingY}px ${paddingX}px;
  border: ${borderWidth}px solid ${borderColor};
  border-radius: ${borderRadius}px;
  background: linear-gradient(to right, ${bgColor1}, ${bgColor2});
  box-shadow: ${formatShadow(boxShadow)};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none; /* For <a> tags */
  display: inline-block; /* For <a> tags */
}

.my-button:hover {
  color: ${hoverTextColor};
  border-color: ${hoverBorderColor};
  background: linear-gradient(to right, ${hoverBgColor1}, ${hoverBgColor2});
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
                        <style>{previewStyle}</style>
                        <a href={linkUrl} target={linkTarget} onClick={(e) => e.preventDefault()} className="preview-button">{text}</a>
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <ControlGroup title="تنظیمات لینک">
                               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">آدرس لینک (URL)
                                    <input 
                                        type="url" 
                                        value={linkUrl} 
                                        onChange={e => setLinkUrl(e.target.value)} 
                                        placeholder="https://example.com"
                                        className="mt-1 w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" 
                                    />
                                </label>
                                <div>
                                    <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">نحوه باز شدن</span>
                                    <div className="flex gap-2 text-sm">
                                        <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-md cursor-pointer has-[:checked]:bg-indigo-50 dark:has-[:checked]:bg-indigo-900/50 has-[:checked]:ring-2 has-[:checked]:ring-indigo-500 transition-all">
                                            <input type="radio" name="linkTarget" value="_self" checked={linkTarget === '_self'} onChange={() => setLinkTarget('_self')} className="sr-only" />
                                            در همان صفحه
                                        </label>
                                        <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-md cursor-pointer has-[:checked]:bg-indigo-50 dark:has-[:checked]:bg-indigo-900/50 has-[:checked]:ring-2 has-[:checked]:ring-indigo-500 transition-all">
                                            <input type="radio" name="linkTarget" value="_blank" checked={linkTarget === '_blank'} onChange={() => setLinkTarget('_blank')} className="sr-only" />
                                            در صفحه جدید
                                        </label>
                                    </div>
                                </div>
                            </ControlGroup>
                            <ControlGroup title="متن و فونت">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">متن دکمه<input type="text" value={text} onChange={e => setText(e.target.value)} className="mt-1 w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">رنگ متن<input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="mt-1 w-full h-10 p-1 rounded-md" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">فونت<select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="mt-1 w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}</select></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">اندازه فونت ({fontSize}px)<input type="range" min="8" max="48" value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">وزن فونت<select value={fontWeight} onChange={e => setFontWeight(e.target.value)} className="mt-1 w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{['100','200','300','400','500','600','700','800','900'].map(f => <option key={f} value={f}>{f}</option>)}</select></label>
                            </ControlGroup>

                            <ControlGroup title="کادر و حاشیه">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">فاصله داخلی عمودی ({paddingY}px)<input type="range" min="0" max="50" value={paddingY} onChange={e => setPaddingY(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">فاصله داخلی افقی ({paddingX}px)<input type="range" min="0" max="50" value={paddingX} onChange={e => setPaddingX(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">ضخامت حاشیه ({borderWidth}px)<input type="range" min="0" max="20" value={borderWidth} onChange={e => setBorderWidth(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">رنگ حاشیه<input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="mt-1 w-full h-10 p-1 rounded-md" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">گردی گوشه‌ها ({borderRadius}px)<input type="range" min="0" max="50" value={borderRadius} onChange={e => setBorderRadius(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                            </ControlGroup>
                            
                            <ControlGroup title="پس‌زمینه">
                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">رنگ اول گرادیانت<input type="color" value={bgColor1} onChange={e => setBgColor1(e.target.value)} className="mt-1 w-full h-10 p-1 rounded-md" /></label>
                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">رنگ دوم گرادیانت<input type="color" value={bgColor2} onChange={e => setBgColor2(e.target.value)} className="mt-1 w-full h-10 p-1 rounded-md" /></label>
                            </ControlGroup>

                            <ControlGroup title="سایه دکمه (Box Shadow)">
                                <label className="block text-sm font-medium">فاصله افقی ({boxShadow.hOffset}px)<input type="range" min="-50" max="50" value={boxShadow.hOffset} onChange={e => setBoxShadow(s => ({...s, hOffset: +e.target.value}))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                                <label className="block text-sm font-medium">فاصله عمودی ({boxShadow.vOffset}px)<input type="range" min="-50" max="50" value={boxShadow.vOffset} onChange={e => setBoxShadow(s => ({...s, vOffset: +e.target.value}))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                                <label className="block text-sm font-medium">محو شدگی ({boxShadow.blur}px)<input type="range" min="0" max="50" value={boxShadow.blur} onChange={e => setBoxShadow(s => ({...s, blur: +e.target.value}))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                                <label className="block text-sm font-medium">گستردگی ({boxShadow.spread}px)<input type="range" min="-50" max="50" value={boxShadow.spread} onChange={e => setBoxShadow(s => ({...s, spread: +e.target.value}))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                                <label className="block text-sm font-medium">شفافیت ({boxShadow.opacity})<input type="range" min="0" max="1" step="0.01" value={boxShadow.opacity} onChange={e => setBoxShadow(s => ({...s, opacity: +e.target.value}))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" /></label>
                                <label className="block text-sm font-medium">رنگ سایه<input type="color" value={boxShadow.color} onChange={e => setBoxShadow(s => ({...s, color: e.target.value}))} className="mt-1 w-full h-10 p-1 rounded-md" /></label>
                                <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={boxShadow.inset} onChange={e => setBoxShadow(s => ({...s, inset: e.target.checked}))} className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>داخلی (Inset)</label>
                            </ControlGroup>

                            <ControlGroup title="حالت Hover">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">رنگ متن<input type="color" value={hoverTextColor} onChange={e => setHoverTextColor(e.target.value)} className="mt-1 w-full h-10 p-1 rounded-md" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">رنگ اول پس‌زمینه<input type="color" value={hoverBgColor1} onChange={e => setHoverBgColor1(e.target.value)} className="mt-1 w-full h-10 p-1 rounded-md" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">رنگ دوم پس‌زمینه<input type="color" value={hoverBgColor2} onChange={e => setHoverBgColor2(e.target.value)} className="mt-1 w-full h-10 p-1 rounded-md" /></label>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">رنگ حاشیه<input type="color" value={hoverBorderColor} onChange={e => setHoverBorderColor(e.target.value)} className="mt-1 w-full h-10 p-1 rounded-md" /></label>
                            </ControlGroup>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>
            
            <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                 <div className="h-full pt-2">
                    <ResizablePanels>
                      <CodeBlock title="کد HTML" code={finalHtml} onCopy={() => handleCopy(finalHtml)} />
                      <CodeBlock title="کد CSS" code={finalCss} onCopy={() => handleCopy(finalCss)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default ButtonGenerator;