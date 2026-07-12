import React, { useState, useMemo, useCallback } from 'react';
import CodeBlock from './CodeBlock';
import ReplayIcon from './icons/ReplayIcon';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import type { Keyframe, KeyframeProperties } from '../types';
import { PRESET_ANIMATIONS } from '../data/animation-presets';
import type { AnimationPreset } from '../data/animation-presets';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';


// --- Type definitions ---
interface AnimationProperties {
  name: string;
  duration: number;
  timingFunction: string;
  delay: number;
  iterationCount: string;
  direction: string;
  fillMode: string;
}


// --- Constants ---
const TIMING_FUNCTIONS = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end'];
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
const FILL_MODES = ['none', 'forwards', 'backwards', 'both'];
const INITIAL_PROPERTIES: KeyframeProperties = {
  translateX: 0,
  translateY: 0,
  scale: 1,
  rotate: 0,
  opacity: 1,
  backgroundColor: '#6366f1',
  borderRadius: 8,
};

// --- Helper Components ---
const ControlSlider: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: number, max?: number, step?: number, unit?: string}> = 
({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label} ({value}{unit})</label>
        <input type="range" value={value} onChange={onChange} min={min} max={max} step={step} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
    </div>
);

const ControlSelect: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[]}> = 
({ label, value, onChange, options }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label}</label>
        <select value={value} onChange={onChange} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

// --- Main Component ---
const AnimationGenerator: React.FC = () => {
  const [animationProps, setAnimationProps] = useState<AnimationProperties>({
    name: 'my-animation',
    duration: 2,
    timingFunction: 'ease',
    delay: 0,
    iterationCount: 'infinite',
    direction: 'alternate',
    fillMode: 'forwards',
  });

  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { id: 1, stop: 0, properties: { ...INITIAL_PROPERTIES, translateX: -100, opacity: 0 } },
    { id: 2, stop: 100, properties: { ...INITIAL_PROPERTIES, translateX: 100, opacity: 1, backgroundColor: '#ec4899', rotate: 360 } },
  ]);
  const [activeKeyframeId, setActiveKeyframeId] = useState<number>(1);
  const [selectedPreset, setSelectedPreset] = useState<string>('custom');
  const [previewKey, setPreviewKey] = useState(0);
  const [copySuccess, setCopySuccess] = useState('');

  const activeKeyframe = useMemo(() => keyframes.find(k => k.id === activeKeyframeId), [keyframes, activeKeyframeId]);

  const updateKeyframeProperty = (prop: keyof KeyframeProperties, value: any) => {
    setSelectedPreset('custom');
    setKeyframes(currentKeyframes =>
      currentKeyframes.map(kf =>
        kf.id === activeKeyframeId ? { ...kf, properties: { ...kf.properties, [prop]: value } } : kf
      )
    );
  };
    
  const updateKeyframeStop = (id: number, stop: number) => {
      setSelectedPreset('custom');
      setKeyframes(currentKeyframes => {
          const newKeyframes = currentKeyframes.map(kf => kf.id === id ? { ...kf, stop } : kf);
          newKeyframes.sort((a, b) => a.stop - b.stop);
          return newKeyframes;
      });
  };

  const addKeyframe = () => {
      setSelectedPreset('custom');
      const newStop = 50;
      const newId = Date.now();
      const newKeyframe: Keyframe = { id: newId, stop: newStop, properties: activeKeyframe?.properties || INITIAL_PROPERTIES };
      const newKeyframes = [...keyframes, newKeyframe].sort((a,b) => a.stop - b.stop);
      setKeyframes(newKeyframes);
      setActiveKeyframeId(newId);
  };

  const removeKeyframe = (id: number) => {
      if (keyframes.length <= 1) return;
      setSelectedPreset('custom');
      const newKeyframes = keyframes.filter(kf => kf.id !== id);
      setKeyframes(newKeyframes);
      if (activeKeyframeId === id) {
          setActiveKeyframeId(newKeyframes[0]?.id || 0);
      }
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const presetValue = e.target.value;
    setSelectedPreset(presetValue);

    if (presetValue === 'custom') return;

    let preset: AnimationPreset | undefined;
    for (const category of PRESET_ANIMATIONS) {
        preset = category.presets.find(p => p.value === presetValue);
        if (preset) break;
    }

    if (preset) {
        const startColor = keyframes[0]?.properties.backgroundColor || INITIAL_PROPERTIES.backgroundColor;
        const endColor = keyframes.length > 1 ? keyframes[keyframes.length - 1].properties.backgroundColor : '#ec4899';

        const newKeyframes: Keyframe[] = preset.keyframes.map((kfPreset, index, arr) => {
            const isLast = index === arr.length - 1;
            const backgroundColor = isLast ? endColor : startColor;
            
            return {
                id: Date.now() + index,
                stop: kfPreset.stop,
                properties: {
                    ...INITIAL_PROPERTIES,
                    backgroundColor,
                    ...kfPreset.properties,
                },
            };
        });
        setKeyframes(newKeyframes);
        setActiveKeyframeId(newKeyframes[0].id);
    }
  };


  const animationStyle = useMemo(() => ({
    animationName: animationProps.name,
    animationDuration: `${animationProps.duration}s`,
    animationTimingFunction: animationProps.timingFunction,
    animationDelay: `${animationProps.delay}s`,
    animationIterationCount: animationProps.iterationCount,
    animationDirection: animationProps.direction,
    animationFillMode: animationProps.fillMode,
  }), [animationProps]);

  const generateCss = useCallback(() => {
      const keyframesCss = `@keyframes ${animationProps.name} {\n${keyframes.map(kf => 
        `  ${kf.stop}% {\n` +
        `    background-color: ${kf.properties.backgroundColor};\n` +
        `    opacity: ${kf.properties.opacity};\n` +
        `    border-radius: ${kf.properties.borderRadius}px;\n` +
        `    transform: translateX(${kf.properties.translateX}px) translateY(${kf.properties.translateY}px) scale(${kf.properties.scale}) rotate(${kf.properties.rotate}deg);\n` +
        `  }`
      ).join('\n')}\n}`;
      
      const classCss = `.animated-element {\n` +
        `  animation: ${animationProps.name} ${animationProps.duration}s ${animationProps.timingFunction} ${animationProps.delay}s ${animationProps.iterationCount} ${animationProps.direction} ${animationProps.fillMode};\n` +
        `}`;

      return { keyframesCss, classCss };
  }, [animationProps, keyframes]);

  const { keyframesCss, classCss } = generateCss();
  
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
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      <div className="flex-grow flex min-h-0">
        <ResizablePanels>
            {/* Preview Pane */}
            <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 relative">
              <style>{keyframesCss}</style>
              <div key={previewKey} className="w-40 h-40 rounded-lg shadow-lg" style={animationStyle}></div>
              <button
                  onClick={() => setPreviewKey(k => k + 1)}
                  className="absolute bottom-6 right-6 p-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full shadow-lg transition-colors flex items-center gap-2"
                  aria-label="پخش مجدد انیمیشن"
              >
                  <ReplayIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Controls Pane */}
            <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto no-scrollbar">
                <div className="p-4 space-y-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">تنظیمات انیمیشن</h3>
                     <div>
                        <label htmlFor="preset-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">انیمیشن‌های آماده</label>
                        <select id="preset-select" value={selectedPreset} onChange={handlePresetChange} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                            <option value="custom">سفارشی</option>
                            {PRESET_ANIMATIONS.map(category => (
                                <optgroup key={category.name} label={category.name}>
                                    {category.presets.map(preset => (
                                        <option key={preset.value} value={preset.value}>{preset.name}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <ControlSlider label="مدت زمان" value={animationProps.duration} onChange={e => setAnimationProps({...animationProps, duration: +e.target.value})} min={0.1} max={10} step={0.1} unit="s" />
                      <ControlSlider label="تاخیر" value={animationProps.delay} onChange={e => setAnimationProps({...animationProps, delay: +e.target.value})} min={0} max={10} step={0.1} unit="s" />
                      <ControlSelect label="تابع زمان‌بندی" value={animationProps.timingFunction} onChange={e => setAnimationProps({...animationProps, timingFunction: e.target.value})} options={TIMING_FUNCTIONS} />
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">تعداد تکرار</label>
                        <input type="text" value={animationProps.iterationCount} onChange={e => setAnimationProps({...animationProps, iterationCount: e.target.value})} placeholder="e.g., 3 or infinite" className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
                      </div>
                      <ControlSelect label="جهت" value={animationProps.direction} onChange={e => setAnimationProps({...animationProps, direction: e.target.value})} options={DIRECTIONS} />
                      <ControlSelect label="حالت پایانی" value={animationProps.fillMode} onChange={e => setAnimationProps({...animationProps, fillMode: e.target.value})} options={FILL_MODES} />
                    </div>
                </div>

                <div className="flex-grow p-4 space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Keyframes</h3>
                    <div className="flex items-center gap-2 flex-wrap p-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
                        {keyframes.map(kf => (
                            <button key={kf.id} onClick={() => setActiveKeyframeId(kf.id)} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${activeKeyframeId === kf.id ? 'bg-indigo-600 text-white shadow' : 'bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                                {kf.stop}%
                            </button>
                        ))}
                        <button onClick={addKeyframe} className="p-2 bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full">
                           <PlusIcon className="w-4 h-4"/>
                        </button>
                    </div>
                    
                    {activeKeyframe && (
                        <div className="space-y-4 pt-2">
                          <div className="grid grid-cols-2 gap-x-4 items-center">
                            <ControlSlider label="Stop" value={activeKeyframe.stop} onChange={e => updateKeyframeStop(activeKeyframe.id, +e.target.value)} min={0} max={100} step={1} unit="%" />
                            <button onClick={() => removeKeyframe(activeKeyframe.id)} disabled={keyframes.length <= 1} className="mt-6 p-2 self-start bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                               <TrashIcon className="w-4 h-4"/> حذف
                            </button>
                          </div>
                          <ControlSlider label="حرکت افقی" value={activeKeyframe.properties.translateX} onChange={e => updateKeyframeProperty('translateX', +e.target.value)} min={-200} max={200} step={1} unit="px" />
                          <ControlSlider label="حرکت عمودی" value={activeKeyframe.properties.translateY} onChange={e => updateKeyframeProperty('translateY', +e.target.value)} min={-200} max={200} step={1} unit="px" />
                          <ControlSlider label="مقیاس" value={activeKeyframe.properties.scale} onChange={e => updateKeyframeProperty('scale', +e.target.value)} min={0} max={3} step={0.05} unit="" />
                          <ControlSlider label="چرخش" value={activeKeyframe.properties.rotate} onChange={e => updateKeyframeProperty('rotate', +e.target.value)} min={0} max={360} step={1} unit="deg" />
                          <ControlSlider label="شفافیت" value={activeKeyframe.properties.opacity} onChange={e => updateKeyframeProperty('opacity', +e.target.value)} min={0} max={1} step={0.01} unit="" />
                          <ControlSlider label="شعاع گوشه" value={activeKeyframe.properties.borderRadius} onChange={e => updateKeyframeProperty('borderRadius', +e.target.value)} min={0} max={100} step={1} unit="px" />
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">رنگ پس‌زمینه</label>
                            <input type="color" value={activeKeyframe.properties.backgroundColor} onChange={e => updateKeyframeProperty('backgroundColor', e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                          </div>
                        </div>
                    )}
                </div>
            </aside>
        </ResizablePanels>
      </div>
      
      {/* Footer */}
      <ResizableFooter>
        {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
        <div className="h-full pt-2">
          <ResizablePanels>
            <CodeBlock title="کد @keyframes" code={keyframesCss} onCopy={() => handleCopy(keyframesCss)} />
            <CodeBlock title="کلاس CSS" code={classCss} onCopy={() => handleCopy(classCss)} />
          </ResizablePanels>
        </div>
      </ResizableFooter>
    </div>
  );
};

export default AnimationGenerator;