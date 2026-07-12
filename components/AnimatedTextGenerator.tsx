import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import { ANIMATION_CATEGORIES } from '../data/animations';
import ReplayIcon from './icons/ReplayIcon';
import ResizableFooter from './ResizableFooter';

const fonts = {
    'فارسی': [
        { name: 'وزیرمتن', value: 'Vazirmatn', importName: 'Vazirmatn' },
        { name: 'لاله‌زار', value: 'Lalezar', importName: 'Lalezar' },
    ],
    'عربی': [
        { name: 'قاهره', value: 'Cairo', importName: 'Cairo' },
    ],
    'لاتین': [
        { name: 'روبوتو', value: 'Roboto', importName: 'Roboto' },
        { name: 'پاپینز', value: 'Poppins', importName: 'Poppins' },
    ]
};

const AnimatedTextGenerator: React.FC = () => {
    const [text, setText] = useState('شکل‌ساز');
    const [fillColor, setFillColor] = useState('#818cf8');
    const [strokeColor, setStrokeColor] = useState('#ffffff');
    const [backgroundColor, setBackgroundColor] = useState('#1e293b');
    const [strokeWidth, setStrokeWidth] = useState(1);
    const [duration, setDuration] = useState(1);
    const [fontSize, setFontSize] = useState(80);
    const [fontFamily, setFontFamily] = useState('Vazirmatn');
    const [animation, setAnimation] = useState('bounce');
    const [isInfinite, setIsInfinite] = useState(true);
    const [previewKey, setPreviewKey] = useState(0);
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
    
    const svgCode = useMemo(() => {
        const selectedFont = Object.values(fonts).flat().find(f => f.value === fontFamily) || fonts['فارسی'][0];
        const fontImportName = selectedFont.importName.replace(' ', '+');
        const fontImportUrl = `https://fonts.googleapis.com/css2?family=${fontImportName}:wght@400;700&display=swap`;

        if (animation === 'glitch') {
            const glitchText = text || ' '; // Ensure text is not empty
            return `
<svg width="100%" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <style>
            @import url('${fontImportUrl}');
            .glitch-text-container {
                font-family: '${fontFamily}', sans-serif;
                font-size: ${fontSize}px;
                font-weight: bold;
                text-transform: uppercase;
                position: relative;
                text-align: center;
            }
            .glitch-text {
                position: relative;
                color: ${fillColor};
                stroke: ${strokeColor};
                stroke-width: ${strokeWidth}px;
                animation: glitch-main 1.5s infinite linear;
            }
            .glitch-text::before,
            .glitch-text::after {
                content: "${glitchText}";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${backgroundColor};
                overflow: hidden;
            }
            .glitch-text::before {
                left: 2px;
                text-shadow: -2px 0 #e81cff;
                clip-path: rect(24px, 800px, 90px, 0);
                animation: glitch-before 2.5s infinite linear alternate-reverse;
            }
            .glitch-text::after {
                left: -2px;
                text-shadow: -2px 0 #00ffff, 2px 2px #e81cff;
                clip-path: rect(85px, 800px, 140px, 0);
                animation: glitch-after 1.8s infinite linear alternate-reverse;
            }
            @keyframes glitch-main {
                0% { transform: skewX(0deg); }
                5% { transform: skewX(2deg); }
                10% { transform: skewX(-2deg); }
                15% { transform: skewX(0deg); }
                100% { transform: skewX(0deg); }
            }
            @keyframes glitch-before {
                0% { clip-path: rect(61px, 9999px, 5px, 0); }
                25% { clip-path: rect(28px, 9999px, 91px, 0); }
                50% { clip-path: rect(4px, 9999px, 63px, 0); }
                75% { clip-path: rect(69px, 9999px, 19px, 0); }
                100% { clip-path: rect(93px, 9999px, 57px, 0); }
            }
            @keyframes glitch-after {
                0% { clip-path: rect(7px, 9999px, 99px, 0); }
                25% { clip-path: rect(86px, 9999px, 47px, 0); }
                50% { clip-path: rect(31px, 9999px, 94px, 0); }
                75% { clip-path: rect(4px, 9999px, 35px, 0); }
                100% { clip-path: rect(18px, 9999px, 99px, 0); }
            }
        </style>
    </defs>
    <foreignObject x="0" y="0" width="800" height="200">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
        <div class="glitch-text-container">
            <div class="glitch-text">${glitchText}</div>
        </div>
      </div>
    </foreignObject>
</svg>`.trim();
        }

        const animationClasses = `animate__animated animate__${animation} ${isInfinite ? 'animate__infinite' : ''}`;
        return `
<!--
  This animation requires Animate.css
  Add this to your <head>:
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
-->
<svg width="100%" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <style>
            @import url('${fontImportUrl}');
        </style>
    </defs>
    <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="'${fontFamily}', sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        fill="${fillColor}"
        stroke="${strokeColor}"
        stroke-width="${strokeWidth}"
        class="${animationClasses}"
        style="animation-duration: ${duration}s;"
    >
        ${text}
    </text>
</svg>`.trim();
    }, [text, fillColor, strokeColor, strokeWidth, duration, fontSize, fontFamily, animation, isInfinite, backgroundColor]);


    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            {/* Main content */}
            <main className="flex-grow flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 p-4 md:p-8 overflow-y-auto no-scrollbar">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">مولد متن انیمیشنی</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                           یک ابزار آنلاین برای ساخت متن‌های متحرک جذاب با استفاده از SVG و کتابخانه Animate.css. شما می‌توانید از میان ده‌ها انیمیشن آماده انتخاب کرده، آن را شخصی‌سازی کنید و کد SVG نهایی را برای استفاده در وبسایت خود دریافت نمایید.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-8 p-6 bg-white dark:bg-slate-800/50 rounded-lg">
                        <div className="lg:col-span-3">
                            <label htmlFor="text-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">متن شما</label>
                            <input
                                type="text"
                                id="text-input"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                         <div>
                            <label htmlFor="animation-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">انتخاب انیمیشن</label>
                            <select id="animation-select" value={animation} onChange={e => setAnimation(e.target.value)} className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                {ANIMATION_CATEGORIES.map((category) => (
                                    <optgroup key={category.name} label={category.name}>
                                        {category.animations.map(anim => (
                                            <option key={anim} value={anim}>{anim}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="font-family-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">انتخاب فونت</label>
                            <select id="font-family-select" value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                {Object.entries(fonts).map(([groupName, fontList]) => (
                                    <optgroup key={groupName} label={groupName}>
                                        {fontList.map(font => (
                                            <option key={font.value} value={font.value} style={{fontFamily: font.value}}>{font.name}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>

                         <div>
                            <label htmlFor="font-size-slider" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">اندازه فونت ({fontSize}px)</label>
                            <input type="range" id="font-size-slider" min="12" max="150" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600"/>
                        </div>

                        <div className={animation === 'glitch' ? 'hidden' : ''}>
                            <label htmlFor="duration-slider" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">سرعت انیمیشن ({duration}s)</label>
                            <input type="range" id="duration-slider" min="0.5" max="5" step="0.1" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600"/>
                        </div>
                        
                        <div>
                            <label htmlFor="fill-color-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">رنگ متن</label>
                            <input type="color" id="fill-color-input" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                        </div>
                        
                        <div>
                            <label htmlFor="stroke-color-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">رنگ دور خط</label>
                            <input type="color" id="stroke-color-input" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                        </div>
                        
                         <div>
                            <label htmlFor="stroke-width-slider" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ضخامت دور خط ({strokeWidth}px)</label>
                            <input type="range" id="stroke-width-slider" min="0" max="10" step="0.5" value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600"/>
                        </div>

                        <div className="lg:col-span-2">
                           <label htmlFor="bg-color-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">رنگ پس‌زمینه پیش‌نمایش</label>
                           <input type="color" id="bg-color-input" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                        </div>

                        <div className={`flex items-end justify-between ${animation === 'glitch' ? 'hidden' : ''}`}>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="infinite-checkbox"
                                    checked={isInfinite}
                                    onChange={(e) => setIsInfinite(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="infinite-checkbox" className="text-sm font-medium text-slate-700 dark:text-slate-300">تکرار بی‌نهایت</label>
                            </div>
                            <button
                                onClick={() => setPreviewKey(k => k + 1)}
                                disabled={isInfinite}
                                className="p-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="پخش مجدد انیمیشن"
                            >
                                <ReplayIcon className="w-4 h-4" />
                                پخش مجدد
                            </button>
                        </div>

                    </div>

                    {/* Preview */}
                    <div className="rounded-lg p-8 flex items-center justify-center min-h-[250px] shadow-inner overflow-hidden transition-colors" style={{backgroundColor}}>
                        <div key={previewKey} className="w-full" dangerouslySetInnerHTML={{ __html: svgCode }} />
                    </div>
                </div>
              </div>
            </main>

            {/* Footer with code */}
            <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                <div className="h-full pt-2">
                    <CodeBlock title="کد SVG" code={svgCode} onCopy={() => handleCopy(svgCode)} />
                </div>
            </ResizableFooter>
        </div>
    );
};

export default AnimatedTextGenerator;