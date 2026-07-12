import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

const ControlSlider: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={onChange} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const BorderRadiusGenerator: React.FC = () => {
  const [topLeft, setTopLeft] = useState(30);
  const [topRight, setTopRight] = useState(30);
  const [bottomRight, setBottomRight] = useState(30);
  const [bottomLeft, setBottomLeft] = useState(30);
  const [allCorners, setAllCorners] = useState(true);
  const [previewColor, setPreviewColor] = useState('#6366f1');
  const [copySuccess, setCopySuccess] = useState('');

  const handleAllCornersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTopLeft(value);
    setTopRight(value);
    setBottomRight(value);
    setBottomLeft(value);
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

  const borderRadiusStyle = useMemo(() => ({
    borderRadius: `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`,
    backgroundColor: previewColor,
  }), [topLeft, topRight, bottomRight, bottomLeft, previewColor]);
  
  const cssCode = `
.element {
  border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;
  /* For older browsers */
  -webkit-border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;
  -moz-border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;
}`.trim();

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <main className="flex-grow flex min-h-0">
        <ResizablePanels>
            {/* Preview Pane */}
            <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
              <div className="w-72 h-72 shadow-lg" style={borderRadiusStyle}></div>
            </div>

            {/* Controls Pane */}
            <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col p-6 overflow-y-auto no-scrollbar">
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">تنظیمات شعاع گوشه‌ها</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="all-corners-checkbox"
                            checked={allCorners}
                            onChange={(e) => setAllCorners(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="all-corners-checkbox" className="text-sm font-medium text-slate-700 dark:text-slate-300">مقدار یکسان برای همه گوشه‌ها</label>
                    </div>

                    {allCorners ? (
                        <ControlSlider label="همه گوشه‌ها" value={topLeft} onChange={handleAllCornersChange} min={0} max={200} step={1} unit="px" />
                    ) : (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            <ControlSlider label="گوشه بالا چپ" value={topLeft} onChange={(e) => setTopLeft(parseInt(e.target.value, 10))} min={0} max={200} step={1} unit="px" />
                            <ControlSlider label="گوشه بالا راست" value={topRight} onChange={(e) => setTopRight(parseInt(e.target.value, 10))} min={0} max={200} step={1} unit="px" />
                            <ControlSlider label="گوشه پایین راست" value={bottomRight} onChange={(e) => setBottomRight(parseInt(e.target.value, 10))} min={0} max={200} step={1} unit="px" />
                            <ControlSlider label="گوشه پایین چپ" value={bottomLeft} onChange={(e) => setBottomLeft(parseInt(e.target.value, 10))} min={0} max={200} step={1} unit="px" />
                        </div>
                    )}
                     <div>
                        <label htmlFor="preview-color-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">رنگ پس‌زمینه</label>
                        <input type="color" id="preview-color-input" value={previewColor} onChange={(e) => setPreviewColor(e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                    </div>
                </div>
            </aside>
        </ResizablePanels>
      </main>
      
      {/* Footer */}
      <ResizableFooter>
        {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
        <div className="h-full pt-2">
            <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
        </div>
      </ResizableFooter>
    </div>
  );
};

export default BorderRadiusGenerator;