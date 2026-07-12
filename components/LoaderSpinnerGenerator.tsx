import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

type LoaderType = 'spinner' | 'dots' | 'bar' | 'circle' | 'dual-ring' | 'heart' | 'ripple' | 'hourglass' | 'grid' | 'ellipsis' | 'roller' | 'ring';

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

const LOADER_PRESETS: {name: string, type: LoaderType}[] = [
    { name: 'Spinner', type: 'spinner' }, { name: 'Dots', type: 'dots' },
    { name: 'Bar', type: 'bar' }, { name: 'Circle', type: 'circle' },
    { name: 'Dual Ring', type: 'dual-ring' }, { name: 'Heart', type: 'heart' },
    { name: 'Ripple', type: 'ripple' }, { name: 'Hourglass', type: 'hourglass' },
    { name: 'Grid', type: 'grid' }, { name: 'Ellipsis', type: 'ellipsis' },
    { name: 'Roller', type: 'roller' }, { name: 'Ring', type: 'ring' },
];

const LoaderSpinnerGenerator: React.FC = () => {
    const [loaderType, setLoaderType] = useState<LoaderType>('spinner');
    const [color, setColor] = useState('#6366f1');
    const [size, setSize] = useState(80);
    const [speed, setSpeed] = useState(1.2);
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

    const { htmlCode, cssCode } = useMemo(() => {
        let html = `<div class="loader-${loaderType}"></div>`;
        let css = '';
        
        switch (loaderType) {
            case 'spinner':
                css = `
.loader-spinner {
  border: ${size / 8}px solid #f3f3f3; /* Light grey */
  border-top: ${size / 8}px solid ${color}; /* Blue */
  border-radius: 50%;
  width: ${size}px;
  height: ${size}px;
  animation: spin ${speed}s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
                break;
            case 'dots':
                css = `
.loader-dots { display: flex; justify-content: space-around; width: ${size}px; }
.loader-dots div {
  width: ${size / 5}px; height: ${size / 5}px;
  background-color: ${color};
  border-radius: 50%;
  animation: bounce ${speed}s infinite ease-in-out both;
}
.loader-dots div:nth-child(1) { animation-delay: -0.32s; }
.loader-dots div:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }`;
                break;
            case 'bar':
                 css = `
.loader-bar {
  width: ${size}px; height: ${size/4}px;
  background: linear-gradient(${color} 0 0) 0 0/${size/4}px 100% no-repeat;
  animation: bar-anim ${speed}s infinite linear;
}
@keyframes bar-anim { 100% { background-position: ${size*3/4}px 0} }`;
                break;
            case 'circle':
                css = `
.loader-circle {
  width: ${size}px; height: ${size}px;
  border-radius: 50%;
  background: conic-gradient(#0000 10%,${color});
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - ${size/8}px),#000 0);
  mask: radial-gradient(farthest-side,#0000 calc(100% - ${size/8}px),#000 0);
  animation: circle-anim ${speed}s infinite linear;
}
@keyframes circle-anim { 100% { transform: rotate(1turn)} }`;
                break;
            case 'dual-ring':
                css = `
.loader-dual-ring { display: inline-block; width: ${size}px; height: ${size}px; }
.loader-dual-ring:after {
  content: " "; display: block; width: ${size*0.8}px; height: ${size*0.8}px;
  margin: ${size*0.1}px; border-radius: 50%;
  border: ${size/10}px solid ${color};
  border-color: ${color} transparent ${color} transparent;
  animation: dual-ring-anim ${speed}s linear infinite;
}
@keyframes dual-ring-anim { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
                break;
            case 'heart':
                html = `<div class="loader-heart"><div></div></div>`;
                css = `
.loader-heart { display: inline-block; position: relative; width: ${size}px; height: ${size}px; transform: rotate(45deg); transform-origin: ${size/2}px ${size/2}px; }
.loader-heart div { top: ${size*0.4}px; left: ${size*0.4}px; position: absolute; width: ${size*0.4}px; height: ${size*0.4}px; background: ${color}; animation: heart-anim ${speed}s infinite cubic-bezier(0.215, 0.61, 0.355, 1); }
.loader-heart div:after, .loader-heart div:before { content: " "; position: absolute; display: block; width: ${size*0.4}px; height: ${size*0.4}px; background: ${color}; }
.loader-heart div:before { left: -${size*0.3}px; border-radius: 50% 0 0 50%; }
.loader-heart div:after { top: -${size*0.3}px; border-radius: 50% 50% 0 0; }
@keyframes heart-anim { 0% { transform: scale(0.95); } 5% { transform: scale(1.1); } 39% { transform: scale(0.85); } 45% { transform: scale(1); } 60% { transform: scale(0.95); } 100% { transform: scale(0.9); } }`;
                break;
             case 'ripple':
                html = `<div class="loader-ripple"><div></div><div></div></div>`;
                css = `
.loader-ripple { display: inline-block; position: relative; width: ${size}px; height: ${size}px; }
.loader-ripple div { position: absolute; border: 4px solid ${color}; opacity: 1; border-radius: 50%; animation: ripple-anim ${speed}s cubic-bezier(0, 0.2, 0.8, 1) infinite; }
.loader-ripple div:nth-child(2) { animation-delay: -${speed/2}s; }
@keyframes ripple-anim { 0% { top: ${size/2 - 2}px; left: ${size/2 - 2}px; width: 0; height: 0; opacity: 1; } 100% { top: 0px; left: 0px; width: ${size-8}px; height: ${size-8}px; opacity: 0; } }`;
                break;
            case 'hourglass':
                 css = `
.loader-hourglass { display: inline-block; position: relative; width: ${size}px; height: ${size}px; }
.loader-hourglass:after { content: " "; display: block; border-radius: 50%; width: 0; height: 0; margin: ${size/10}px; box-sizing: border-box; border: ${size*0.4}px solid ${color}; border-color: ${color} transparent ${color} transparent; animation: hourglass-anim ${speed}s infinite; }
@keyframes hourglass-anim { 0% { transform: rotate(0); animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); } 50% { transform: rotate(900deg); animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); } 100% { transform: rotate(1800deg); } }`;
                break;
            case 'grid':
                html = `<div class="loader-grid">${Array(9).fill('<div></div>').join('')}</div>`;
                css = `
.loader-grid { display: inline-block; position: relative; width: ${size}px; height: ${size}px; }
.loader-grid div { position: absolute; width: ${size/5}px; height: ${size/5}px; background: ${color}; animation: grid-anim ${speed}s linear infinite; }
.loader-grid div:nth-child(1) { top: ${size/10}px; left: ${size/10}px; animation-delay: 0s; }
.loader-grid div:nth-child(2) { top: ${size/10}px; left: ${size*2/5}px; animation-delay: -${speed*1/3}s; }
.loader-grid div:nth-child(3) { top: ${size/10}px; left: ${size*7/10}px; animation-delay: -${speed*2/3}s; }
.loader-grid div:nth-child(4) { top: ${size*2/5}px; left: ${size/10}px; animation-delay: -${speed*1/3}s; }
.loader-grid div:nth-child(5) { top: ${size*2/5}px; left: ${size*2/5}px; animation-delay: -${speed*2/3}s; }
.loader-grid div:nth-child(6) { top: ${size*2/5}px; left: ${size*7/10}px; animation-delay: -${speed}s; }
.loader-grid div:nth-child(7) { top: ${size*7/10}px; left: ${size/10}px; animation-delay: -${speed*2/3}s; }
.loader-grid div:nth-child(8) { top: ${size*7/10}px; left: ${size*2/5}px; animation-delay: -${speed}s; }
.loader-grid div:nth-child(9) { top: ${size*7/10}px; left: ${size*7/10}px; animation-delay: -${speed*4/3}s; }
@keyframes grid-anim { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`;
                break;
            case 'ellipsis':
                html = `<div class="loader-ellipsis">${Array(4).fill('<div></div>').join('')}</div>`;
                css = `
.loader-ellipsis { display: inline-block; position: relative; width: ${size}px; height: ${size}px; }
.loader-ellipsis div { position: absolute; top: ${size*0.4}px; width: ${size/6}px; height: ${size/6}px; border-radius: 50%; background: ${color}; animation-timing-function: cubic-bezier(0, 1, 1, 0); }
.loader-ellipsis div:nth-child(1) { left: ${size/10}px; animation: ellipsis1 ${speed*0.5}s infinite; }
.loader-ellipsis div:nth-child(2) { left: ${size/10}px; animation: ellipsis2 ${speed*0.5}s infinite; }
.loader-ellipsis div:nth-child(3) { left: ${size*2/5}px; animation: ellipsis2 ${speed*0.5}s infinite; }
.loader-ellipsis div:nth-child(4) { left: ${size*7/10}px; animation: ellipsis3 ${speed*0.5}s infinite; }
@keyframes ellipsis1 { 0% { transform: scale(0); } 100% { transform: scale(1); } }
@keyframes ellipsis3 { 0% { transform: scale(1); } 100% { transform: scale(0); } }
@keyframes ellipsis2 { 0% { transform: translate(0, 0); } 100% { transform: translate(${size*0.3}px, 0); } }`;
                break;
            case 'roller':
                html = `<div class="loader-roller">${Array(8).fill('<div></div>').join('')}</div>`;
                css = `
.loader-roller { display: inline-block; position: relative; width: ${size}px; height: ${size}px; }
.loader-roller div { animation: roller-anim ${speed}s cubic-bezier(0.5, 0, 0.5, 1) infinite; transform-origin: ${size/2}px ${size/2}px; }
.loader-roller div:after { content: " "; display: block; position: absolute; width: ${size/10}px; height: ${size/10}px; border-radius: 50%; background: ${color}; margin: -${size/20}px 0 0 -${size/20}px; }
.loader-roller div:nth-child(1) { animation-delay: -0.036s; } .loader-roller div:nth-child(1):after { top: ${size*0.8}px; left: ${size*0.8}px; }
.loader-roller div:nth-child(2) { animation-delay: -0.072s; } .loader-roller div:nth-child(2):after { top: ${size*0.85}px; left: ${size*0.7}px; }
.loader-roller div:nth-child(3) { animation-delay: -0.108s; } .loader-roller div:nth-child(3):after { top: ${size*0.9}px; left: ${size*0.6}px; }
.loader-roller div:nth-child(4) { animation-delay: -0.144s; } .loader-roller div:nth-child(4):after { top: ${size*0.9}px; left: ${size*0.5}px; }
.loader-roller div:nth-child(5) { animation-delay: -0.18s; } .loader-roller div:nth-child(5):after { top: ${size*0.9}px; left: ${size*0.4}px; }
.loader-roller div:nth-child(6) { animation-delay: -0.216s; } .loader-roller div:nth-child(6):after { top: ${size*0.85}px; left: ${size*0.3}px; }
.loader-roller div:nth-child(7) { animation-delay: -0.252s; } .loader-roller div:nth-child(7):after { top: ${size*0.8}px; left: ${size*0.2}px; }
.loader-roller div:nth-child(8) { animation-delay: -0.288s; } .loader-roller div:nth-child(8):after { top: ${size*0.7}px; left: ${size*0.15}px; }
@keyframes roller-anim { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
                break;
            case 'ring':
                html = `<div class="loader-ring"><div></div><div></div><div></div><div></div></div>`;
                css = `
.loader-ring { display: inline-block; position: relative; width: ${size}px; height: ${size}px; }
.loader-ring div { box-sizing: border-box; display: block; position: absolute; width: ${size*0.8}px; height: ${size*0.8}px; margin: ${size*0.1}px; border: ${size*0.1}px solid ${color}; border-radius: 50%; animation: ring-anim ${speed}s cubic-bezier(0.5, 0, 0.5, 1) infinite; border-color: ${color} transparent transparent transparent; }
.loader-ring div:nth-child(1) { animation-delay: -0.45s; }
.loader-ring div:nth-child(2) { animation-delay: -0.3s; }
.loader-ring div:nth-child(3) { animation-delay: -0.15s; }
@keyframes ring-anim { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
                break;
        }

        return { htmlCode: html.trim(), cssCode: css.trim() };
    }, [loaderType, color, size, speed]);


    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex justify-center bg-slate-100/50 dark:bg-slate-900/50 pt-24">
                        <div className="transform scale-125">
                            <style>{cssCode}</style>
                            <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
                        </div>
                    </div>
                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto no-scrollbar">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">انواع لودر</h3>
                             <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                 {LOADER_PRESETS.map(preset => (
                                     <button 
                                        key={preset.type} 
                                        onClick={() => setLoaderType(preset.type)} 
                                        className={`p-3 text-sm font-semibold rounded-lg transition-colors ${loaderType === preset.type ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                                      >
                                         {preset.name}
                                     </button>
                                 ))}
                             </div>
                        </div>
                         <div className="flex-grow p-4 space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">سفارشی‌سازی</h3>
                             <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg space-y-3">
                                <ColorInput label="رنگ" value={color} onChange={setColor} />
                                <ControlSlider label="اندازه" value={size} onChange={setSize} min={20} max={200} unit="px" />
                                <ControlSlider label="سرعت" value={speed} onChange={setSpeed} min={0.5} max={5} step={0.1} unit="s" />
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

export default LoaderSpinnerGenerator;