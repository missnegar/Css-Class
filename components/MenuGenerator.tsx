import React, { useState, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import ResizableFooter from './ResizableFooter';
import ResizablePanels from './ResizablePanels';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';
import BellIcon from './icons/BellIcon';
import UserIcon from './icons/UserIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

type MenuType = 'vertical' | 'horizontal' | 'mobile';
type MobileDisplay = 'both' | 'icon' | 'label';
interface MenuItem {
    id: number;
    label: string;
    children?: MenuItem[];
}
interface MobileMenuItem {
    id: number;
    label: string;
    icon: string;
}

const ICONS: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    HomeIcon, SearchIcon, PlusCircleIcon, BellIcon, UserIcon, ChevronDownIcon, ChevronRightIcon
};
const ICON_NAMES = Object.keys(ICONS);

const INITIAL_DESKTOP_ITEMS: MenuItem[] = [
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
const INITIAL_MOBILE_ITEMS: MobileMenuItem[] = [
    { id: 1, label: 'خانه', icon: 'HomeIcon' },
    { id: 2, label: 'جستجو', icon: 'SearchIcon' },
    { id: 3, label: 'افزودن', icon: 'PlusCircleIcon' },
    { id: 4, label: 'اعلانات', icon: 'BellIcon' },
    { id: 5, label: 'پروفایل', icon: 'UserIcon' },
];

const RadioButton: React.FC<{ label: string, name: string, value: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, name, value, checked, onChange }) => (
    <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-md cursor-pointer has-[:checked]:bg-indigo-50 dark:has-[:checked]:bg-indigo-900/50 has-[:checked]:ring-2 has-[:checked]:ring-indigo-500 transition-all">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
        {label}
    </label>
);

const DesktopMenuPreview: React.FC<{ items: MenuItem[], type: 'vertical' | 'horizontal' }> = ({ items, type }) => (
    <ul className={`menu-preview-${type}`}>
        {items.map(item => (
            <li key={item.id}>
                <a href="#">
                    {item.label}
                    {item.children && (type === 'vertical' ? <ChevronRightIcon className="icon" /> : <ChevronDownIcon className="icon" />)}
                </a>
                {item.children && <DesktopMenuPreview items={item.children} type={type} />}
            </li>
        ))}
    </ul>
);

const MenuGenerator: React.FC = () => {
    const [menuType, setMenuType] = useState<MenuType>('vertical');
    const [copySuccess, setCopySuccess] = useState('');

    // Desktop state
    const [desktopItems, setDesktopItems] = useState<MenuItem[]>(INITIAL_DESKTOP_ITEMS);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#1e293b');
    const [hoverBgColor, setHoverBgColor] = useState('#4f46e5');
    const [hoverTextColor, setHoverTextColor] = useState('#ffffff');
    const [submenuBgColor, setSubmenuBgColor] = useState('#ffffff');

    // Mobile state
    const [mobileItems, setMobileItems] = useState<MobileMenuItem[]>(INITIAL_MOBILE_ITEMS);
    const [mobileDisplay, setMobileDisplay] = useState<MobileDisplay>('both');
    const [mobileBg, setMobileBg] = useState('#ffffff');
    const [mobileIconColor, setMobileIconColor] = useState('#64748b');
    const [mobileTextColor, setMobileTextColor] = useState('#475569');
    const [mobileActiveColor, setMobileActiveColor] = useState('#6366f1');
    const [selectedMobileItemId, setSelectedMobileItemId] = useState(1);

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
        if (menuType === 'mobile') {
            const iconToInnerHtml = (IconComponent: React.FC<React.SVGProps<SVGSVGElement>>) => {
                const iconElement = IconComponent({});
                if (!React.isValidElement(iconElement)) return '';
                const children = React.Children.toArray((iconElement.props as any).children);
                return children.map(child => {
                    if (!React.isValidElement(child)) return '';
                    const props = child.props as any;
                    let attributes = '';
                    for (const key in props) {
                        if (key !== 'children' && Object.prototype.hasOwnProperty.call(props, key)) {
                            const kebabKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
                            attributes += ` ${kebabKey}="${props[key]}"`;
                        }
                    }
                    return `<${(child.type as string)}${attributes} />`;
                }).join('');
            };
            
            const html = `
<nav class="mobile-menu">
  ${mobileItems.map((item, index) => {
    const Icon = ICONS[item.icon];
    const iconContent = iconToInnerHtml(Icon);
    return `<a href="#" class="menu-item${index === 2 ? ' active' : ''}">
    ${mobileDisplay !== 'label' ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">${iconContent}</svg>` : ''}
    ${mobileDisplay !== 'icon' ? `<span class="label">${item.label}</span>` : ''}
  </a>`
  }).join('\n  ')}
</nav>`;

            const css = `
.mobile-menu {
  display: flex;
  justify-content: space-around;
  background-color: ${mobileBg};
  padding: 8px 0;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
  position: fixed;
  bottom: 0;
  width: 100%;
}
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${mobileTextColor};
  flex-grow: 1;
}
.menu-item .icon {
  width: 24px;
  height: 24px;
  stroke: ${mobileIconColor};
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  margin-bottom: ${mobileDisplay === 'both' ? '4px' : '0'};
}
.menu-item .label {
  font-size: 12px;
}
.menu-item.active .icon {
  stroke: ${mobileActiveColor};
}
.menu-item.active .label {
  color: ${mobileActiveColor};
  font-weight: bold;
}`;
            return { htmlCode: html.trim(), cssCode: css.trim() };
        } else { // Desktop menus
            const renderHtml = (items: MenuItem[], isSubmenu = false): string => {
                const iconHtml = isSubmenu ? `<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>` : `<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
                return `<ul>\n${items.map(item => `  <li>
    <a href="#">
        ${item.label}
        ${item.children ? iconHtml : ''}
    </a>
    ${item.children ? renderHtml(item.children, true) : ''}
  </li>`).join('\n')}\n</ul>`;
            };
            const html = `<nav class="${menuType}-menu">\n${renderHtml(desktopItems)}\n</nav>`;

            const css = `
.${menuType}-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ${bgColor};
}
.${menuType}-menu li {
  position: relative;
  color: ${textColor};
}
.${menuType}-menu a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s, color 0.2s;
}
.${menuType}-menu li:hover > a {
  background-color: ${hoverBgColor};
  color: ${hoverTextColor};
}
.${menuType}-menu .icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}
.${menuType}-menu li:hover > a > .icon {
  transform: rotate(${menuType === 'horizontal' ? '90deg' : '180deg'});
}
/* Sub-menu */
.${menuType}-menu ul ul {
  display: none;
  position: absolute;
  background-color: ${submenuBgColor};
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
}
.${menuType}-menu li:hover > ul {
  display: block;
}
/* ${menuType === 'horizontal' ? 'Horizontal' : 'Vertical'} Specifics */
${menuType === 'horizontal' ? `
.${menuType}-menu > ul > li {
  display: inline-block;
}
.${menuType}-menu ul ul {
  top: 100%;
  left: 0;
}
.${menuType}-menu ul ul ul {
  top: 0;
  left: 100%;
}
` : `
.${menuType}-menu ul ul {
  top: 0;
  right: 100%; /* For RTL */
}
`}
`;
            return { htmlCode: html.trim(), cssCode: css.trim() };
        }
    }, [menuType, desktopItems, bgColor, textColor, hoverBgColor, hoverTextColor, submenuBgColor, mobileItems, mobileDisplay, mobileBg, mobileIconColor, mobileTextColor, mobileActiveColor]);

    const renderControls = () => {
        if (menuType === 'mobile') {
            return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">تنظیمات منوی موبایل</h3>
                    <div>
                        <label className="block text-sm font-medium mb-2">نحوه نمایش</label>
                        <div className="flex gap-2 text-sm">
                            <RadioButton label="آیکون و متن" name="mobileDisplay" value="both" checked={mobileDisplay === 'both'} onChange={() => setMobileDisplay('both')} />
                            <RadioButton label="فقط آیکون" name="mobileDisplay" value="icon" checked={mobileDisplay === 'icon'} onChange={() => setMobileDisplay('icon')} />
                            <RadioButton label="فقط متن" name="mobileDisplay" value="label" checked={mobileDisplay === 'label'} onChange={() => setMobileDisplay('label')} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">رنگ پس‌زمینه نوار</label>
                        <input type="color" value={mobileBg} onChange={e => setMobileBg(e.target.value)} className="w-full h-10 p-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block text-sm font-medium">رنگ متن/آیکون<input type="color" value={mobileIconColor} onChange={e => setMobileIconColor(e.target.value)} className="w-full h-10 p-1 mt-1" /></label>
                        <label className="block text-sm font-medium">رنگ فعال<input type="color" value={mobileActiveColor} onChange={e => setMobileActiveColor(e.target.value)} className="w-full h-10 p-1 mt-1" /></label>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold mt-4 mb-2">ویرایش آیتم‌ها</h4>
                        <div className="space-y-3">
                            {mobileItems.map(item => (
                                <div key={item.id} className="flex gap-2 items-center">
                                    <input type="text" value={item.label} onChange={e => setMobileItems(items => items.map(i => i.id === item.id ? {...i, label: e.target.value} : i))} className="flex-1 p-2 bg-white dark:bg-slate-900 border rounded-md" />
                                    <select value={item.icon} onChange={e => setMobileItems(items => items.map(i => i.id === item.id ? {...i, icon: e.target.value} : i))} className="p-2 bg-white dark:bg-slate-900 border rounded-md">
                                        {ICON_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">تنظیمات منوی دسکتاپ</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block text-sm font-medium">رنگ پس‌زمینه<input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 p-1 mt-1" /></label>
                        <label className="block text-sm font-medium">رنگ متن<input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-10 p-1 mt-1" /></label>
                        <label className="block text-sm font-medium">رنگ پس‌زمینه Hover<input type="color" value={hoverBgColor} onChange={e => setHoverBgColor(e.target.value)} className="w-full h-10 p-1 mt-1" /></label>
                        <label className="block text-sm font-medium">رنگ متن Hover<input type="color" value={hoverTextColor} onChange={e => setHoverTextColor(e.target.value)} className="w-full h-10 p-1 mt-1" /></label>
                         <label className="block text-sm font-medium col-span-2">رنگ پس‌زمینه زیرمنو<input type="color" value={submenuBgColor} onChange={e => setSubmenuBgColor(e.target.value)} className="w-full h-10 p-1 mt-1" /></label>
                    </div>
                    <p className="text-xs text-slate-500">قابلیت ویرایش آیتم‌های منو در این نسخه وجود ندارد.</p>
                </div>
            )
        }
    };


    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <main className="flex-1 flex min-h-0">
                <ResizablePanels>
                    <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 relative">
                        <style>{`
                            :root {
                                --menu-bg: ${bgColor}; --menu-text: ${textColor};
                                --menu-hover-bg: ${hoverBgColor}; --menu-hover-text: ${hoverTextColor};
                                --menu-submenu-bg: ${submenuBgColor};
                                --mobile-bg: ${mobileBg}; --mobile-icon: ${mobileIconColor};
                                --mobile-text: ${mobileTextColor}; --mobile-active: ${mobileActiveColor};
                            }
                            ${cssCode.replace(new RegExp(bgColor, 'g'), 'var(--menu-bg)')
                                .replace(new RegExp(textColor, 'g'), 'var(--menu-text)')
                                .replace(new RegExp(hoverBgColor, 'g'), 'var(--menu-hover-bg)')
                                .replace(new RegExp(hoverTextColor, 'g'), 'var(--menu-hover-text)')
                                .replace(new RegExp(submenuBgColor, 'g'), 'var(--menu-submenu-bg)')
                                .replace(new RegExp(mobileBg, 'g'), 'var(--mobile-bg)')
                                .replace(new RegExp(mobileIconColor, 'g'), 'var(--mobile-icon)')
                                .replace(new RegExp(mobileTextColor, 'g'), 'var(--mobile-text)')
                                .replace(new RegExp(mobileActiveColor, 'g'), 'var(--mobile-active)')
                            }
                        `}</style>
                        {menuType !== 'mobile' ? (
                             <div className={`${menuType}-menu w-64 bg-[var(--menu-bg)] rounded-lg shadow-lg overflow-visible`}>
                                <DesktopMenuPreview items={desktopItems} type={menuType} />
                             </div>
                        ) : (
                            <div className="w-[375px] h-[667px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border-8 border-slate-300 dark:border-slate-700">
                                <div className="flex-grow bg-slate-50 dark:bg-slate-900"></div>
                                <nav className="mobile-menu">
                                  {mobileItems.map((item, index) => {
                                      const Icon = ICONS[item.icon];
                                      return (
                                          <a href="#" key={item.id} className={`menu-item ${index === 2 ? 'active' : ''}`} onClick={(e) => e.preventDefault()}>
                                              {mobileDisplay !== 'label' && <Icon className="icon" />}
                                              {mobileDisplay !== 'icon' && <span className="label">{item.label}</span>}
                                          </a>
                                      )
                                  })}
                                </nav>
                            </div>
                        )}
                    </div>

                    <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                         <div className="space-y-6">
                             <div>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">نوع منو</h3>
                                <div className="flex gap-2 text-sm">
                                    <RadioButton label="عمودی" name="menuType" value="vertical" checked={menuType === 'vertical'} onChange={() => setMenuType('vertical')} />
                                    <RadioButton label="افقی" name="menuType" value="horizontal" checked={menuType === 'horizontal'} onChange={() => setMenuType('horizontal')} />
                                    <RadioButton label="موبایل" name="menuType" value="mobile" checked={menuType === 'mobile'} onChange={() => setMenuType('mobile')} />
                                </div>
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                {renderControls()}
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

export default MenuGenerator;