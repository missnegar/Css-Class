import React, { useState } from 'react';
import { toolCategories } from '../data/tools';
import ChevronDownIcon from './icons/ChevronDownIcon';
import SearchIcon from './icons/SearchIcon';
import XIcon from './icons/XIcon';

interface SidebarProps {
  activeToolId: string;
  onSelectTool: (toolId: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeToolId, onSelectTool, isOpen }) => {
    // Open the first "real" category by default
    const [openCategory, setOpenCategory] = useState<string | null>('مولدهای CSS');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleCategory = (categoryName: string) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName);
    };

    const isSearching = searchQuery.trim() !== '';

    const processedCategories = toolCategories.map(category => {
        const filteredTools = category.tools.filter(tool => 
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return {
            ...category,
            tools: filteredTools
        };
    }).filter(category => category.tools.length > 0);

    return (
        <aside className={`transition-all duration-300 ease-in-out bg-white dark:bg-slate-800/50 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-hidden ${isOpen ? 'w-72 p-4' : 'w-0 p-0 border-l-0'}`}>
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100 px-2 whitespace-nowrap">مجموعه ابزارها</h2>
            
            {/* Search Bar */}
            <div className="relative mb-4 px-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجوی ابزارها..."
                    className="w-full py-2 pl-9 pr-10 text-sm text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-right"
                    dir="rtl"
                />
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                    <SearchIcon className="w-4 h-4" />
                </div>
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 left-5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                        <XIcon className="w-4 h-4" />
                    </button>
                )}
            </div>

            <nav className="flex-grow overflow-y-auto pr-1 no-scrollbar">
                <ul>
                    {processedCategories.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                            <p className="text-sm">ابزاری یافت نشد</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                پاک کردن جستجو
                            </button>
                        </div>
                    ) : (
                        processedCategories.map((category) => {
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
                            
                            const isCategoryOpen = isSearching || openCategory === category.name;

                            // Regular category rendering
                            return (
                                <li key={category.name} className="mb-1">
                                    <button 
                                        onClick={() => toggleCategory(category.name)} 
                                        className="w-full flex justify-between items-center text-right p-2 rounded-md font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                                    >
                                        <span className="whitespace-nowrap">{category.name}</span>
                                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isCategoryOpen && (
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
                        })
                    )}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;