import React, { useState } from 'react';
import { toolCategories } from '../data/tools';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface SidebarProps {
  activeToolId: string;
  onSelectTool: (toolId: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeToolId, onSelectTool, isOpen }) => {
    // Open the first "real" category by default
    const [openCategory, setOpenCategory] = useState<string | null>('مولدهای CSS');

    const toggleCategory = (categoryName: string) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName);
    };

    return (
        <aside className={`transition-all duration-300 ease-in-out bg-white dark:bg-slate-800/50 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-hidden ${isOpen ? 'w-72 p-4' : 'w-0 p-0 border-l-0'}`}>
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100 px-2 whitespace-nowrap">مجموعه ابزارها</h2>
            <nav className="flex-grow overflow-y-auto pr-1 no-scrollbar">
                <ul>
                    {toolCategories.map((category) => {
                        // Special case for 'Home' to be a direct link
                        if (category.name === 'خانه' && category.tools.length > 0) {
                            const tool = category.tools[0];
                            return (
                                <li key={tool.id} className="mb-1">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (tool.enabled) {
                                                onSelectTool(tool.id);
                                            }
                                        }}
                                        className={`block w-full text-right p-2 rounded-md font-semibold transition-colors
                                            ${!tool.enabled ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' :
                                            activeToolId === tool.id ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`
                                        }
                                    >
                                        <span className="whitespace-nowrap">{category.name}</span>
                                    </a>
                                </li>
                            );
                        }
                        
                        // Regular category rendering
                        return (
                            <li key={category.name} className="mb-1">
                                <button 
                                    onClick={() => toggleCategory(category.name)} 
                                    className="w-full flex justify-between items-center text-right p-2 rounded-md font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <span className="whitespace-nowrap">{category.name}</span>
                                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${openCategory === category.name ? 'rotate-180' : ''}`} />
                                </button>
                                {openCategory === category.name && (
                                    <ul className="mt-1 space-y-1">
                                        {category.tools.map((tool) => (
                                            <li key={tool.id}>
                                                 <a 
                                                    href="#" 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (tool.enabled) {
                                                            onSelectTool(tool.id);
                                                        }
                                                    }}
                                                    className={`block w-full text-right py-2 px-3 mr-2 border-r-2 text-sm transition-all duration-150 whitespace-nowrap
                                                        ${!tool.enabled ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500'}
                                                        ${activeToolId === tool.id ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold' : 'border-transparent'}`
                                                    }
                                                >
                                                    {tool.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;