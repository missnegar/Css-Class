import React, { useState } from 'react';
import { DATA_TYPE_CATEGORIES, DataType } from '../data/css-data-types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

const DetailView: React.FC<{ dataType: DataType; onBack: () => void; }> = ({ dataType, onBack }) => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mb-6">
                <ChevronLeftIcon className="w-5 h-5 transform rotate-180" />
                بازگشت به لیست
            </button>
            <h2 className="text-3xl font-bold font-mono text-slate-800 dark:text-slate-100 mb-2">{dataType.name}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{dataType.description}</p>

            <div>
                <h3 className="text-xl font-semibold mb-4">مقادیر و مثال‌های ممکن</h3>
                <div className="space-y-4">
                    {dataType.examples.map((example, index) => (
                        <div key={index} className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <code className="font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 px-2 py-1 rounded-md">{example.value}</code>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{example.description}</p>
                            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">نمونه استفاده:</p>
                                <pre className="bg-slate-100 dark:bg-slate-900 rounded-md p-2 font-mono text-xs overflow-x-auto">
                                    <code>{example.css}</code>
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ListView: React.FC<{ onSelectDataType: (dataType: DataType) => void; }> = ({ onSelectDataType }) => {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">انواع داده در CSS</h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                هر ویژگی در CSS یک نوع مقدار مشخص را می‌پذیرد. این مقادیر به عنوان انواع داده (Data Types) شناخته می‌شوند. درک این انواع داده برای نوشتن CSS صحیح و کارآمد ضروری است. در این بخش، با رایج‌ترین انواع داده و مقادیر ممکن برای آن‌ها آشنا می‌شوید.
            </p>
            <div className="space-y-8">
                {DATA_TYPE_CATEGORIES.map(category => (
                    <div key={category.name}>
                        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">{category.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.types.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => onSelectDataType(type)}
                                    className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-lg hover:ring-2 hover:ring-indigo-500 transition-all text-right"
                                >
                                    <h3 className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">{type.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-3">
                                        {type.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const CssDataTypes: React.FC = () => {
    const [selectedDataType, setSelectedDataType] = useState<DataType | null>(null);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow p-4 md:p-8 overflow-y-auto no-scrollbar">
                {selectedDataType ? (
                    <DetailView dataType={selectedDataType} onBack={() => setSelectedDataType(null)} />
                ) : (
                    <ListView onSelectDataType={setSelectedDataType} />
                )}
            </main>
             <style>{`
                @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default CssDataTypes;
