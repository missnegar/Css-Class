import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import UploadIcon from './icons/UploadIcon';
import DownloadIcon from './icons/DownloadIcon';
import TrashIcon from './icons/TrashIcon';

interface UploadedImage {
  id: string;
  file: File;
  dataUrl: string;
  width: number;
  height: number;
}

interface SpriteData extends UploadedImage {
    x: number;
    y: number;
}

const SpriteGenerator: React.FC = () => {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
    const [padding, setPadding] = useState(10);
    const [baseClass, setBaseClass] = useState('sprite');
    const [prefix, setPrefix] = useState('icon-');
    const [spriteSheetUrl, setSpriteSheetUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const processFiles = useCallback((files: FileList) => {
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (imageFiles.length === 0) return;

        const imagePromises = imageFiles.map(file => {
            return new Promise<UploadedImage>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e_reader => {
                    const dataUrl = e_reader.target?.result as string;
                    const img = new Image();
                    img.onload = () => {
                        resolve({
                            id: `${file.name}-${Date.now()}`,
                            file, dataUrl,
                            width: img.width, height: img.height,
                        });
                    };
                    img.onerror = reject;
                    img.src = dataUrl;
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises)
            .then(newImages => setImages(current => [...current, ...newImages]))
            .catch(error => console.error("خطا در بارگذاری تصاویر:", error));
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) processFiles(e.target.files);
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    };

    const handleDownload = () => {
        if (!spriteSheetUrl) return;
        const a = document.createElement('a');
        a.href = spriteSheetUrl;
        a.download = 'sprite.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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
    
    useEffect(() => {
        const generateSprite = async () => {
            if (images.length === 0 || !canvasRef.current) {
                setSpriteSheetUrl(null);
                return;
            }

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const imageElements = await Promise.all(images.map(imgData => new Promise<HTMLImageElement>(res => {
                const img = new Image();
                img.onload = () => res(img);
                img.src = imgData.dataUrl;
            })));

            let canvasWidth = 0, canvasHeight = 0;
            if (layout === 'horizontal') {
                canvasWidth = imageElements.reduce((sum, img) => sum + img.width, 0) + padding * (images.length + 1);
                canvasHeight = Math.max(...imageElements.map(img => img.height)) + padding * 2;
            } else {
                canvasWidth = Math.max(...imageElements.map(img => img.width)) + padding * 2;
                canvasHeight = imageElements.reduce((sum, img) => sum + img.height, 0) + padding * (images.length + 1);
            }
            
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let currentX = padding;
            let currentY = padding;

            for(const img of imageElements) {
                ctx.drawImage(img, currentX, currentY);
                if (layout === 'horizontal') {
                    currentX += img.width + padding;
                } else {
                    currentY += img.height + padding;
                }
            }
            setSpriteSheetUrl(canvas.toDataURL('image/png'));
        };

        generateSprite();
    }, [images, layout, padding]);

    const { htmlCode, cssCode, spriteData } = useMemo(() => {
        if (images.length === 0) return { htmlCode: '', cssCode: '', spriteData: [] };

        let positions: SpriteData[] = [];
        let currentX = padding;
        let currentY = padding;

        images.forEach(img => {
            positions.push({ ...img, x: currentX, y: currentY });
            if (layout === 'horizontal') currentX += img.width + padding;
            else currentY += img.height + padding;
        });
        
        const css = `
.${baseClass} {
  background-image: url('sprite.png'); /* آدرس فایل sprite دانلود شده را جایگزین کنید */
  background-repeat: no-repeat;
  display: inline-block;
}

${positions.map(img => `.${baseClass}.${prefix}${img.file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-')} {
  width: ${img.width}px;
  height: ${img.height}px;
  background-position: -${img.x}px -${img.y}px;
}`).join('\n')}
`;
        const html = `<!-- نمونه استفاده -->\n${positions.map(img => 
            `<div class="${baseClass} ${prefix}${img.file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-')}" title="${img.file.name}"></div>`
        ).join('\n')}`;
        
        return { htmlCode: html.trim(), cssCode: css.trim(), spriteData: positions };
    }, [images, layout, padding, baseClass, prefix]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <canvas ref={canvasRef} className="hidden"></canvas>
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 overflow-auto">
                        {images.length === 0 ? (
                            <div 
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`w-full max-w-lg h-64 border-4 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400'}`}
                            >
                                <UploadIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
                                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">برای آپلود کلیک کنید یا تصاویر را اینجا بکشید</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400"> (PNG, JPG, SVG, etc.)</p>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" accept="image/*" />
                            </div>
                        ) : (
                            <div className="w-full space-y-6">
                                <style>{`
                                  .checkerboard-pattern {
                                    background-color: #f1f5f9;
                                    background-image: linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%);
                                    background-size: 16px 16px;
                                    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
                                  }
                                  .dark .checkerboard-pattern {
                                    background-color: #0f172a;
                                    background-image: linear-gradient(45deg, #334155 25%, transparent 25%), linear-gradient(-45deg, #334155 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #334155 75%), linear-gradient(-45deg, transparent 75%, #334155 75%);
                                    background-size: 16px 16px;
                                    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
                                  }
                                `}</style>
                                <div>
                                    <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-100 text-right">پیش‌نمایش Sprite Sheet</h3>
                                    {spriteSheetUrl && (
                                        <div className="checkerboard-pattern p-4 border border-slate-200 dark:border-slate-800 rounded-xl shadow-inner inline-block max-w-full">
                                            <img src={spriteSheetUrl} alt="Generated Sprite Sheet" className="max-w-full block rounded" />
                                        </div>
                                    )}
                                </div>
                                 <div>
                                    <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-100 text-right">آیکون‌های استخراج شده</h3>
                                    <div className="flex flex-wrap gap-4 p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-800 justify-start">
                                        {spriteData.map(data => (
                                            <div key={data.id} className="flex flex-col items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl p-3 w-28 md:w-32 hover:shadow-md transition-all">
                                                {/* Icon Checkerboard Frame */}
                                                <div className="checkerboard-pattern w-20 h-20 rounded-lg flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative mb-2">
                                                    <div 
                                                        title={data.file.name} 
                                                        style={{ 
                                                            width: `${data.width}px`, 
                                                            height: `${data.height}px`, 
                                                            backgroundImage: `url(${spriteSheetUrl})`, 
                                                            backgroundPosition: `-${data.x}px -${data.y}px`,
                                                            backgroundRepeat: 'no-repeat',
                                                            transform: data.width > 72 || data.height > 72 ? `scale(${72 / Math.max(data.width, data.height)})` : 'none',
                                                            transformOrigin: 'center center'
                                                        }} 
                                                    />
                                                </div>
                                                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 w-full truncate text-center" title={data.file.name}>
                                                    {data.file.name}
                                                </span>
                                                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                                                    {data.width} × {data.height} px
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                           <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تصاویر آپلود شده ({images.length})</h3>
                                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                                    {images.map(img => (
                                        <div key={img.id} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md text-sm">
                                            <span className="truncate">{img.file.name}</span>
                                            <button onClick={() => setImages(imgs => imgs.filter(i => i.id !== img.id))} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => fileInputRef.current?.click()} className="mt-3 w-full text-sm font-semibold p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900">افزودن تصاویر بیشتر...</button>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات چیدمان</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">جهت</label>
                                        <div className="flex gap-2 text-sm bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                                            <button 
                                                type="button" 
                                                onClick={() => setLayout('horizontal')} 
                                                className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs md:text-sm transition-all cursor-pointer ${
                                                    layout === 'horizontal' 
                                                        ? 'bg-indigo-600 text-white shadow font-bold' 
                                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                                                }`}
                                            >
                                                افقی
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => setLayout('vertical')} 
                                                className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs md:text-sm transition-all cursor-pointer ${
                                                    layout === 'vertical' 
                                                        ? 'bg-indigo-600 text-white shadow font-bold' 
                                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                                                }`}
                                            >
                                                عمودی
                                            </button>
                                        </div>
                                    </div>
                                     <label className="block text-sm font-medium">فاصله داخلی ({padding}px)<input type="range" min="0" max="50" value={padding} onChange={e => setPadding(+e.target.value)} className="w-full h-2 accent-indigo-600 mt-1" /></label>
                                </div>
                            </div>
                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات خروجی</h3>
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium">نام کلاس پایه<input type="text" value={baseClass} onChange={e => setBaseClass(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border rounded-md"/></label>
                                    <label className="block text-sm font-medium">پیشوند کلاس آیکون<input type="text" value={prefix} onChange={e => setPrefix(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border rounded-md"/></label>
                                </div>
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>
            <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full z-50">{copySuccess}</div>}
                 <div className="h-full pt-2 flex gap-4">
                    <div className="flex-grow flex min-h-0">
                        <ResizablePanels>
                            <CodeBlock title="کد HTML" code={htmlCode} onCopy={() => handleCopy(htmlCode)} />
                            <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                        </ResizablePanels>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400 text-right">عملیات</h4>
                        <button onClick={handleDownload} disabled={!spriteSheetUrl} className="p-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                           <DownloadIcon className="w-4 h-4" /> دانلود Sprite
                        </button>
                         <button onClick={() => setImages([])} disabled={images.length === 0} className="p-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                           <TrashIcon className="w-4 h-4" /> پاک کردن همه
                        </button>
                    </div>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default SpriteGenerator;