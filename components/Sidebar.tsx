import React, { useState } from 'react';
import { toolCategories } from '../data/tools';
import ChevronDownIcon from './icons/ChevronDownIcon';
import SearchIcon from './icons/SearchIcon';
import XIcon from './icons/XIcon';

interface SidebarProps {
  activeToolId: string;
  onSelectTool: (toolId: string) => void;
  isOpen: boolean;
  favorites?: string[];
  toggleFavorite?: (toolId: string) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeToolId, onSelectTool, isOpen, favorites = [], toggleFavorite, onClose }) => {
    // Open the first "real" category by default
    const [openCategory, setOpenCategory] = useState<string | null>('مولدهای CSS');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleCategory = (categoryName: string) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName);
    };

    const isSearching = searchQuery.trim() !== '';

    // Get favorite tools lists
    const favoriteTools = favorites.length > 0
        ? toolCategories
            .flatMap(cat => cat.tools)
            .filter(tool => favorites.includes(tool.id) && tool.enabled)
        : [];

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
        <>
            {/* Backdrop for mobile devices */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden cursor-pointer"
                    onClick={onClose}
                />
            )}
            
            <aside 
                className={`transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 border-l border-slate-200/80 dark:border-slate-800 flex flex-col shrink-0 overflow-hidden z-50
                    fixed md:relative top-0 bottom-0 right-0 h-full md:h-auto shadow-2xl md:shadow-none
                    ${isOpen 
                        ? 'w-72 p-4 translate-x-0 opacity-100' 
                        : 'w-0 p-0 border-l-0 translate-x-full md:translate-x-0 md:opacity-100'
                    }`}
            >
                <div className="flex items-center justify-between mb-4 px-2 whitespace-nowrap">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">مجموعه ابزارها</h2>
                    <button 
                        onClick={onClose}
                        className="md:hidden p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        aria-label="بستن منو"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
            
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
                    {/* Bookmarked / Favorite Tools list */}
                    {favoriteTools.length > 0 && !isSearching && (
                        <li className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wider">
                                <span>★</span>
                                <span>ابزارهای نشان‌شده</span>
                            </div>
                            <ul className="space-y-1">
                                {favoriteTools.map(tool => (
                                    <li key={`fav-${tool.id}`} className="group relative">
                                        <a 
                                            href="#" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onSelectTool(tool.id);
                                            }}
                                            className={`block w-full text-right py-1.5 pl-8 pr-3 mr-2 border-r-2 text-xs transition-all duration-150 whitespace-nowrap flex items-center justify-between
                                                ${activeToolId === tool.id 
                                                    ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5' 
                                                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-400/50'}`
                                            }
                                        >
                                            <span className="truncate">{tool.name}</span>
                                        </a>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                if (toggleFavorite) toggleFavorite(tool.id);
                                            }}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-[10px] text-slate-400 hover:text-rose-500 transition-all cursor-pointer rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs"
                                            title="حذف نشان"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}

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
       </>
    );
};

export default Sidebar;