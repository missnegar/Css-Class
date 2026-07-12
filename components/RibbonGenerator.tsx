import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type ColorMode = 'solid' | 'gradient';

const FONT_FAMILIES = ['Vazirmatn', 'Lalezar', 'Cairo', 'Roboto', 'Poppins', 'sans-serif'];
const PREVIEW_IMAGE_URL = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG9by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60';

const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const RadioButton: React.FC<{ label: string, name: string, value: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, name, value, checked, onChange }) => (
    <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-md cursor-pointer has-[:checked]:bg-indigo-50 dark:has-[:checked]:bg-indigo-900/50 has-[:checked]:ring-2 has-[:checked]:ring-indigo-500 transition-all text-xs sm:text-sm">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
        {label}
    </label>
);

const RibbonGenerator: React.FC = () => {
    const [text, setText] = useState('ویژه');
    const [position, setPosition] = useState<Position>('top-right');
    const [colorMode, setColorMode] = useState<ColorMode>('solid');
    
    const [bgColor, setBgColor] = useState('#ef4444');
    const [gradientColor1, setGradientColor1] = useState('#ef4444');
    const [gradientColor2, setGradientColor2] = useState('#f87171');
    const [gradientAngle, setGradientAngle] = useState(45);
    
    const [textColor, setTextColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(14);
    const [fontFamily, setFontFamily] = useState('Vazirmatn');

    const [distance, setDistance] = useState(15);
    const [height, setHeight] = useState(30);

    const [copySuccess, setCopySuccess] = useState('');

    const ribbonBackground = useMemo(() => {
        if (colorMode === 'gradient') {
            return `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`;
        }
        return bgColor;
    }, [colorMode, bgColor, gradientColor1, gradientColor2, gradientAngle]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const { previewStyle, cssCode } = useMemo(() => {
        const ribbonWidth = Math.sqrt(2 * Math.pow(distance * 2 + height, 2)) * 1.5;
        const positionProps: { [key in Position]: React.CSSProperties } = {
            'top-left': { top: `${distance}px`, left: `-${ribbonWidth / 4}px`, transform: 'rotate(-45deg)' },
            'top-right': { top: `${distance}px`, right: `-${ribbonWidth / 4}px`, transform: 'rotate(45deg)' },
            'bottom-left': { bottom: `${distance}px`, left: `-${ribbonWidth / 4}px`, transform: 'rotate(45deg)' },
            'bottom-right': { bottom: `${distance}px`, right: `-${ribbonWidth / 4}px`, transform: 'rotate(-45deg)' },
        };
        
        const style: React.CSSProperties = {
            position: 'absolute',
            width: `${ribbonWidth}px`,
            height: `${height}px`,
            lineHeight: `${height}px`,
            textAlign: 'center',
            color: textColor,
            fontFamily: `'${fontFamily}', sans-serif`,
            fontSize: `${fontSize}px`,
            background: ribbonBackground,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            ...positionProps[position]
        };

        const css = `
.card-container {
  position: relative;
  overflow: hidden; /* This is crucial for the ribbon effect */
  /* Add your card styles here */
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}

.ribbon {
  position: absolute;
  width: ${Math.round(ribbonWidth)}px;
  height: ${height}px;
  line-height: ${height}px;
  text-align: center;
  color: ${textColor};
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  background: ${ribbonBackground};
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  ${Object.entries(positionProps[position]).map(([key, value]) => `  ${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}: ${value};`).join('\n')}
}
`;

        return { previewStyle: style, cssCode: css.trim() };
    }, [position, ribbonBackground, textColor, fontSize, fontFamily, distance, height]);

    const htmlCode = `
<div class="card-container">
  <div class="ribbon">${text}</div>
  
  <!-- Your card content goes here -->
  <img src="${PREVIEW_IMAGE_URL}" alt="Product" />
  <div class="p-4">
    <h3 class="text-lg font-bold">عنوان محصول</h3>
    <p class="text-sm text-gray-600 mt-2">توضیحات محصول در اینجا قرار می‌گیرد.</p>
  </div>
</div>
    `.trim();

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="card-container w-[300px] bg-white dark:bg-slate-800 rounded-lg shadow-xl relative overflow-hidden">
                            <div style={previewStyle}>{text}</div>
                            <img src={PREVIEW_IMAGE_URL} alt="Product" className="w-full h-48 object-cover" />
                             <div className="p-4">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">ساعت لوکس</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">یک ساعت زیبا با طراحی کلاسیک برای استایل‌های رسمی و روزمره.</p>
                             </div>
                        </div>
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                         <div className="space-y-6">
                             <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">متن روبان</h3>
                                <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" />
                            </div>

                             <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">موقعیت</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <RadioButton label="بالا راست" name="position" value="top-right" checked={position === 'top-right'} onChange={() => setPosition('top-right')} />
                                    <RadioButton label="بالا چپ" name="position" value="top-left" checked={position === 'top-left'} onChange={() => setPosition('top-left')} />
                                    <RadioButton label="پایین راست" name="position" value="bottom-right" checked={position === 'bottom-right'} onChange={() => setPosition('bottom-right')} />
                                    <RadioButton label="پایین چپ" name="position" value="bottom-left" checked={position === 'bottom-left'} onChange={() => setPosition('bottom-left')} />
                                </div>
                            </div>

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">رنگ</h3>
                                <div className="flex gap-2 text-sm p-1 bg-slate-100 dark:bg-slate-900 rounded-lg mb-4">
                                    <button onClick={() => setColorMode('solid')} className={`flex-1 p-2 rounded-md transition-colors ${colorMode === 'solid' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>تک رنگ</button>
                                    <button onClick={() => setColorMode('gradient')} className={`flex-1 p-2 rounded-md transition-colors ${colorMode === 'gradient' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>گرادیانت</button>
                                </div>
                                {colorMode === 'solid' ? (
                                    <label>رنگ پس‌زمینه<input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <label className="flex-1">رنگ اول<input type="color" value={gradientColor1} onChange={e => setGradientColor1(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                            <label className="flex-1">رنگ دوم<input type="color" value={gradientColor2} onChange={e => setGradientColor2(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                        </div>
                                        <ControlSlider label="زاویه گرادیانت" value={gradientAngle} onChange={setGradientAngle} min={0} max={360} unit="°" />
                                    </div>
                                )}
                            </div>

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">فونت و ابعاد</h3>
                                <label>رنگ متن<input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                <ControlSlider label="اندازه فونت" value={fontSize} onChange={setFontSize} min={8} max={24} unit="px" />
                                <label>فونت<select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}</select></label>
                                <ControlSlider label="ضخامت روبان" value={height} onChange={setHeight} min={20} max={50} unit="px" />
                                <ControlSlider label="فاصله از گوشه" value={distance} onChange={setDistance} min={-20} max={50} unit="px" />
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

export default RibbonGenerator;