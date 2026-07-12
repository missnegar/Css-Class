import type { BrowserSupport } from './at-rules';

export interface PseudoItem {
  id: string;
  name: string;
  syntax: string;
  description: string;
  example: {
    html: string;
    css: string;
  };
  browserSupport: BrowserSupport;
}

export interface PseudoCategory {
    name: string;
    description: string;
    items: PseudoItem[];
}

export const PSEUDO_DATA: PseudoCategory[] = [
  {
    name: 'شبه-کلاس‌ها (Pseudo-classes)',
    description: 'یک کلمه کلیدی است که به انتخابگرها اضافه می‌شود تا یک حالت خاص از عنصر انتخاب شده را مشخص کند. به عنوان مثال، :hover فقط زمانی اعمال می‌شود که کاربر ماوس را روی عنصر نگه دارد.',
    items: [
      {
        id: 'active',
        name: ':active',
        syntax: ':active',
        description: 'زمانی اعمال می‌شود که یک عنصر در حال فعال شدن توسط کاربر است (مثلاً در لحظه کلیک کردن روی یک دکمه).',
        example: {
          html: `<button class="active-btn">روی من کلیک کن</button>`,
          css: `.active-btn {
  padding: 10px 20px;
  border: 2px solid #6366f1;
  background-color: white;
  color: #6366f1;
  transition: transform 0.1s;
}
.active-btn:active {
  background-color: #4f46e5;
  color: white;
  transform: scale(0.95);
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
       {
        id: 'any-link',
        name: ':any-link',
        syntax: ':any-link',
        description: 'هر عنصری که به عنوان یک لینک عمل می‌کند (یعنی دارای ویژگی href است) را انتخاب می‌کند. این شبه-کلاس معادل :link, :visited است.',
        example: {
          html: `<a href="#">لینک بازدید نشده</a><br><a href="#">لینک بازدید شده</a>`,
          css: `/* تمام لینک‌ها، چه بازدید شده و چه نشده */
a:any-link {
  text-decoration-style: wavy;
}`
        },
        browserSupport: { chrome: '65', firefox: '50', safari: '9', edge: '79', opera: '52' }
      },
       {
        id: 'autofill',
        name: ':autofill',
        syntax: ':autofill',
        description: 'یک عنصر <input> را که توسط مرورگر به صورت خودکار پر شده است، انتخاب می‌کند.',
        example: {
          html: `<input type="email" placeholder="ایمیل خود را وارد کنید">`,
          css: `/* ممکن است برای دیدن افکت نیاز به ذخیره اطلاعات در مرورگر داشته باشید */
input:-webkit-autofill { /* پیشوند برای کروم/سافاری */
  box-shadow: 0 0 0 30px #fefce8 inset !important;
  -webkit-text-fill-color: #ca8a04 !important;
}
input:autofill {
  box-shadow: 0 0 0 30px #fefce8 inset !important;
  -webkit-text-fill-color: #ca8a04 !important;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
      {
        id: 'checked',
        name: ':checked',
        syntax: ':checked',
        description: 'یک عنصر ورودی مانند checkbox یا radio button را که در حالت انتخاب شده (checked) قرار دارد، انتخاب می‌کند.',
        example: {
          html: `<div>
  <input type="checkbox" id="check" class="check-input" checked>
  <label for="check">این چک‌باکس انتخاب شده است.</label>
</div>`,
          css: `.check-input:checked + label {
  color: #22c55e;
  font-weight: bold;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.1', edge: true, opera: '9.5' }
      },
      {
        id: 'default',
        name: ':default',
        syntax: ':default',
        description: 'یک یا چند عنصر UI را که در میان گروهی از عناصر مشابه به صورت پیش‌فرض انتخاب شده‌اند، انتخاب می‌کند (مانند دکمه submit پیش‌فرض در یک فرم).',
        example: {
          html: `<form>
  <input type="radio" name="r" id="r1" checked> <label for="r1">پیش‌فرض</label>
  <input type="radio" name="r" id="r2"> <label for="r2">گزینه ۲</label>
</form>`,
          css: `input:default + label::after {
  content: " (پیش‌فرض)";
  font-size: 0.8em;
  color: green;
}`
        },
        browserSupport: { chrome: '10', firefox: '4', safari: '5', edge: '79', opera: '10' }
      },
      {
        id: 'defined',
        name: ':defined',
        syntax: ':defined',
        description: 'هر عنصری که تعریف شده باشد را انتخاب می‌کند. این شامل عناصر داخلی HTML و همچنین عناصر سفارشی (Custom Elements) است که با `customElements.define()` تعریف شده‌اند.',
        example: {
          html: `<p>این یک پاراگراف تعریف شده است.</p>
<custom-element>عنصر سفارشی</custom-element>`,
          css: `/* همه عناصر تعریف شده یک حاشیه سبز می‌گیرند */
:defined {
  border: 2px solid green;
  padding: 5px;
  display: block;
}`
        },
        browserSupport: { chrome: '54', firefox: '63', safari: '10.1', edge: '79', opera: '41' }
      },
       {
        id: 'dir',
        name: ':dir()',
        syntax: ':dir(ltr | rtl)',
        description: 'عناصری را بر اساس جهت‌گیری متن آنها (چپ‌چین یا راست‌چین) انتخاب می‌کند.',
        example: {
          html: `<div dir="rtl">این متن راست‌چین است.</div>
<div dir="ltr">This text is LTR.</div>`,
          css: `div:dir(rtl) {
  border-right: 4px solid #6366f1;
}
div:dir(ltr) {
  border-left: 4px solid #ef4444;
}`
        },
        browserSupport: { chrome: 'No', firefox: '49', safari: 'No', edge: 'No', opera: 'No' }
      },
      {
        id: 'disabled',
        name: ':disabled',
        syntax: ':disabled',
        description: 'یک عنصر ورودی را که غیرفعال (disabled) است، انتخاب می‌کند.',
        example: {
          html: `<input type="text" value="قابل ویرایش نیست" disabled>`,
          css: `input:disabled {
  background-color: #f1f5f9;
  border-color: #e2e8f0;
  cursor: not-allowed;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.1', edge: true, opera: '9.5' }
      },
      {
        id: 'empty',
        name: ':empty',
        syntax: ':empty',
        description: 'عناصری را انتخاب می‌کند که هیچ فرزندی (حتی متن یا فضای خالی) ندارند.',
        example: {
          html: `<div class="box"></div>
<div class="box">دارای متن</div>
<div class="box"></div>`,
          css: `.box {
  height: 50px;
  border: 2px dashed #94a3b8;
  margin-bottom: 5px;
}
.box:empty {
  background-color: #fecaca;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.1', edge: true, opera: '9.5' }
      },
      {
        id: 'enabled',
        name: ':enabled',
        syntax: ':enabled',
        description: 'یک عنصر ورودی را که فعال (enabled) است، انتخاب می‌کند.',
        example: {
          html: `<input type="text" placeholder="یک ورودی فعال">`,
          css: `input:enabled {
  border: 2px solid #22c55e;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.1', edge: true, opera: '9.5' }
      },
      {
        id: 'first-child',
        name: ':first-child',
        syntax: ':first-child',
        description: 'عناصری را انتخاب می‌کند که اولین فرزند والد خود هستند.',
        example: {
          html: `<ul>
  <li>آیتم اول</li>
  <li>آیتم دوم</li>
  <li>آیتم سوم</li>
</ul>`,
          css: `li:first-child {
  font-weight: bold;
  color: #6366f1;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.1', edge: true, opera: '9.5' }
      },
       {
        id: 'first-of-type',
        name: ':first-of-type',
        syntax: ':first-of-type',
        description: 'اولین عنصر از نوع خودش را در میان خواهر و برادرهایش انتخاب می‌کند.',
        example: {
          html: `<div>
  <h3>عنوان اول</h3>
  <p>پاراگراف اول</p>
  <p>پاراگراف دوم</p>
</div>`,
          css: `p:first-of-type {
  color: #6366f1;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.2', edge: true, opera: '9.5' }
      },
      {
        id: 'focus',
        name: ':focus',
        syntax: ':focus',
        description: 'زمانی اعمال می‌شود که یک عنصر (مانند یک input یا button) فوکوس را دریافت کرده باشد (مثلاً با کلیک کردن یا استفاده از کلید Tab).',
        example: {
          html: `<input class="focus-input" type="text" placeholder="روی من کلیک کن" />`,
          css: `.focus-input {
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.focus-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
      {
        id: 'focus-visible',
        name: ':focus-visible',
        syntax: ':focus-visible',
        description: 'مانند :focus عمل می‌کند، اما فقط زمانی که مرورگر تشخیص دهد که فوکوس باید برای کاربر قابل مشاهده باشد (معمولاً هنگام ناوبری با کیبورد).',
        example: {
          html: `<input type="text" placeholder="با Tab فوکوس کن">`,
          css: `/* این استایل فقط با Tab زدن نمایان می‌شود، نه با کلیک */
input:focus-visible {
  outline: 3px solid #ef4444;
}`
        },
        browserSupport: { chrome: '86', firefox: '85', safari: '15.4', edge: '86', opera: '72' }
      },
       {
        id: 'focus-within',
        name: ':focus-within',
        syntax: ':focus-within',
        description: 'عنصری را انتخاب می‌کند که خودش یا یکی از فرزندانش در حالت focus باشد.',
        example: {
          html: `<form class="form-group">
  <label for="name">نام:</label>
  <input id="name" type="text">
</form>`,
          css: `.form-group {
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: box-shadow 0.3s;
}
.form-group:focus-within {
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}`
        },
        browserSupport: { chrome: '60', firefox: '52', safari: '10.1', edge: '79', opera: '47' }
      },
      {
        id: 'fullscreen',
        name: ':fullscreen',
        syntax: ':fullscreen',
        description: 'عنصری را انتخاب می‌کند که در حال حاضر در حالت تمام‌صفحه (fullscreen) نمایش داده می‌شود.',
        example: {
          html: `<div id="fs-element">برای تمام‌صفحه شدن کلیک کنید.</div>
<script>
  document.getElementById('fs-element').onclick = function() {
    this.requestFullscreen();
  }
</script>`,
          css: `#fs-element:fullscreen {
  background-color: #1e293b;
  color: white;
  font-size: 2rem;
}`
        },
        browserSupport: { chrome: '15', firefox: '49', safari: '6', edge: '12', opera: '15' }
      },
       {
        id: 'has',
        name: ':has()',
        syntax: ':has(<selector-list>)',
        description: 'عنصری را انتخاب می‌کند که حداقل یکی از فرزندانش با انتخابگر مشخص شده مطابقت داشته باشد. این به عنوان "انتخابگر والد" نیز شناخته می‌شود.',
        example: {
          html: `<figure>
  <img src="https://via.placeholder.com/150" alt="">
  <figcaption>یک تصویر با کپشن</figcaption>
</figure>
<figure>
  <img src="https://via.placeholder.com/150" alt="">
</figure>`,
          css: `/* فقط figure هایی که figcaption دارند را انتخاب کن */
figure:has(figcaption) {
  border: 2px solid #22c55e;
}`
        },
        browserSupport: { chrome: '105', firefox: 'No', safari: '16', edge: '105', opera: '91' }
      },
      {
        id: 'hover',
        name: ':hover',
        syntax: ':hover',
        description: 'زمانی اعمال می‌شود که کاربر با یک دستگاه اشاره‌گر (مانند ماوس) روی یک عنصر قرار می‌گیرد.',
        example: {
          html: `<button class="hover-btn">روی من هاور کن</button>`,
          css: `.hover-btn {
  background-color: #6366f1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.hover-btn:hover {
  background-color: #4f46e5;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
      {
        id: 'in-range',
        name: ':in-range',
        syntax: ':in-range',
        description: 'یک عنصر <input> را انتخاب می‌کند که مقدار فعلی آن در محدوده مشخص شده توسط ویژگی‌های min و max قرار دارد.',
        example: {
          html: `<input type="number" min="1" max="10" value="5">`,
          css: `input:in-range {
  border: 2px solid green;
}`
        },
        browserSupport: { chrome: '10', firefox: '29', safari: '5.1', edge: '13', opera: '11' }
      },
      {
        id: 'indeterminate',
        name: ':indeterminate',
        syntax: ':indeterminate',
        description: 'عناصر ورودی مانند checkbox ها را انتخاب می‌کند که در حالت نامشخص هستند (نه تیک خورده و نه نخورده). این حالت فقط از طریق جاوااسکریپت قابل تنظیم است.',
        example: {
          html: `<input type="checkbox" id="indeterminate-check">
<script>
  document.getElementById('indeterminate-check').indeterminate = true;
</script>`,
          css: `input:indeterminate {
  opacity: 0.5;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: '3', edge: true, opera: '9' }
      },
      {
        id: 'invalid',
        name: ':invalid',
        syntax: ':invalid',
        description: 'یک عنصر ورودی را انتخاب می‌کند که مقدار آن بر اساس قوانین اعتبارسنجی (validation) نامعتبر است.',
        example: {
          html: `<input type="email" value="not-an-email">`,
          css: `input:invalid {
  border: 2px solid red;
}`
        },
        browserSupport: { chrome: '10', firefox: '4', safari: '5', edge: '12', opera: '10' }
      },
      {
        id: 'is',
        name: ':is()',
        syntax: ':is(<selector-list>)',
        description: 'یک لیست از انتخابگرها را به عنوان آرگومان می‌گیرد و هر عنصری را که با هر یک از انتخابگرهای موجود در لیست مطابقت داشته باشد، انتخاب می‌کند. برای ساده‌سازی انتخابگرهای پیچیده مفید است.',
        example: {
          html: `<header><h1>عنوان</h1></header>
<main><h2>عنوان</h2></main>`,
          css: `/* به جای: header h1, main h2 */
:is(header, main) h1, :is(header, main) h2 {
  color: #6366f1;
}`
        },
        browserSupport: { chrome: '88', firefox: '78', safari: '14', edge: '88', opera: '74' }
      },
      {
        id: 'lang',
        name: ':lang()',
        syntax: ':lang(language-code)',
        description: 'عناصری را بر اساس زبان مشخص شده در ویژگی `lang` انتخاب می‌کند.',
        example: {
          html: `<p lang="fa-IR">این یک پاراگراف فارسی است.</p>
<p lang="en-US">This is an English paragraph.</p>`,
          css: `p:lang(fa-IR) {
  font-family: 'Vazirmatn', sans-serif;
}
p:lang(en-US) {
  font-family: 'Roboto', sans-serif;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: '3.1', edge: true, opera: '8' }
      },
      {
        id: 'last-child',
        name: ':last-child',
        syntax: ':last-child',
        description: 'عناصری را انتخاب می‌کند که آخرین فرزند والد خود هستند.',
        example: {
          html: `<ul>
  <li>آیتم اول</li>
  <li>آیتم دوم</li>
  <li>آیتم سوم</li>
</ul>`,
          css: `li:last-child {
  font-weight: bold;
  color: #ef4444;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.1', edge: true, opera: '9.5' }
      },
      {
        id: 'last-of-type',
        name: ':last-of-type',
        syntax: ':last-of-type',
        description: 'آخرین عنصر از نوع خودش را در میان خواهر و برادرهایش انتخاب می‌کند.',
        example: {
          html: `<div>
  <p>پاراگراف اول</p>
  <p>پاراگراف دوم</p>
  <span>متن</span>
</div>`,
          css: `p:last-of-type {
  color: #ef4444;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.2', edge: true, opera: '9.5' }
      },
      {
        id: 'link',
        name: ':link',
        syntax: ':link',
        description: 'لینک‌هایی (عناصر <a> با ویژگی href) را انتخاب می‌کند که هنوز بازدید نشده‌اند.',
        example: {
          html: `<a href="#">یک لینک بازدید نشده</a>`,
          css: `a:link {
  color: #1d4ed8;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
      {
        id: 'modal',
        name: ':modal',
        syntax: ':modal',
        description: 'یک عنصر را که در حالتی است که تمام تعاملات با عناصر خارج از آن را رد می‌کند، انتخاب می‌کند. این برای دیالوگ‌های باز شده با `showModal()` کاربرد دارد.',
        example: {
          html: `<dialog id="d">این یک دیالوگ مودال است.</dialog>
<script>document.getElementById('d').showModal()</script>`,
          css: `dialog:modal {
  border: 4px solid #f472b6;
}`
        },
        browserSupport: { chrome: '37', firefox: '98', safari: '15.4', edge: '79', opera: '24' }
      },
      {
        id: 'not',
        name: ':not()',
        syntax: ':not(<selector-list>)',
        description: 'عناصری را انتخاب می‌کند که با انتخابگر(های) داده شده مطابقت ندارند. این یک شبه-کلاس نفی است.',
        example: {
          html: `<div>
  <p>پاراگراف اول</p>
  <p class="special">پاراگراف ویژه</p>
  <p>پاراگراف سوم</p>
</div>`,
          css: `/* تمام پاراگراف‌ها به جز آنهایی که کلاس special دارند */
p:not(.special) {
  color: gray;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: '9.5' }
      },
      {
        id: 'nth-child',
        name: ':nth-child(n)',
        syntax: ':nth-child(an + b)',
        description: 'عناصری را بر اساس موقعیت آن‌ها در میان خواهر و برادرهایشان (siblings) انتخاب می‌کند. n می‌تواند یک عدد، یک کلمه کلیدی (odd, even) یا یک فرمول باشد.',
        example: {
          html: `<ul>
  <li>آیتم ۱</li>
  <li>آیتم ۲</li>
  <li>آیتم ۳</li>
  <li>آیتم ۴</li>
</ul>`,
          css: `li {
  padding: 5px;
}
/* آیتم‌های زوج را انتخاب می‌کند */
li:nth-child(even) {
  background-color: #f1f5f9;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.1', edge: true, opera: '9.5' }
      },
      {
        id: 'nth-last-child',
        name: ':nth-last-child(n)',
        syntax: ':nth-last-child(an + b)',
        description: 'مانند :nth-child() عمل می‌کند، اما شمارش را از آخرین عنصر شروع می‌کند.',
        example: {
          html: `<ul>
  <li>آیتم ۱</li><li>آیتم ۲</li><li>آیتم ۳</li><li>آیتم ۴</li>
</ul>`,
          css: `/* دومین آیتم از آخر را انتخاب می‌کند */
li:nth-last-child(2) {
  background-color: #fecaca;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.1', edge: true, opera: '9.5' }
      },
       {
        id: 'nth-last-of-type',
        name: ':nth-last-of-type(n)',
        syntax: ':nth-last-of-type(an + b)',
        description: 'مانند :nth-of-type() عمل می‌کند، اما شمارش را از آخرین عنصر از آن نوع شروع می‌کند.',
        example: {
          html: `<div>
  <p>پاراگراف ۱</p><span>...</span><p>پاراگراف ۲</p>
</div>`,
          css: `/* آخرین پاراگراف را انتخاب می‌کند */
p:nth-last-of-type(1) {
  color: #ef4444;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.2', edge: true, opera: '9.5' }
      },
      {
        id: 'nth-of-type',
        name: ':nth-of-type(n)',
        syntax: ':nth-of-type(an + b)',
        description: 'عناصری را بر اساس موقعیت آن‌ها در میان خواهر و برادرهای هم‌نوع خود انتخاب می‌کند.',
        example: {
          html: `<div>
  <p>پاراگراف اول</p>
  <span>یک متن</span>
  <p>پاراگراف دوم</p>
</div>`,
          css: `/* دومین پاراگراف را انتخاب می‌کند */
p:nth-of-type(2) {
  color: #6366f1;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.2', edge: true, opera: '9.5' }
      },
      {
        id: 'only-child',
        name: ':only-child',
        syntax: ':only-child',
        description: 'عنصری را انتخاب می‌کند که تنها فرزند والد خود باشد.',
        example: {
          html: `<div><p>من تنها فرزندم.</p></div>
<div><p>ما دو فرزندیم.</p><p>ما دو فرزندیم.</p></div>`,
          css: `p:only-child {
  color: green;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.1', edge: true, opera: '9.5' }
      },
      {
        id: 'only-of-type',
        name: ':only-of-type',
        syntax: ':only-of-type',
        description: 'عنصری را انتخاب می‌کند که تنها عنصر از نوع خودش در میان خواهر و برادرهایش باشد.',
        example: {
          html: `<div>
  <p>من تنها پاراگراف اینجا هستم.</p>
  <span>یک متن</span>
</div>`,
          css: `p:only-of-type {
  color: green;
}`
        },
        browserSupport: { chrome: true, firefox: '3.5', safari: '3.2', edge: true, opera: '9.5' }
      },
      {
        id: 'optional',
        name: ':optional',
        syntax: ':optional',
        description: 'یک عنصر ورودی را انتخاب می‌کند که ویژگی `required` را ندارد.',
        example: {
          html: `<input type="text" placeholder="اختیاری">
<input type="text" placeholder="اجباری" required>`,
          css: `input:optional {
  border-left: 4px solid #94a3b8;
}`
        },
        browserSupport: { chrome: '10', firefox: '4', safari: '5', edge: '12', opera: '10' }
      },
      {
        id: 'out-of-range',
        name: ':out-of-range',
        syntax: ':out-of-range',
        description: 'یک عنصر <input> را انتخاب می‌کند که مقدار فعلی آن خارج از محدوده مشخص شده توسط ویژگی‌های min و max قرار دارد.',
        example: {
          html: `<input type="number" min="1" max="10" value="15">`,
          css: `input:out-of-range {
  border: 2px solid red;
}`
        },
        browserSupport: { chrome: '10', firefox: '29', safari: '5.1', edge: '13', opera: '11' }
      },
      {
        id: 'placeholder-shown',
        name: ':placeholder-shown',
        syntax: ':placeholder-shown',
        description: 'یک عنصر ورودی را انتخاب می‌کند که در حال نمایش متن placeholder است.',
        example: {
          html: `<input type="text" placeholder="اینجا بنویسید...">`,
          css: `input:placeholder-shown {
  border-color: #f59e0b;
}`
        },
        browserSupport: { chrome: '47', firefox: '51', safari: '9', edge: '13', opera: '34' }
      },
      {
        id: 'read-only',
        name: ':read-only',
        syntax: ':read-only',
        description: 'عناصری را انتخاب می‌کند که توسط کاربر قابل ویرایش نیستند (دارای ویژگی `readonly` یا `disabled`).',
        example: {
          html: `<input type="text" value="فقط خواندنی" readonly>`,
          css: `input:read-only {
  background-color: #f8fafc;
}`
        },
        browserSupport: { chrome: true, firefox: '78', safari: '4', edge: '79', opera: '9' }
      },
       {
        id: 'read-write',
        name: ':read-write',
        syntax: ':read-write',
        description: 'عناصری را انتخاب می‌کند که توسط کاربر قابل ویرایش هستند (مانند <input> هایی که `readonly` یا `disabled` نیستند).',
        example: {
          html: `<input type="text" value="قابل ویرایش">`,
          css: `input:read-write {
  background-color: #f0fdf4;
}`
        },
        browserSupport: { chrome: true, firefox: '78', safari: '4', edge: '79', opera: '9' }
      },
      {
        id: 'required',
        name: ':required',
        syntax: ':required',
        description: 'یک عنصر ورودی را انتخاب می‌کند که ویژگی `required` را دارد.',
        example: {
          html: `<input type="text" required>`,
          css: `input:required {
  border-left: 4px solid #ef4444;
}`
        },
        browserSupport: { chrome: '10', firefox: '4', safari: '5', edge: '12', opera: '10' }
      },
      {
        id: 'root',
        name: ':root',
        syntax: ':root',
        description: 'عنصر ریشه سند را انتخاب می‌کند که در HTML همان تگ <html> است. این شبه-کلاس برای تعریف متغیرهای سفارشی CSS (custom properties) بسیار مفید است.',
        example: {
          html: `<p>این متن از متغیرهای CSS استفاده می‌کند.</p>`,
          css: `:root {
  --main-color: #ef4444;
}
p {
  color: var(--main-color);
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: '4', edge: true, opera: '9.5' }
      },
       {
        id: 'scope',
        name: ':scope',
        syntax: ':scope',
        description: 'نشان‌دهنده عنصری است که به عنوان نقطه شروع برای تطبیق انتخابگرها عمل می‌کند. در یک شیوه‌نامه سراسری، معادل :root است. در جاوااسکریپت با `querySelector`، به عنصری که متد روی آن فراخوانی شده اشاره دارد.',
        example: {
          html: `<div class="container">
  <div class="item">آیتم</div>
</div>`,
          css: `/* در CSS خالص، این معادل :root است */
:scope {
  background-color: #f0f0f0;
}
/* 
  در JS:
  const container = document.querySelector('.container');
  // فقط .item داخل .container را پیدا می‌کند
  const item = container.querySelector(':scope .item');
*/`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
       {
        id: 'target',
        name: ':target',
        syntax: ':target',
        description: 'عنصری را انتخاب می‌کند که `id` آن با بخش fragment آدرس URL فعلی مطابقت دارد (بخش بعد از علامت #).',
        example: {
          html: `<a href="#section1">برو به بخش ۱</a>
<div id="section1">اینجا بخش ۱ است.</div>`,
          css: `div:target {
  background-color: #fefce8;
  border: 2px solid #facc15;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: '9.5' }
      },
      {
        id: 'valid',
        name: ':valid',
        syntax: ':valid',
        description: 'یک عنصر ورودی را انتخاب می‌کند که مقدار آن بر اساس قوانین اعتبارسنجی معتبر است.',
        example: {
          html: `<input type="email" value="test@example.com">`,
          css: `input:valid {
  border: 2px solid green;
}`
        },
        browserSupport: { chrome: '10', firefox: '4', safari: '5', edge: '12', opera: '10' }
      },
      {
        id: 'visited',
        name: ':visited',
        syntax: ':visited',
        description: 'لینک‌هایی را انتخاب می‌کند که کاربر قبلاً از آنها بازدید کرده است. به دلایل امنیتی، فقط ویژگی‌های محدودی مانند color قابل تغییر هستند.',
        example: {
          html: `<a href="#">لینک بازدید شده (مرورگر شما باید این را به یاد داشته باشد)</a>`,
          css: `a:visited {
  color: #8b5cf6;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
      {
        id: 'where',
        name: ':where()',
        syntax: ':where(<selector-list>)',
        description: 'مانند :is() عمل می‌کند، اما هیچ ویژگی (specificity) به انتخابگر اضافه نمی‌کند. این برای نوشتن انتخابگرهایی که به راحتی قابل بازنویسی (override) هستند، عالی است.',
        example: {
          html: `<header><h1>عنوان</h1></header>`,
          css: `/* این انتخابگر ویژگی صفر دارد */
:where(header, main) h1 {
  color: blue;
}
/* این انتخابگر به راحتی بازنویسی می‌شود */
h1 {
  color: red;
}`
        },
        browserSupport: { chrome: '88', firefox: '78', safari: '14', edge: '88', opera: '74' }
      },
    ]
  },
  {
    name: 'شبه-عناصر (Pseudo-elements)',
    description: 'یک کلمه کلیدی است که به یک انتخابگر اضافه می‌شود تا به شما اجازه دهد بخش خاصی از عنصر انتخاب شده را استایل‌دهی کنید. به عنوان مثال، ::first-line می‌تواند برای استایل‌دهی به خط اول یک پاراگراف استفاده شود. آن‌ها با دو علامت دو نقطه (::) مشخص می‌شوند.',
    items: [
      {
        id: 'after',
        name: '::after',
        syntax: '::after',
        description: 'یک شبه‌عنصر ایجاد می‌کند که آخرین فرزند عنصر انتخاب شده است. این نیز با ویژگی `content` استفاده می‌شود.',
        example: {
          html: `<a href="#" class="external-link">لینک خارجی</a>`,
          css: `.external-link::after {
  content: " ↗";
  font-size: 0.8em;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
       {
        id: 'backdrop',
        name: '::backdrop',
        syntax: '::backdrop',
        description: 'یک باکس تمام‌صفحه است که دقیقاً زیر عناصری که در حالت تمام‌صفحه نمایش داده می‌شوند (مانند <dialog> یا ویدئو) قرار می‌گیرد و به شما امکان استایل‌دهی به آن پس‌زمینه را می‌دهد.',
        example: {
          html: `<dialog id="d">برای بستن کلید Esc را بزنید.</dialog>
<script>document.getElementById('d').showModal()</script>`,
          css: `dialog::backdrop {
  background-color: rgba(99, 102, 241, 0.5);
  backdrop-filter: blur(4px);
}`
        },
        browserSupport: { chrome: '37', firefox: '47', safari: '15.4', edge: '79', opera: '24' }
      },
      {
        id: 'before',
        name: '::before',
        syntax: '::before',
        description: 'یک شبه‌عنصر ایجاد می‌کند که اولین فرزند عنصر انتخاب شده است. معمولاً برای اضافه کردن محتوای تزئینی به یک عنصر با ویژگی `content` استفاده می‌شود.',
        example: {
          html: `<p class="decorated">متن اصلی</p>`,
          css: `.decorated::before {
  content: "✨ ";
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
      {
        id: 'cue',
        name: '::cue',
        syntax: '::cue',
        description: 'زیرنویس‌ها و سایر نشانه‌های WebVTT را در عناصر <video> استایل‌دهی می‌کند.',
        example: {
          html: `<!-- برای مشاهده این مثال، به یک فایل ویدئو و یک فایل VTT نیاز است -->`,
          css: `/* استایل برای زیرنویس‌ها */
video::cue {
  background-color: rgba(0, 0, 0, 0.7);
  color: #fefce8;
  font-size: 1.2em;
}`
        },
        browserSupport: { chrome: '34', firefox: '31', safari: '7', edge: '79', opera: '21' }
      },
      {
        id: 'file-selector-button',
        name: '::file-selector-button',
        syntax: '::file-selector-button',
        description: 'دکمه‌ای را که در داخل یک عنصر <input type="file"> قرار دارد، استایل‌دهی می‌کند.',
        example: {
          html: `<input type="file">`,
          css: `input::file-selector-button {
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}
input::file-selector-button:hover {
  background-color: #4f46e5;
}`
        },
        browserSupport: { chrome: '89', firefox: '88', safari: '15.4', edge: '89', opera: '75' }
      },
      {
        id: 'first-letter',
        name: '::first-letter',
        syntax: '::first-letter',
        description: 'اولین حرف از خط اول یک عنصر در سطح بلوک را انتخاب می‌کند.',
        example: {
          html: `<p class="drop-cap">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.</p>`,
          css: `.drop-cap::first-letter {
  font-size: 3em;
  font-weight: bold;
  color: #6366f1;
  float: right;
  margin-left: 0.1em;
  line-height: 1;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
       {
        id: 'first-line',
        name: '::first-line',
        syntax: '::first-line',
        description: 'خط اول یک عنصر در سطح بلوک را انتخاب می‌کند.',
        example: {
          html: `<p class="intro">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است. این خط اول است و باید استایل متفاوتی داشته باشد. بقیه متن به صورت عادی نمایش داده می‌شود.</p>`,
          css: `.intro::first-line {
  font-weight: bold;
  color: #6366f1;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: true }
      },
      {
        id: 'marker',
        name: '::marker',
        syntax: '::marker',
        description: 'نشانگر (marker) آیتم‌های لیست (مانند بولت‌ها یا شماره‌ها) را انتخاب می‌کند.',
        example: {
          html: `<ul>
  <li>آیتم اول</li>
  <li>آیتم دوم</li>
</ul>`,
          css: `li::marker {
  color: #ef4444;
  font-size: 1.2em;
}`
        },
        browserSupport: { chrome: '86', firefox: '68', safari: '11.1', edge: '86', opera: '72' }
      },
       {
        id: 'placeholder',
        name: '::placeholder',
        syntax: '::placeholder',
        description: 'متن placeholder در یک عنصر ورودی (مانند <input> یا <textarea>) را انتخاب می‌کند.',
        example: {
          html: `<input type="text" placeholder="نام کاربری...">`,
          css: `input::placeholder {
  color: #fda4af;
  font-style: italic;
}`
        },
        browserSupport: { chrome: '57', firefox: '51', safari: '10.1', edge: '15', opera: '44' }
      },
      {
        id: 'selection',
        name: '::selection',
        syntax: '::selection',
        description: 'به بخشی از یک سند که توسط کاربر هایلایت شده (با ماوس یا کیبورد) استایل اعمال می‌کند.',
        example: {
          html: `<p>این متن را انتخاب کنید تا استایل هایلایت سفارشی را ببینید.</p>`,
          css: `::selection {
  background-color: #f472b6; /* pink-400 */
  color: white;
}`
        },
        browserSupport: { chrome: true, firefox: true, safari: true, edge: true, opera: '15' }
      },
    ]
  },
];
