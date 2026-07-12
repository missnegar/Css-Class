import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

type GridUnit = 'fr' | 'px' | '%' | 'auto';
interface GridTrack {
    id: number;
    size: number;
    unit: GridUnit;
}
interface GridItem {
    id: number;
    color?: string;
}

const FONT_FAMILIES = ['Vazirmatn', 'Lalezar', 'Cairo', 'Roboto', 'Poppins', 'sans-serif'];

const GridGenerator: React.FC = () => {
    const [columns, setColumns] = useState<GridTrack[]>([ { id: 1, size: 1, unit: 'fr' }, { id: 2, size: 1, unit: 'fr' }, { id: 3, size: 1, unit: 'fr' }]);
    const [rows, setRows] = useState<GridTrack[]>([ { id: 1, size: 1, unit: 'fr' }, { id: 2, size: 1, unit: 'fr' } ]);
    const [colGap, setColGap] = useState(16);
    const [rowGap, setRowGap] = useState(16);
    const [items, setItems] = useState<GridItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [fontFamily, setFontFamily] = useState('Vazirmatn');
    const [fontSize, setFontSize] = useState(16);
    const [copySuccess, setCopySuccess] = useState('');

    const totalItems = useMemo(() => columns.length * rows.length, [columns, rows]);
    
    // Sync items array with grid size
    useMemo(() => {
        setItems(currentItems => {
            const newItems: GridItem[] = [];
            for(let i = 1; i <= totalItems; i++) {
                const existing = currentItems.find(item => item.id === i);
                newItems.push(existing || { id: i });
            }
            return newItems;
        });
    }, [totalItems]);
    
    const updateTrack = (type: 'columns' | 'rows', id: number, field: 'size' | 'unit', value: number | GridUnit) => {
        const updater = type === 'columns' ? setColumns : setRows;
        updater(tracks => tracks.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const addTrack = (type: 'columns' | 'rows') => {
        const updater = type === 'columns' ? setColumns : setRows;
        updater(tracks => [...tracks, { id: Date.now(), size: 1, unit: 'fr' }]);
    };
    
    const removeTrack = (type: 'columns' | 'rows', id: number) => {
        const updater = type === 'columns' ? setColumns : setRows;
        updater(tracks => {
            if (tracks.length <= 1) return tracks;
            return tracks.filter(t => t.id !== id);
        });
    };
    
    const updateItemColor = (color: string) => {
        if (selectedItemId === null) return;
        setItems(current => current.map(item => item.id === selectedItemId ? {...item, color} : item));
    }
    
    const previewStyle = {
        display: 'grid',
        gridTemplateColumns: columns.map(c => `${c.size}${c.unit}`).join(' '),
        gridTemplateRows: rows.map(r => `${r.size}${r.unit}`).join(' '),
        columnGap: `${colGap}px`,
        rowGap: `${rowGap}px`,
        direction: 'rtl',
    } as React.CSSProperties;

     const htmlCode = `
<div class="grid-container">
${items.map(item => `  <div class="grid-item item-${item.id}">آیتم ${item.id}</div>`).join('\n')}
</div>`.trim();

    const cssCode = useMemo(() => {
        let css = `.grid-container {\n`;
        css += `  display: grid;\n`;
        css += `  grid-template-columns: ${columns.map(c => `${c.size}${c.unit}`).join(' ')};\n`;
        css += `  grid-template-rows: ${rows.map(r => `${r.size}${r.unit}`).join(' ')};\n`;
        css += `  column-gap: ${colGap}px;\n`;
        css += `  row-gap: ${rowGap}px;\n`;
        css += `}\n\n`;
        css += `.grid-item {\n`;
        css += `  font-family: '${fontFamily}', sans-serif;\n`;
        css += `  font-size: ${fontSize}px;\n`;
        css += `  /* Add other item styles here */\n`;
        css += `}\n`;
        
        items.forEach(item => {
            if (item.color) {
                css += `\n.item-${item.id} {\n  background-color: ${item.color};\n}\n`;
            }
        });
        
        return css.trim();
    }, [columns, rows, colGap, rowGap, items, fontFamily, fontSize]);
    
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
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <div className="w-full h-full p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md" style={previewStyle}>
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedItemId(item.id)}
                                    className={`flex items-center justify-center p-2 rounded-md border-2 transition-all ${selectedItemId === item.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-slate-300 dark:border-slate-600'}`}
                                    style={{
                                        backgroundColor: item.color || '#e0e7ff', // indigo-100
                                        fontFamily: fontFamily,
                                        fontSize: `${fontSize}px`,
                                        color: '#3730a3', // indigo-800
                                    }}
                                >
                                    {item.id}
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">ستون‌ها ({columns.length})</h3>
                                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                                    {columns.map(col => (
                                        <div key={col.id} className="flex items-center gap-2">
                                            <input type="number" value={col.size} onChange={e => updateTrack('columns', col.id, 'size', Number(e.target.value))} className="w-20 p-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-sm" />
                                            <select value={col.unit} onChange={e => updateTrack('columns', col.id, 'unit', e.target.value as GridUnit)} className="flex-1 p-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-sm">
                                                <option value="fr">fr</option><option value="px">px</option><option value="%">%</option><option value="auto">auto</option>
                                            </select>
                                            <button onClick={() => removeTrack('columns', col.id)} className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full" title="حذف ستون"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => addTrack('columns')} className="mt-2 w-full flex items-center justify-center gap-2 p-1 text-sm bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600">
                                    <PlusIcon className="w-4 h-4" /> افزودن ستون
                                </button>
                            </div>

                             <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">ردیف‌ها ({rows.length})</h3>
                                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                                    {rows.map(row => (
                                        <div key={row.id} className="flex items-center gap-2">
                                            <input type="number" value={row.size} onChange={e => updateTrack('rows', row.id, 'size', Number(e.target.value))} className="w-20 p-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-sm" />
                                            <select value={row.unit} onChange={e => updateTrack('rows', row.id, 'unit', e.target.value as GridUnit)} className="flex-1 p-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-sm">
                                                <option value="fr">fr</option><option value="px">px</option><option value="%">%</option><option value="auto">auto</option>
                                            </select>
                                            <button onClick={() => removeTrack('rows', row.id)} className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full" title="حذف ردیف"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => addTrack('rows')} className="mt-2 w-full flex items-center justify-center gap-2 p-1 text-sm bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600">
                                    <PlusIcon className="w-4 h-4" /> افزودن ردیف
                                </button>
                            </div>
                            
                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">فاصله (Gap)</h3>
                                <label className="block text-sm">فاصله ستون‌ها ({colGap}px)<input type="range" min="0" max="50" value={colGap} onChange={e => setColGap(Number(e.target.value))} className="w-full h-2 accent-indigo-600 mt-1" /></label>
                                <label className="block text-sm mt-4">فاصله ردیف‌ها ({rowGap}px)<input type="range" min="0" max="50" value={rowGap} onChange={e => setRowGap(Number(e.target.value))} className="w-full h-2 accent-indigo-600 mt-1" /></label>
                            </div>

                            {selectedItemId !== null && (
                                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">آیتم {selectedItemId}</h3>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">رنگ پس‌زمینه
                                        <input type="color" value={items.find(i=>i.id===selectedItemId)?.color || '#e0e7ff'} onChange={e => updateItemColor(e.target.value)} className="w-full h-10 p-1 mt-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md"/>
                                    </label>
                                </div>
                            )}

                             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">فونت آیتم‌ها</h3>
                                <label className="block text-sm font-medium">فونت<select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">{FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}</select></label>
                                <label className="block text-sm font-medium mt-4">اندازه فونت ({fontSize}px)<input type="range" min="8" max="32" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full h-2 accent-indigo-600 mt-1" /></label>
                            </div>
                        </div>
                    </aside>
                </ResizablePanels>
            </main>
            <ResizableFooter>
                {copySuccess && <div className="absolute top-[-40px] right-1/2 translate-x-1/2 p-2 px-4 text-sm text-white bg-green-500 rounded-full transition-opacity duration-300 z-50">{copySuccess}</div>}
                 <div className="h-full pt-2">
                    <ResizablePanels>
                      <CodeBlock title="کد HTML" code={htmlCode} onCopy={() => handleCopy(htmlCode)} />
                      <CodeBlock title="کد CSS" code={cssCode} onCopy={() => handleCopy(cssCode)} />
                    </ResizablePanels>
                </div>
            </ResizableFooter>
        </div>
    );
};

export default GridGenerator;