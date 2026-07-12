export interface Tool {
  id: string;
  name: string;
  enabled: boolean;
}

export interface ToolCategory {
  name:string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    name: 'خانه',
    tools: [
      { id: 'welcome', name: 'خوش آمدید', enabled: true },
    ]
  },
  {
    name: 'مولدهای CSS',
    tools: [
      { id: 'shape-former', name: 'شکل‌ساز', enabled: true },
      { id: 'animated-text-generator', name: 'مولد متن انیمیشنی', enabled: true },
      { id: 'animation-generator', name: 'مولد انیمیشن / Keyframe', enabled: true },
      { id: 'border-radius-generator', name: 'مولد Border Radius', enabled: true },
      { id: 'box-shadow-generator', name: 'مولد Box Shadow', enabled: true },
      { id: 'button-generator', name: 'مولد دکمه', enabled: true },
      { id: 'checkbox-radio-generator', name: 'مولد Checkbox / Radio', enabled: true },
      { id: 'clip-path-generator', name: 'مولد Clip Path', enabled: true },
      { id: 'column-generator', name: 'مولد ستون', enabled: true },
      { id: 'cubic-bezier-generator', name: 'مولد Cubic Bezier', enabled: true },
      { id: 'image-filter-generator', name: 'مولد فیلتر تصویر', enabled: true },
      { id: 'flip-switch-generator', name: 'مولد سوییچ', enabled: true },
      { id: 'font-generator', name: 'کار با فونت', enabled: true },
      { id: 'gradient-generator', name: 'مولد گرادیانت', enabled: true },
      { id: 'grid-generator', name: 'مولد Grid', enabled: true },
      { id: 'highlighter-generator', name: 'مولد هایلایتر', enabled: true },
      { id: 'input-range-generator', name: 'مولد Input Range', enabled: true },
      { id: 'layout-generator', name: 'مولد چیدمان', enabled: true },
      { id: 'menu-generator', name: 'مولد منو', enabled: true },
      { id: 'pattern-generator', name: 'مولد پترن', enabled: true },
      { id: 'rgba-generator', name: 'مولد RGBA', enabled: true },
      { id: 'ribbon-generator', name: 'مولد روبان', enabled: true },
      { id: 'ribbon-banner-generator', name: 'مولد بنر روبانی', enabled: true },
      { id: 'scrollbar-generator', name: 'مولد اسکرول‌بار', enabled: true },
      { id: 'select-dropdown-generator', name: 'مولد Select Dropdown', enabled: true },
      { id: 'sprite-generator', name: 'مولد Sprite', enabled: true },
      { id: 'text-gradient-generator', name: 'مولد گرادیانت متن', enabled: true },
      { id: 'text-input-generator', name: 'مولد ورودی متن', enabled: true },
      { id: 'text-rotate-generator', name: 'مولد چرخش متن', enabled: true },
      { id: 'text-shadow-generator', name: 'مولد سایه متن', enabled: true },
      { id: 'tooltip-generator', name: 'مولد Tooltip', enabled: true },
      { id: 'transform-3d-generator', name: 'مولد Transform سه‌بعدی', enabled: true },
    ],
  },
  {
    name: 'منابع CSS',
    tools: [
        { id: 'css-at-rules', name: 'قواعد At در CSS', enabled: true },
        { id: 'css-color-names', name: 'نام رنگ‌ها در CSS', enabled: true },
        { id: 'css-data-types', name: 'انواع داده در CSS', enabled: true },
        { id: 'css-functions', name: 'توابع CSS', enabled: true },
        { id: 'css-preloaders', name: 'پیش‌بارگذار‌های CSS', enabled: true },
        { id: 'css-properties', name: 'ویژگی‌های CSS', enabled: true },
        { id: 'css-pseudo-classes', name: 'شبه-کلاس‌ها و عناصر', enabled: true },
        { id: 'css-quiz', name: 'آزمون CSS (به زودی)', enabled: false },
        { id: 'css-selectors', name: 'انتخاب‌گرهای CSS', enabled: true },
        { id: 'css-shapes', name: 'اشکال CSS', enabled: true },
    ],
  },
  {
    name: 'ابزارهای CSS',
    tools: [
      { id: 'less-to-css', name: 'کامپایلر LESS به CSS', enabled: true },
      { id: 'scss-to-css', name: 'کامپایلر SCSS به CSS', enabled: true },
      { id: 'stylus-to-css', name: 'کامپایلر Stylus به CSS', enabled: true },
      { id: 'css-to-less', name: 'مبدل CSS به LESS', enabled: true },
      { id: 'css-to-scss', name: 'مبدل CSS به SCSS', enabled: true },
      { id: 'css-to-stylus', name: 'مبدل CSS به Stylus', enabled: true },
      { id: 'css-color-converter', name: 'مبدل رنگ CSS', enabled: true },
      { id: 'css-cursor-viewer', name: 'نمایشگر نشانگر (Cursor) CSS', enabled: true },
      { id: 'css-font-preview', name: 'پیش‌نمایش فونت CSS', enabled: true },
      { id: 'css-formatter', name: 'فرمت‌دهنده کد CSS', enabled: true },
      { id: 'css-lengths', name: 'واحدهای طول در CSS', enabled: true },
      { id: 'css-optimizer', name: 'بهینه‌ساز کد CSS', enabled: true },
      { id: 'css-validator', name: 'اعتبارسنج کد CSS', enabled: true },
      { id: 'css-visual-editor', name: 'ویرایشگر بصری استایل CSS', enabled: false },
      { id: 'image-to-data-uri', name: 'تبدیل تصویر به Data URL', enabled: true },
      { id: 'online-css-editor', name: 'ویرایشگر آنلاین CSS', enabled: true },
    ],
  },
  {
    name: 'ابزارهای متفرقه',
    tools: [],
  },
];