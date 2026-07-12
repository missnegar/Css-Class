import React from 'react';
import SidebarIcon from './icons/SidebarIcon';
import EyeIcon from './icons/EyeIcon';
import SlidersIcon from './icons/SlidersIcon';
import CodeIcon from './icons/CodeIcon';

const Welcome: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-lalezar text-slate-800 dark:text-slate-100 mb-4">
            به CSS CLASS خوش آمدید
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            مجموعه ابزاری قدرتمند و جامع برای توسعه‌دهندگان فرانت‌اند. هر آنچه برای ساخت، تست و بهینه‌سازی کدهای CSS خود نیاز دارید، در اینجا پیدا کنید.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-8">
            راهنمای المان‌ها
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <SidebarIcon className="w-10 h-10 mb-4 text-indigo-500" />
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">سایدبار</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                از این منو برای جابجایی بین تمام مولدها، منابع و ابزارهای موجود در مجموعه استفاده کنید.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <EyeIcon className="w-10 h-10 mb-4 text-indigo-500" />
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">بخش پیش‌نمایش</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                نتیجه تغییرات شما به صورت زنده و آنی در این قسمت نمایش داده می‌شود تا بتوانید استایل خود را ببینید.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <SlidersIcon className="w-10 h-10 mb-4 text-indigo-500" />
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">پنل تنظیمات</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                با استفاده از اسلایدرها، ورودی‌ها و دکمه‌های این پنل، تمام جزئیات ابزار فعال را کنترل و شخصی‌سازی کنید.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <CodeIcon className="w-10 h-10 mb-4 text-indigo-500" />
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">خروجی کد</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                کد HTML و CSS نهایی و آماده استفاده در این بخش تولید می‌شود. با یک کلیک آن را کپی کنید.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
            <p className="text-slate-500 dark:text-slate-400">برای شروع، یک ابزار از منوی سایدبار انتخاب کنید.</p>
        </div>

      </main>
    </div>
  );
};

export default Welcome;