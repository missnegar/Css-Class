import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string, disabled?: boolean}> = 
({ label, value, onChange, min, max, step, unit, disabled }) => (
    <div className={disabled ? 'opacity-50' : ''}>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} disabled={disabled} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 disabled:cursor-not-allowed" />
    </div>
);

const CheckboxControl: React.FC<{label: string, checked: boolean, onChange: (c: boolean) => void}> = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        {label}
    </label>
);

const LayoutGenerator: React.FC = () => {
    const [hasHeader, setHasHeader] = useState(true);
    const [hasFooter, setHasFooter] = useState(true);
    const [hasLeftSidebar, setHasLeftSidebar] = useState(true);
    const [hasRightSidebar, setHasRightSidebar] = useState(false);
    
    const [headerHeight, setHeaderHeight] = useState(60);
    const [footerHeight, setFooterHeight] = useState(50);
    const [leftSidebarWidth, setLeftSidebarWidth] = useState(200);
    const [rightSidebarWidth, setRightSidebarWidth] = useState(180);
    const [gap, setGap] = useState(16);

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

    const { layoutStyle, gridTemplateAreas, htmlCode, cssCode } = useMemo(() => {
        let areas: string[] = [];
        let columns = '1fr';
        let rows = '1fr';
        
        if(hasLeftSidebar) {
            columns = `${leftSidebarWidth}px 1fr`;
        }
        if(hasRightSidebar) {
            columns = `${columns} ${rightSidebarWidth}px`;
        }
        
        if(hasHeader) {
            rows = `${headerHeight}px 1fr`;
            let headerArea = 'header';
            if (hasLeftSidebar) headerArea = 'header header';
            if (hasRightSidebar) headerArea = 'header header header';
             areas.push(`"${headerArea}"`);
        }

        let middleRow = 'main';
        if(hasLeftSidebar) middleRow = `aside-left ${middleRow}`;
        if(hasRightSidebar) middleRow = `${middleRow} aside-right`;
        areas.push(`"${middleRow}"`);

        if(hasFooter) {
            rows = `${rows} ${footerHeight}px`;
             let footerArea = 'footer';
            if (hasLeftSidebar) footerArea = 'footer footer';
            if (hasRightSidebar) footerArea = 'footer footer footer';
            areas.push(`"${footerArea}"`);
        }
        
        const finalTemplateAreas = areas.join('\n        ');

        const style = {
            display: 'grid',
            gridTemplateAreas: finalTemplateAreas,
            gridTemplateRows: rows,
            gridTemplateColumns: columns,
            gap: `${gap}px`,
        } as React.CSSProperties;

        const html = `
<div class="layout-container">
  ${hasHeader ? '<header class="header">هدر</header>' : ''}
  ${hasLeftSidebar ? '<aside class="sidebar-left">سایدبار چپ</aside>' : ''}
  <main class="main-content">محتوای اصلی</main>
  ${hasRightSidebar ? '<aside class="sidebar-right">سایدبار راست</aside>' : ''}
  ${hasFooter ? '<footer class="footer">فوتر</footer>' : ''}
</div>`.trim().split('\n').filter(line => line.trim() !== '').join('\n');

        const css = `
.layout-container {
  display: grid;
  grid-template-areas:
    ${finalTemplateAreas};
  grid-template-rows: ${rows};
  grid-template-columns: ${columns};
  gap: ${gap}px;
  height: 100vh; /* Or your desired height */
}

${hasHeader ? '.header { grid-area: header; }' : ''}
${hasLeftSidebar ? '.sidebar-left { grid-area: aside-left; }' : ''}
.main-content { grid-area: main; }
${hasRightSidebar ? '.sidebar-right { grid-area: aside-right; }' : ''}
${hasFooter ? '.footer { grid-area: footer; }' : ''}

/* Demo styles */
.layout-container > * {
  background-color: #cbd5e1;
  color: #1e293b;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  border-radius: 8px;
}
`.trim().split('\n').filter(line => line.trim() !== '').join('\n');

        return { layoutStyle: style, gridTemplateAreas: finalTemplateAreas, htmlCode: html, cssCode: css };
    }, [hasHeader, hasFooter, hasLeftSidebar, hasRightSidebar, headerHeight, footerHeight, leftSidebarWidth, rightSidebarWidth, gap]);


    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="w-full h-full p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md" style={layoutStyle}>
                           {hasHeader && <div className="bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center rounded-md" style={{gridArea: 'header'}}>هدر</div>}
                           {hasLeftSidebar && <div className="bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center rounded-md" style={{gridArea: 'aside-left'}}>سایدبار چپ</div>}
                           <div className="bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center rounded-md" style={{gridArea: 'main'}}>محتوا</div>
                           {hasRightSidebar && <div className="bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center rounded-md" style={{gridArea: 'aside-right'}}>سایدبار راست</div>}
                           {hasFooter && <div className="bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center rounded-md" style={{gridArea: 'footer'}}>فوتر</div>}
                        </div>
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                         <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">اجزای چیدمان</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <CheckboxControl label="هدر" checked={hasHeader} onChange={setHasHeader} />
                                    <CheckboxControl label="فوتر" checked={hasFooter} onChange={setHasFooter} />
                                    <CheckboxControl label="سایدبار چپ" checked={hasLeftSidebar} onChange={setHasLeftSidebar} />
                                    <CheckboxControl label="سایدبار راست" checked={hasRightSidebar} onChange={setHasRightSidebar} />
                                </div>
                            </div>
                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">تنظیمات ابعاد</h3>
                                <ControlSlider label="ارتفاع هدر" value={headerHeight} onChange={setHeaderHeight} min={40} max={150} unit="px" disabled={!hasHeader} />
                                <ControlSlider label="ارتفاع فوتر" value={footerHeight} onChange={setFooterHeight} min={30} max={150} unit="px" disabled={!hasFooter} />
                                <ControlSlider label="عرض سایدبار چپ" value={leftSidebarWidth} onChange={setLeftSidebarWidth} min={100} max={400} unit="px" disabled={!hasLeftSidebar} />
                                <ControlSlider label="عرض سایدبار راست" value={rightSidebarWidth} onChange={setRightSidebarWidth} min={100} max={400} unit="px" disabled={!hasRightSidebar} />
                                <ControlSlider label="فاصله (Gap)" value={gap} onChange={setGap} min={0} max={50} unit="px" />
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

export default LayoutGenerator;