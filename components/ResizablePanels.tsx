import React, { useState, useCallback, useRef, useEffect } from 'react';

interface ResizablePanelsProps {
  children: [React.ReactElement, React.ReactElement];
}

const ResizablePanels: React.FC<ResizablePanelsProps> = ({ children }) => {
    const [panel1Size, setPanel1Size] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const newSizePercent = ((e.clientX - rect.left) / rect.width) * 100;
        
        setPanel1Size(Math.max(15, Math.min(newSizePercent, 85)));
    }, []);

    useEffect(() => {
        if (!isResizing) {
            return;
        }

        const handleMouseMoveOnWindow = (e: MouseEvent) => handleMouseMove(e);
        const handleMouseUpOnWindow = () => handleMouseUp();

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        window.addEventListener('mousemove', handleMouseMoveOnWindow);
        window.addEventListener('mouseup', handleMouseUpOnWindow);
        
        return () => {
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
            window.removeEventListener('mousemove', handleMouseMoveOnWindow);
            window.removeEventListener('mouseup', handleMouseUpOnWindow);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    return (
        <div ref={containerRef} className="flex h-full w-full">
            <div style={{ width: `${panel1Size}%` }} className="h-full min-h-0 min-w-0">
                {children[0]}
            </div>
            <div
                onMouseDown={handleMouseDown}
                className="shrink-0 group w-2 cursor-col-resize z-10"
            >
              <div className="bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-500 transition-colors w-[2px] h-full mx-auto"></div>
            </div>
            <div className="flex-1 h-full min-h-0 min-w-0">
                 {children[1]}
            </div>
        </div>
    );
};

export default ResizablePanels;