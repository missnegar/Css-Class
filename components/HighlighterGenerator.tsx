import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

type ColorMode = 'solid' | 'gradient';

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

const HighlighterGenerator: React.FC = () => {
    const [thickness, setThickness] = useState(60);
    const [position, setPosition] = useState(50);
    const [colorMode, setColorMode] = useState<ColorMode>('solid');
    const [solidColor, setSolidColor] = useState('#fde047'); // yellow-300
    const [gradientColor1, setGradientColor1] = useState('#a78bfa'); // violet-400
    const [gradientColor2, setGradientColor2] = useState('#f472b6'); // pink-400
    const [fontSize, setFontSize] = useState(24);
    const [lineHeight, setLineHeight] = useState(1.8);
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const highlighterStyle = useMemo(() => {
        const backgroundGradient = colorMode === 'solid'
            ? `linear-gradient(${solidColor}, ${solidColor})`
            : `linear-gradient(90deg, ${gradientColor1}, ${gradientColor2})`;
        
        return {
            backgroundImage: backgroundGradient,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `100% ${thickness}%`,
            backgroundPosition: `0% ${position}%`,
        };
    }, [thickness, position, colorMode, solidColor, gradientColor1, gradientColor2]);

    const previewTextStyle = {
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight,
    };
    
    const generatedHtml = `
<p>
  این یک متن نمونه برای نمایش افکت هایلایتر است. شما می‌توانید
  <span class="highlight">این بخش از متن</span>
  را با استایل‌های مختلف هایلایت کنید.
</p>
    `.trim();

    const generatedCss = useMemo(() => {
        const style = highlighterStyle;
        return `
.highlight {
  background-image: ${style.backgroundImage};
  background-repeat: ${style.backgroundRepeat};
  background-size: ${style.backgroundSize};
  background-position: ${style.backgroundPosition};
  transition: background-size 0.3s ease-in-out;
}

.highlight:hover {
    background-size: 100% 100%;
}
        `.trim();
    }, [highlighterStyle]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="w-full max-w-2xl p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                            <p className="text-right leading-relaxed text-slate-700 dark:text-slate-300" style={previewTextStyle}>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. <span style={highlighterStyle}>چاپگرها و متون بلکه روزنامه و مجله</span> در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                                <br/><br/>
                                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با <span style={highlighterStyle}>نرم افزارها شناخت بیشتری</span> را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                            </p>
                        </div>
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                         <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات هایلایتر</h3>
                                <ControlSlider label="ضخامت" value={thickness} onChange={setThickness} min={5} max={100} step={1} unit="%" />
                                <ControlSlider label="موقعیت عمودی" value={position} onChange={setPosition} min={0} max={100} step={1} unit="%" />
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">رنگ</h3>
                                <div className="flex gap-2 text-sm p-1 bg-slate-100 dark:bg-slate-900 rounded-lg mb-4">
                                    <button onClick={() => setColorMode('solid')} className={`flex-1 p-2 rounded-md transition-colors ${colorMode === 'solid' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>تک رنگ</button>
                                    <button onClick={() => setColorMode('gradient')} className={`flex-1 p-2 rounded-md transition-colors ${colorMode === 'gradient' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>گرادیانت</button>
                                </div>
                                {colorMode === 'solid' ? (
                                    <ColorInput label="رنگ هایلایت" value={solidColor} onChange={setSolidColor} />
                                ) : (
                                    <div className="flex gap-4">
                                        <ColorInput label="رنگ اول" value={gradientColor1} onChange={setGradientColor1} />
                                        <ColorInput label="رنگ دوم" value={gradientColor2} onChange={setGradientColor2} />
                                    </div>
                                )}
                            </div>
                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات متن</h3>
                                <ControlSlider label="اندازه فونت" value={fontSize} onChange={setFontSize} min={12} max={48} step={1} unit="px" />
                                <ControlSlider label="فاصله خطوط" value={lineHeight} onChange={setLineHeight} min={1} max={3} step={0.1} unit="" />
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>
            <ResizableFooter>
                 {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                 <div className="h-full pt-2">
                    <ResizablePanels>
                      <CodeBlock title="کد HTML" code={generatedHtml} onCopy={() => handleCopy(generatedHtml)} />
                      <CodeBlock title="کد CSS" code={generatedCss} onCopy={() => handleCopy(generatedCss)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default HighlighterGenerator;