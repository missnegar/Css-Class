export interface BrowserSupport {
  chrome: string | true;
  firefox: string | true;
  safari: string | true;
  edge: string | true;
  opera: string | true;
}

export interface AtRule {
  id: string;
  name: string;
  description: string;
  syntax: string;
  example: {
    html?: string;
    css: string;
  };
  browserSupport: BrowserSupport;
}

export const AT_RULES_DATA: AtRule[] = [
  {
    id: 'charset',
    name: '@charset',
    description: 'قاعده @charset مجموعه کاراکتر مورد استفاده در یک شیوه‌نامه (stylesheet) را مشخص می‌کند. این قاعده باید اولین عنصر در شیوه‌نامه باشد و هیچ کاراکتری نباید قبل از آن قرار گیرد.',
    syntax: '@charset "UTF-8";',
    example: {
      css: `/* 
  این قاعده باید در ابتدای فایل CSS شما قرار گیرد.
  "UTF-8" یک مجموعه کاراکتر رایج و توصیه شده است.
*/
@charset "UTF-8";

body {
  font-family: sans-serif;
  /* ... بقیه استایل‌ها */
}`,
    },
    browserSupport: {
      chrome: true,
      firefox: true,
      safari: true,
      edge: true,
      opera: true,
    },
  },
  {
    id: 'import',
    name: '@import',
    description: 'قاعده @import به شما اجازه می‌دهد تا یک شیوه‌نامه دیگر را به شیوه‌نامه فعلی وارد (import) کنید. این دستور باید قبل از هر قاعده دیگری به جز @charset قرار گیرد.',
    syntax: '@import url("path/to/stylesheet.css");',
    example: {
      html: `<!-- نیازی به تغییر HTML نیست، این کار در CSS انجام می‌شود. -->
<p class="imported-style">
  این متن با استایلی که از یک فایل دیگر وارد شده، نمایش داده می‌شود.
</p>`,
      css: `/* styles.css */
@import url("typography.css");

body {
  background-color: #f0f0f0;
}
/* 
  محتوای فایل typography.css می‌تواند به شکل زیر باشد:
  .imported-style {
    color: blue;
    font-size: 20px;
  }
*/`,
    },
    browserSupport: {
      chrome: true,
      firefox: true,
      safari: true,
      edge: true,
      opera: true,
    },
  },
  {
    id: 'font-face',
    name: '@font-face',
    description: 'قاعده @font-face به شما اجازه می‌دهد تا یک فونت سفارشی را برای استفاده در وب‌سایت خود تعریف کنید. شما می‌توانید فایل‌های فونت را از سرور خود بارگذاری کرده و به آن‌ها نام دلخواه بدهید.',
    syntax: `@font-face {
  font-family: 'MyCustomFont';
  src: url('path/to/font.woff2') format('woff2');
}`,
    example: {
      html: `<p class="custom-font">این متن با یک فونت سفارشی نمایش داده می‌شود.</p>`,
      css: `@font-face {
  font-family: 'MyVazir';
  src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir-Regular.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

.custom-font {
  font-family: 'MyVazir', sans-serif;
  font-size: 24px;
}`,
    },
    browserSupport: {
      chrome: true,
      firefox: true,
      safari: '3.1',
      edge: true,
      opera: '10.1',
    },
  },
  {
    id: 'keyframes',
    name: '@keyframes',
    description: 'قاعده @keyframes برای تعریف مراحل یک انیمیشن CSS استفاده می‌شود. شما می‌توانید با تعیین نقاط (stops) مختلف (از 0% تا 100% یا from و to)، استایل یک عنصر را در طول انیمیشن تغییر دهید.',
    syntax: `@keyframes animation-name {
  from { /* CSS properties */ }
  to { /* CSS properties */ }
}`,
    example: {
      html: `<div class="animated-box"></div>`,
      css: `@keyframes slide-in {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated-box {
  width: 100px;
  height: 100px;
  background-color: dodgerblue;
  animation-name: slide-in;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}`,
    },
    browserSupport: {
      chrome: true,
      firefox: '16',
      safari: '9',
      edge: true,
      opera: '15',
    },
  },
  {
    id: 'media',
    name: '@media',
    description: 'قاعده @media برای اعمال بلوک‌های CSS فقط در شرایطی که یک شرط خاص (media query) برقرار باشد، استفاده می‌شود. این قاعده اساس طراحی واکنش‌گرا (Responsive Design) است و به شما اجازه می‌دهد تا استایل‌های متفاوتی برای اندازه‌های مختلف صفحه، دستگاه‌های چاپ و ... تعریف کنید.',
    syntax: `@media screen and (max-width: 600px) {
  /* CSS rules */
}`,
    example: {
      html: `<div class="responsive-box">
  اندازه این باکس در صفحات کوچک تغییر می‌کند.
</div>`,
      css: `.responsive-box {
  background-color: lightgreen;
  padding: 20px;
  font-size: 18px;
}

/* 
  اگر عرض صفحه نمایش 600 پیکسل یا کمتر باشد، 
  استایل‌های زیر اعمال می‌شوند.
*/
@media screen and (max-width: 600px) {
  .responsive-box {
    background-color: lightblue;
    font-size: 14px;
  }
}`,
    },
    browserSupport: {
      chrome: true,
      firefox: '3.5',
      safari: '4',
      edge: true,
      opera: '9.5',
    },
  },
];
