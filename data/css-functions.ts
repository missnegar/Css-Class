import type { BrowserSupport } from './at-rules';

export interface CssFunction {
  id: string;
  name: string;
  description: string;
  syntax: string;
  category: 'ریاضی' | 'رنگ' | 'تصویر' | 'تبدیل (Transform)' | 'فیلتر' | 'شکل' | 'متفرقه';
  example: {
    html: string;
    css: string;
  };
  browserSupport: BrowserSupport;
}

export const CSS_FUNCTIONS_DATA: CssFunction[] = [
  {
    id: 'attr',
    name: 'attr()',
    category: 'متفرقه',
    description: 'تابع attr() برای دریافت مقدار یک attribute از عنصر انتخاب شده و استفاده از آن در CSS استفاده می‌شود. کاربرد رایج آن در شبه‌عنصرهای ::before و ::after است.',
    syntax: 'attr(attribute-name)',
    example: {
        html: '<a href="https://example.com" data-tooltip="بازدید از سایت">لینک نمونه</a>',
        css: `a::after {
  content: " (" attr(href) ")";
  font-size: 0.8em;
  color: gray;
}
a[data-tooltip]::before {
    content: attr(data-tooltip);
    /* ...سایر استایل‌های tooltip... */
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s;
}
a[data-tooltip]:hover::before {
    opacity: 1;
}`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'blur',
    name: 'blur()',
    category: 'فیلتر',
    description: 'یک افکت تاری (Gaussian blur) به تصویر یا عنصر اعمال می‌کند. مقدار بزرگتر، تاری بیشتری ایجاد می‌کند.',
    syntax: 'blur(radius)',
    example: {
      html: '<img class="filtered-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200" alt="Landscape"/>',
      css: `.filtered-image {
  filter: blur(5px);
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'brightness',
    name: 'brightness()',
    category: 'فیلتر',
    description: 'روشنایی تصویر یا عنصر را تنظیم می‌کند. مقدار 0% تصویر را کاملاً سیاه، 100% بدون تغییر، و مقادیر بالاتر آن را روشن‌تر می‌کنند.',
    syntax: 'brightness(amount)',
    example: {
      html: '<img class="filtered-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200" alt="Landscape"/>',
      css: `.filtered-image {
  filter: brightness(150%); /* 50% روشن‌تر */
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'calc',
    name: 'calc()',
    category: 'ریاضی',
    description: 'تابع calc() به شما اجازه می‌دهد تا محاسبات ریاضی را مستقیماً در مقادیر ویژگی‌های CSS انجام دهید. شما می‌توانید از واحدهای مختلف (مانند px, %, em) در یک محاسبه استفاده کنید.',
    syntax: 'calc(expression)',
    example: {
      html: '<div class="calculated-width"></div>',
      css: `.calculated-width {
  width: calc(100% - 80px);
  height: 50px;
  background-color: #6366f1;
  border: 2px solid #4f46e5;
  margin: 0 auto;
}`,
    },
    browserSupport: { chrome: '26', firefox: '16', safari: '7', edge: '12', opera: '15' },
  },
  {
    id: 'circle',
    name: 'circle()',
    category: 'شکل',
    description: 'یک شکل دایره‌ای برای استفاده در `clip-path` تعریف می‌کند.',
    syntax: 'circle(radius? at position?)',
    example: {
      html: '<div class="clipped-element"></div>',
      css: `.clipped-element {
  width: 150px;
  height: 150px;
  background-color: #818cf8;
  clip-path: circle(50% at 50% 50%);
}`,
    },
    browserSupport: { chrome: '54', firefox: '53', safari: '10.1', edge: '79', opera: '41' },
  },
  {
    id: 'clamp',
    name: 'clamp()',
    category: 'ریاضی',
    description: 'یک مقدار را بین یک حد بالا و پایین محدود می‌کند. این تابع سه پارامتر می‌گیرد: حداقل مقدار، مقدار ترجیحی، و حداکثر مقدار.',
    syntax: 'clamp(MIN, PREFERRED, MAX)',
    example: {
        html: '<p class="clamped-font">اندازه فونت این متن واکنش‌گرا است.</p>',
        css: `.clamped-font {
  /* 
    اندازه فونت حداقل 16px و حداکثر 32px خواهد بود.
    بین این دو مقدار، اندازه فونت 5vw (5% عرض viewport) خواهد بود.
  */
  font-size: clamp(16px, 5vw, 32px);
}`
    },
    browserSupport: { chrome: '79', firefox: '75', safari: '13.1', edge: '79', opera: '66' },
  },
  {
    id: 'conic-gradient',
    name: 'conic-gradient()',
    category: 'تصویر',
    description: 'یک گرادیانت مخروطی ایجاد می‌کند که رنگ‌ها حول یک نقطه مرکزی می‌چرخند.',
    syntax: 'conic-gradient(from angle? at position?, color-stop1, ...)',
    example: {
      html: '<div class="gradient-box"></div>',
      css: `.gradient-box {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
}`,
    },
    browserSupport: { chrome: '69', firefox: '83', safari: '12.1', edge: '79', opera: '56' },
  },
  {
    id: 'contrast',
    name: 'contrast()',
    category: 'فیلتر',
    description: 'کنتراست (تضاد رنگی) یک عنصر را تنظیم می‌کند. 0% آن را خاکستری، 100% بدون تغییر، و مقادیر بالاتر کنتراست را افزایش می‌دهند.',
    syntax: 'contrast(amount)',
    example: {
      html: '<img class="filtered-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200" alt="Landscape"/>',
      css: `.filtered-image {
  filter: contrast(200%); /* کنتراست دو برابر */
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'counter',
    name: 'counter()',
    category: 'متفرقه',
    description: 'مقدار یک شمارنده CSS را نمایش می‌دهد. معمولاً با `counter-increment` و `counter-reset` استفاده می‌شود.',
    syntax: 'counter(name, style?)',
    example: {
      html: '<h2>عنوان</h2>\n<h2>عنوان</h2>\n<h2>عنوان</h2>',
      css: `body {
  counter-reset: heading;
}
h2::before {
  counter-increment: heading;
  content: "بخش " counter(heading) ": ";
  color: #6366f1;
}`,
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'drop-shadow',
    name: 'drop-shadow()',
    category: 'فیلتر',
    description: 'یک سایه به خود شکل عنصر (شامل شفافیت) اعمال می‌کند، برخلاف `box-shadow` که به کادر عنصر اعمال می‌شود.',
    syntax: 'drop-shadow(offset-x offset-y blur-radius? color?)',
    example: {
      html: '<img class="filtered-image" src="https://via.placeholder.com/150/0000FF/FFFFFF?Text=PNG" alt="A transparent PNG"/>',
      css: `.filtered-image {
  /* این سایه به خود شکل (متن) اعمال می‌شود، نه به کادر شفاف تصویر */
  filter: drop-shadow(4px 4px 5px rgba(0,0,0,0.5));
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'ellipse',
    name: 'ellipse()',
    category: 'شکل',
    description: 'یک شکل بیضوی برای `clip-path` تعریف می‌کند.',
    syntax: 'ellipse(rx ry? at position?)',
    example: {
      html: '<div class="clipped-element"></div>',
      css: `.clipped-element {
  width: 200px;
  height: 120px;
  background-color: #818cf8;
  clip-path: ellipse(50% 40% at 50% 50%);
}`,
    },
    browserSupport: { chrome: '54', firefox: '53', safari: '10.1', edge: '79', opera: '41' },
  },
  {
    id: 'grayscale',
    name: 'grayscale()',
    category: 'فیلتر',
    description: 'یک عنصر را به مقیاس خاکستری (سیاه و سفید) تبدیل می‌کند. 100% آن را کاملاً سیاه و سفید می‌کند.',
    syntax: 'grayscale(amount)',
    example: {
      html: '<img class="filtered-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200" alt="Landscape"/>',
      css: `.filtered-image {
  filter: grayscale(100%);
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'hsl',
    name: 'hsl() / hsla()',
    category: 'رنگ',
    description: 'رنگ‌ها را بر اساس مدل Hue (فام)، Saturation (اشباع) و Lightness (روشنایی) تعریف می‌کند. hsla() یک پارامتر چهارم برای شفافیت (Alpha) اضافه می‌کند.',
    syntax: 'hsl(hue, saturation, lightness) | hsla(hue, saturation, lightness, alpha)',
    example: {
        html: '<div class="hsl-box"></div>',
        css: `.hsl-box {
  width: 100%;
  height: 100px;
  /* رنگ آبی با 50% شفافیت */
  background-color: hsla(240, 100%, 50%, 0.5);
}`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: '12', opera: '11.5' },
  },
  {
    id: 'hue-rotate',
    name: 'hue-rotate()',
    category: 'فیلتر',
    description: 'فام (hue) رنگ‌های یک عنصر را در چرخه رنگ می‌چرخاند.',
    syntax: 'hue-rotate(angle)',
    example: {
      html: '<img class="filtered-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200" alt="Landscape"/>',
      css: `.filtered-image {
  filter: hue-rotate(90deg);
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'inset',
    name: 'inset()',
    category: 'شکل',
    description: 'یک شکل مستطیلی تو رفته برای `clip-path` تعریف می‌کند.',
    syntax: 'inset(top right bottom left round border-radius)',
    example: {
      html: '<div class="clipped-element"></div>',
      css: `.clipped-element {
  width: 150px;
  height: 150px;
  background-color: #818cf8;
  /* از هر طرف 20px تو رفتگی دارد */
  clip-path: inset(20px round 15px);
}`,
    },
    browserSupport: { chrome: '54', firefox: '53', safari: '10.1', edge: '79', opera: '41' },
  },
  {
    id: 'invert',
    name: 'invert()',
    category: 'فیلتر',
    description: 'رنگ‌های یک عنصر را معکوس می‌کند. 100% آن را کاملاً نگاتیو می‌کند.',
    syntax: 'invert(amount)',
    example: {
      html: '<img class="filtered-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200" alt="Landscape"/>',
      css: `.filtered-image {
  filter: invert(100%);
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'linear-gradient',
    name: 'linear-gradient()',
    category: 'تصویر',
    description: 'یک گرادیانت خطی به عنوان تصویر پس‌زمینه ایجاد می‌کند. شما می‌توانید زاویه و چندین توقف رنگی را مشخص کنید.',
    syntax: 'linear-gradient(angle?, color-stop1, color-stop2, ...)',
    example: {
        html: '<div class="gradient-box"></div>',
        css: `.gradient-box {
  width: 100%;
  height: 100px;
  /* گرادیانت از بالا به پایین، از آبی به صورتی */
  background-image: linear-gradient(180deg, #60a5fa, #f472b6);
}`
    },
    browserSupport: { chrome: '26', firefox: '16', safari: '6.1', edge: '12', opera: '12.1' },
  },
  {
    id: 'matrix',
    name: 'matrix()',
    category: 'تبدیل (Transform)',
    description: 'یک تبدیل دو بعدی با استفاده از یک ماتریس شش مقداری (a, b, c, d, e, f) تعریف می‌کند.',
    syntax: 'matrix(a, b, c, d, tx, ty)',
    example: {
      html: '<div class="transformed-element">ماتریس</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  /* معادل: scale(1.2) rotate(10deg) skew(5deg) */
  transform: matrix(1.22, 0.22, -0.19, 1.18, 0, 0);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'matrix3d',
    name: 'matrix3d()',
    category: 'تبدیل (Transform)',
    description: 'یک تبدیل سه بعدی با استفاده از یک ماتریس 4x4 شانزده مقداری تعریف می‌کند.',
    syntax: 'matrix3d(n,n,n,n, n,n,n,n, n,n,n,n, n,n,n,n)',
    example: {
      html: '<div class="transformed-element">ماتریس سه‌بعدی</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0.2, 0, 0, 0, 1, 0, 50, 20, 0, 1.1);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'max',
    name: 'max()',
    category: 'ریاضی',
    description: 'از لیستی از مقادیر، بزرگترین مقدار را انتخاب می‌کند. این تابع برای ایجاد محدودیت‌های پایین (حداقل اندازه) مفید است.',
    syntax: 'max(value1, value2, ...)',
    example: {
        html: '<div class="max-width-element">این عرض محدود است.</div>',
        css: `.max-width-element {
  /* عرض عنصر 50% والد خواهد بود، اما هرگز از 200px کوچکتر نمی‌شود */
  width: max(50%, 200px);
  padding: 20px;
  background-color: #f0fdf4;
  border: 1px solid #86efac;
}`
    },
    browserSupport: { chrome: '79', firefox: '75', safari: '13.1', edge: '79', opera: '66' },
  },
  {
    id: 'min',
    name: 'min()',
    category: 'ریاضی',
    description: 'از لیستی از مقادیر، کوچکترین مقدار را انتخاب می‌کند. این تابع برای ایجاد محدودیت‌های بالا در طراحی واکنش‌گرا بسیار مفید است.',
    syntax: 'min(value1, value2, ...)',
    example: {
        html: '<div class="min-width-element">این عرض محدود است.</div>',
        css: `.min-width-element {
  /* عرض عنصر 50% والد خواهد بود، اما هرگز از 300px بزرگتر نمی‌شود */
  width: min(50%, 300px);
  padding: 20px;
  background-color: #f0f9ff;
  border: 1px solid #7dd3fc;
}`
    },
    browserSupport: { chrome: '79', firefox: '75', safari: '13.1', edge: '79', opera: '66' },
  },
  {
    id: 'opacity',
    name: 'opacity()',
    category: 'فیلتر',
    description: 'شفافیت یک عنصر را تنظیم می‌کند. 0% کاملاً شفاف و 100% کاملاً مات است.',
    syntax: 'opacity(amount)',
    example: {
      html: '<img class="filtered-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200" alt="Landscape"/>',
      css: `.filtered-image {
  filter: opacity(50%);
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'path',
    name: 'path()',
    category: 'شکل',
    description: 'یک مسیر SVG را برای استفاده در `clip-path` یا `offset-path` تعریف می‌کند.',
    syntax: 'path("SVG path data")',
    example: {
      html: '<div class="clipped-element"></div>',
      css: `.clipped-element {
  width: 150px;
  height: 150px;
  background: #818cf8;
  clip-path: path('M 75,0 L 130,150 L 20,150 Z');
}`,
    },
    browserSupport: { chrome: '54', firefox: '72', safari: '10.1', edge: '79', opera: '41' },
  },
  {
    id: 'perspective',
    name: 'perspective()',
    category: 'تبدیل (Transform)',
    description: 'یک فاصله به عنصر می‌دهد تا به آن عمق سه بعدی ببخشد. این تابع باید قبل از توابع تبدیل سه بعدی دیگر در ویژگی `transform` قرار گیرد.',
    syntax: 'perspective(length)',
    example: {
      html: '<div class="transformed-element">پرسپکتیو</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: perspective(500px) rotateY(45deg);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'polygon',
    name: 'polygon()',
    category: 'شکل',
    description: 'یک شکل چندضلعی برای `clip-path` با تعریف مختصات هر گوشه ایجاد می‌کند.',
    syntax: 'polygon(x1 y1, x2 y2, ...)',
    example: {
      html: '<div class="clipped-element"></div>',
      css: `.clipped-element {
  width: 150px;
  height: 150px;
  background-color: #818cf8;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}`,
    },
    browserSupport: { chrome: '54', firefox: '53', safari: '10.1', edge: '79', opera: '41' },
  },
  {
    id: 'radial-gradient',
    name: 'radial-gradient()',
    category: 'تصویر',
    description: 'یک گرادیانت دایره‌ای یا بیضوی به عنوان تصویر پس‌زمینه ایجاد می‌کند.',
    syntax: 'radial-gradient(shape? size? at position?, color-stop1, ...)',
    example: {
        html: '<div class="gradient-box"></div>',
        css: `.gradient-box {
  width: 100%;
  height: 150px;
  /* گرادیانت دایره‌ای از مرکز، از زرد به قرمز */
  background-image: radial-gradient(circle, #fde047, #ef4444);
}`
    },
    browserSupport: { chrome: '26', firefox: '16', safari: '7', edge: '12', opera: '12.1' },
  },
  {
    id: 'repeating-conic-gradient',
    name: 'repeating-conic-gradient()',
    category: 'تصویر',
    description: 'یک گرادیانت مخروطی تکرارشونده ایجاد می‌کند.',
    syntax: 'repeating-conic-gradient(...)',
    example: {
      html: '<div class="gradient-box"></div>',
      css: `.gradient-box {
  width: 150px;
  height: 150px;
  background-image: repeating-conic-gradient(#60a5fa 0% 10%, #f472b6 10% 20%);
}`,
    },
    browserSupport: { chrome: '69', firefox: '83', safari: '12.1', edge: '79', opera: '56' },
  },
  {
    id: 'repeating-linear-gradient',
    name: 'repeating-linear-gradient()',
    category: 'تصویر',
    description: 'یک گرادیانت خطی تکرارشونده ایجاد می‌کند.',
    syntax: 'repeating-linear-gradient(...)',
    example: {
      html: '<div class="gradient-box"></div>',
      css: `.gradient-box {
  width: 100%;
  height: 100px;
  background-image: repeating-linear-gradient(-45deg, #60a5fa, #60a5fa 10px, #f472b6 10px, #f472b6 20px);
}`,
    },
    browserSupport: { chrome: '26', firefox: '16', safari: '7', edge: '12', opera: '12.1' },
  },
  {
    id: 'repeating-radial-gradient',
    name: 'repeating-radial-gradient()',
    category: 'تصویر',
    description: 'یک گرادیانت دایره‌ای تکرارشونده ایجاد می‌کند.',
    syntax: 'repeating-radial-gradient(...)',
    example: {
      html: '<div class="gradient-box"></div>',
      css: `.gradient-box {
  width: 100%;
  height: 150px;
  background-image: repeating-radial-gradient(circle, #fde047, #fde047 10px, #ef4444 10px, #ef4444 20px);
}`,
    },
    browserSupport: { chrome: '26', firefox: '16', safari: '7', edge: '12', opera: '12.1' },
  },
  {
    id: 'rgb',
    name: 'rgb() / rgba()',
    category: 'رنگ',
    description: 'این توابع رنگ‌ها را بر اساس مدل رنگی Red, Green, Blue تعریف می‌کنند. تابع rgba() یک پارامتر چهارم برای شفافیت (Alpha) نیز می‌پذیرد.',
    syntax: 'rgb(red, green, blue) | rgba(red, green, blue, alpha)',
    example: {
      html: '<div class="color-box"></div>',
      css: `.color-box {
  width: 100%;
  height: 100px;
  background-color: rgba(236, 72, 153, 0.75); /* صورتی با 75% شفافیت */
  border: 1px solid rgb(0, 0, 0);
}`,
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'rotate',
    name: 'rotate()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را حول یک نقطه مشخص (معمولاً مرکز) می‌چرخاند. این تابع بخشی از ویژگی `transform` است.',
    syntax: 'rotate(angle)',
    example: {
      html: '<div class="rotated-element">چرخش</div>',
      css: `.rotated-element {
  width: 100px;
  height: 100px;
  background-color: #22c55e;
  color: white;
  display: grid;
  place-items: center;
  transform: rotate(45deg);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'rotate3d',
    name: 'rotate3d()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را حول یک بردار سه بعدی [x, y, z] می‌چرخاند.',
    syntax: 'rotate3d(x, y, z, angle)',
    example: {
      html: '<div class="transformed-element">چرخش سه‌بعدی</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: perspective(500px) rotate3d(1, 1, 0, 60deg);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'rotateX',
    name: 'rotateX()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را حول محور افقی (X) می‌چرخاند.',
    syntax: 'rotateX(angle)',
    example: {
      html: '<div class="transformed-element">چرخش X</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: perspective(500px) rotateX(60deg);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'rotateY',
    name: 'rotateY()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را حول محور عمودی (Y) می‌چرخاند.',
    syntax: 'rotateY(angle)',
    example: {
      html: '<div class="transformed-element">چرخش Y</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: perspective(500px) rotateY(60deg);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'rotateZ',
    name: 'rotateZ()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را حول محور Z (عمود بر صفحه) می‌چرخاند. این تابع معادل `rotate()` است.',
    syntax: 'rotateZ(angle)',
    example: {
      html: '<div class="transformed-element">چرخش Z</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: rotateZ(45deg);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'saturate',
    name: 'saturate()',
    category: 'فیلتر',
    description: 'اشباع رنگ یک عنصر را تنظیم می‌کند. 0% آن را سیاه و سفید، 100% بدون تغییر، و مقادیر بالاتر اشباع را افزایش می‌دهند.',
    syntax: 'saturate(amount)',
    example: {
      html: '<img class="filtered-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200" alt="Landscape"/>',
      css: `.filtered-image {
  filter: saturate(200%); /* اشباع دو برابر */
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'scale',
    name: 'scale()',
    category: 'تبدیل (Transform)',
    description: 'اندازه یک عنصر را تغییر می‌دهد. مقادیر بزرگتر از 1 عنصر را بزرگتر و مقادیر بین 0 و 1 آن را کوچکتر می‌کنند.',
    syntax: 'scale(x, y?)',
    example: {
        html: '<div class="scaled-element">مقیاس</div>',
        css: `.scaled-element {
  width: 100px; height: 50px;
  background-color: #f59e0b;
  color: white;
  text-align: center;
  line-height: 50px;
  transition: transform 0.3s;
}
.scaled-element:hover {
  transform: scale(1.2); /* 20% بزرگتر می‌شود */
}`
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'scale3d',
    name: 'scale3d()',
    category: 'تبدیل (Transform)',
    description: 'اندازه یک عنصر را در سه محور X, Y, Z تغییر می‌دهد.',
    syntax: 'scale3d(sx, sy, sz)',
    example: {
      html: '<div class="transformed-element">مقیاس سه‌بعدی</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: perspective(500px) scale3d(1.2, 1.2, 1.2);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'scaleX',
    name: 'scaleX()',
    category: 'تبدیل (Transform)',
    description: 'اندازه یک عنصر را فقط در محور افقی (X) تغییر می‌دهد.',
    syntax: 'scaleX(amount)',
    example: {
      html: '<div class="transformed-element">مقیاس X</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: scaleX(1.5);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'scaleY',
    name: 'scaleY()',
    category: 'تبدیل (Transform)',
    description: 'اندازه یک عنصر را فقط در محور عمودی (Y) تغییر می‌دهد.',
    syntax: 'scaleY(amount)',
    example: {
      html: '<div class="transformed-element">مقیاس Y</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: scaleY(0.8);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'scaleZ',
    name: 'scaleZ()',
    category: 'تبدیل (Transform)',
    description: 'اندازه یک عنصر را فقط در محور عمق (Z) تغییر می‌دهد (نیاز به perspective دارد).',
    syntax: 'scaleZ(amount)',
    example: {
      html: '<div class="transformed-element">مقیاس Z</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: perspective(500px) scaleZ(2);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'sepia',
    name: 'sepia()',
    category: 'فیلتر',
    description: 'یک افکت سپیا (قهوه‌ای قدیمی) به عنصر اعمال می‌کند. 100% آن را کاملاً سپیا می‌کند.',
    syntax: 'sepia(amount)',
    example: {
      html: '<img class="filtered-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200" alt="Landscape"/>',
      css: `.filtered-image {
  filter: sepia(100%);
}`,
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'skew',
    name: 'skew()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را در محورهای X و Y کج می‌کند.',
    syntax: 'skew(ax, ay?)',
    example: {
      html: '<div class="transformed-element">کج شدن</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: skew(10deg, 5deg);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'skewX',
    name: 'skewX()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را فقط در محور افقی (X) کج می‌کند.',
    syntax: 'skewX(angle)',
    example: {
      html: '<div class="transformed-element">کج شدن X</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: skewX(20deg);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'skewY',
    name: 'skewY()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را فقط در محور عمودی (Y) کج می‌کند.',
    syntax: 'skewY(angle)',
    example: {
      html: '<div class="transformed-element">کج شدن Y</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: skewY(20deg);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'translate',
    name: 'translate()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را در محور افقی (X) و/یا عمودی (Y) جابجا می‌کند.',
    syntax: 'translate(x, y?)',
    example: {
        html: '<div class="translated-element">جابجایی</div>',
        css: `.translated-element {
  width: 100px; height: 100px;
  background-color: #3b82f6;
  color: white;
  display: grid;
  place-items: center;
  /* 50px به راست و 20px به پایین */
  transform: translate(50px, 20px); 
}`
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'translate3d',
    name: 'translate3d()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را در فضای سه بعدی (محورهای X, Y, Z) جابجا می‌کند.',
    syntax: 'translate3d(tx, ty, tz)',
    example: {
      html: '<div class="transformed-element">جابجایی سه‌بعدی</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: perspective(500px) translate3d(20px, 20px, 50px);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'translateX',
    name: 'translateX()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را فقط در محور افقی (X) جابجا می‌کند.',
    syntax: 'translateX(amount)',
    example: {
      html: '<div class="transformed-element">جابجایی X</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: translateX(50px);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'translateY',
    name: 'translateY()',
    category: 'تبدیل (Transform)',
    description: 'یک عنصر را فقط در محور عمودی (Y) جابجا می‌کند.',
    syntax: 'translateY(amount)',
    example: {
      html: '<div class="transformed-element">جابجایی Y</div>',
      css: `.transformed-element {
  width: 100px; height: 100px;
  background-color: #818cf8;
  color: white;
  display: grid; place-items: center;
  transform: translateY(-20px);
}`,
    },
    browserSupport: { chrome: true, firefox: '16', safari: '9', edge: '12', opera: '15' },
  },
  {
    id: 'url',
    name: 'url()',
    category: 'تصویر',
    description: 'برای ارجاع به یک منبع خارجی مانند تصویر، فونت یا فایل دیگر استفاده می‌شود. این تابع معمولاً در ویژگی‌هایی مانند `background-image` یا `src` در `@font-face` به کار می‌رود.',
    syntax: 'url("path/to/resource")',
    example: {
        html: '<div class="image-bg"></div>',
        css: `.image-bg {
  width: 100%;
  height: 150px;
  background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200');
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}`,
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'var',
    name: 'var()',
    category: 'متفرقه',
    description: 'تابع var() برای استفاده از مقدار یک متغیر سفارشی CSS (Custom Property) به کار می‌رود. این تابع به شما اجازه می‌دهد تا مقادیر را در یک مکان تعریف کرده و در سراسر شیوه‌نامه خود از آن‌ها استفاده کنید.',
    syntax: 'var(--custom-property-name, fallback_value)',
    example: {
      html: `
<div class="themed-container">
  <p>این یک متن است.</p>
  <button>یک دکمه</button>
</div>`,
      css: `:root {
  --main-bg-color: #e0e7ff;
  --main-text-color: #3730a3;
  --padding-size: 15px;
}
.themed-container {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  padding: var(--padding-size);
  border: 2px solid var(--main-text-color);
  border-radius: 8px;
}`,
    },
    browserSupport: { chrome: '49', firefox: '31', safari: '9.1', edge: '15', opera: '36' },
  },
];
