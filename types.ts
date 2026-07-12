
export interface Point {
  x: number;
  y: number;
}

export interface ShapePreset {
  name: string;
  points: Point[];
}

export interface GradientConfig {
    angle: number;
    startColor: string;
    endColor: string;
}

export interface BlobConfig {
    carve: number;
    seed: number;
}

export interface PolygonConfig {
    cornerRadius: number;
    cornerStyle: 'convex' | 'concave';
}

export interface KeyframeProperties {
  translateX: number;
  translateY: number;
  scale: number;
  rotate: number;
  opacity: number;
  backgroundColor: string;
  borderRadius: number;
}

export interface Keyframe {
  id: number;
  stop: number;
  properties: KeyframeProperties;
}
