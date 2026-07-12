import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ReplayIcon from './icons/ReplayIcon';
import type { Point } from '../types';
import ResizablePanels from './ResizablePanels';

const PRESETS = {
  'ease': [0.25, 0.1, 0.25, 1.0],
  'ease-in': [0.42, 0, 1.0, 1.0],
  'ease-out': [0, 0, 0.58, 1.0],
  'ease-in-out': [0.42, 0, 0.58, 1.0],
  'linear': [0.0, 0.0, 1.0, 1.0]
};

const GRAPH_SIZE = 200;

const CubicBezierGenerator: React.FC = () => {
    const [p1, setP1] = useState<Point>({ x: 0.25, y: 0.1 });
    const [p2, setP2] = useState<Point>({ x: 0.25, y: 1.0 });
    const [draggingPoint, setDraggingPoint] = useState<'p1' | 'p2' | null>(null);
    const [duration, setDuration] = useState(2);
    const [previewKey, setPreviewKey] = useState(0);
    const [copySuccess, setCopySuccess] = useState('');

    const svgRef = useRef<SVGSVGElement>(null);

    const getSvgCoords = useCallback((e: MouseEvent | React.MouseEvent): Point => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const rect = svgRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(GRAPH_SIZE, e.clientX - rect.left));
        const y = Math.max(0, Math.min(GRAPH_SIZE, e.clientY - rect.top));
        return { x: x / GRAPH_SIZE, y: y / GRAPH_SIZE };
    }, []);

    const handleMouseDown = (point: 'p1' | 'p2', e: React.MouseEvent) => {
        e.preventDefault();
        setDraggingPoint(point);
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!draggingPoint) return;
        const { x, y } = getSvgCoords(e);
        if (draggingPoint === 'p1') {
            setP1({ x, y });
        } else {
            setP2({ x, y });
        }
    }, [draggingPoint, getSvgCoords]);

    const handleMouseUp = useCallback(() => {
        setDraggingPoint(null);
    }, []);

    useEffect(() => {
        if (draggingPoint) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingPoint, handleMouseMove, handleMouseUp]);

    const setPreset = (name: keyof typeof PRESETS) => {
        const [x1, y1, x2, y2] = PRESETS[name];
        setP1({ x: x1, y: y1 });
        setP2({ x: x2, y: y2 });
    };

    const cubicBezierValue = `cubic-bezier(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})`;
    
    const cssCode = `
.animated-element {
  animation-timing-function: ${cubicBezierValue};
  /* For older browsers */
  -webkit-animation-timing-function: ${cubicBezierValue};
  transition-timing-function: ${cubicBezierValue};
  -webkit-transition-timing-function: ${cubicBezierValue};
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

    const animationStyle = (timingFunction: string) => ({
        '--duration': `${duration}s`,
        '--timing-function': timingFunction
    } as React.CSSProperties);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <style>{`
                @keyframes move-right {
                    from { left: 0%; }
                    to { left: calc(100% - 40px); }
                }
                .anim-box {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    animation: move-right var(--duration) var(--timing-function) infinite alternate;
                }
            `}</style>
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    {/* Preview Pane */}
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="w-full max-w-lg space-y-6" key={previewKey}>
                            <h3 className="text-xl font-bold text-center text-slate-800 dark:text-slate-100">پیش‌نمایش مقایسه‌ای</h3>
                            <div className="space-y-4">
                                <div className="w-full bg-white dark:bg-slate-800 rounded-lg p-4 shadow-inner">
                                    <div className="relative h-[40px]">
                                        <div className="anim-box rounded bg-indigo-500" style={animationStyle(cubicBezierValue)}></div>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500 mt-2 block">سفارشی</span>
                                </div>
                                 <div className="w-full bg-white dark:bg-slate-800 rounded-lg p-4 shadow-inner">
                                    <div className="relative h-[40px]">
                                        <div className="anim-box rounded bg-pink-500" style={animationStyle('linear')}></div>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500 mt-2 block">Linear</span>
                                </div>
                                 <div className="w-full bg-white dark:bg-slate-800 rounded-lg p-4 shadow-inner">
                                    <div className="relative h-[40px]">
                                        <div className="anim-box rounded bg-teal-500" style={animationStyle('ease-in-out')}></div>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500 mt-2 block">Ease-in-out</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Pane */}
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">ویرایشگر منحنی</h3>
                                <svg ref={svgRef} width={GRAPH_SIZE} height={GRAPH_SIZE} viewBox={`0 0 ${GRAPH_SIZE} ${GRAPH_SIZE}`} className="bg-slate-100 dark:bg-slate-900 rounded-lg mx-auto shadow-inner">
                                    <path d={`M 0,${GRAPH_SIZE} C ${p1.x * GRAPH_SIZE},${p1.y * GRAPH_SIZE} ${p2.x * GRAPH_SIZE},${p2.y * GRAPH_SIZE} ${GRAPH_SIZE},0`} strokeWidth="3" stroke="url(#gradient)" fill="none" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                    <line x1={0} y1={GRAPH_SIZE} x2={p1.x * GRAPH_SIZE} y2={p1.y * GRAPH_SIZE} stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                                    <line x1={GRAPH_SIZE} y1={0} x2={p2.x * GRAPH_SIZE} y2={p2.y * GRAPH_SIZE} stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                                    <circle onMouseDown={(e) => handleMouseDown('p1', e)} cx={p1.x * GRAPH_SIZE} cy={p1.y * GRAPH_SIZE} r="8" fill="#6366f1" className="cursor-move" />
                                    <circle onMouseDown={(e) => handleMouseDown('p2', e)} cx={p2.x * GRAPH_SIZE} cy={p2.y * GRAPH_SIZE} r="8" fill="#ec4899" className="cursor-move" />
                                </svg>
                                 <div className="text-center font-mono text-sm mt-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 py-2 rounded-md">{cubicBezierValue}</div>
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">قالب‌های آماده</h3>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                    {Object.keys(PRESETS).map(key => (
                                        <button key={key} onClick={() => setPreset(key as keyof typeof PRESETS)} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                            {key}
                                        </button>
                                    ))}
                                </div>
                            </div>

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                 <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات پیش‌نمایش</h3>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">مدت زمان ({duration.toFixed(1)}s)</label>
                                <input type="range" value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} min="0.2" max="5" step="0.1" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
                                <button onClick={() => setPreviewKey(k => k + 1)} className="mt-4 w-full flex items-center justify-center gap-2 p-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors">
                                    <ReplayIcon className="w-4 h-4" />
                                    پخش مجدد
                                </button>
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>
            
            <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                 <div className="h-full pt-2">
                    <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                </div>
            </ResizableFooter>
        </div>
    );
};

export default CubicBezierGenerator;