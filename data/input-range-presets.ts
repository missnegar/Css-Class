type ThumbShape = 'circle' | 'square';

export interface RangePreset {
    name: string;
    progress: boolean;
    tooltip: boolean;
    styles: {
        trackHeight: number;
        trackBg: string;
        trackProgressBg: string;
        trackBorderRadius: number;
        thumbSize: number;
        thumbShape: ThumbShape;
        thumbBg: string;
        thumbShadow: string;
    }
}

export const PRESETS: RangePreset[] = [
    {
        name: 'استاندارد',
        progress: true,
        tooltip: false,
        styles: {
            trackHeight: 8,
            trackBg: '#d1d5db',
            trackProgressBg: '#6366f1',
            trackBorderRadius: 4,
            thumbSize: 20,
            thumbShape: 'circle',
            thumbBg: '#4f46e5',
            thumbShadow: '0 0 5px rgba(0,0,0,0.3)',
        }
    },
    {
        name: 'مینیمال',
        progress: true,
        tooltip: false,
        styles: {
            trackHeight: 4,
            trackBg: '#e5e7eb',
            trackProgressBg: '#3b82f6',
            trackBorderRadius: 2,
            thumbSize: 16,
            thumbShape: 'circle',
            thumbBg: '#3b82f6',
            thumbShadow: 'none',
        }
    },
    {
        name: 'با Tooltip',
        progress: true,
        tooltip: true,
        styles: {
            trackHeight: 6,
            trackBg: '#9ca3af',
            trackProgressBg: '#ec4899',
            trackBorderRadius: 3,
            thumbSize: 18,
            thumbShape: 'circle',
            thumbBg: '#ec4899',
            thumbShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }
    },
    {
        name: 'مربعی',
        progress: true,
        tooltip: false,
        styles: {
            trackHeight: 10,
            trackBg: '#f3f4f6',
            trackProgressBg: '#10b981',
            trackBorderRadius: 0,
            thumbSize: 22,
            thumbShape: 'square',
            thumbBg: '#059669',
            thumbShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }
    },
    {
        name: 'فلت',
        progress: false,
        tooltip: false,
        styles: {
            trackHeight: 12,
            trackBg: '#cbd5e1',
            trackProgressBg: '#6366f1',
            trackBorderRadius: 6,
            thumbSize: 12,
            thumbShape: 'circle',
            thumbBg: '#4338ca',
            thumbShadow: 'none',
        }
    },
    {
        name: 'ظریف',
        progress: true,
        tooltip: true,
        styles: {
            trackHeight: 2,
            trackBg: '#e2e8f0',
            trackProgressBg: '#f59e0b',
            trackBorderRadius: 1,
            thumbSize: 14,
            thumbShape: 'circle',
            thumbBg: '#ffffff',
            thumbShadow: '0 0 0 2px #f59e0b',
        }
    },
];
