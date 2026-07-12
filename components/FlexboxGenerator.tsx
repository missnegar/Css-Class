import React, { useState, useMemo, useCallback } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import FlexDirectionRowIcon from './icons/FlexDirectionRowIcon';
import FlexDirectionRowReverseIcon from './icons/FlexDirectionRowReverseIcon';
import FlexDirectionColumnIcon from './icons/FlexDirectionColumnIcon';
import FlexDirectionColumnReverseIcon from './icons/FlexDirectionColumnReverseIcon';
import JustifyContentStartIcon from './icons/JustifyContentStartIcon';
import JustifyContentCenterIcon from './icons/JustifyContentCenterIcon';
import JustifyContentEndIcon from './icons/JustifyContentEndIcon';
import JustifyContentSpaceBetweenIcon from './icons/JustifyContentSpaceBetweenIcon';
import JustifyContentSpaceAroundIcon from './icons/JustifyContentSpaceAroundIcon';
import JustifyContentSpaceEvenlyIcon from './icons/JustifyContentSpaceEvenlyIcon';
import AlignItemsStartIcon from './icons/AlignItemsStartIcon';
import AlignItemsCenterIcon from './icons/AlignItemsCenterIcon';
import AlignItemsEndIcon from './icons/AlignItemsEndIcon';
import AlignItemsStretchIcon from './icons/AlignItemsStretchIcon';
import AlignItemsBaselineIcon from './icons/AlignItemsBaselineIcon';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type AlignContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'stretch';
type AlignSelf = 'auto' | AlignItems;

interface FlexItem {
    id: number;
    order: number;
    flexGrow: number;
    flexShrink: number;
    flexBasis: string;
    alignSelf: AlignSelf;
}

interface ContainerProps {
    flexDirection: FlexDirection;
    flexWrap: FlexWrap;
    justifyContent: JustifyContent;
    alignItems: AlignItems;
    alignContent: AlignContent;
    gap: number;
}

const INITIAL_ITEM_PROPS: Omit<FlexItem, 'id'> = { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' };

const IconButton: React.FC<{ title: string; onClick: () => void; active: boolean; children: React.ReactNode; }> = ({ title, onClick, active, children }) => (
    <button onClick={onClick} title={title} className={`p-2 rounded-md transition-colors ${active ? 'bg-indigo-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
        {children}
    </button>
);

const FlexboxGenerator: React.FC = () => {
    const camelToKebab = (str: string) => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

    const [containerProps, setContainerProps] = useState<ContainerProps>({
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'stretch',
        gap: 8,
    });
    const [items, setItems] = useState<FlexItem[]>([
        { id: 1, ...INITIAL_ITEM_PROPS },
        { id: 2, ...INITIAL_ITEM_PROPS },
        { id: 3, ...INITIAL_ITEM_PROPS },
    ]);
    const [itemCount, setItemCount] = useState(3);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [copySuccess, setCopySuccess] = useState('');

    const handleItemCountChange = (count: number) => {
        setItemCount(count);
        const newItems: FlexItem[] = [];
        for (let i = 0; i < count; i++) {
            newItems.push(items[i] || { id: Date.now() + i, ...INITIAL_ITEM_PROPS });
        }
        setItems(newItems);
        if (selectedItemId && !newItems.some(item => item.id === selectedItemId)) {
            setSelectedItemId(null);
        }
    };

    const updateContainerProp = <K extends keyof ContainerProps>(prop: K, value: ContainerProps[K]) => {
        setContainerProps(prev => ({ ...prev, [prop]: value }));
    };

    const updateItemProp = <K extends keyof FlexItem>(prop: K, value: FlexItem[K]) => {
        if (selectedItemId === null) return;
        setItems(prev => prev.map(item => item.id === selectedItemId ? { ...item, [prop]: value } : item));
    };

    const selectedItem = useMemo(() => items.find(item => item.id === selectedItemId), [items, selectedItemId]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    const htmlCode = useMemo(() => 
`<div class="flex-container">
${items.map(item => `  <div class="item item-${item.id}">آیتم ${item.id}</div>`).join('\n')}
</div>`
    , [items]);

    const cssCode = useMemo(() => {
        let css = `.flex-container {\n`;
        css += `  display: flex;\n`;
        Object.entries(containerProps).forEach(([key, value]) => {
            const cssProp = camelToKebab(key);
            css += `  ${cssProp}: ${value}${key === 'gap' ? 'px' : ''};\n`;
        });
        css += '}\n\n';
        css += `.item {\n  padding: 20px;\n  border: 2px solid #a78bfa;\n  background-color: #ddd6fe;\n  color: #5b21b6;\n  font-weight: bold;\n  text-align: center;\n}\n\n`;

        items.forEach(item => {
            const itemSpecificStyles: string[] = [];
            if (item.order !== INITIAL_ITEM_PROPS.order) itemSpecificStyles.push(`  order: ${item.order};`);
            if (item.flexGrow !== INITIAL_ITEM_PROPS.flexGrow) itemSpecificStyles.push(`  flex-grow: ${item.flexGrow};`);
            if (item.flexShrink !== INITIAL_ITEM_PROPS.flexShrink) itemSpecificStyles.push(`  flex-shrink: ${item.flexShrink};`);
            if (item.flexBasis !== INITIAL_ITEM_PROPS.flexBasis) itemSpecificStyles.push(`  flex-basis: ${item.flexBasis};`);
            if (item.alignSelf !== INITIAL_ITEM_PROPS.alignSelf) itemSpecificStyles.push(`  align-self: ${item.alignSelf};`);
            
            if (itemSpecificStyles.length > 0) {
                css += `.item-${item.id} {\n${itemSpecificStyles.join('\n')}\n}\n\n`;
            }
        });
        return css.trim();
    }, [containerProps, items]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-grow flex flex-col md:flex-row min-h-0 overflow-y-auto">
                <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 min-w-0">
                    <div className="w-full h-[400px] border-4 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-2 overflow-auto"
                        style={{
                            display: 'flex',
                            ...containerProps,
                            gap: `${containerProps.gap}px`,
                        }}
                    >
                        {items.map(item => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedItemId(item.id)}
                                className={`font-bold text-center text-violet-800 transition-all duration-200 cursor-pointer ${selectedItemId === item.id ? 'ring-4 ring-offset-2 ring-indigo-500 ring-offset-slate-100 dark:ring-offset-slate-900' : ''}`}
                                style={{
                                    padding: '20px',
                                    border: '2px solid #a78bfa',
                                    backgroundColor: '#ddd6fe',
                                    order: item.order,
                                    flexGrow: item.flexGrow,
                                    flexShrink: item.flexShrink,
                                    flexBasis: item.flexBasis,
                                    alignSelf: item.alignSelf,
                                }}
                            >
                                {item.id}
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="w-full md:w-[450px] bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات کانتینر</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">تعداد آیتم‌ها ({itemCount})</label>
                                    <input type="range" min="1" max="12" value={itemCount} onChange={(e) => handleItemCountChange(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Flex Direction</label>
                                    <div className="flex gap-2">
                                        <IconButton title="row" active={containerProps.flexDirection === 'row'} onClick={() => updateContainerProp('flexDirection', 'row')}><FlexDirectionRowIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="row-reverse" active={containerProps.flexDirection === 'row-reverse'} onClick={() => updateContainerProp('flexDirection', 'row-reverse')}><FlexDirectionRowReverseIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="column" active={containerProps.flexDirection === 'column'} onClick={() => updateContainerProp('flexDirection', 'column')}><FlexDirectionColumnIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="column-reverse" active={containerProps.flexDirection === 'column-reverse'} onClick={() => updateContainerProp('flexDirection', 'column-reverse')}><FlexDirectionColumnReverseIcon className="w-6 h-6" /></IconButton>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Justify Content</label>
                                    <div className="flex gap-2 flex-wrap">
                                        <IconButton title="flex-start" active={containerProps.justifyContent === 'flex-start'} onClick={() => updateContainerProp('justifyContent', 'flex-start')}><JustifyContentStartIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="center" active={containerProps.justifyContent === 'center'} onClick={() => updateContainerProp('justifyContent', 'center')}><JustifyContentCenterIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="flex-end" active={containerProps.justifyContent === 'flex-end'} onClick={() => updateContainerProp('justifyContent', 'flex-end')}><JustifyContentEndIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="space-between" active={containerProps.justifyContent === 'space-between'} onClick={() => updateContainerProp('justifyContent', 'space-between')}><JustifyContentSpaceBetweenIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="space-around" active={containerProps.justifyContent === 'space-around'} onClick={() => updateContainerProp('justifyContent', 'space-around')}><JustifyContentSpaceAroundIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="space-evenly" active={containerProps.justifyContent === 'space-evenly'} onClick={() => updateContainerProp('justifyContent', 'space-evenly')}><JustifyContentSpaceEvenlyIcon className="w-6 h-6" /></IconButton>
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <label className="text-sm font-medium">Align Items</label>
                                    <div className="flex gap-2 flex-wrap">
                                        <IconButton title="flex-start" active={containerProps.alignItems === 'flex-start'} onClick={() => updateContainerProp('alignItems', 'flex-start')}><AlignItemsStartIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="center" active={containerProps.alignItems === 'center'} onClick={() => updateContainerProp('alignItems', 'center')}><AlignItemsCenterIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="flex-end" active={containerProps.alignItems === 'flex-end'} onClick={() => updateContainerProp('alignItems', 'flex-end')}><AlignItemsEndIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="stretch" active={containerProps.alignItems === 'stretch'} onClick={() => updateContainerProp('alignItems', 'stretch')}><AlignItemsStretchIcon className="w-6 h-6" /></IconButton>
                                        <IconButton title="baseline" active={containerProps.alignItems === 'baseline'} onClick={() => updateContainerProp('alignItems', 'baseline')}><AlignItemsBaselineIcon className="w-6 h-6" /></IconButton>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">فاصله (Gap) ({containerProps.gap}px)</label>
                                    <input type="range" min="0" max="50" value={containerProps.gap} onChange={(e) => updateContainerProp('gap', Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
                                </div>
                            </div>
                        </div>
                        {selectedItem && (
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">تنظیمات آیتم {selectedItemId}</h3>
                                <div className="space-y-4">
                                     <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ترتیب (Order)</label>
                                        <input type="number" value={selectedItem.order} onChange={(e) => updateItemProp('order', Number(e.target.value))} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Flex Grow</label>
                                        <input type="number" min="0" value={selectedItem.flexGrow} onChange={(e) => updateItemProp('flexGrow', Number(e.target.value))} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Flex Shrink</label>
                                        <input type="number" min="0" value={selectedItem.flexShrink} onChange={(e) => updateItemProp('flexShrink', Number(e.target.value))} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Align Self</label>
                                        <select value={selectedItem.alignSelf} onChange={(e) => updateItemProp('alignSelf', e.target.value as AlignSelf)} className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md">
                                            {['auto', 'flex-start', 'center', 'flex-end', 'stretch', 'baseline'].map(val => <option key={val} value={val}>{val}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
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

export default FlexboxGenerator;