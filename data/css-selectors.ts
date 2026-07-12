export interface Selector {
  selector: string;
  example: string;
  description: string;
}

export interface SelectorCategory {
  name: string;
  selectors: Selector[];
}

export const SELECTOR_CATEGORIES: SelectorCategory[] = [
  {
    name: 'انتخاب‌گرهای پایه (Basic Selectors)',
    selectors: [
      { selector: '*', example: '* { color: red; }', description: 'همه عناصر را انتخاب می‌کند.' },
      { selector: 'E', example: 'p { color: blue; }', description: 'تمام عناصر از نوع E (مثلاً p) را انتخاب می‌کند.' },
      { selector: '.c', example: '.intro { font-weight: bold; }', description: 'تمام عناصری که دارای کلاس c (مثلاً intro) هستند را انتخاب می‌کند.' },
      { selector: '#i', example: '#firstname { border: 1px solid; }', description: 'عنصری با شناسه (id) منحصر به فرد i (مثلاً firstname) را انتخاب می‌کند.' },
    ],
  },
  {
    name: 'انتخاب‌گرهای گروهی (Grouping Selectors)',
    selectors: [
      { selector: 'E, F', example: 'h1, h2 { font-family: sans-serif; }', description: 'تمام عناصر E و F را انتخاب می‌کند.' },
    ],
  },
  {
    name: 'ترکیب‌کننده‌ها (Combinators)',
    selectors: [
      { selector: 'E F', example: 'div p { color: green; }', description: 'تمام عناصر F که از نسل (descendant) عنصر E هستند را انتخاب می‌کند.' },
      { selector: 'E > F', example: 'ul > li { list-style: none; }', description: 'تمام عناصر F که فرزند مستقیم (direct child) عنصر E هستند را انتخاب می‌کند.' },
      { selector: 'E + F', example: 'h2 + p { margin-top: 0; }', description: 'تمام عناصر F که بلافاصله بعد از عنصر E قرار دارند (خواهر و برادر مجاور) را انتخاب می‌کند.' },
      { selector: 'E ~ F', example: 'h2 ~ p { text-indent: 2em; }', description: 'تمام عناصر F که بعد از عنصر E قرار دارند و والد یکسانی دارند (خواهر و برادر عمومی) را انتخاب می‌کند.' },
    ],
  },
  {
    name: 'شبه-کلاس‌ها (Pseudo-Classes)',
    selectors: [
      { selector: 'E:first-child', example: 'li:first-child { font-weight: bold; }', description: 'عنصر E را انتخاب می‌کند که اولین فرزند والد خود باشد.' },
      { selector: 'E:last-child', example: 'li:last-child { font-style: italic; }', description: 'عنصر E را انتخاب می‌کند که آخرین فرزند والد خود باشد.' },
      { selector: 'E:nth-child(n)', example: 'tr:nth-child(even) { background: #eee; }', description: 'عنصر E را انتخاب می‌کند که n-امین فرزند والد خود باشد.' },
      { selector: 'E:link', example: 'a:link { color: blue; }', description: 'لینک‌هایی که هنوز بازدید نشده‌اند را انتخاب می‌کند.' },
      { selector: 'E:visited', example: 'a:visited { color: purple; }', description: 'لینک‌هایی که قبلاً بازدید شده‌اند را انتخاب می‌کند.' },
      { selector: 'E:hover', example: 'button:hover { background: #ddd; }', description: 'عنصر E را زمانی که ماوس روی آن قرار دارد، انتخاب می‌کند.' },
      { selector: 'E:active', example: 'button:active { transform: scale(0.95); }', description: 'عنصر E را در لحظه‌ای که توسط کاربر فعال می‌شود (مثلاً کلیک می‌شود)، انتخاب می‌کند.' },
      { selector: 'E:focus', example: 'input:focus { border-color: blue; }', description: 'عنصر E را زمانی که فوکوس دارد، انتخاب می‌کند.' },
    ],
  },
  {
    name: 'شبه-عناصر (Pseudo-Elements)',
    selectors: [
        { selector: 'E::first-line', example: 'p::first-line { text-transform: uppercase; }', description: 'خط اول عنصر E را انتخاب می‌کند.' },
        { selector: 'E::first-letter', example: 'p::first-letter { font-size: 2em; }', description: 'حرف اول عنصر E را انتخاب می‌کند.' },
        { selector: 'E::before', example: 'p.special::before { content: "✨"; }', description: 'یک شبه-عنصر قبل از محتوای عنصر E ایجاد می‌کند.' },
        { selector: 'E::after', example: 'a::after { content: " ↗"; }', description: 'یک شبه-عنصر بعد از محتوای عنصر E ایجاد می‌کند.' },
    ],
  },
  {
    name: 'انتخاب‌گرهای ویژگی (Attribute Selectors)',
    selectors: [
        { selector: 'E[attr]', example: 'a[title] { border-bottom: 1px dotted; }', description: 'تمام عناصر E که ویژگی attr را دارند، انتخاب می‌کند.' },
        { selector: 'E[attr="val"]', example: 'input[type="text"] { width: 200px; }', description: 'تمام عناصر E که ویژگی attr آنها دقیقاً برابر با val است را انتخاب می‌کند.' },
        { selector: 'E[attr~="val"]', example: 'p[class~="important"] { font-weight: bold; }', description: 'تمام عناصر E که ویژگی attr آنها شامل کلمه val (جدا شده با فاصله) است را انتخاب می‌کند.' },
        { selector: 'E[attr|="val"]', example: 'p[lang|="en"] { font-family: serif; }', description: 'تمام عناصر E که ویژگی attr آنها با val شروع می‌شود (یا دقیقاً برابر با val است و یا با val- شروع می‌شود) را انتخاب می‌کند.' },
        { selector: 'E[attr^="val"]', example: 'a[href^="https://"] { color: green; }', description: 'تمام عناصر E که مقدار ویژگی attr آنها با val شروع می‌شود را انتخاب می‌کند.' },
        { selector: 'E[attr$="val"]', example: 'a[href$=".pdf"] { font-weight: bold; }', description: 'تمام عناصر E که مقدار ویژگی attr آنها به val ختم می‌شود را انتخاب می‌کند.' },
        { selector: 'E[attr*="val"]', example: 'p[class*="test"] { color: orange; }', description: 'تمام عناصر E که مقدار ویژگی attr آنها شامل زیررشته val است را انتخاب می‌کند.' },
    ],
  },
];
