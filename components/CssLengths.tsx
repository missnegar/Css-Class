import React from 'react';
import { CSS_UNITS_DATA } from '../data/css-lengths';

const CssLengths: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">واحدهای طول در CSS</h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            در CSS دو نوع واحد طول وجود دارد: مطلق و نسبی. درک تفاوت آنها برای ایجاد طرح‌بندی‌های واکنش‌گرا و انعطاف‌پذیر بسیار مهم است.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right text-slate-500 dark:text-slate-400 border-collapse">
              <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-800 dark:text-slate-300">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-tr-lg">واحد</th>
                  <th scope="col" className="px-6 py-3">نام</th>
                  <th scope="col" className="px-6 py-3">نوع</th>
                  <th scope="col" className="px-6 py-3 rounded-tl-lg">توضیحات</th>
                </tr>
              </thead>
              <tbody>
                {CSS_UNITS_DATA.map((unit) => (
                  <tr key={unit.unit} className="bg-white dark:bg-slate-800/50 border-b last:border-b-0 border-slate-200 dark:border-slate-700">
                    <td className="px-6 py-4 font-mono text-indigo-600 dark:text-indigo-400 font-semibold whitespace-nowrap">
                      {unit.unit}
                    </td>
                    <td className="px-6 py-4">{unit.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${unit.type === 'مطلق' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}`}>
                        {unit.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{unit.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CssLengths;
