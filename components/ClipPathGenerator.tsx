import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import type { Point } from '../types';
import { PRESET_POLYGONS, PolygonPreset } from '../data/clip-path-presets';
import TriangleIcon from './icons/TriangleIcon';
import StarIcon from './icons/StarIcon';
import RhombusIcon from './icons/RhombusIcon';
import CrossIcon from './icons/CrossIcon';

type ShapeType = 'polygon' | 'circle' | 'ellipse' | 'inset';

const PREVIEW_IMAGES = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
];

const ControlSlider: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={onChange} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const ClipPathGenerator: React.FC = () => {
    const [shape, setShape] = useState<ShapeType>('polygon');
    const [previewImage, setPreviewImage] = useState(PREVIEW_IMAGES[0]);
    const [customImageUrl, setCustomImageUrl] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    // Polygon state
    const [points, setPoints] = useState<Point[]>(PRESET_POLYGONS[4].points);
    const [draggingPointIndex, setDraggingPointIndex] = useState<number | null>(null);

    // Circle state
    const [circleRadius, setCircleRadius] = useState(50);
    const [circleCenterX, setCircleCenterX] = useState(50);
    const [circleCenterY, setCircleCenterY] = useState(50);

    // Ellipse state
    const [ellipseRx, setEllipseRx] = useState(50);
    const [ellipseRy, setEllipseRy] = useState(30);
    const [ellipseCx, setEllipseCx] = useState(50);
    const [ellipseCy, setEllipseCy] = useState(50);

    // Inset state
    const [insetTop, setInsetTop] = useState(10);
    const [insetRight, setInsetRight] = useState(10);
    const [insetBottom, setInsetBottom] = useState(10);
    const [insetLeft, setInsetLeft] = useState(10);
    const [insetBorderRadius, setInsetBorderRadius] = useState(0);

    const canvasRef = useRef<HTMLDivElement>(null);

    const clipPathValue = useMemo(() => {
        switch (shape) {
            case 'polygon':
                return `polygon(${points.map(p => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`).join(', ')})`;
            case 'circle':
                return `circle(${circleRadius}% at ${circleCenterX}% ${circleCenterY}%)`;
            case 'ellipse':
                return `ellipse(${ellipseRx}% ${ellipseRy}% at ${ellipseCx}% ${ellipseCy}%)`;
            case 'inset':
                return `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}% round ${insetBorderRadius}%)`;
            default:
                return 'none';
        }
    }, [shape, points, circleRadius, circleCenterX, circleCenterY, ellipseRx, ellipseRy, ellipseCx, ellipseCy, insetTop, insetRight, insetBottom, insetLeft, insetBorderRadius]);

    const cssCode = `
.clipped-element {
  clip-path: ${clipPathValue};
  -webkit-clip-path: ${clipPathValue};
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
    
    const getCanvasRelativeCoords = (event: React.MouseEvent | MouseEvent): Point => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
        return { x, y };
    };

    const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (shape !== 'polygon' || event.target !== canvasRef.current) return;
        const newPoint = getCanvasRelativeCoords(event);
        setPoints([...points, newPoint]);
    };
    
    const handlePointMouseDown = (index: number, e: React.MouseEvent) => {
        if (shape !== 'polygon') return;
        e.stopPropagation();
        setDraggingPointIndex(index);
    };

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (draggingPointIndex === null) return;
        event.preventDefault();
        const {x, y} = getCanvasRelativeCoords(event);
        const newPoints = [...points];
        newPoints[draggingPointIndex] = { x, y };
        setPoints(newPoints);
    }, [draggingPointIndex, points]);

    const handleMouseUp = useCallback(() => {
        setDraggingPointIndex(null);
    }, []);

    useEffect(() => {
        if (draggingPointIndex !== null) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingPointIndex, handleMouseMove, handleMouseUp]);


    const renderControls = () => {
        switch (shape) {
            case 'polygon':
                return (
                    <div>
                        <h4 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-3">قالب‌های آماده</h4>
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {PRESET_POLYGONS.map(preset => (
                                <button key={preset.name} onClick={() => setPoints(preset.points)} title={preset.name} className="aspect-square bg-slate-100 dark:bg-slate-700/50 rounded-lg flex items-center justify-center p-2 hover:ring-2 ring-indigo-500 transition-all">
                                    {React.createElement(preset.icon, { className: "w-8 h-8 text-slate-600 dark:text-slate-300"})}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">برای افزودن نقطه کلیک کنید، برای جابجایی نقاط را بکشید.</p>
                        <button onClick={() => setPoints([])} className="mt-2 text-sm text-red-500 hover:text-red-700">پاک کردن نقاط</button>
                    </div>
                );
            case 'circle':
                return <div className="space-y-4">
                    <ControlSlider label="شعاع" value={circleRadius} onChange={e => setCircleRadius(+e.target.value)} min={0} max={100} step={1} unit="%" />
                    <ControlSlider label="مرکز X" value={circleCenterX} onChange={e => setCircleCenterX(+e.target.value)} min={0} max={100} step={1} unit="%" />
                    <ControlSlider label="مرکز Y" value={circleCenterY} onChange={e => setCircleCenterY(+e.target.value)} min={0} max={100} step={1} unit="%" />
                </div>;
            case 'ellipse':
                 return <div className="space-y-4">
                    <ControlSlider label="شعاع X" value={ellipseRx} onChange={e => setEllipseRx(+e.target.value)} min={0} max={100} step={1} unit="%" />
                    <ControlSlider label="شعاع Y" value={ellipseRy} onChange={e => setEllipseRy(+e.target.value)} min={0} max={100} step={1} unit="%" />
                    <ControlSlider label="مرکز X" value={ellipseCx} onChange={e => setEllipseCx(+e.target.value)} min={0} max={100} step={1} unit="%" />
                    <ControlSlider label="مرکز Y" value={ellipseCy} onChange={e => setEllipseCy(+e.target.value)} min={0} max={100} step={1} unit="%" />
                </div>;
            case 'inset':
                 return <div className="space-y-4">
                    <ControlSlider label="از بالا" value={insetTop} onChange={e => setInsetTop(+e.target.value)} min={0} max={100} step={1} unit="%" />
                    <ControlSlider label="از راست" value={insetRight} onChange={e => setInsetRight(+e.target.value)} min={0} max={100} step={1} unit="%" />
                    <ControlSlider label="از پایین" value={insetBottom} onChange={e => setInsetBottom(+e.target.value)} min={0} max={100} step={1} unit="%" />
                    <ControlSlider label="از چپ" value={insetLeft} onChange={e => setInsetLeft(+e.target.value)} min={0} max={100} step={1} unit="%" />
                    <ControlSlider label="گردی گوشه" value={insetBorderRadius} onChange={e => setInsetBorderRadius(+e.target.value)} min={0} max={50} step={1} unit="%" />
                </div>;
            default: return null;
        }
    }


    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    {/* Preview Pane */}
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div 
                            ref={canvasRef}
                            className="w-full max-w-[400px] aspect-square relative"
                            onClick={handleCanvasClick}
                            style={{ cursor: shape === 'polygon' ? 'copy' : 'default' }}
                        >
                            <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0))]"></div>
                            <img 
                                src={previewImage} 
                                alt="Preview"
                                className="w-full h-full object-cover"
                                style={{ clipPath: clipPathValue, WebkitClipPath: clipPathValue }}
                            />
                             {shape === 'polygon' && points.map((point, index) => (
                                <div
                                    key={index}
                                    className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded-full cursor-move transition-transform duration-100 ${draggingPointIndex === index ? 'scale-125 shadow-2xl' : 'hover:scale-110'} border-indigo-500 z-10`}
                                    style={{
                                    left: `${point.x}%`,
                                    top: `${point.y}%`,
                                    }}
                                    onMouseDown={(e) => handlePointMouseDown(index, e)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Controls Pane */}
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">انتخاب شکل</h3>
                                <select value={shape} onChange={e => setShape(e.target.value as ShapeType)} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                                    <option value="polygon">چندضلعی (Polygon)</option>
                                    <option value="circle">دایره (Circle)</option>
                                    <option value="ellipse">بیضی (Ellipse)</option>
                                    <option value="inset">تو رفتگی (Inset)</option>
                                </select>
                            </div>
                            
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                {renderControls()}
                            </div>

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                 <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تصویر پیش‌نمایش</h3>
                                 <div className="grid grid-cols-3 gap-2">
                                    {PREVIEW_IMAGES.map(img => (
                                        <button key={img} onClick={() => { setPreviewImage(img); setCustomImageUrl(''); }} className={`aspect-square rounded-md overflow-hidden ring-2 ${previewImage === img ? 'ring-indigo-500' : 'ring-transparent hover:ring-indigo-400'}`}>
                                            <img src={img} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                 </div>
                                 <div className="mt-4">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">یا آدرس تصویر دلخواه</label>
                                    <input 
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        value={customImageUrl}
                                        onChange={e => {
                                            setCustomImageUrl(e.target.value);
                                            if (e.target.value) {
                                                setPreviewImage(e.target.value);
                                            }
                                        }}
                                        className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-sm"
                                    />
                                 </div>
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

export default ClipPathGenerator;