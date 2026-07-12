
import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import LockIcon from './icons/LockIcon';
import UnlockIcon from './icons/UnlockIcon';
import CheckIcon from './icons/CheckIcon';
import CrossIcon from './icons/CrossIcon';

type SwitchStyle = 'classic' | 'icon' | '3d';
type IconPair = 'sun-moon' | 'lock-unlock' | 'check-cross';

const ICONS: Record<IconPair, { on: React.FC<any>, off: React.FC<any> }> = {
    'sun-moon': { on: SunIcon, off: MoonIcon },
    'lock-unlock': { on: UnlockIcon, off: LockIcon },
    'check-cross': { on: CheckIcon, off: CrossIcon },
};

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

const camelToKebab = (str: string) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const FlipSwitchGenerator: React.FC = () => {
    const [style, setStyle] = useState<SwitchStyle>('classic');
    const [iconPair, setIconPair] = useState<IconPair>('sun-moon');
    const [width, setWidth] = useState(60);
    const [height, setHeight] = useState(32);
    const [knobSize, setKnobSize] = useState(24);
    
    const [offBg, setOffBg] = useState('#7f8c8d');
    const [onBg, setOnBg] = useState('#2ecc71');
    const [knobColor, setKnobColor] = useState('#ffffff');
    const [iconColor, setIconColor] = useState('#ffffff');
    
    const [transitionDuration, setTransitionDuration] = useState(0.4);
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

    const generatedHtml = `
<label class="custom-switch">
  <input type="checkbox">
  <span class="slider"></span>
</label>
    `.trim();

    const generatedCss = useMemo(() => {
        const padding = (height - knobSize) / 2;
        const knobTranslateX = width - knobSize - (padding * 2);

        let sliderCss = '';
        let checkedSliderCss = '';
        let beforeCss = '';
        let checkedBeforeCss = '';

        const iconToInnerHtml = (IconComponent: React.FC<any>) => {
            const iconElement = IconComponent({});
            if (!React.isValidElement(iconElement)) return '';
            
            const children = (iconElement.props as any).children;
            if (!children) return '';

            return React.Children.toArray(children).map((child: any) => {
                if (!React.isValidElement(child)) return '';
                
                const { type, props } = child as React.ReactElement;
                const propString = Object.entries(props)
                    .filter(([key]) => key !== 'children')
                    .map(([key, val]) => `${camelToKebab(key)}="${val}"`)
                    .join(' ');
                return `<${type} ${propString}></${type}>`;
            }).join('');
        };

        switch(style) {
            case 'classic':
                beforeCss = `
    content: '';
    position: absolute;
    left: ${padding}px;
    top: ${padding}px;
    width: ${knobSize}px;
    height: ${knobSize}px;
    background-color: ${knobColor};
    border-radius: 50%;
    transition: transform ${transitionDuration}s ease;
`;
                checkedBeforeCss = `transform: translateX(${knobTranslateX}px);`;
                break;
            case 'icon':
                const OnIcon = ICONS[iconPair].on;
                const OffIcon = ICONS[iconPair].off;

                const onIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(iconColor)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconToInnerHtml(OnIcon)}</svg>`;
                const offIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(iconColor)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconToInnerHtml(OffIcon)}</svg>`;

                beforeCss = `
    content: '';
    position: absolute;
    left: ${padding}px;
    top: ${padding}px;
    width: ${knobSize}px;
    height: ${knobSize}px;
    background-color: ${knobColor};
    border-radius: 50%;
    transition: transform ${transitionDuration}s ease;
    background-image: url("data:image/svg+xml,${encodeURIComponent(offIconSvg)}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
`;
                checkedBeforeCss = `
    transform: translateX(${knobTranslateX}px);
    background-image: url("data:image/svg+xml,${encodeURIComponent(onIconSvg)}");
`;
                break;
            case '3d':
                sliderCss = `
  transform-style: preserve-3d;
  perspective: 150px;
`;
                beforeCss = `
    content: 'خاموش';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${height * 0.4}px;
    color: ${knobColor};
    background-color: ${offBg};
    border-radius: ${height / 2}px;
    transform: rotateY(0deg);
    backface-visibility: hidden;
    transition: transform ${transitionDuration}s ease;
`;
                checkedBeforeCss = `transform: rotateY(180deg);`;
                
                const afterCss = `
.slider::after {
    content: 'روشن';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${height * 0.4}px;
    color: ${knobColor};
    background-color: ${onBg};
    border-radius: ${height / 2}px;
    transform: rotateY(-180deg);
    backface-visibility: hidden;
    transition: transform ${transitionDuration}s ease;
}`;
                const checkedAfterCss = `
.custom-switch input:checked + .slider::after {
  transform: rotateY(0deg);
}`;
                sliderCss += `\n${afterCss}\n${checkedAfterCss}`;
                break;
        }

        return `
.custom-switch {
  position: relative;
  display: inline-block;
  width: ${width}px;
  height: ${height}px;
}

.custom-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${style === '3d' ? 'transparent' : offBg};
  transition: ${transitionDuration}s;
  border-radius: ${height / 2}px;
  ${style === '3d' ? sliderCss.trim() : ''}
}

.slider::before {
  ${beforeCss.trim()}
}

.custom-switch input:checked + .slider {
  background-color: ${style === '3d' ? 'transparent' : onBg};
}

.custom-switch input:focus + .slider {
  box-shadow: 0 0 1px ${onBg};
}

.custom-switch input:checked + .slider::before {
  ${checkedBeforeCss.trim()}
}
`.trim();
    }, [style, iconPair, width, height, knobSize, offBg, onBg, knobColor, iconColor, transitionDuration]);


    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="transform scale-150">
                            <style>{generatedCss}</style>
                            <label className="custom-switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">استایل سوییچ</h3>
                                 <div className="flex gap-2 text-sm">
                                    <button onClick={() => setStyle('classic')} className={`flex-1 p-2 rounded-md transition-colors ${style === 'classic' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>کلاسیک</button>
                                    <button onClick={() => setStyle('icon')} className={`flex-1 p-2 rounded-md transition-colors ${style === 'icon' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>آیکون</button>
                                    <button onClick={() => setStyle('3d')} className={`flex-1 p-2 rounded-md transition-colors ${style === '3d' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>سه‌بعدی</button>
                                </div>
                                {style === 'icon' && (
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">جفت آیکون</label>
                                         <select value={iconPair} onChange={e => setIconPair(e.target.value as IconPair)} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">
                                            <option value="sun-moon">خورشید / ماه</option>
                                            <option value="lock-unlock">قفل / باز</option>
                                            <option value="check-cross">تیک / ضربدر</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">اندازه و انیمیشن</h3>
                                 <ControlSlider label="عرض" value={width} onChange={setWidth} min={40} max={120} step={2} unit="px" />
                                <ControlSlider label="ارتفاع" value={height} onChange={setHeight} min={20} max={60} step={2} unit="px" />
                               {style !== '3d' && <ControlSlider label="اندازه دستگیره" value={knobSize} onChange={setKnobSize} min={12} max={height - 4} step={2} unit="px" />}
                                <ControlSlider label="سرعت انتقال" value={transitionDuration} onChange={setTransitionDuration} min={0.1} max={2} step={0.1} unit="s" />
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">رنگ‌ها</h3>
                                <div className="flex gap-4">
                                    <ColorInput label="پس‌زمینه خاموش" value={offBg} onChange={setOffBg} />
                                    <ColorInput label="پس‌زمینه روشن" value={onBg} onChange={setOnBg} />
                                </div>
                                 <div className="flex gap-4">
                                   {style !== '3d' && <ColorInput label="رنگ دستگیره" value={knobColor} onChange={setKnobColor} /> }
                                   {style === 'icon' && <ColorInput label="رنگ آیکون" value={iconColor} onChange={setIconColor} /> }
                                   {style === '3d' && <ColorInput label="رنگ متن" value={knobColor} onChange={setKnobColor} /> }
                                </div>
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

export default FlipSwitchGenerator;