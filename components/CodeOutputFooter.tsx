import React, { useState, useMemo } from 'react';
import CopyIcon from './icons/CopyIcon';
import ResetIcon from './icons/ResetIcon';
import DownloadIcon from './icons/DownloadIcon';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';

interface CodeOutputFooterProps {
  shapeMode: 'polygon' | 'blob';
  svgPath: string;
  background: string;
  borderRadius: string;
  onReset: () => void;
  onClear: () => void;
  onGenerateNewBlob: () => void;
  onDownloadSVG: () => void;
  isPolygonCreatable: boolean;
  rotation: number;
}

const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = '' }) => (
    <button onClick={onClick} className={`p-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors flex items-center gap-2 ${className}`}>
        {children}
    </button>
);


const CodeOutputFooter: React.FC<CodeOutputFooterProps> = ({
    shapeMode, svgPath, background, borderRadius,
    onReset, onClear, onGenerateNewBlob,
    onDownloadSVG,
    isPolygonCreatable,
    rotation
}) => {
    const [copySuccess, setCopySuccess] = useState('');

    const htmlCode = `<div class="shape"></div>`;
    
    const jsCode = `
// Create the shape element
const shapeElement = document.createElement('div');
shapeElement.className = 'shape';

// Add it to your container
document.body.appendChild(shapeElement);
    `.trim();

    const cssCode = useMemo(() => {
        const transform = rotation !== 0 ? `  transform: rotate(${rotation}deg);\n` : '';
        
        if (shapeMode === 'polygon') {
            const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="${svgPath}"/></svg>`;
            const url = `url('data:image/svg+xml;base64,${btoa(svg)}')`;
            return `
.shape {
  width: 300px; /* or desired size */
  height: 300px; /* or desired size */
  background: ${background};
  -webkit-mask-image: ${url};
  mask-image: ${url};
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
${transform}}`;
        }
        // blob mode
        return `
.shape {
  width: 300px; /* or desired size */
  height: 300px; /* or desired size */
  background: ${background};
  border-radius: ${borderRadius};
${transform}}`;
    }, [shapeMode, svgPath, borderRadius, background, rotation]);


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
        <ResizableFooter>
             {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
            <div className="flex flex-col md:flex-row gap-4 h-full pt-2">
                <div className="flex-grow flex min-h-0">
                  <ResizablePanels>
                    <div className="h-full flex flex-col gap-4">
                      <CodeBlock title="HTML" code={htmlCode} onCopy={() => handleCopy(htmlCode)} />
                      <CodeBlock title="JavaScript" code={jsCode} onCopy={() => handleCopy(jsCode)} />
                    </div>
                    <CodeBlock title="CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                  </ResizablePanels>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 justify-end">
                        {shapeMode === 'polygon' ? (
                            <>
                                <ActionButton onClick={onClear}>پاک کردن</ActionButton>
                                <ActionButton onClick={onReset}>بازنشانی</ActionButton>
                            </>
                        ) : (
                            <ActionButton onClick={onGenerateNewBlob} className="bg-indigo-600 text-white hover:bg-indigo-700 shadow px-3">
                                <ResetIcon className="w-4 h-4" />
                                شکل جدید
                            </ActionButton>
                        )}
                    </div>
                     <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400 text-right">دانلود</h4>
                         <div className="flex gap-2 justify-end">
                            <ActionButton onClick={onDownloadSVG} className={!isPolygonCreatable || shapeMode !== 'polygon' ? 'opacity-50 cursor-not-allowed' : ''} >
                                 <DownloadIcon className="w-4 h-4" />
                                 SVG
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </ResizableFooter>
    );
};

export default CodeOutputFooter;