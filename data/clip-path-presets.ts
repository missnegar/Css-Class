import type { Point } from '../types';
import TriangleIcon from '../components/icons/TriangleIcon';
import StarIcon from '../components/icons/StarIcon';
import RhombusIcon from '../components/icons/RhombusIcon';
import CrossIcon from '../components/icons/CrossIcon';
import React from 'react';

export interface PolygonPreset {
  name: string;
  points: Point[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const PRESET_POLYGONS: PolygonPreset[] = [
  { 
    name: 'مثلث',
    icon: TriangleIcon,
    points: [ { x: 50, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 } ] 
  },
  { 
    name: 'لوزی',
    icon: RhombusIcon,
    points: [ { x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 } ] 
  },
  { 
    name: 'ستاره',
    icon: StarIcon,
    points: [ { x: 50, y: 0 }, { x: 61, y: 35 }, { x: 98, y: 35 }, { x: 68, y: 57 }, { x: 79, y: 91 }, { x: 50, y: 70 }, { x: 21, y: 91 }, { x: 32, y: 57 }, { x: 2, y: 35 }, { x: 39, y: 35 } ] 
  },
  { 
    name: 'صلیب',
    icon: CrossIcon,
    points: [ { x: 20, y: 0 }, { x: 80, y: 0 }, { x: 80, y: 20 }, { x: 100, y: 20 }, { x: 100, y: 80 }, { x: 80, y: 80 }, { x: 80, y: 100 }, { x: 20, y: 100 }, { x: 20, y: 80 }, { x: 0, y: 80 }, { x: 0, y: 20 }, { x: 20, y: 20 } ] 
  },
  {
    name: '۶ ضلعی',
    icon: (props) => React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('path', { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" })
    ),
    points: [ { x: 50, y: 0 }, { x: 100, y: 25 }, { x: 100, y: 75 }, { x: 50, y: 100 }, { x: 0, y: 75 }, { x: 0, y: 25 } ]
  },
  {
    name: 'پیکان چپ',
    icon: (props) => React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('path', { d: "M11 17l-5-5 5-5" }),
      React.createElement('path', { d: "M18 17l-5-5 5-5" })
    ),
    points: [ { x: 100, y: 0 }, { x: 25, y: 50 }, { x: 100, y: 100 }, { x: 75, y: 50 } ]
  },
  {
    name: 'قاب',
    icon: (props) => React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('rect', { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
      React.createElement('rect', { x: "7", y: "7", width: "10", height: "10", rx: "2", ry: "2" })
    ),
    points: [ { x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }, { x: 0, y: 0 }, { x: 20, y: 20 }, { x: 20, y: 80 }, { x: 80, y: 80 }, { x: 80, y: 20 }, { x: 20, y: 20 } ]
  },
  {
    name: 'پیام',
    icon: (props) => React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('path', { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
    ),
    points: [ { x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 75 }, { x: 75, y: 75 }, { x: 75, y: 100 }, { x: 50, y: 75 }, { x: 0, y: 75 } ]
  },
];
