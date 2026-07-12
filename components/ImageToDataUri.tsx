import React, { useState, useCallback } from 'react';
import UploadIcon from './icons/UploadIcon';
import CopyIcon from './icons/CopyIcon';
import TrashIcon from './icons/TrashIcon';
import CodeBlock from './CodeBlock';

const ImageToDataUri: React.FC = () => {
    const [image, setImage] = useState<{ name: string; dataUrl: string; size: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');

    const processFile = useCallback((file: File) => {
        if (!file || !file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        reader.onload = e => {
            setImage({
                name: file.name,
                dataUrl: e.target?.result as string,
                size: file.size,
            });
        };
        reader.readAsDataURL(file);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) processFile(e.target.files[0]);
    };
    
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
    };

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const cssCode = image ? `.element {\n  background-image: url("${image.dataUrl}");\n}` : '';

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <header className="p-4 md:px-8 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">تبدیل تصویر به Data URL</h2>
            </header>
            <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
                <div className="max-w-4xl mx-auto">
                    {!image ? (
                        <div 
                            onDragOver={e => {e.preventDefault(); setIsDragging(true);}}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-input')?.click()}
                            className={`p-10 border-4 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400'}`}
                        >
                            <UploadIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
                            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">برای آپلود کلیک کنید یا تصویر را اینجا بکشید</p>
                            <input id="file-input" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                                <div className="flex items-center gap-4">
                                    <img src={image.dataUrl} alt="Preview" className="w-16 h-16 object-contain rounded-md" />
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-100">{image.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{(image.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                <button onClick={() => setImage(null)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"><TrashIcon className="w-5 h-5" /></button>
                            </div>

                            <div className="h-[400px] flex flex-col gap-4">
                               <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                               <CodeBlock title="Data URL" code={image.dataUrl} onCopy={() => handleCopy(image.dataUrl)} />
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {copySuccess && <div className="fixed bottom-6 right-6 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50">{copySuccess}</div>}
        </div>
    );
};

export default ImageToDataUri;
