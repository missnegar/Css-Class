
import type { ShapePreset } from './types';

export const PRESET_SHAPES: ShapePreset[] = [
  {
    name: 'مربع',
    points: [
      { x: 10, y: 10 },
      { x: 90, y: 10 },
      { x: 90, y: 90 },
      { x: 10, y: 90 },
    ],
  },
   {
    name: 'مستطیل',
    points: [
      { x: 10, y: 25 },
      { x: 90, y: 25 },
      { x: 90, y: 75 },
      { x: 10, y: 75 },
    ],
  },
  {
    name: 'مثلث',
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
  },
    {
    name: 'لوزی',
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 50 },
      { x: 50, y: 100 },
      { x: 0, y: 50 },
    ],
  },
  {
    name: '۶ ضلعی',
    points: [
        { x: 50, y: 0 },
        { x: 93.3, y: 25 },
        { x: 93.3, y: 75 },
        { x: 50, y: 100 },
        { x: 6.7, y: 75 },
        { x: 6.7, y: 25 },
    ],
  },
];
