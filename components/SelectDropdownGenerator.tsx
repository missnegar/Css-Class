import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon'; // Assuming RTL, left arrow for submenu

interface MenuItem {
    id: number;
    label: string;
    children?: MenuItem[];
}

const INITIAL_ITEMS: MenuItem[] = [
    { id: 1, label: 'خانه' },
    {
        id: 2, label: 'محصولات', children: [
            { id: 3, label: 'محصول ۱' },
            { id: 4, label: 'محصول ۲', children: [{ id: 5, label: 'زیر محصول' }] }
        ]
    },
    { id: 6, label: 'درباره ما' },
    { id: 7, label: 'تماس با ما' },
];

const FONT_FAMILIES = ['Vazirmatn', 'Lalezar', 'Cairo', 'Roboto', 'Poppins', 'sans-serif'];

const MenuPreview: React.FC<{ items: MenuItem[] }> = ({ items }) => (
    <ul>
        {items.map(item => (
            <li key={item.id}>
                <a href="#">
                    <span>{item.label}</span>
                    {item.children && (
                        <ChevronLeftIcon className="icon chevron-left" />
                    )}
                </a>
                {item.children && <MenuPreview items={item.children} />}
            </li>
        ))}
    </ul>
);

const HorizontalMenuPreview: React.FC<{ items: MenuItem[] }> = ({ items }) => (
     <ul>
        {items.map(item => (
            <li key={item.id}>
                <a href="#">
                    <span>{item.label}</span>
                    {item.children && <ChevronDownIcon className="icon chevron-down" />}
                </a>
                {item.children && <ul>
                    {item.children.map(child => (
                         <li key={child.id}>
                            <a href="#">
                                <span>{child.label}</span>
                                 {child.children && <ChevronLeftIcon className="icon chevron-left" />}
                            </a>
                             {child.children && <MenuPreview items={child.children} />}
                         </li>
                    ))}
                </ul>}
            </li>
        ))}
    </ul>
)


const SelectDropdownGenerator: React.FC = () => {
    const [menuType, setMenuType] = useState<'vertical' | 'horizontal'>('vertical');
    const [copySuccess, setCopySuccess] = useState('');

    // Styling State
    const [bgColor, setBgColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#334155');
    const [hoverBgColor, setHoverBgColor] = useState('#f1f5f9');
    const [hoverTextColor, setHoverTextColor] = useState('#1e293b');
    const [submenuBgColor, setSubmenuBgColor] = useState('#f8fafc');
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Vazirmatn');
    const [paddingY, setPaddingY] = useState(12);
    const [paddingX, setPaddingX] = useState(16);
    const [borderRadius, setBorderRadius] = useState(8);
    const [hasShadow, setHasShadow] = useState(true);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('خطا در کپی!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const { htmlCode, cssCode } = useMemo(() => {
        const renderHtml = (items: MenuItem[]): string => {
            return `<ul>\n${items.map(item => `  <li>
    <a href="#">
      ${item.label}
      ${item.children ? '<!-- Icon SVG here -->' : ''}
    </a>
    ${item.children ? renderHtml(item.children) : ''}
  </li>`).join('\n')}\n</ul>`;
        };

        const html = `<nav class="custom-menu ${menuType}-menu">\n${renderHtml(INITIAL_ITEMS)}\n</nav>`;

        const css = `
/* --- General Menu Styles --- */
.custom-menu {
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  background-color: ${bgColor};
  border-radius: ${borderRadius}px;
  ${hasShadow ? 'box-shadow: 0 4px 12px rgba(0,0,0,0.1);' : ''}
}

.custom-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.custom-menu li {
  position: relative;
  color: ${textColor};
}

.custom-menu a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${paddingY}px ${paddingX}px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
}

.custom-menu li:hover > a {
  background-color: ${hoverBgColor};
  color: ${hoverTextColor};
}

.custom-menu .icon {
  width: 1em;
  height: 1em;
  stroke-width: 2.5;
  transition: transform 0.2s ease-in-out;
}

/* --- Submenu Styles --- */
.custom-menu ul ul {
  display: none;
  position: absolute;
  background-color: ${submenuBgColor};
  min-width: 200px;
  border-radius: ${borderRadius}px;
  ${hasShadow ? 'box-shadow: 0 4px 12px rgba(0,0,0,0.1);' : ''}
  z-index: 10;
}

.custom-menu li:hover > ul {
  display: block;
}

/* --- ${menuType === 'horizontal' ? 'Horizontal' : 'Vertical'} Menu Specifics --- */
${menuType === 'horizontal' ? `
.horizontal-menu > ul {
  display: flex;
}
.horizontal-menu > ul > li:hover .chevron-down {
  transform: rotate(180deg);
}
.horizontal-menu ul ul {
  top: 100%;
  left: 0;
  margin-top: 8px; /* Gap between levels */
}
.horizontal-menu ul ul li:hover .chevron-left {
    transform: rotate(90deg);
}
.horizontal-menu ul ul ul {
  top: 0;
  left: 100%;
  margin-top: 0;
  margin-left: 8px;
}
` : `
.vertical-menu {
  width: 250px;
}
.vertical-menu > ul > li:hover > a > .chevron-left {
    transform: rotate(90deg);
}
.vertical-menu ul ul {
  top: 0;
  right: 100%; /* For RTL */
  margin-right: 8px; /* Gap between levels */
}
`}
`;
        return { htmlCode: html.trim(), cssCode: css.trim() };
    }, [menuType, bgColor, textColor, hoverBgColor, hoverTextColor, submenuBgColor, fontSize, fontFamily, paddingX, paddingY, borderRadius, hasShadow]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
                        <style>{cssCode}</style>
                        <nav className={`custom-menu ${menuType}-menu`}>
                           {menuType === 'vertical' ? <MenuPreview items={INITIAL_ITEMS} /> : <HorizontalMenuPreview items={INITIAL_ITEMS} />}
                        </nav>
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">نوع منو</h3>
                                <div className="flex gap-2 text-sm bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                                    <button onClick={() => setMenuType('vertical')} className={`flex-1 p-2 rounded-md transition-colors ${menuType === 'vertical' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>عمودی</button>
                                    <button onClick={() => setMenuType('horizontal')} className={`flex-1 p-2 rounded-md transition-colors ${menuType === 'horizontal' ? 'bg-indigo-600 text-white shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>افقی</button>
                                </div>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                               <h3 className="text-lg font-semibold">شخصی‌سازی ظاهر</h3>
                               <div className="grid grid-cols-2 gap-4">
                                    <label className="block text-sm font-medium">پس‌زمینه اصلی<input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                    <label className="block text-sm font-medium">متن اصلی<input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                    <label className="block text-sm font-medium">پس‌زمینه هاور<input type="color" value={hoverBgColor} onChange={e => setHoverBgColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                    <label className="block text-sm font-medium">متن هاور<input type="color" value={hoverTextColor} onChange={e => setHoverTextColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                                    <label className="block text-sm font-medium col-span-2">پس‌زمینه زیرمنو<input type="color" value={submenuBgColor} onChange={e => setSubmenuBgColor(e.target.value)} className="w-full h-10 p-1 mt-1"/></label>
                               </div>
                                <label className="block text-sm">اندازه فونت ({fontSize}px)<input type="range" min="12" max="24" value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full h-2 accent-indigo-600" /></label>
                                <label className="block text-sm">فونت<select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full p-2 mt-1 bg-white dark:bg-slate-900 border rounded-md">{FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}</select></label>
                                <label className="block text-sm">فاصله داخلی عمودی ({paddingY}px)<input type="range" min="4" max="24" value={paddingY} onChange={e => setPaddingY(+e.target.value)} className="w-full h-2 accent-indigo-600" /></label>
                                <label className="block text-sm">فاصله داخلی افقی ({paddingX}px)<input type="range" min="4" max="32" value={paddingX} onChange={e => setPaddingX(+e.target.value)} className="w-full h-2 accent-indigo-600" /></label>
                                <label className="block text-sm">گردی حاشیه ({borderRadius}px)<input type="range" min="0" max="20" value={borderRadius} onChange={e => setBorderRadius(+e.target.value)} className="w-full h-2 accent-indigo-600" /></label>
                                <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={hasShadow} onChange={e => setHasShadow(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded"/>فعال‌سازی سایه</label>
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

export default SelectDropdownGenerator;