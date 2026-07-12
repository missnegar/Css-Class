import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const FONT_FAMILIES = ['Vazirmatn', 'Lalezar', 'Cairo', 'Roboto', 'Poppins', 'serif', 'sans-serif', 'monospace', 'cursive'];
const FONT_WEIGHTS = ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold'];
const FONT_STYLES = ['normal', 'italic', 'oblique'];
const TEXT_DECORATIONS = ['none', 'underline', 'overline', 'line-through'];
const TEXT_TRANSFORMS = ['none', 'uppercase', 'lowercase', 'capitalize'];

const CssFontPreview: React.FC = () => {
    const [previewText, setPreviewText] = useState('یک متن نمونه برای پیش‌نمایش فونت');
    const [fontFamily, setFontFamily] = useState('Vazirmatn');
    const [fontSize, setFontSize] = useState(48);
    const [fontWeight, setFontWeight] = useState('700');
    const [fontStyle, setFontStyle] = useState('normal');
    const [color, setColor] = useState('#334155');
    const [textDecoration, setTextDecoration] = useState('none');
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [wordSpacing, setWordSpacing] = useState(0);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [textTransform, setTextTransform] = useState('none');
    const [shadowH, setShadowH] = useState(2);
    const [shadowV, setShadowV] = useState(2);
    const [shadowBlur, setShadowBlur] = useState(4);
    const [shadowColor, setShadowColor] = useState('#a1a1aa');

    const [copySuccess, setCopySuccess] = useState('');

    const previewStyle = useMemo(() => ({
        fontFamily: `'${fontFamily}', sans-serif`,
        fontSize: `${fontSize}px`,
        fontWeight,
        fontStyle,
        color,
        textDecoration,
        letterSpacing: `${letterSpacing}px`,
        wordSpacing: `${wordSpacing}px`,
        lineHeight,
        textTransform: textTransform as any,
        textShadow: `${shadowH}px ${shadowV}px ${shadowBlur}px ${shadowColor}`,
    }), [
        fontFamily, fontSize, fontWeight, fontStyle, color, textDecoration, 
        letterSpacing, wordSpacing, lineHeight, textTransform,
        shadowH, shadowV, shadowBlur, shadowColor
    ]);

    const generatedCss = useMemo(() => `
.custom-font {
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  color: ${color};
  text-decoration: ${textDecoration};
  letter-spacing: ${letterSpacing}px;
  word-spacing: ${wordSpacing}px;
  line-height: ${lineHeight};
  text-transform: ${textTransform};
  text-shadow: ${shadowH}px ${shadowV}px ${shadowBlur}px ${shadowColor};
}`.trim(), [previewStyle]);

    const htmlCode = `<p class="custom-font">${previewText}</p>`;
    
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
                    <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 space-y-4">
                        <textarea
                            value={previewText}
                            onChange={(e) => setPreviewText(e.target.value)}
                            className="w-full max-w-3xl h-64 p-4 text-center bg-transparent border-0 resize-none focus:outline-none dark:text-slate-200"
                            style={previewStyle}
                        />
                         <input
                            type="text"
                            value={previewText}
                            onChange={(e) => setPreviewText(e.target.value)}
                            className="w-full max-w-2xl p-3 text-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm"
                            placeholder="متن پیش‌نمایش را اینجا ویرایش کنید"
                        />
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات فونت</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="block text-sm font-medium">خانواده فونت<select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{FONT_FAMILIES.map(f => <option key={f} value={f} style={{fontFamily: f}}>{f}</option>)}</select></label>
                                    <label className="block text-sm font-medium">وزن فونت<select value={fontWeight} onChange={e => setFontWeight(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{FONT_WEIGHTS.map(f => <option key={f} value={f}>{f}</option>)}</select></label>
                                    <label className="block text-sm font-medium">استایل فونت<select value={fontStyle} onChange={e => setFontStyle(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{FONT_STYLES.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
                                    <label className="block text-sm font-medium">رنگ<input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                </div>
                                <div className="mt-4"><ControlSlider label="اندازه فونت" value={fontSize} onChange={setFontSize} min={12} max={120} unit="px" /></div>
                            </div>

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات متن</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="block text-sm font-medium">حالت متن<select value={textTransform} onChange={e => setTextTransform(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{TEXT_TRANSFORMS.map(t => <option key={t} value={t}>{t}</option>)}</select></label>
                                    <label className="block text-sm font-medium">تزئین متن<select value={textDecoration} onChange={e => setTextDecoration(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{TEXT_DECORATIONS.map(d => <option key={d} value={d}>{d}</option>)}</select></label>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <ControlSlider label="فاصله حروف" value={letterSpacing} onChange={setLetterSpacing} min={-5} max={20} step={0.5} unit="px" />
                                    <ControlSlider label="فاصله کلمات" value={wordSpacing} onChange={setWordSpacing} min={-5} max={30} step={0.5} unit="px" />
                                </div>
                                <div className="mt-4"><ControlSlider label="ارتفاع خط" value={lineHeight} onChange={setLineHeight} min={0.8} max={3} step={0.1} unit="" /></div>
                             </div>

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">سایه متن</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <ControlSlider label="فاصله افقی" value={shadowH} onChange={setShadowH} min={-20} max={20} unit="px" />
                                    <ControlSlider label="فاصله عمودی" value={shadowV} onChange={setShadowV} min={-20} max={20} unit="px" />
                                </div>
                                <div className="mt-4"><ControlSlider label="میزان محو شدن" value={shadowBlur} onChange={setShadowBlur} min={0} max={40} unit="px" /></div>
                                <div className="mt-4"><label className="block text-sm font-medium">رنگ سایه<input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label></div>
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
                      <CodeBlock title="کد CSS" code={generatedCss} onCopy={() => handleCopy(generatedCss)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default CssFontPreview;
