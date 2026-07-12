export interface CssUnit {
  unit: string;
  name: string;
  type: 'مطلق' | 'نسبی';
  description: string;
}

export const CSS_UNITS_DATA: CssUnit[] = [
  // Absolute Units
  { unit: 'px', name: 'Pixels', type: 'مطلق', description: 'پیکسل. یک واحد ثابت نسبت به صفحه نمایش.' },
  { unit: 'cm', name: 'Centimeters', type: 'مطلق', description: 'سانتی‌متر.' },
  { unit: 'mm', name: 'Millimeters', type: 'مطلق', description: 'میلی‌متر.' },
  { unit: 'in', name: 'Inches', type: 'مطلق', description: 'اینچ (هر اینچ = 96 پیکسل).' },
  { unit: 'pt', name: 'Points', type: 'مطلق', description: 'پوینت (هر اینچ = 72 پوینت).' },
  { unit: 'pc', name: 'Picas', type: 'مطلق', description: 'پایکا (هر پایکا = 12 پوینت).' },

  // Relative Units
  { unit: 'em', name: 'Em', type: 'نسبی', description: 'نسبت به اندازه فونت عنصر والد.' },
  { unit: 'rem', name: 'Root Em', type: 'نسبی', description: 'نسبت به اندازه فونت عنصر ریشه (<html>).' },
  { unit: '%', name: 'Percentage', type: 'نسبی', description: 'نسبت به اندازه عنصر والد.' },
  { unit: 'vw', name: 'Viewport Width', type: 'نسبی', description: '۱٪ از عرض viewport.' },
  { unit: 'vh', name: 'Viewport Height', type: 'نسبی', description: '۱٪ از ارتفاع viewport.' },
  { unit: 'vmin', name: 'Viewport Minimum', type: 'نسبی', description: '۱٪ از بعد کوچکتر viewport (عرض یا ارتفاع).' },
  { unit: 'vmax', name: 'Viewport Maximum', type: 'نسبی', description: '۱٪ از بعد بزرگتر viewport (عرض یا ارتفاع).' },
  { unit: 'ch', name: 'Character unit', type: 'نسبی', description: 'عرض کاراکتر "0" در فونت فعلی.' },
  { unit: 'ex', name: 'x-height', type: 'نسبی', description: 'ارتفاع حرف "x" در فونت فعلی.' },
];
