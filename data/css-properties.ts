import type { BrowserSupport } from './at-rules';

export interface PropertyExample {
  html: string;
  css: string;
}

export interface CssProperty {
  id: string; 
  name: string; 
  description: string;
  values: string[];
  initialValue: string;
  example: PropertyExample;
  browserSupport: BrowserSupport;
}

export const CSS_PROPERTIES_DATA: CssProperty[] = [
  {
    id: 'accent-color',
    name: 'accent-color',
    description: 'رنگ تأکید (accent) برخی از کنترل‌های فرم مانند checkbox ها و radio button ها را مشخص می‌کند.',
    values: ['auto', '<color>'],
    initialValue: 'auto',
    example: {
      html: `
<input type="checkbox" checked />
<input type="radio" name="acc" checked />
<input type="range" value="50" />
<progress value="50" max="100"></progress>`,
      css: `
input, progress {
  accent-color: #ef4444; /* red-500 */
}`
    },
    browserSupport: { chrome: '93', firefox: '92', safari: '15.4', edge: '93', opera: '79' },
  },
  {
    id: 'align-content',
    name: 'align-content',
    description: 'نحوه توزیع فضای خالی بین و اطراف آیتم‌ها در یک کانتینر flex یا grid در امتداد محور متقاطع (cross-axis) را مشخص می‌کند.',
    values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'stretch'],
    initialValue: 'stretch',
    example: {
      html: `
<div class="flex-container">
  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
</div>`,
      css: `
.flex-container {
  display: flex;
  flex-wrap: wrap;
  height: 200px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  /* Try changing this value */
  align-content: center;
}
.flex-container > div {
  width: 50px;
  height: 50px;
  background: #818cf8;
  color: white;
  display: grid;
  place-items: center;
  margin: 5px;
}`
    },
    browserSupport: { chrome: '29', firefox: '28', safari: '9', edge: '12', opera: '16' },
  },
    {
    id: 'align-items',
    name: 'align-items',
    description: 'نحوه چینش آیتم‌ها در امتداد محور متقاطع (cross-axis) در یک کانتینر flex یا grid را تعریف می‌کند.',
    values: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    initialValue: 'stretch',
    example: {
      html: `
<div class="flex-container">
  <div style="height: 40px;">1</div>
  <div style="height: 80px;">2</div>
  <div style="height: 60px;">3</div>
</div>`,
      css: `
.flex-container {
  display: flex;
  height: 120px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  /* Try changing this value */
  align-items: center;
}
.flex-container > div {
  width: 50px;
  background: #818cf8;
  color: white;
  display: grid;
  place-items: center;
  margin: 5px;
}`
    },
    browserSupport: { chrome: '29', firefox: '20', safari: '9', edge: '12', opera: '16' },
  },
  {
    id: 'align-self',
    name: 'align-self',
    description: 'به یک آیتم flex یا grid اجازه می‌دهد تا چینش پیش‌فرض مشخص شده توسط align-items کانتینر را لغو کند.',
    values: ['auto', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    initialValue: 'auto',
    example: {
      html: `
<div class="flex-container">
  <div>1</div>
  <div class="self-aligned">2</div>
  <div>3</div>
</div>`,
      css: `
.flex-container {
  display: flex;
  height: 120px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  align-items: flex-start;
}
.self-aligned {
  align-self: center;
}
.flex-container > div {
  width: 50px;
  height: 50px;
  background: #818cf8;
  color: white;
  display: grid;
  place-items: center;
  margin: 5px;
}`
    },
    browserSupport: { chrome: '29', firefox: '20', safari: '9', edge: '12', opera: '16' },
  },
  {
    id: 'animation',
    name: 'animation',
    description: 'یک ویژگی مختصر (shorthand) برای تمام ویژگی‌های انیمیشن است.',
    values: ['<animation-name>', '<animation-duration>', '<animation-timing-function>', '<animation-delay>', '<animation-iteration-count>', '<animation-direction>', '<animation-fill-mode>', '<animation-play-state>'],
    initialValue: ' متفاوت برای هر ویژگی',
    example: {
      html: '<div class="animated-box"></div>',
      css: `
@keyframes example {
  from { background-color: #818cf8; }
  to { background-color: #f472b6; }
}
.animated-box {
  width: 100px;
  height: 100px;
  animation: example 2s ease-in-out 1s infinite alternate;
}`
    },
    browserSupport: { chrome: '43', firefox: '16', safari: '9', edge: '12', opera: '30' },
  },
  {
    id: 'animation-delay',
    name: 'animation-delay',
    description: 'تاخیر قبل از شروع انیمیشن را مشخص می‌کند.',
    values: ['<time>'],
    initialValue: '0s',
    example: {
      html: '<div class="animated-box"></div>',
      css: `
@keyframes example {
  from { transform: scale(1); }
  to { transform: scale(1.5); }
}
.animated-box {
  width: 100px;
  height: 100px;
  background: #818cf8;
  animation-name: example;
  animation-duration: 2s;
  animation-delay: 1s; /* انیمیشن بعد از ۱ ثانیه شروع می‌شود */
}`
    },
    browserSupport: { chrome: '43', firefox: '16', safari: '9', edge: '12', opera: '30' },
  },
  {
    id: 'animation-direction',
    name: 'animation-direction',
    description: 'جهت پخش انیمیشن را مشخص می‌کند (مثلاً به صورت معکوس یا متناوب).',
    values: ['normal', 'reverse', 'alternate', 'alternate-reverse'],
    initialValue: 'normal',
    example: {
      html: '<div class="animated-box"></div>',
      css: `
@keyframes example {
  from { left: 0px; }
  to { left: 100px; }
}
.animated-box {
  position: relative;
  width: 50px;
  height: 50px;
  background: #818cf8;
  animation: example 2s infinite alternate;
}`
    },
    browserSupport: { chrome: '43', firefox: '16', safari: '9', edge: '12', opera: '30' },
  },
  {
    id: 'animation-duration',
    name: 'animation-duration',
    description: 'مدت زمان یک چرخه کامل انیمیشن را تعیین می‌کند.',
    values: ['<time>'],
    initialValue: '0s',
    example: {
      html: '<div class="animated-box"></div>',
      css: `
@keyframes example {
  from { opacity: 1; }
  to { opacity: 0; }
}
.animated-box {
  width: 100px;
  height: 100px;
  background: #818cf8;
  animation-name: example;
  animation-duration: 4s; /* انیمیشن ۴ ثانیه طول می‌کشد */
}`
    },
    browserSupport: { chrome: '43', firefox: '16', safari: '9', edge: '12', opera: '30' },
  },
  {
    id: 'animation-fill-mode',
    name: 'animation-fill-mode',
    description: 'استایل عنصر را قبل از شروع انیمیشن، بعد از پایان آن، یا هر دو، مشخص می‌کند.',
    values: ['none', 'forwards', 'backwards', 'both'],
    initialValue: 'none',
    example: {
      html: '<div class="animated-box"></div>',
      css: `
@keyframes example {
  to { transform: translateX(100px); background: #f472b6; }
}
.animated-box {
  width: 50px;
  height: 50px;
  background: #818cf8;
  animation: example 2s forwards; /* عنصر در حالت پایانی باقی می‌ماند */
}`
    },
    browserSupport: { chrome: '43', firefox: '16', safari: '9', edge: '12', opera: '30' },
  },
  {
    id: 'animation-iteration-count',
    name: 'animation-iteration-count',
    description: 'تعداد دفعات تکرار انیمیشن را مشخص می‌کند.',
    values: ['<number>', 'infinite'],
    initialValue: '1',
    example: {
      html: '<div class="animated-box"></div>',
      css: `
@keyframes example {
  50% { transform: scale(1.2); }
}
.animated-box {
  width: 100px;
  height: 100px;
  background: #818cf8;
  animation: example 1s infinite; /* انیمیشن بی‌نهایت تکرار می‌شود */
}`
    },
    browserSupport: { chrome: '43', firefox: '16', safari: '9', edge: '12', opera: '30' },
  },
  {
    id: 'animation-name',
    name: 'animation-name',
    description: 'ویژگی animation-name نام یک یا چند انیمیشن تعریف شده با @keyframes را مشخص می‌کند که باید به عنصر اعمال شود.',
    values: ['none', '<custom-ident>'],
    initialValue: 'none',
    example: {
      html: '<div class="animated-box"></div>',
      css: `
@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
.animated-box {
  width: 100px;
  height: 100px;
  background: #818cf8;
  animation-name: slide-in;
  animation-duration: 2s;
}`
    },
    browserSupport: { chrome: '43', firefox: '16', safari: '9', edge: '12', opera: '30' },
  },
  {
    id: 'animation-play-state',
    name: 'animation-play-state',
    description: 'وضعیت پخش انیمیشن را مشخص می‌کند (در حال اجرا یا متوقف).',
    values: ['running', 'paused'],
    initialValue: 'running',
    example: {
      html: '<div class="animated-box"></div>',
      css: `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animated-box {
  width: 100px;
  height: 100px;
  background: #818cf8;
  animation: spin 4s linear infinite;
}
.animated-box:hover {
  animation-play-state: paused; /* با هاور متوقف می‌شود */
}`
    },
    browserSupport: { chrome: '43', firefox: '16', safari: '9', edge: '12', opera: '30' },
  },
  {
    id: 'animation-timing-function',
    name: 'animation-timing-function',
    description: 'منحنی سرعت انیمیشن را مشخص می‌کند (نحوه تغییر سرعت در طول زمان).',
    values: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'steps()', 'cubic-bezier()'],
    initialValue: 'ease',
    example: {
      html: '<div class="animated-box"></div>',
      css: `
@keyframes move {
  to { transform: translateX(150px); }
}
.animated-box {
  width: 50px;
  height: 50px;
  background: #818cf8;
  animation: move 2s linear infinite alternate;
}`
    },
    browserSupport: { chrome: '43', firefox: '16', safari: '9', edge: '12', opera: '30' },
  },
  {
    id: 'backface-visibility',
    name: 'backface-visibility',
    description: 'مشخص می‌کند که آیا وجه پشتی یک عنصر هنگام چرخش در فضای سه‌بعدی قابل مشاهده باشد یا خیر.',
    values: ['visible', 'hidden'],
    initialValue: 'visible',
    example: {
      html: '<div class="flipper"><div class="card">...</div></div>',
      css: `
.card {
  transform-style: preserve-3d;
  transition: transform 1s;
  /* وجه پشتی کارت مخفی است */
  backface-visibility: hidden;
}
.flipper:hover .card {
  transform: rotateY(180deg);
}`
    },
    browserSupport: { chrome: '36', firefox: '16', safari: '9', edge: '12', opera: '23' },
  },
  {
    id: 'background',
    name: 'background',
    description: 'یک ویژگی مختصر (shorthand) برای تنظیم تمام ویژگی‌های پس‌زمینه در یک اعلان است.',
    values: ['<bg-layer#>', '<final-bg-layer>'],
    initialValue: ' متفاوت برای هر ویژگی',
    example: {
      html: '<div class="bg-box"></div>',
      css: `
.bg-box {
  height: 150px;
  background: #a5f3fc url("https://via.placeholder.com/50") no-repeat center;
}`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'background-color',
    name: 'background-color',
    description: 'رنگ پس‌زمینه یک عنصر را تنظیم می‌کند.',
    values: ['<color>', 'transparent'],
    initialValue: 'transparent',
    example: {
      html: '<div class="colored-box">این یک باکس با پس‌زمینه رنگی است.</div>',
      css: `
.colored-box {
  background-color: #fecaca;
  color: #b91c1c;
  padding: 20px;
}`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'background-image',
    name: 'background-image',
    description: 'یک یا چند تصویر پس‌زمینه برای یک عنصر تنظیم می‌کند.',
    values: ['none', '<image>'],
    initialValue: 'none',
    example: {
      html: '<div class="image-box"></div>',
      css: `
.image-box {
  height: 150px;
  background-image: url("https://via.placeholder.com/150");
}`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'background-position',
    name: 'background-position',
    description: 'موقعیت اولیه هر تصویر پس‌زمینه را تنظیم می‌کند.',
    values: ['<position>'],
    initialValue: '0% 0%',
    example: {
      html: '<div class="image-box"></div>',
      css: `
.image-box {
  height: 150px;
  background-image: url("https://via.placeholder.com/80");
  background-repeat: no-repeat;
  background-position: center top;
}`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'background-repeat',
    name: 'background-repeat',
    description: 'نحوه تکرار تصاویر پس‌زمینه را تنظیم می‌کند.',
    values: ['repeat-x', 'repeat-y', 'repeat', 'space', 'round', 'no-repeat'],
    initialValue: 'repeat',
    example: {
      html: '<div class="image-box"></div>',
      css: `
.image-box {
  height: 150px;
  background-image: url("https://via.placeholder.com/50");
  background-repeat: no-repeat;
}`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'background-size',
    name: 'background-size',
    description: 'اندازه تصاویر پس‌زمینه یک عنصر را تنظیم می‌کند.',
    values: ['auto', 'cover', 'contain', '<length>', '<percentage>'],
    initialValue: 'auto',
    example: {
      html: '<div class="image-box"></div>',
      css: `
.image-box {
  height: 150px;
  background-image: url("https://via.placeholder.com/300");
  background-size: cover; /* تصویر کل کادر را می‌پوشاند */
  background-position: center;
}`
    },
    browserSupport: { chrome: '3', firefox: '4', safari: '4.1', edge: '12', opera: '10.5' },
  },
    {
    id: 'border',
    name: 'border',
    description: 'یک ویژگی مختصر (shorthand) برای تنظیم عرض، استایل و رنگ تمام چهار حاشیه یک عنصر است.',
    values: ['<line-width>', '<line-style>', '<color>'],
    initialValue: 'medium none currentColor',
    example: {
      html: '<div class="bordered-box">این باکس حاشیه دارد.</div>',
      css: `
.bordered-box {
  padding: 20px;
  border: 2px dashed #6366f1;
}`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'border-radius',
    name: 'border-radius',
    description: 'گوشه‌های بیرونی حاشیه یک عنصر را گرد می‌کند.',
    values: ['<length-percentage>{1,4}'],
    initialValue: '0',
    example: {
      html: '<div class="rounded-box"></div>',
      css: `
.rounded-box {
  width: 100px;
  height: 100px;
  background: #818cf8;
  border-radius: 15px;
}`
    },
    browserSupport: { chrome: '4', firefox: '4', safari: '5', edge: '12', opera: '10.5' },
  },
  {
    id: 'box-shadow',
    name: 'box-shadow',
    description: 'یک یا چند سایه به کادر یک عنصر اضافه می‌کند.',
    values: ['none', '<shadow>#'],
    initialValue: 'none',
    example: {
      html: '<div class="shadow-box"></div>',
      css: `
.shadow-box {
  width: 100px;
  height: 100px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
}`
    },
    browserSupport: { chrome: '10', firefox: '4', safari: '5.1', edge: '12', opera: '10.5' },
  },
  {
    id: 'box-sizing',
    name: 'box-sizing',
    description: 'نحوه محاسبه عرض و ارتفاع کل یک عنصر را مشخص می‌کند (آیا padding و border را شامل شود یا خیر).',
    values: ['content-box', 'border-box'],
    initialValue: 'content-box',
    example: {
      html: '<div class="box"></div>',
      css: `
.box {
  box-sizing: border-box; /* padding و border در عرض کل محاسبه می‌شوند */
  width: 100px;
  padding: 10px;
  border: 5px solid black;
  /* عرض نهایی 100px است */
}`
    },
    browserSupport: { chrome: '10', firefox: '29', safari: '5.1', edge: '12', opera: '9.5' },
  },
  {
    id: 'color',
    name: 'color',
    description: 'رنگ متن و تزئینات متنی یک عنصر را تنظیم می‌کند.',
    values: ['<color>'],
    initialValue: 'وابسته به مرورگر',
    example: {
      html: '<p class="colored-text">این متن رنگی است.</p>',
      css: '.colored-text { color: #b91c1c; }'
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'cursor',
    name: 'cursor',
    description: 'نوع نشانگر ماوس را هنگام قرار گرفتن روی یک عنصر مشخص می‌کند.',
    values: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'not-allowed', 'grab', 'grabbing'],
    initialValue: 'auto',
    example: {
      html: '<button class="pointer-cursor">دکمه</button>',
      css: '.pointer-cursor { cursor: pointer; }'
    },
    browserSupport: { chrome: true, firefox: true, safari: '1.2', edge: true, opera: true },
  },
  {
    id: 'display',
    name: 'display',
    description: 'این ویژگی نوع نمایش بیرونی و درونی یک عنصر را مشخص می‌کند. نوع نمایش بیرونی تعیین می‌کند که عنصر چگونه در جریان چیدمان شرکت می‌کند (مانند block یا inline)، در حالی که نوع درونی چیدمان فرزندان آن را مشخص می‌کند (مانند flex یا grid).',
    values: ['block', 'inline', 'inline-block', 'flex', 'grid', 'table', 'none'],
    initialValue: 'inline',
    example: {
      html: `
<div class="container">
  <div>I am block</div>
  <span>I am inline</span>
  <div class="flex-child">I am a flex item</div>
</div>`,
      css: `
.container {
  display: flex;
  background-color: #dbeafe;
  border: 1px solid #bfdbfe;
  padding: 10px;
}
.container > * {
  padding: 10px;
  margin: 5px;
  background-color: #e0e7ff;
  border: 1px solid #c7d2fe;
}`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'filter',
    name: 'filter',
    description: 'افکت‌های گرافیکی مانند تاری (blur) یا تغییر رنگ را به یک عنصر اعمال می‌کند.',
    values: ['none', '<filter-function-list>'],
    initialValue: 'none',
    example: {
      html: '<img class="filtered-image" src="https://via.placeholder.com/150" alt="placeholder"/>',
      css: '.filtered-image { filter: grayscale(100%) blur(2px); }'
    },
    browserSupport: { chrome: '53', firefox: '35', safari: '9.1', edge: '12', opera: '40' },
  },
  {
    id: 'flex',
    name: 'flex',
    description: 'یک ویژگی مختصر (shorthand) برای flex-grow, flex-shrink, و flex-basis است.',
    values: ['<flex-grow>', '<flex-shrink>', '<flex-basis>'],
    initialValue: '0 1 auto',
    example: {
      html: '<div class="flex-container"><div class="flex-item">...</div></div>',
      css: `.flex-item { flex: 1 1 200px; /* grow, shrink, basis */ }`
    },
    browserSupport: { chrome: '29', firefox: '20', safari: '9', edge: '12', opera: '16' },
  },
  {
    id: 'flex-direction',
    name: 'flex-direction',
    description: 'جهت قرارگیری آیتم‌های flex در کانتینر را مشخص می‌کند.',
    values: ['row', 'row-reverse', 'column', 'column-reverse'],
    initialValue: 'row',
    example: {
      html: '<div class="flex-container"><div>1</div><div>2</div></div>',
      css: '.flex-container { display: flex; flex-direction: column; }'
    },
    browserSupport: { chrome: '29', firefox: '20', safari: '9', edge: '12', opera: '16' },
  },
  {
    id: 'font-family',
    name: 'font-family',
    description: 'یک لیست اولویت‌بندی شده از نام فونت‌ها یا خانواده‌های فونت عمومی را برای یک عنصر مشخص می‌کند.',
    values: ['<family-name>', '<generic-family>'],
    initialValue: 'وابسته به مرورگر',
    example: {
      html: '<p class="custom-font">این متن با فونت وزیرمتن است.</p>',
      css: `.custom-font { font-family: "Vazirmatn", sans-serif; }`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'font-size',
    name: 'font-size',
    description: 'اندازه فونت متن را تعیین می‌کند.',
    values: ['<length>', '<percentage>', 'small', 'medium', 'large'],
    initialValue: 'medium',
    example: {
      html: '<p class="sized-text">اندازه این فونت 24 پیکسل است.</p>',
      css: `.sized-text { font-size: 24px; }`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'font-weight',
    name: 'font-weight',
    description: 'ضخامت یا وزن فونت را مشخص می‌کند.',
    values: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    initialValue: 'normal',
    example: {
      html: '<p class="bold-text">این متن ضخیم (bold) است.</p>',
      css: `.bold-text { font-weight: 700; }`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'gap',
    name: 'gap',
    description: 'یک ویژگی مختصر (shorthand) برای row-gap و column-gap است که فاصله (gutter) بین ردیف‌ها و ستون‌ها در چیدمان‌های grid, flex, و multi-column را مشخص می‌کند.',
    values: ['<length-percentage>{1,2}'],
    initialValue: 'normal',
    example: {
      html: '<div class="grid-container"><div>1</div><div>2</div><div>3</div><div>4</div></div>',
      css: `
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 10px; /* 20px فاصله ردیف, 10px فاصله ستون */
}`
    },
    browserSupport: { chrome: '84', firefox: '63', safari: '14.1', edge: '84', opera: '70' },
  },
  {
    id: 'grid-template-columns',
    name: 'grid-template-columns',
    description: 'ستون‌های یک grid layout را تعریف می‌کند.',
    values: ['none', '<track-list>', '<auto-track-list>'],
    initialValue: 'none',
    example: {
      html: '<div class="grid-container"><div>1</div><div>2</div></div>',
      css: '.grid-container { display: grid; grid-template-columns: 1fr 200px; }'
    },
    browserSupport: { chrome: '57', firefox: '52', safari: '10.1', edge: '16', opera: '44' },
  },
  {
    id: 'height',
    name: 'height',
    description: 'ارتفاع ناحیه محتوای یک عنصر را تنظیم می‌کند.',
    values: ['auto', '<length>', '<percentage>'],
    initialValue: 'auto',
    example: {
      html: '<div class="sized-box">ارتفاع: 100px</div>',
      css: `.sized-box { height: 100px; padding: 20px; background: #e0e7ff; }`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'justify-content',
    name: 'justify-content',
    description: 'نحوه چینش آیتم‌ها در امتداد محور اصلی (main-axis) در یک کانتینر flex یا grid را تعریف می‌کند.',
    values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    initialValue: 'flex-start',
    example: {
      html: '<div class="flex-container"><div>1</div><div>2</div></div>',
      css: '.flex-container { display: flex; justify-content: space-around; }'
    },
    browserSupport: { chrome: '52', firefox: '20', safari: '9', edge: '12', opera: '16' },
  },
  {
    id: 'margin',
    name: 'margin',
    description: 'یک ویژگی مختصر (shorthand) برای تنظیم حاشیه در هر چهار طرف یک عنصر است.',
    values: ['<length-percentage>{1,4}'],
    initialValue: '0',
    example: {
      html: '<div class="margin-box"></div>',
      css: '.margin-box { margin: 10px 20px; /* 10px بالا/پایین, 20px چپ/راست */ }'
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'opacity',
    name: 'opacity',
    description: 'سطح شفافیت یک عنصر را تنظیم می‌کند.',
    values: ['<number>'],
    initialValue: '1',
    example: {
      html: '<div class="transparent-box"></div>',
      css: `.transparent-box { opacity: 0.5; /* 50% شفاف */ }`
    },
    browserSupport: { chrome: '2', firefox: '2', safari: '2', edge: '12', opera: '9' },
  },
  {
    id: 'overflow',
    name: 'overflow',
    description: 'نحوه نمایش محتوایی که از کادر یک عنصر بیرون می‌زند را مشخص می‌کند.',
    values: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
    initialValue: 'visible',
    example: {
      html: '<div class="overflow-box">محتوای بسیار طولانی...</div>',
      css: '.overflow-box { width: 100px; height: 50px; overflow: scroll; }'
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: '7' },
  },
  {
    id: 'padding',
    name: 'padding',
    description: 'یک ویژگی مختصر (shorthand) برای تنظیم فاصله داخلی در هر چهار طرف یک عنصر است.',
    values: ['<length-percentage>{1,4}'],
    initialValue: '0',
    example: {
      html: '<div class="padded-box">محتوا</div>',
      css: '.padded-box { padding: 20px; }'
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'position',
    name: 'position',
    description: 'نوع روش موقعیت‌یابی استفاده شده برای یک عنصر را مشخص می‌کند.',
    values: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    initialValue: 'static',
    example: {
      html: '<div class="container"><div class="positioned-box"></div></div>',
      css: `.container { position: relative; } .positioned-box { position: absolute; top: 10px; left: 10px; }`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: '7' },
  },
  {
    id: 'transform',
    name: 'transform',
    description: 'به شما اجازه می‌دهد تا یک عنصر را بچرخانید، مقیاس آن را تغییر دهید، کج کنید یا جابجا کنید.',
    values: ['none', '<transform-function>+'],
    initialValue: 'none',
    example: {
      html: '<div class="transformed-box"></div>',
      css: '.transformed-box { transform: rotate(45deg) scale(1.2); }'
    },
    browserSupport: { chrome: '36', firefox: '16', safari: '9', edge: '12', opera: '23' },
  },
  {
    id: 'transition',
    name: 'transition',
    description: 'یک ویژگی مختصر (shorthand) برای transition-property, transition-duration, transition-timing-function, و transition-delay است.',
    values: ['<single-transition>#'],
    initialValue: 'متفاوت برای هر ویژگی',
    example: {
      html: '<div class="transition-box"></div>',
      css: `.transition-box { transition: background-color 0.5s ease-in-out; } .transition-box:hover { background-color: #f472b6; }`
    },
    browserSupport: { chrome: '26', firefox: '16', safari: '6.1', edge: '12', opera: '12.1' },
  },
  {
    id: 'width',
    name: 'width',
    description: 'عرض ناحیه محتوای یک عنصر را تنظیم می‌کند.',
    values: ['auto', '<length>', '<percentage>'],
    initialValue: 'auto',
    example: {
      html: '<div class="sized-box">عرض: 200px</div>',
      css: `.sized-box { width: 200px; padding: 20px; background: #e0e7ff; }`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
  },
  {
    id: 'z-index',
    name: 'z-index',
    description: 'ترتیب قرارگیری (stack order) یک عنصر موقعیت‌دار و فرزندان آن را مشخص می‌کند.',
    values: ['auto', '<integer>'],
    initialValue: 'auto',
    example: {
      html: '<div class="z-box-1"></div><div class="z-box-2"></div>',
      css: `.z-box-1 { position: absolute; z-index: 1; /* بالاتر */ } .z-box-2 { position: absolute; }`
    },
    browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: '7' },
  }
];

// Dynamically add all properties from the user's list with placeholder data
const allPropertyNames = ['accent-color', 'align-content', 'align-items', 'align-self', 'animation', 'animation-composition', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'appearance', 'aspect-ratio', 'backdrop-filter', 'backface-visibility', 'background', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-position-x', 'background-position-y', 'background-repeat', 'background-size', 'block-size', 'border', 'border-block', 'border-block-color', 'border-block-end', 'border-block-end-color', 'border-block-end-style', 'border-block-end-width', 'border-block-start', 'border-block-start-color', 'border-block-start-style', 'border-block-start-width', 'border-block-style', 'border-block-width', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-end-end-radius', 'border-end-start-radius', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 'border-inline', 'border-inline-color', 'border-inline-end', 'border-inline-end-color', 'border-inline-end-style', 'border-inline-end-width', 'border-inline-start', 'border-inline-start-color', 'border-inline-start-style', 'border-inline-start-width', 'border-inline-style', 'border-inline-width', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-radius', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-start-end-radius', 'border-start-start-radius', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-decoration-break', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'caption-side', 'caret-color', 'clear', 'clip-path', 'color', 'color-scheme', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'contain', 'contain-intrinsic-block-size', 'contain-intrinsic-height', 'contain-intrinsic-inline-size', 'contain-intrinsic-size', 'contain-intrinsic-width', 'container', 'container-name', 'container-type', 'content', 'counter-increment', 'counter-reset', 'counter-set', 'cursor', 'direction', 'display', 'empty-cells', 'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'font', 'font-family', 'font-feature-settings', 'font-kerning', 'font-language-override', 'font-optical-sizing', 'font-palette', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-synthesis', 'font-synthesis-small-caps', 'font-synthesis-style', 'font-synthesis-weight', 'font-variant', 'font-variant-alternates', 'font-variant-caps', 'font-variant-east-asian', 'font-variant-emoji', 'font-variant-ligatures', 'font-variant-numeric', 'font-variant-position', 'font-variation-settings', 'font-weight', 'forced-color-adjust', 'gap', 'grid', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column', 'grid-column-end', 'grid-column-start', 'grid-row', 'grid-row-end', 'grid-row-start', 'grid-template', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'hanging-punctuation', 'height', 'hyphenate-character', 'hyphenate-limit-chars', 'hyphens', 'image-orientation', 'image-rendering', 'inline-size', 'inset', 'inset-block', 'inset-block-end', 'inset-block-start', 'inset-inline', 'inset-inline-end', 'inset-inline-start', 'isolation', 'justify-content', 'justify-items', 'justify-self', 'left', 'letter-spacing', 'line-break', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-block', 'margin-block-end', 'margin-block-start', 'margin-bottom', 'margin-inline', 'margin-inline-end', 'margin-inline-start', 'margin-left', 'margin-right', 'margin-top', 'math-depth', 'math-style', 'max-block-size', 'max-height', 'max-inline-size', 'max-width', 'min-block-size', 'min-height', 'min-inline-size', 'min-width', 'mix-blend-mode', 'object-fit', 'object-position', 'offset', 'offset-anchor', 'offset-distance', 'offset-path', 'offset-position', 'offset-rotate', 'opacity', 'order', 'orphans', 'outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'overflow', 'overflow-anchor', 'overflow-block', 'overflow-clip-margin', 'overflow-inline', 'overflow-wrap', 'overflow-x', 'overflow-y', 'overscroll-behavior', 'overscroll-behavior-block', 'overscroll-behavior-inline', 'overscroll-behavior-x', 'overscroll-behavior-y', 'padding', 'padding-block', 'padding-block-end', 'padding-block-start', 'padding-bottom', 'padding-inline', 'padding-inline-end', 'padding-inline-start', 'padding-left', 'padding-right', 'padding-top', 'page', 'paint-order', 'perspective', 'perspective-origin', 'place-content', 'place-items', 'place-self', 'pointer-events', 'position', 'print-color-adjust', 'quotes', 'resize', 'right', 'rotate', 'row-gap', 'ruby-align', 'ruby-position', 'scale', 'scroll-behavior', 'scroll-margin', 'scroll-margin-block', 'scroll-margin-block-end', 'scroll-margin-block-start', 'scroll-margin-bottom', 'scroll-margin-inline', 'scroll-margin-inline-end', 'scroll-margin-inline-start', 'scroll-margin-left', 'scroll-margin-right', 'scroll-margin-top', 'scroll-padding', 'scroll-padding-block', 'scroll-padding-block-end', 'scroll-padding-block-start', 'scroll-padding-bottom', 'scroll-padding-inline', 'scroll-padding-inline-end', 'scroll-padding-inline-start', 'scroll-padding-left', 'scroll-padding-right', 'scroll-padding-top', 'scroll-snap-align', 'scroll-snap-stop', 'scroll-snap-type', 'scrollbar-color', 'scrollbar-gutter', 'scrollbar-width', 'shape-image-threshold', 'shape-margin', 'shape-outside', 'tab-size', 'table-layout', 'text-align', 'text-align-last', 'text-combine-upright', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-skip-ink', 'text-decoration-style', 'text-decoration-thickness', 'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-indent', 'text-justify', 'text-orientation', 'text-overflow', 'text-rendering', 'text-shadow', 'text-transform', 'text-underline-offset', 'text-underline-position', 'top', 'touch-action', 'transform', 'transform-box', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'translate', 'unicode-bidi', 'user-select', 'vertical-align', 'visibility', 'white-space', 'widows', 'width', 'will-change', 'word-break', 'word-spacing', 'word-wrap', 'writing-mode', 'z-index'];

const existingNames = new Set(CSS_PROPERTIES_DATA.map(p => p.name));

allPropertyNames.forEach(name => {
    if (!existingNames.has(name)) {
        CSS_PROPERTIES_DATA.push({
            id: name,
            name: name,
            description: `توضیحات مربوط به ویژگی ${name} در اینجا قرار خواهد گرفت. این ویژگی برای ... استفاده می‌شود.`,
            values: ['...'],
            initialValue: '...',
            example: {
                html: `<div class="example-box">مثال</div>`,
                css: `.example-box {\n  ${name}: value;\n}`
            },
            browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true },
        });
    }
});
