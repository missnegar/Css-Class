export interface FilterValues {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  'hue-rotate': number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
}

export interface DropShadowValues {
    hOffset: number;
    vOffset: number;
    blur: number;
    color: string;
}

export interface FilterPreset {
  name: string;
  filters: Partial<FilterValues>;
  dropShadow?: Partial<DropShadowValues>;
}

export const PRESETS: FilterPreset[] = [
  {
    name: '1977',
    filters: { contrast: 110, brightness: 110, saturate: 130 },
  },
  {
    name: 'Clarendon',
    filters: { contrast: 120, saturate: 125 },
  },
  {
    name: 'Gingham',
    filters: { brightness: 105, 'hue-rotate': 350 },
  },
  {
    name: 'Moon',
    filters: { grayscale: 100, contrast: 110, brightness: 110 },
  },
  {
    name: 'Perpetua',
    filters: { 'hue-rotate': 340, saturate: 110, contrast: 90 },
  },
  {
    name: 'Reyes',
    filters: { sepia: 22, brightness: 110, contrast: 85, saturate: 75 },
  },
  {
    name: 'Slumber',
    filters: { saturate: 66, brightness: 105 },
  },
  {
    name: 'Stinson',
    filters: { contrast: 75, saturate: 85, brightness: 115 },
  },
];
