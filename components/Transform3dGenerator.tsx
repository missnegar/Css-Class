import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

// Helper component
const ControlSlider: React.FC<{label: string, value: number, onChange: (v: number) => void, min?: number, max?: number, step?: number, unit?: string}> =
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const Transform3dGenerator: React.FC = () => {
    // Perspective State
    const [perspective, setPerspective] = useState(800);
    const [perspectiveOriginX, setPerspectiveOriginX] = useState(50);
    const [perspectiveOriginY, setPerspectiveOriginY] = useState(50);

    // Transform State
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [translateZ, setTranslateZ] = useState(0);
    const [rotateX, setRotateX] = useState(45);
    const [rotateY, setRotateY] = useState(45);
    const [rotateZ, setRotateZ] = useState(0);
    const [scale, setScale] = useState(1);
    const [backfaceVisibility, setBackfaceVisibility] = useState<'visible' | 'hidden'>('visible');
    
    const [copySuccess, setCopySuccess] = useState('');

    const containerStyle = useMemo(() => ({
        perspective: `${perspective}px`,
        perspectiveOrigin: `${perspectiveOriginX}% ${perspectiveOriginY}%`,
    }), [perspective, perspectiveOriginX, perspectiveOriginY]);

    const elementTransform = useMemo(() => {
        return `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
    }, [translateX, translateY, translateZ, rotateX, rotateY, rotateZ, scale]);

    const elementStyle = useMemo(() => ({
        transform: elementTransform,
        backfaceVisibility: backfaceVisibility,
    }), [elementTransform, backfaceVisibility]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const htmlCode = `
<div class="perspective-container">
  <div class="transformed-element">
    <div class="face front">Front</div>
    <div class="face back">Back</div>
  </div>
</div>`.trim();

    const cssCode = `
.perspective-container {
  perspective: ${perspective}px;
  perspective-origin: ${perspectiveOriginX}% ${perspectiveOriginY}%;
  /* Add other container styles like width, height, etc. */
}

.transformed-element {
  width: 200px; /* Example size */
  height: 200px; /* Example size */
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${elementTransform};
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  backface-visibility: ${backfaceVisibility};
}

.face.front {
  background-color: rgba(99, 102, 241, 0.8); /* indigo-500 */
  color: white;
  transform: translateZ(20px); /* Move front face forward */
}

.face.back {
  background-color: rgba(236, 72, 153, 0.8); /* pink-500 */
  color: white;
  transform: rotateY(180deg) translateZ(20px); /* Rotate and move back face forward */
}
    `.trim();

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 overflow-hidden" style={containerStyle}>
                        <div className="relative w-[200px] h-[200px]" style={{ transformStyle: 'preserve-3d' }}>
                            <div 
                                className="absolute w-full h-full"
                                style={{ ...elementStyle, transformStyle: 'preserve-3d' }}
                            >
                                <div className="absolute w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-indigo-500/80 rounded-lg" style={{ backfaceVisibility: backfaceVisibility, transform: 'translateZ(20px)'}}>
                                    Front
                                </div>
                                <div className="absolute w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-pink-500/80 rounded-lg" style={{ backfaceVisibility: backfaceVisibility, transform: 'rotateY(180deg) translateZ(20px)'}}>
                                    Back
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Perspective</h3>
                                <div className="space-y-4">
                                    <ControlSlider label="Perspective" value={perspective} onChange={setPerspective} min={200} max={2000} step={50} unit="px" />
                                    <ControlSlider label="Origin X" value={perspectiveOriginX} onChange={setPerspectiveOriginX} min={0} max={100} step={1} unit="%" />
                                    <ControlSlider label="Origin Y" value={perspectiveOriginY} onChange={setPerspectiveOriginY} min={0} max={100} step={1} unit="%" />
                                </div>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Transform</h3>
                                <div className="space-y-4">
                                    <ControlSlider label="Translate X" value={translateX} onChange={setTranslateX} min={-100} max={100} unit="px" />
                                    <ControlSlider label="Translate Y" value={translateY} onChange={setTranslateY} min={-100} max={100} unit="px" />
                                    <ControlSlider label="Translate Z" value={translateZ} onChange={setTranslateZ} min={-200} max={200} unit="px" />
                                    <ControlSlider label="Rotate X" value={rotateX} onChange={setRotateX} min={0} max={360} unit="deg" />
                                    <ControlSlider label="Rotate Y" value={rotateY} onChange={setRotateY} min={0} max={360} unit="deg" />
                                    <ControlSlider label="Rotate Z" value={rotateZ} onChange={setRotateZ} min={0} max={360} unit="deg" />
                                    <ControlSlider label="Scale" value={scale} onChange={setScale} min={0.5} max={2} step={0.05} unit="" />
                                </div>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Other Properties</h3>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Backface Visibility</label>
                                    <div className="flex gap-2 text-sm">
                                        <button onClick={() => setBackfaceVisibility('visible')} className={`flex-1 p-2 rounded-md transition-colors ${backfaceVisibility === 'visible' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>Visible</button>
                                        <button onClick={() => setBackfaceVisibility('hidden')} className={`flex-1 p-2 rounded-md transition-colors ${backfaceVisibility === 'hidden' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>Hidden</button>
                                    </div>
                                </div>
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
                        <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default Transform3dGenerator;
