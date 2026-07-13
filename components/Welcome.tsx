import React, { useState } from 'react';
import { toolCategories, Tool } from '../data/tools';
import SidebarIcon from './icons/SidebarIcon';
import EyeIcon from './icons/EyeIcon';
import SlidersIcon from './icons/SlidersIcon';
import CodeIcon from './icons/CodeIcon';
import SearchIcon from './icons/SearchIcon';
import XIcon from './icons/XIcon';

interface WelcomeProps {
  onSelectTool?: (toolId: string) => void;
  favorites?: string[];
  toggleFavorite?: (toolId: string) => void;
  recentTools?: string[];
}

const Welcome: React.FC<WelcomeProps> = ({ 
  onSelectTool, 
  favorites = [], 
  toggleFavorite, 
  recentTools = [] 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Flatten tools with category name for search and tabs
  const allTools = toolCategories.flatMap(cat => 
    cat.name !== 'خانه' ? cat.tools.map(t => ({ ...t, categoryName: cat.name })) : []
  );

  // Favorite and Recent lists
  const favoriteToolsList = allTools.filter(tool => favorites.includes(tool.id));
  const recentToolsList = recentTools
    .map(id => allTools.find(t => t.id === id))
    .filter((t): t is (Tool & { categoryName: string }) => !!t);

  // Filter tools based on search query and active tab
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || tool.categoryName === activeTab;

    return matchesSearch && matchesTab && tool.enabled;
  });

  // Featured popular tools for quick access
  const featuredTools = [
    { id: 'shape-former', name: 'شکل‌ساز', desc: 'طراحی اشکال هندسی و چندضلعی‌های پیچیده با خروجی SVG و CSS', color: 'from-pink-500 to-rose-500' },
    { id: 'gradient-generator', name: 'مولد گرادیانت', desc: 'ساخت پس‌زمینه‌های گرادیانت خطی و شعاعی خیره‌کننده با کدهای بهینه', color: 'from-violet-500 to-indigo-500' },
    { id: 'box-shadow-generator', name: 'مولد Box Shadow', desc: 'طراحی سایه‌های چند لایه، داخلی و خارجی با ظاهری نرم و مدرن', color: 'from-blue-500 to-cyan-500' },
    { id: 'button-generator', name: 'مولد دکمه', desc: 'طراحی دکمه‌های شکیل به همراه استایل‌های هاور و کدهای آماده HTML/CSS', color: 'from-emerald-500 to-teal-500' },
    { id: 'animation-generator', name: 'مولد انیمیشن / Keyframe', desc: 'ساخت انیمیشن‌های سفارشی فریم به فریم با کنترل ترنسفورم‌ها و رنگ‌ها', color: 'from-amber-500 to-orange-500' },
    { id: 'online-css-editor', name: 'ویرایشگر آنلاین CSS', desc: 'محیط توسعه زنده برای نوشتن کدهای CSS و مشاهده تغییرات به صورت آنی', color: 'from-purple-500 to-indigo-500' }
  ];

  const handleToolClick = (toolId: string) => {
    if (onSelectTool) {
      onSelectTool(toolId);
    }
  };

  const isSearching = searchQuery.trim() !== '';

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900/40 text-right" dir="rtl">
      <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
        
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mt-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-lalezar text-slate-800 dark:text-slate-100 mb-4 tracking-wide">
            به <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">CSS CLASS</span> خوش آمدید
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
            جعبه ابزار همه‌کاره و فوق‌العاده کاربردی برای طراحان و توسعه‌دهندگان وب. استایل‌ها و کدهای CSS خود را بصری تولید کرده و در کمترین زمان کپی کنید.
          </p>
        </div>

        {/* Dashboard Dynamic Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative px-4">
          <div className="relative shadow-md rounded-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی سریع بین بیش از ۵۰ ابزار CSS..."
              className="w-full py-3.5 pl-11 pr-12 text-sm md:text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-right shadow-sm"
            />
            <div className="absolute inset-y-0 right-7 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <SearchIcon className="w-5 h-5" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 left-7 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Personalized Workspace (میز کار شخصی) */}
        {!isSearching && (favoriteToolsList.length > 0 || recentToolsList.length > 0) && (
          <div className="max-w-5xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            
            {/* Recent Tools */}
            {recentToolsList.length > 0 ? (
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                  <span className="text-lg">⏱️</span>
                  <span>آخرین ابزارهای استفاده شده</span>
                </h3>
                <div className="space-y-1.5">
                  {recentToolsList.slice(0, 4).map((tool) => (
                    <div 
                      key={`recent-welcome-${tool.id}`}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-indigo-50/30 dark:hover:bg-slate-800/60 hover:border-indigo-100 dark:hover:border-indigo-950 transition-all cursor-pointer group"
                      onClick={() => handleToolClick(tool.id)}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-xs md:text-sm text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                          {tool.name}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                          {tool.categoryName}
                        </span>
                      </div>
                      <span className="text-xs text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0 font-semibold pl-1 shrink-0">
                        باز کردن ←
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 py-10">
                <span className="text-3xl mb-2">⏱️</span>
                <p className="text-sm font-semibold">هنوز ابزاری را باز نکرده‌اید.</p>
                <p className="text-xs text-slate-400 mt-1">با باز کردن ابزارها، آنها در این بخش ذخیره می‌شوند.</p>
              </div>
            )}

            {/* Favorite / Bookmarked Tools */}
            {favoriteToolsList.length > 0 ? (
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                  <span className="text-lg text-amber-500">★</span>
                  <span>ابزارهای نشان‌شده شما</span>
                </h3>
                <div className="space-y-1.5">
                  {favoriteToolsList.map((tool) => (
                    <div 
                      key={`fav-welcome-${tool.id}`}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-amber-50/20 dark:hover:bg-slate-800/60 hover:border-amber-100 dark:hover:border-amber-950 transition-all cursor-pointer group"
                      onClick={() => handleToolClick(tool.id)}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-xs md:text-sm text-slate-700 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                          {tool.name}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                          {tool.categoryName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (toggleFavorite) toggleFavorite(tool.id);
                          }}
                          className="px-2 py-1 text-slate-400 hover:text-rose-500 transition-colors text-[10px] cursor-pointer bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded shadow-xs"
                          title="حذف نشان"
                        >
                          ✕ حذف
                        </button>
                        <span className="text-xs text-amber-500 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0 font-semibold pl-1">
                          باز کردن ←
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 py-10">
                <span className="text-2xl text-amber-400 mb-2">☆</span>
                <p className="text-sm font-semibold">هیچ ابزاری نشان نشده است.</p>
                <p className="text-xs text-slate-400 mt-1">با زدن دکمه «نشان کردن» در بالای هر ابزار، آن را به این بخش بیفزایید.</p>
              </div>
            )}

          </div>
        )}

        {/* Search Results / Full Tool Directory */}
        {(isSearching || searchQuery === '') && (
          <div className="max-w-5xl mx-auto mb-12 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800/80 pb-4 gap-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                {isSearching ? `نتایج جستجو (${filteredTools.length} مورد)` : 'فهرست کامل ابزارها و منابع'}
              </h3>
              
              {/* Category Filter Tabs */}
              {!isSearching && (
                <div className="flex flex-wrap gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'all' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                    همه
                  </button>
                  <button
                    onClick={() => setActiveTab('مولدهای CSS')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'مولدهای CSS' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                    مولدها
                  </button>
                  <button
                    onClick={() => setActiveTab('منابع CSS')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'منابع CSS' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                    منابع علمی
                  </button>
                  <button
                    onClick={() => setActiveTab('ابزارهای CSS')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'ابزارهای CSS' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                    مبدل‌ها و ابزارها
                  </button>
                </div>
              )}
            </div>

            {/* Tools Grid */}
            {filteredTools.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <p className="text-base font-semibold">هیچ ابزاری با این مشخصات یافت نشد.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                  className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                >
                  نمایش همه ابزارها
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/50 dark:bg-slate-800/30 hover:bg-indigo-50/50 dark:hover:bg-slate-800/80 hover:border-indigo-400/50 dark:hover:border-indigo-500/30 transition-all text-right group cursor-pointer relative"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {tool.name}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate">
                        {tool.categoryName}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {/* Favorite star */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (toggleFavorite) toggleFavorite(tool.id);
                        }}
                        className={`p-1 text-sm rounded-md transition-all cursor-pointer ${
                          favorites.includes(tool.id)
                            ? 'text-amber-500 hover:text-slate-400 scale-110'
                            : 'text-slate-300 dark:text-slate-600 hover:text-amber-500 dark:hover:text-amber-400 hover:scale-110'
                        }`}
                        title={favorites.includes(tool.id) ? "حذف نشان" : "نشان کردن"}
                      >
                        {favorites.includes(tool.id) ? '★' : '☆'}
                      </button>

                      <span className="text-xs text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0 transform duration-150 pl-1 font-semibold shrink-0">
                        ← شروع
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Featured Popular Tools Section (Only shown when not searching) */}
        {!isSearching && (
          <div className="max-w-5xl mx-auto mt-4 mb-12">
            <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-8 font-lalezar">
              ابزارهای محبوب و پیشنهادی
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-4 shadow-sm`}>
                      <SlidersIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                    شروع کار با ابزار
                    <span className="mr-1 group-hover:translate-x-[-4px] transition-transform duration-150">←</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Elements Guide Section (Original content preserved with enhanced style) */}
        <div className="max-w-5xl mx-auto mt-4 mb-12">
          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-8 font-lalezar">
            راهنمای المان‌های برنامه
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
            <div className="bg-white dark:bg-slate-800/60 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80">
              <SidebarIcon className="w-10 h-10 mb-4 text-indigo-500" />
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">سایدبار جستجوگر</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                از منوی کناری مجهز به فیلتر جستجو برای جابجایی بین تمام مولدها، منابع علمی و مبدل‌های کاربردی استفاده کنید.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/60 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80">
              <EyeIcon className="w-10 h-10 mb-4 text-indigo-500" />
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">پیش‌نمایش زنده</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                نتیجه تغییرات پارامترها را به صورت زنده و آنی در کادر پیش‌نمایش ببینید و تعامل آن با محیط را بسنجید.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/60 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80">
              <SlidersIcon className="w-10 h-10 mb-4 text-indigo-500" />
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">پنل کنترل و اسلایدرها</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                با استفاده از کنترلرهای پیشرفته، اسلایدرها و پالت‌های رنگی به ساده‌ترین شکل استایل نهایی خود را تنظیم کنید.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/60 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80">
              <CodeIcon className="w-10 h-10 mb-4 text-indigo-500" />
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">خروجی کد یکپارچه</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                کدهای بهینه، پاکیزه و کراس‌براوزر نهایی را به صورت آماده به همراه کپی سریع در کلیپ‌بورد تحویل بگیرید.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6 mb-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-sans">
            برای شروع، یکی از ابزارهای فوق را انتخاب کنید یا از منوی کناری استفاده نمایید.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Welcome;
