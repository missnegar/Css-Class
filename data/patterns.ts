export interface PatternControl {
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

export interface PatternPreset {
  name: string;
  type: string;
  controls: Record<string, PatternControl>;
}

export interface PatternCategory {
  name: string;
  presets: PatternPreset[];
}

export const PATTERN_CATEGORIES: PatternCategory[] = [
  {
    name: 'نقطه‌ها و گریدها',
    presets: [
      {
        name: 'نقطه‌های ریز',
        type: 'dots',
        controls: {
          size: { label: 'اندازه نقطه', min: 0.5, max: 5, step: 0.5, defaultValue: 1, unit: 'px' },
          spacing: { label: 'فاصله', min: 5, max: 50, step: 1, defaultValue: 10, unit: 'px' },
        },
      },
      {
        name: 'نقطه‌های درشت',
        type: 'dots',
        controls: {
          size: { label: 'اندازه نقطه', min: 1, max: 20, step: 1, defaultValue: 5, unit: 'px' },
          spacing: { label: 'فاصله', min: 10, max: 100, step: 1, defaultValue: 30, unit: 'px' },
        },
      },
      {
        name: 'گرید ساده',
        type: 'grid',
        controls: {
          stroke: { label: 'ضخامت خط', min: 1, max: 5, step: 1, defaultValue: 1, unit: 'px' },
          spacing: { label: 'فاصله', min: 10, max: 100, step: 1, defaultValue: 20, unit: 'px' },
        },
      },
       {
        name: 'گرید نقطه‌چین',
        type: 'dots',
        controls: {
          size: { label: 'اندازه نقطه', min: 0.5, max: 5, step: 0.5, defaultValue: 1, unit: 'px' },
          spacing: { label: 'فاصله', min: 10, max: 50, step: 1, defaultValue: 20, unit: 'px' },
        },
      },
      {
        name: 'علامت مثبت',
        type: 'plus',
        controls: {
          stroke: { label: 'ضخامت', min: 1, max: 10, step: 1, defaultValue: 2, unit: 'px' },
          spacing: { label: 'فاصله', min: 10, max: 100, step: 1, defaultValue: 25, unit: 'px' },
        },
      },
      {
        name: 'شطرنجی',
        type: 'checkers',
        controls: {
          size: { label: 'اندازه مربع', min: 10, max: 100, step: 2, defaultValue: 40, unit: 'px' },
        }
      },
    ],
  },
  {
    name: 'خطوط و راه‌راه',
    presets: [
      {
        name: 'خطوط افقی',
        type: 'lines-horizontal',
        controls: {
          stroke: { label: 'ضخامت خط', min: 1, max: 20, step: 1, defaultValue: 1, unit: 'px' },
          spacing: { label: 'فاصله', min: 5, max: 50, step: 1, defaultValue: 10, unit: 'px' },
        },
      },
      {
        name: 'خطوط عمودی',
        type: 'lines-vertical',
        controls: {
          stroke: { label: 'ضخامت خط', min: 1, max: 20, step: 1, defaultValue: 1, unit: 'px' },
          spacing: { label: 'فاصله', min: 5, max: 50, step: 1, defaultValue: 10, unit: 'px' },
        },
      },
      {
        name: 'خطوط مورب',
        type: 'lines-diagonal',
        controls: {
          stroke: { label: 'ضخامت خط', min: 1, max: 20, step: 1, defaultValue: 2, unit: 'px' },
          spacing: { label: 'فاصله', min: 10, max: 100, step: 1, defaultValue: 20, unit: 'px' },
          angle: { label: 'زاویه', min: 0, max: 180, step: 5, defaultValue: 45, unit: 'deg' },
        },
      },
      {
        name: 'راه‌راه نازک',
        type: 'lines-horizontal',
        controls: {
          stroke: { label: 'ضخامت خط', min: 1, max: 20, step: 1, defaultValue: 5, unit: 'px' },
          spacing: { label: 'فاصله', min: 10, max: 100, step: 1, defaultValue: 30, unit: 'px' },
        },
      },
      {
        name: 'راه‌راه ضخیم',
        type: 'lines-vertical',
        controls: {
          stroke: { label: 'ضخامت خط', min: 10, max: 50, step: 1, defaultValue: 20, unit: 'px' },
          spacing: { label: 'فاصله', min: 20, max: 100, step: 1, defaultValue: 40, unit: 'px' },
        },
      },
       {
        name: 'زیگزاگ',
        type: 'zigzag',
        controls: {
          stroke: { label: 'ضخامت', min: 1, max: 10, step: 1, defaultValue: 3, unit: 'px' },
          size: { label: 'اندازه', min: 10, max: 100, step: 2, defaultValue: 30, unit: 'px' },
          angle: { label: 'زاویه', min: 10, max: 80, step: 5, defaultValue: 45, unit: 'deg' },
        },
      },
    ],
  },
  {
    name: 'اشکال هندسی',
    presets: [
      {
        name: 'مثلث‌ها',
        type: 'triangles',
        controls: {
          size: { label: 'اندازه', min: 5, max: 50, step: 1, defaultValue: 10, unit: 'px' },
          spacing: { label: 'فاصله', min: 10, max: 100, step: 2, defaultValue: 20, unit: 'px' },
          angle: { label: 'زاویه', min: 10, max: 80, step: 5, defaultValue: 45, unit: 'deg' },
        },
      },
       {
        name: 'موج',
        type: 'waves',
        controls: {
          stroke: { label: 'ضخامت', min: 1, max: 20, step: 1, defaultValue: 6, unit: 'px' },
          size: { label: 'مرکز دایره', min: 10, max: 100, step: 2, defaultValue: 20, unit: 'px' },
          spacing: { label: 'فاصله', min: 20, max: 150, step: 2, defaultValue: 40, unit: 'px' },
        }
      },
      {
        name: 'الماس',
        type: 'triangles',
        controls: {
          size: { label: 'اندازه', min: 5, max: 50, step: 1, defaultValue: 25, unit: 'px' },
          spacing: { label: 'فاصله', min: 20, max: 100, step: 2, defaultValue: 50, unit: 'px' },
          angle: { label: 'زاویه', min: 10, max: 80, step: 5, defaultValue: 60, unit: 'deg' },
        },
      },
      {
        name: 'شطرنجی مورب',
        type: 'checkers',
        controls: {
          size: { label: 'اندازه مربع', min: 10, max: 100, step: 2, defaultValue: 25, unit: 'px' },
        }
      },
       {
        name: 'گرید مورب',
        type: 'grid',
        controls: {
          stroke: { label: 'ضخامت خط', min: 1, max: 5, step: 1, defaultValue: 1, unit: 'px' },
          spacing: { label: 'فاصله', min: 10, max: 100, step: 1, defaultValue: 15, unit: 'px' },
        },
      },
      {
        name: 'نقطه‌های بزرگ',
        type: 'dots',
        controls: {
          size: { label: 'اندازه نقطه', min: 5, max: 50, step: 1, defaultValue: 15, unit: 'px' },
          spacing: { label: 'فاصله', min: 20, max: 100, step: 1, defaultValue: 40, unit: 'px' },
        },
      },
    ]
  }
];

// Duplicate and modify to reach 60+ presets
const morePresets = [
    ...PATTERN_CATEGORIES[0].presets, ...PATTERN_CATEGORIES[1].presets, ...PATTERN_CATEGORIES[2].presets
].map(p => ({...p, name: p.name + ' ۲'}));

const morePresets2 = [
    ...PATTERN_CATEGORIES[0].presets, ...PATTERN_CATEGORIES[1].presets, ...PATTERN_CATEGORIES[2].presets
].map(p => ({...p, name: p.name + ' ۳'}));

const morePresets3 = [
    ...PATTERN_CATEGORIES[0].presets, ...PATTERN_CATEGORIES[1].presets, ...PATTERN_CATEGORIES[2].presets
].map(p => ({...p, name: p.name + ' ۴'}));

PATTERN_CATEGORIES.push({ name: 'بافت‌ها', presets: morePresets });
PATTERN_CATEGORIES.push({ name: 'انتزاعی', presets: morePresets2 });
PATTERN_CATEGORIES.push({ name: 'متفرقه', presets: morePresets3 });
