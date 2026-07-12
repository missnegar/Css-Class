import React, { useState } from 'react';
import type { Point, GradientConfig, BlobConfig, PolygonConfig } from '../types';
import { PRESET_SHAPES } from '../constants';
import ShapesIcon from './icons/ShapesIcon';
import PaletteIcon from './icons/PaletteIcon';

interface ControlPanelProps {
  shapeMode: 'polygon' | 'blob';
  onShapeModeChange: (mode: 'polygon' | 'blob') => void;
  points: Point[];
  gradient: GradientConfig;
  onGradientChange: (newGradient: GradientConfig) => void;
  onPresetSelect: (points: Point[]) => void;
  polygonConfig: PolygonConfig;
  onPolygonConfigChange: (newConfig: PolygonConfig) => void;
  blobConfig: BlobConfig;
  onBlobConfigChange: (newConfig: BlobConfig) => void;
  rotation: number;
  onRotationChange: (newRotation: number) => void;
}

const ShapeModeButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`flex-1 p-3 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-indigo-500 ${
            active
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
        }`}
    >
        {children}
    </button>
);

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode, disabled?: boolean }> = ({ active, onClick, children, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm font-medium border-b-2 transition-all duration-200 ${
            active
                ? 'border-indigo-500 text-indigo-500'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {children}
    </button>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ 
    shapeMode, onShapeModeChange, 
    gradient, onGradientChange, 
    onPresetSelect,
    polygonConfig, onPolygonConfigChange,
    blobConfig, onBlobConfigChange,
    rotation, onRotationChange
}) => {
    const [activeTab, setActiveTab] = useState<'presets' | 'appearance'>('presets');

    const handleModeSwitch = (mode: 'polygon' | 'blob') => {
        onShapeModeChange(mode);
        if (mode === 'blob' && activeTab === 'presets') {
            setActiveTab('appearance');
        }
    };

    return (
        <aside className="w-full bg-white dark:bg-slate-800/50 border-t md:border-l md:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                    <ShapeModeButton active={shapeMode === 'polygon'} onClick={() => handleModeSwitch('polygon')}>
                        چندضلعی
                    </ShapeModeButton>
                    <ShapeModeButton active={shapeMode === 'blob'} onClick={() => handleModeSwitch('blob')}>
                        ارگانیک
                    </ShapeModeButton>
                </div>
            </div>

            <div className="border-b border-slate-200 dark:border-slate-800 flex shrink-0">
                <TabButton active={activeTab === 'presets'} onClick={() => setActiveTab('presets')} disabled={shapeMode === 'blob'}>
                    <ShapesIcon className="w-5 h-5" />
                    قالب‌های آماده
                </TabButton>
                <TabButton active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')}>
                    <PaletteIcon className="w-5 h-5" />
                    ظاهر
                </TabButton>
            </div>

            <div className="flex-grow p-6 overflow-y-auto no-scrollbar">
                {activeTab === 'presets' && shapeMode === 'polygon' && (
                    <div className="grid grid-cols-3 gap-3">
                        {PRESET_SHAPES.map(preset => (
                            <button
                                key={preset.name}
                                onClick={() => onPresetSelect(preset.points)}
                                className="aspect-square border-2 border-slate-300 dark:border-slate-700 rounded-lg flex items-center justify-center p-2 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                                title={preset.name}
                            >
                                <div className="w-full h-full bg-slate-500" style={{ clipPath: `polygon(${preset.points.map(p => `${p.x}% ${p.y}%`).join(', ')})` }}/>
                            </button>
                        ))}
                    </div>
                )}
                {activeTab === 'appearance' && (
                    <div className="space-y-8">
                        {shapeMode === 'polygon' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">گوشه‌ها</h3>
                                <div>
                                    <label htmlFor="cornerRadius" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">شعاع گوشه</label>
                                    <input type="range" min="0" max="25" step="0.5" value={polygonConfig.cornerRadius} onChange={(e) => onPolygonConfigChange({ ...polygonConfig, cornerRadius: parseFloat(e.target.value) })} id="cornerRadius" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">جهت انحنا</span>
                                    <div className="flex gap-2 text-sm">
                                        <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-md cursor-pointer has-[:checked]:bg-indigo-50 dark:has-[:checked]:bg-indigo-900/50 has-[:checked]:ring-2 has-[:checked]:ring-indigo-500 transition-all">
                                            <input type="radio" name="cornerStyle" value="convex" checked={polygonConfig.cornerStyle === 'convex'} onChange={() => onPolygonConfigChange({ ...polygonConfig, cornerStyle: 'convex' })} className="sr-only" />
                                            به بیرون
                                        </label>
                                        <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-md cursor-pointer has-[:checked]:bg-indigo-50 dark:has-[:checked]:bg-indigo-900/50 has-[:checked]:ring-2 has-[:checked]:ring-indigo-500 transition-all">
                                            <input type="radio" name="cornerStyle" value="concave" checked={polygonConfig.cornerStyle === 'concave'} onChange={() => onPolygonConfigChange({ ...polygonConfig, cornerStyle: 'concave' })} className="sr-only" />
                                            به داخل
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {shapeMode === 'blob' && (
                             <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">فرم‌دهی ارگانیک</h3>
                                <div>
                                    <label htmlFor="carve" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">درجه خمش</label>
                                    <input type="range" min="0" max="10" step="0.1" value={blobConfig.carve} onChange={(e) => onBlobConfigChange({ ...blobConfig, carve: parseFloat(e.target.value) })} id="carve" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
                                </div>
                                <div>
                                    <label htmlFor="seed" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">عدد شانسی (Seed)</label>
                                    <input type="range" min="0" max="1000" id="seed" value={blobConfig.seed} onChange={(e) => onBlobConfigChange({ ...blobConfig, seed: parseInt(e.target.value) || 0 })} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
                                </div>
                            </div>
                        )}
                        <div className="space-y-4">
                             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">گرادیانت</h3>
                            <div>
                                <label htmlFor="angle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">زاویه</label>
                                <input type="range" min="0" max="360" value={gradient.angle} onChange={(e) => onGradientChange({...gradient, angle: parseInt(e.target.value)})} id="angle" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
                            </div>
                             <div className="flex gap-4">
                                <div className="flex-1">
                                    <label htmlFor="startColor" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">رنگ شروع</label>
                                    <input type="color" value={gradient.startColor} onChange={(e) => onGradientChange({...gradient, startColor: e.target.value})} id="startColor" className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="endColor" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">رنگ پایان</label>
                                    <input type="color" value={gradient.endColor} onChange={(e) => onGradientChange({...gradient, endColor: e.target.value})} id="endColor" className="w-full h-10 p-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md cursor-pointer"/>
                                </div>
                            </div>
                        </div>
                         <div className="space-y-4">
                             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">چرخش</h3>
                            <div>
                                <label htmlFor="rotation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">درجه چرخش ({rotation}°)</label>
                                <input type="range" min="0" max="360" value={rotation} onChange={(e) => onRotationChange(parseInt(e.target.value))} id="rotation" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default ControlPanel;