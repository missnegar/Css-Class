import React from 'react';
import CopyIcon from './icons/CopyIcon';
import { PiFileHtml } from "react-icons/pi";
import { BsFiletypeJs, BsFiletypeCss } from "react-icons/bs";

interface CodeBlockProps {
  title: string;
  code: string;
  onCopy: () => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, code, onCopy }) => {
    const renderTitleContent = () => {
        const lowerTitle = title.toLowerCase();

        if (lowerTitle.includes('html')) {
            return <span title="HTML"><PiFileHtml className="w-5 h-5 text-slate-500" /></span>;
        }
        if (lowerTitle.includes('css')) {
            return <span title="CSS"><BsFiletypeCss className="w-5 h-5 text-slate-500" /></span>;
        }
        if (lowerTitle.includes('javascript') || lowerTitle.includes('js')) {
            return <span title="JavaScript"><BsFiletypeJs className="w-5 h-5 text-slate-500" /></span>;
        }
        return <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{title}</span>;
    };

    return (
        <div className="h-full w-full flex flex-col min-h-0">
            <div className="mb-2 h-5 flex items-center">
                {renderTitleContent()}
            </div>
            <div className="relative flex-grow min-h-0">
                <pre className="bg-slate-100 dark:bg-slate-900 rounded-md p-3 font-mono overflow-auto absolute inset-0">
                    <button onClick={onCopy} title="کپی کردن کد" className="absolute top-2 left-2 p-1.5 bg-white/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-600 rounded-md transition-colors z-10">
                        <CopyIcon className="w-4 h-4" />
                    </button>
                    <code className="whitespace-pre-wrap text-[11px] leading-relaxed">{code.trim()}</code>
                </pre>
            </div>
        </div>
    );
};

export default CodeBlock;