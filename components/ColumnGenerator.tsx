import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

const ControlSlider: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{`${label} (${value}${unit})`}</label>
        <input type="range" value={value} onChange={onChange} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const ColorInput: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = 
({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <input type="color" value={value} onChange={onChange} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
    </div>
);

const RULE_STYLES = ['none', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'];

const ColumnGenerator: React.FC = () => {
    const [columnCount, setColumnCount] = useState(3);
    const [columnWidth, setColumnWidth] = useState(200);
    const [columnGap, setColumnGap] = useState(20);
    const [ruleStyle, setRuleStyle] = useState('solid');
    const [ruleWidth, setRuleWidth] = useState(1);
    const [ruleColor, setRuleColor] = useState('#cccccc');
    const [useWidth, setUseWidth] = useState(false);
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

    const previewStyle = useMemo(() => {
        const style: any = {
            columnGap: `${columnGap}px`,
            columnRule: `${ruleWidth}px ${ruleStyle} ${ruleColor}`,
            WebkitColumnGap: `${columnGap}px`,
            WebkitColumnRule: `${ruleWidth}px ${ruleStyle} ${ruleColor}`,
            MozColumnGap: `${columnGap}px`,
            MozColumnRule: `${ruleWidth}px ${ruleStyle} ${ruleColor}`,
        };
        if (useWidth) {
            style.columnWidth = `${columnWidth}px`;
            style.WebkitColumnWidth = `${columnWidth}px`;
            style.MozColumnWidth = `${columnWidth}px`;
        } else {
            style.columnCount = columnCount;
            style.WebkitColumnCount = columnCount;
            style.MozColumnCount = columnCount;
        }
        return style;
    }, [columnCount, columnWidth, columnGap, ruleStyle, ruleWidth, ruleColor, useWidth]);
    
    const generatedCss = useMemo(() => {
        const columnProperty = useWidth 
            ? `  column-width: ${columnWidth}px;`
            : `  column-count: ${columnCount};`;
        const webkitColumnProperty = useWidth
            ? `  -webkit-column-width: ${columnWidth}px;`
            : `  -webkit-column-count: ${columnCount};`;
        const mozColumnProperty = useWidth
            ? `  -moz-column-width: ${columnWidth}px;`
            : `  -moz-column-count: ${columnCount};`;

        return `
.container {
${columnProperty}
  column-gap: ${columnGap}px;
  column-rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};
  
  /* Prefixes for browser compatibility */
${webkitColumnProperty}
  -webkit-column-gap: ${columnGap}px;
  -webkit-column-rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};
  
${mozColumnProperty}
  -moz-column-gap: ${columnGap}px;
  -moz-column-rule: ${ruleWidth}px ${ruleStyle} ${ruleColor};
}
        `.trim();
    }, [columnCount, columnWidth, columnGap, ruleStyle, ruleWidth, ruleColor, useWidth]);

    const previewText = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.";

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="w-full h-full p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-auto no-scrollbar">
                            <p className="text-right leading-relaxed text-slate-700 dark:text-slate-300" style={previewStyle}>
                                {previewText.repeat(3)}
                            </p>
                        </div>
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات ستون</h3>
                                <div className="flex items-center gap-2 mb-4 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
                                    <button onClick={() => setUseWidth(false)} className={`flex-1 p-2 text-sm rounded-md transition-colors ${!useWidth ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                        بر اساس تعداد
                                    </button>
                                    <button onClick={() => setUseWidth(true)} className={`flex-1 p-2 text-sm rounded-md transition-colors ${useWidth ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                        بر اساس عرض
                                    </button>
                                </div>
                                
                                {!useWidth ? (
                                    <ControlSlider label="تعداد ستون‌ها" value={columnCount} onChange={(e) => setColumnCount(parseInt(e.target.value, 10))} min={1} max={10} step={1} unit="" />
                                ) : (
                                    <ControlSlider label="عرض ستون" value={columnWidth} onChange={(e) => setColumnWidth(parseInt(e.target.value, 10))} min={50} max={500} step={10} unit="px" />
                                )}
                                <ControlSlider label="فاصله بین ستون‌ها" value={columnGap} onChange={(e) => setColumnGap(parseInt(e.target.value, 10))} min={0} max={100} step={1} unit="px" />
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">خط جداکننده (Rule)</h3>
                                 <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">استایل خط</label>
                                    <select value={ruleStyle} onChange={(e) => setRuleStyle(e.target.value)} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                                        {RULE_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
                                    </select>
                                </div>
                                <ControlSlider label="ضخامت خط" value={ruleWidth} onChange={(e) => setRuleWidth(parseInt(e.target.value, 10))} min={0} max={20} step={1} unit="px" />
                                <ColorInput label="رنگ خط" value={ruleColor} onChange={(e) => setRuleColor(e.target.value)} />
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>
            
            <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                 <div className="h-full pt-2">
                    <CodeBlock title="کد CSS" code={generatedCss} onCopy={() => handleCopy(generatedCss)} />
                </div>
            </ResizableFooter>
        </div>
    );
};

export default ColumnGenerator;