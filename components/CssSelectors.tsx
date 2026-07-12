import React from 'react';
import { SELECTOR_CATEGORIES, SelectorCategory } from '../data/css-selectors';

const CssSelectors: React.FC = () => {
  const Table: React.FC<{ category: SelectorCategory }> = ({ category }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-right text-slate-500 dark:text-slate-400 border-collapse">
        <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-800 dark:text-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-tr-lg">انتخابگر</th>
            <th scope="col" className="px-6 py-3">مثال</th>
            <th scope="col" className="px-6 py-3 rounded-tl-lg">توضیحات</th>
          </tr>
        </thead>
        <tbody>
          {category.selectors.map((item, index) => (
            <tr key={item.selector} className="bg-white dark:bg-slate-800/50 border-b last:border-b-0 border-slate-200 dark:border-slate-700">
              <td className="px-6 py-4 font-mono text-indigo-600 dark:text-indigo-400 font-semibold whitespace-nowrap">
                {item.selector}
              </td>
              <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap">
                {item.example}
              </td>
              <td className="px-6 py-4">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">انتخاب‌گرهای CSS</h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            انتخاب‌گرهای CSS الگوهایی هستند که برای انتخاب عناصر HTML که می‌خواهید استایل‌دهی کنید، استفاده می‌شوند. درک نحوه عملکرد آن‌ها برای تسلط بر CSS ضروری است. در این بخش، می‌توانید مرجعی از انتخاب‌گرهای مختلف را مشاهده کنید.
          </p>
          <div className="space-y-12">
            {SELECTOR_CATEGORIES.map(category => (
              <div key={category.name}>
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                  {category.name}
                </h2>
                <Table category={category} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CssSelectors;
