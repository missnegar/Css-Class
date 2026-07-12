import type { KeyframeProperties } from '../types';

// A simplified keyframe for presets. Note: does not include color.
export interface KeyframePreset {
    stop: number;
    properties: Partial<Omit<KeyframeProperties, 'backgroundColor'>>;
}

export interface AnimationPreset {
    name: string; // "Blink - Fast"
    value: string; // "blink-fast"
    keyframes: KeyframePreset[];
}

export interface AnimationPresetCategory {
    name: string; // "Blink"
    presets: AnimationPreset[];
}

export const PRESET_ANIMATIONS: AnimationPresetCategory[] = [
  {
    name: 'Blink',
    presets: [
      { name: 'Blink - Fast', value: 'blink-fast', keyframes: [
        { stop: 0, properties: { opacity: 1 } },
        { stop: 50, properties: { opacity: 0 } },
        { stop: 100, properties: { opacity: 1 } },
      ]},
      { name: 'Blink - Slow', value: 'blink-slow', keyframes: [
        { stop: 0, properties: { opacity: 1 } },
        { stop: 40, properties: { opacity: 0.2 } },
        { stop: 100, properties: { opacity: 1 } },
      ]},
    ]
  },
  {
    name: 'Bounce',
    presets: [
       { name: 'Bounce - Top', value: 'bounce-top', keyframes: [
            { stop: 0, properties: { translateY: 0 } },
            { stop: 20, properties: { translateY: 0 } },
            { stop: 40, properties: { translateY: -30 } },
            { stop: 50, properties: { translateY: 0 } },
            { stop: 60, properties: { translateY: -15 } },
            { stop: 80, properties: { translateY: 0 } },
            { stop: 100, properties: { translateY: 0 } },
       ]},
       { name: 'Bounce - Bottom', value: 'bounce-bottom', keyframes: [
            { stop: 0, properties: { translateY: 0 } },
            { stop: 20, properties: { translateY: 0 } },
            { stop: 40, properties: { translateY: 30 } },
            { stop: 50, properties: { translateY: 0 } },
            { stop: 60, properties: { translateY: 15 } },
            { stop: 80, properties: { translateY: 0 } },
            { stop: 100, properties: { translateY: 0 } },
       ]},
    ]
  },
  {
    name: 'Pulse',
    presets: [
      { name: 'Pulse - Regular', value: 'pulse-regular', keyframes: [
        { stop: 0, properties: { scale: 1 } },
        { stop: 50, properties: { scale: 1.1 } },
        { stop: 100, properties: { scale: 1 } },
      ]},
      { name: 'Pulse - Heartbeat', value: 'pulse-heartbeat', keyframes: [
        { stop: 0, properties: { scale: 1 } },
        { stop: 14, properties: { scale: 1.3 } },
        { stop: 28, properties: { scale: 1 } },
        { stop: 42, properties: { scale: 1.3 } },
        { stop: 70, properties: { scale: 1 } },
      ]},
    ]
  },
  {
    name: 'Rotate',
    presets: [
      { name: 'Rotate - Center', value: 'rotate-center', keyframes: [
        { stop: 0, properties: { rotate: 0 } },
        { stop: 100, properties: { rotate: 360 } },
      ]},
    ]
  },
  {
    name: 'Scale Up',
    presets: [
       { name: 'Scale Up - Center', value: 'scale-up-center', keyframes: [
        { stop: 0, properties: { scale: 0.5, opacity: 0 } },
        { stop: 100, properties: { scale: 1, opacity: 1 } },
      ]},
    ]
  },
   {
    name: 'Scale Down',
    presets: [
       { name: 'Scale Down - Center', value: 'scale-down-center', keyframes: [
        { stop: 0, properties: { scale: 1, opacity: 1 } },
        { stop: 100, properties: { scale: 0.5, opacity: 0 } },
      ]},
    ]
  },
  {
    name: 'Shake',
    presets: [
      { name: 'Shake - Horizontal', value: 'shake-horizontal', keyframes: [
        { stop: 0, properties: { translateX: 0 } },
        { stop: 10, properties: { translateX: -10 } },
        { stop: 20, properties: { translateX: 10 } },
        { stop: 30, properties: { translateX: -10 } },
        { stop: 40, properties: { translateX: 10 } },
        { stop: 50, properties: { translateX: -10 } },
        { stop: 60, properties: { translateX: 10 } },
        { stop: 70, properties: { translateX: -10 } },
        { stop: 80, properties: { translateX: 10 } },
        { stop: 90, properties: { translateX: -10 } },
        { stop: 100, properties: { translateX: 0 } },
      ]},
       { name: 'Shake - Vertical', value: 'shake-vertical', keyframes: [
        { stop: 0, properties: { translateY: 0 } },
        { stop: 10, properties: { translateY: -10 } },
        { stop: 20, properties: { translateY: 10 } },
        { stop: 30, properties: { translateY: -10 } },
        { stop: 40, properties: { translateY: 10 } },
        { stop: 50, properties: { translateY: -10 } },
        { stop: 60, properties: { translateY: 10 } },
        { stop: 70, properties: { translateY: -10 } },
        { stop: 80, properties: { translateY: 10 } },
        { stop: 90, properties: { translateY: -10 } },
        { stop: 100, properties: { translateY: 0 } },
      ]},
    ]
  },
  {
    name: 'Slide',
    presets: [
      { name: 'Slide - Top', value: 'slide-top', keyframes: [
        { stop: 0, properties: { translateY: -100, opacity: 0 } },
        { stop: 100, properties: { translateY: 0, opacity: 1 } },
      ]},
      { name: 'Slide - Bottom', value: 'slide-bottom', keyframes: [
        { stop: 0, properties: { translateY: 100, opacity: 0 } },
        { stop: 100, properties: { translateY: 0, opacity: 1 } },
      ]},
      { name: 'Slide - Left', value: 'slide-left', keyframes: [
        { stop: 0, properties: { translateX: -100, opacity: 0 } },
        { stop: 100, properties: { translateX: 0, opacity: 1 } },
      ]},
      { name: 'Slide - Right', value: 'slide-right', keyframes: [
        { stop: 0, properties: { translateX: 100, opacity: 0 } },
        { stop: 100, properties: { translateX: 0, opacity: 1 } },
      ]},
    ]
  },
  {
    name: 'Wobble',
    presets: [
       { name: 'Wobble - Top', value: 'wobble-top', keyframes: [
        { stop: 0, properties: { translateY: 0, rotate: 0 } },
        { stop: 15, properties: { translateY: -30, rotate: -5 } },
        { stop: 30, properties: { translateY: 0, rotate: 3 } },
        { stop: 45, properties: { translateY: -15, rotate: -3 } },
        { stop: 60, properties: { translateY: 0, rotate: 2 } },
        { stop: 75, properties: { translateY: -5, rotate: -1 } },
        { stop: 100, properties: { translateY: 0, rotate: 0 } },
      ]},
    ]
  },
];
