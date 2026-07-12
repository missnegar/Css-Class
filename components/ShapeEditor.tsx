import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import type { Point, GradientConfig, BlobConfig, PolygonConfig } from '../types';
import { PRESET_SHAPES } from '../constants';
import ControlPanel from './ControlPanel';
import CodeOutputFooter from './CodeOutputFooter';
import ResizablePanels from './ResizablePanels';

const generateSvgPath = (points: Point[], radius: number, cornerStyle: 'convex' | 'concave'): string => {
  if (points.length < 3) return "M 0 0";
  if (radius <= 0) {
      return "M " + points.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ") + " Z";
  }

  const commands = [];
  const numPoints = points.length;

  for (let i = 0; i < numPoints; i++) {
      const p1 = points[(i + numPoints - 1) % numPoints];
      const p2 = points[i];
      const p3 = points[(i + 1) % numPoints];

      const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
      const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

      const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
      
      const clampedRadius = Math.min(radius, len1 / 2, len2 / 2);

      const norm1 = { x: v1.x / len1, y: v1.y / len1 };
      const norm2 = { x: v2.x / len2, y: v2.y / len2 };

      const point_on_v1 = { x: p2.x + norm1.x * clampedRadius, y: p2.y + norm1.y * clampedRadius };
      const point_on_v2 = { x: p2.x + norm2.x * clampedRadius, y: p2.y + norm2.y * clampedRadius };
      
      const crossProduct = v1.x * v2.y - v1.y * v2.x;
      let sweepFlag = crossProduct > 0 ? 1 : 0;
      if (cornerStyle === 'concave') {
        sweepFlag = 1 - sweepFlag;
      }
      
      if (i === 0) {
           commands.push(`M ${point_on_v1.x.toFixed(1)} ${point_on_v1.y.toFixed(1)}`);
      } else {
           commands.push(`L ${point_on_v1.x.toFixed(1)} ${point_on_v1.y.toFixed(1)}`);
      }
      
      commands.push(`A ${clampedRadius.toFixed(1)} ${clampedRadius.toFixed(1)} 0 0 ${sweepFlag} ${point_on_v2.x.toFixed(1)} ${point_on_v2.y.toFixed(1)}`);
  }

  commands.push("Z");
  return commands.join(" ");
}

const ShapeEditor: React.FC = () => {
  const [shapeMode, setShapeMode] = useState<'polygon' | 'blob'>('polygon');
  
  // Polygon state
  const [points, setPoints] = useState<Point[]>(PRESET_SHAPES[0].points);
  const [draggingPointIndex, setDraggingPointIndex] = useState<number | null>(null);
  const [polygonConfig, setPolygonConfig] = useState<PolygonConfig>({ cornerRadius: 0, cornerStyle: 'convex' });

  // Blob state
  const [blobConfig, setBlobConfig] = useState<BlobConfig>({ carve: 5, seed: Math.floor(Math.random() * 1000) });
  const [borderRadius, setBorderRadius] = useState<string>('');

  // Shared state
  const [gradient, setGradient] = useState<GradientConfig>({
    angle: 90,
    startColor: '#6366f1',
    endColor: '#ec4899',
  });
  const [rotation, setRotation] = useState<number>(0);

  const canvasRef = useRef<HTMLDivElement>(null);
  const shapePreviewRef = useRef<HTMLDivElement>(null);

  const generateBorderRadius = useCallback(() => {
    const seed = blobConfig.seed;
    const carve = blobConfig.carve; // 0-10

    const prng = (seedValue: number) => {
        const x = Math.sin(seedValue) * 10000;
        return x - Math.floor(x);
    };

    const deviation = carve * 4.0; // max deviation 40
    const randomValue = (index: number) => Math.round(50 - deviation + prng(seed + index * 10) * deviation * 2);

    const values = Array.from({length: 8}, (_, i) => randomValue(i));
    
    const newBr = `${values[0]}% ${100 - values[1]}% ${100 - values[2]}% ${values[3]}% / ${values[4]}% ${values[5]}% ${100 - values[6]}% ${100 - values[7]}%`;
    setBorderRadius(newBr);
  }, [blobConfig]);

  useEffect(() => {
    if (shapeMode === 'blob') {
      generateBorderRadius();
    }
  }, [shapeMode, blobConfig, generateBorderRadius]);

  const getCanvasRelativeCoords = (event: React.MouseEvent<Element>): Point => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    return { x, y };
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shapeMode !== 'polygon' || event.target !== canvasRef.current) return;
    const newPoint = getCanvasRelativeCoords(event);
    setPoints([...points, newPoint]);
  };

  const handlePointMouseDown = (index: number) => {
    if (shapeMode !== 'polygon') return;
    setDraggingPointIndex(index);
  };
  
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (draggingPointIndex === null) return;
    event.preventDefault();

    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    
    const newPoints = [...points];
    newPoints[draggingPointIndex] = { x, y };
    setPoints(newPoints);
  }, [draggingPointIndex, points]);

  const handleMouseUp = useCallback(() => {
    setDraggingPointIndex(null);
  }, []);
  
  useEffect(() => {
    if (shapeMode === 'polygon' && draggingPointIndex !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [shapeMode, draggingPointIndex, handleMouseMove, handleMouseUp]);

  const handleReset = () => {
    setPoints(PRESET_SHAPES[0].points);
    setPolygonConfig({ cornerRadius: 0, cornerStyle: 'convex' });
    setRotation(0);
  };

  const handleClear = () => {
    setPoints([]);
  }

  const handlePresetSelect = (presetPoints: Point[]) => {
    setPoints(presetPoints);
    setPolygonConfig({ cornerRadius: 0, cornerStyle: 'convex' });
    setRotation(0);
  };
  
  const handleGenerateNewBlob = () => {
    setBlobConfig(c => ({...c, seed: Math.floor(Math.random() * 1000)}));
  };
  
  const handleDownloadSVG = () => {
    if (shapeMode !== 'polygon' || points.length < 3) return;
    
    const svgContent = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <defs>
    <linearGradient id="shape-gradient" gradientTransform="rotate(${gradient.angle} 50 50)">
      <stop offset="0%" stop-color="${gradient.startColor}" />
      <stop offset="100%" stop-color="${gradient.endColor}" />
    </linearGradient>
  </defs>
  <path d="${memoizedSvgPath}" fill="url(#shape-gradient)" transform="rotate(${rotation}, 50, 50)"/>
</svg>`;

    const blob = new Blob([svgContent.trim()], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shape.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const memoizedSvgPath = useMemo(() => {
    return generateSvgPath(points, polygonConfig.cornerRadius, polygonConfig.cornerStyle);
  }, [points, polygonConfig]);

  const memoizedBackground = useMemo(() => {
    return `linear-gradient(${gradient.angle}deg, ${gradient.startColor}, ${gradient.endColor})`;
  }, [gradient]);

  const memoizedMask = useMemo(() => {
    if (shapeMode !== 'polygon' || points.length < 3) return {};
    const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="${memoizedSvgPath}"/></svg>`;
    const url = `url('data:image/svg+xml;base64,${btoa(svg)}')`;
    return {
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
    };
  }, [shapeMode, points.length, memoizedSvgPath]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex min-h-0">
        <ResizablePanels>
            <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
              <div 
                ref={canvasRef}
                className="w-full max-w-[400px] aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-inner relative overflow-hidden"
                onClick={handleCanvasClick}
                style={{ cursor: shapeMode === 'polygon' ? 'copy' : 'default' }}
              >
                <div 
                  ref={shapePreviewRef}
                  className="absolute inset-0 w-full h-full transition-transform duration-200"
                  style={{
                    background: memoizedBackground,
                    ...(shapeMode === 'polygon' ? memoizedMask : { borderRadius }),
                    transform: `rotate(${rotation}deg)`,
                  }}
                />

                {shapeMode === 'polygon' && points.map((point, index) => (
                  <div
                    key={index}
                    className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded-full cursor-move transition-transform duration-100 ${draggingPointIndex === index ? 'scale-125 shadow-2xl' : 'hover:scale-110'} border-indigo-500`}
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                    }}
                    onMouseDown={() => handlePointMouseDown(index)}
                  />
                ))}
              </div>
            </div>
            <ControlPanel 
              shapeMode={shapeMode}
              onShapeModeChange={setShapeMode}
              points={points}
              gradient={gradient}
              onGradientChange={setGradient}
              onPresetSelect={handlePresetSelect}
              polygonConfig={polygonConfig}
              onPolygonConfigChange={setPolygonConfig}
              blobConfig={blobConfig}
              onBlobConfigChange={setBlobConfig}
              rotation={rotation}
              onRotationChange={setRotation}
            />
        </ResizablePanels>
      </div>
      <CodeOutputFooter
        shapeMode={shapeMode}
        svgPath={memoizedSvgPath}
        background={memoizedBackground}
        borderRadius={borderRadius}
        onReset={handleReset}
        onClear={handleClear}
        onGenerateNewBlob={handleGenerateNewBlob}
        onDownloadSVG={handleDownloadSVG}
        isPolygonCreatable={points.length >= 3}
        rotation={rotation}
      />
    </div>
  );
};

export default ShapeEditor;