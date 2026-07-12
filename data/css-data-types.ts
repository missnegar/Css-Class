export interface DataTypeExample {
  value: string;
  description: string;
  css: string;
}

export interface DataType {
  id: string;
  name: string;
  description: string;
  examples: DataTypeExample[];
}

export interface DataTypeCategory {
    name: string;
    types: DataType[];
}

export const DATA_TYPE_CATEGORIES: DataTypeCategory[] = [
    {
        name: 'مقادیر عددی و ابعاد',
        types: [
            {
                id: 'length',
                name: '<length>',
                description: 'یک مقدار فاصله را نشان می‌دهد. این یکی از پرکاربردترین انواع داده در CSS است و برای تعیین اندازه، حاشیه، padding و غیره استفاده می‌شود.',
                examples: [
                    { value: '10px', description: 'پیکسل: یک واحد مطلق که به پیکسل‌های صفحه نمایش اشاره دارد.', css: 'width: 10px;' },
                    { value: '1.2em', description: 'em: یک واحد نسبی بر اساس اندازه فونت عنصر والد.', css: 'font-size: 1.2em;' },
                    { value: '1.5rem', description: 'rem: یک واحد نسبی بر اساس اندازه فونت عنصر ریشه (root).', css: 'padding: 1.5rem;' },
                    { value: '50vw', description: 'vw (Viewport Width): یک درصد از عرض کامل viewport.', css: 'width: 50vw;' },
                    { value: '25%', description: 'درصد: نسبی به اندازه عنصر والد.', css: 'height: 25%;' },
                    { value: 'auto', description: 'مقدار خودکار که توسط مرورگر محاسبه می‌شود.', css: 'margin-left: auto;' },
                ]
            },
            {
                id: 'percentage',
                name: '<percentage>',
                description: 'یک مقدار درصدی را نشان می‌دهد که همیشه نسبت به یک مقدار دیگر محاسبه می‌شود، معمولاً اندازه عنصر والد.',
                examples: [
                    { value: '75%', description: '75 درصد از مقدار مرجع (مثلاً عرض والد).', css: 'width: 75%;' },
                    { value: '150%', description: '150 درصد، که بزرگتر از مقدار مرجع است.', css: 'transform: scale(150%);' },
                ]
            },
            {
                id: 'integer',
                name: '<integer>',
                description: 'یک عدد صحیح، مثبت یا منفی، بدون بخش اعشاری.',
                examples: [
                    { value: '10', description: 'یک عدد صحیح مثبت.', css: 'z-index: 10;' },
                    { value: '-1', description: 'یک عدد صحیح منفی.', css: 'order: -1;' },
                ]
            },
            {
                id: 'number',
                name: '<number>',
                description: 'یک عدد صحیح یا اعشاری، مثبت یا منفی.',
                examples: [
                    { value: '1.5', description: 'یک عدد اعشاری.', css: 'line-height: 1.5;' },
                    { value: '300', description: 'یک عدد صحیح که به عنوان عدد اعشاری نیز معتبر است.', css: 'font-weight: 300;' },
                ]
            },
            {
                id: 'angle',
                name: '<angle>',
                description: 'یک مقدار زاویه را نشان می‌دهد که در چرخش‌ها و گرادیانت‌ها استفاده می‌شود.',
                examples: [
                    { value: '45deg', description: 'درجه (Degrees): رایج‌ترین واحد زاویه.', css: 'transform: rotate(45deg);' },
                    { value: '0.25turn', description: 'دور (Turns): یک دور کامل برابر با 360 درجه است.', css: 'transform: rotate(0.25turn); /* معادل 90 درجه */' },
                    { value: '1.57rad', description: 'رادیان (Radians): یک دایره کامل 2π رادیان است.', css: 'transform: rotate(1.57rad); /* تقریبا 90 درجه */' },
                ]
            },
            {
                id: 'time',
                name: '<time>',
                description: 'یک مقدار زمان را برای انیمیشن‌ها و transitionها نشان می‌دهد.',
                examples: [
                    { value: '2s', description: 'ثانیه (Seconds).', css: 'transition-duration: 2s;' },
                    { value: '500ms', description: 'میلی‌ثانیه (Milliseconds). 1000ms برابر با 1s است.', css: 'animation-delay: 500ms;' },
                ]
            },
        ]
    },
    {
        name: 'رنگ و تصویر',
        types: [
            {
                id: 'color',
                name: '<color>',
                description: 'یک رنگ را با استفاده از کلمات کلیدی، کدهای HEX، مقادیر RGB یا HSL تعریف می‌کند.',
                examples: [
                    { value: 'red', description: 'نام رنگ از پیش تعریف شده.', css: 'color: red;' },
                    { value: '#ff0000', description: 'کد هگزادسیمال (HEX).', css: 'background-color: #ff0000;' },
                    { value: 'rgb(255, 0, 0)', description: 'مقدار RGB (Red, Green, Blue).', css: 'border-color: rgb(255, 0, 0);' },
                    { value: 'rgba(255, 0, 0, 0.5)', description: 'مقدار RGBA با کانال آلفا (شفافیت).', css: 'background-color: rgba(255, 0, 0, 0.5);' },
                ]
            },
            {
                id: 'image',
                name: '<image>',
                description: 'یک تصویر را نشان می‌دهد که می‌تواند یک URL یا یک گرادیانت باشد.',
                examples: [
                    { value: 'url("path/to/image.jpg")', description: 'آدرس یک فایل تصویر.', css: 'background-image: url("image.jpg");' },
                    { value: 'linear-gradient(blue, pink)', description: 'یک گرادیانت خطی که به عنوان تصویر در نظر گرفته می‌شود.', css: 'background-image: linear-gradient(blue, pink);' },
                ]
            },
        ]
    },
    {
        name: 'مقادیر متنی',
        types: [
            {
                id: 'string',
                name: '<string>',
                description: 'یک رشته متنی که باید داخل کوتیشن تکی یا دوتایی قرار گیرد.',
                examples: [
                    { value: '"Vazirmatn"', description: 'نام یک فونت.', css: 'font-family: "Vazirmatn", sans-serif;' },
                    { value: '"Hello World!"', description: 'محتوای متنی که توسط شبه‌عنصرها استفاده می‌شود.', css: 'content: "Hello World!";' },
                ]
            },
             {
                id: 'url',
                name: '<url>',
                description: 'یک اشاره‌گر به یک منبع، مانند تصویر، فونت یا شیوه‌نامه.',
                examples: [
                    { value: 'url("image.png")', description: 'آدرس یک تصویر برای پس‌زمینه.', css: 'background: url("image.png");' },
                    { value: 'url("https://.../font.woff2")', description: 'آدرس یک فونت برای @font-face.', css: "src: url('https://.../font.woff2');" },
                ]
            },
        ]
    },
];
