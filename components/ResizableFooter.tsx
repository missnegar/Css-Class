import React, { useState, useCallback, useEffect } from 'react';

interface ResizableFooterProps {
  children: React.ReactNode;
  initialHeight?: number;
}

const ResizableFooter: React.FC<ResizableFooterProps> = ({ children, initialHeight = 120 }) => {
    const [height, setHeight] = useState(initialHeight);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const newHeight = window.innerHeight - e.clientY;
        setHeight(Math.max(120, Math.min(newHeight, window.innerHeight - 150)));
    }, []);

    useEffect(() => {
        if (!isResizing) {
            return;
        }

        const handleMouseMoveOnWindow = (e: MouseEvent) => handleMouseMove(e);
        const handleMouseUpOnWindow = () => handleMouseUp();

        document.body.style.cursor = 'ns-resize';
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
        <footer
            className="bg-white dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 p-4 shrink-0 relative"
            style={{ height: `${height}px` }}
        >
            <div
                onMouseDown={handleMouseDown}
                className="absolute top-0 left-0 w-full h-2 cursor-ns-resize group z-20"
            >
              <div className="h-[2px] bg-slate-300 dark:bg-slate-700 w-full absolute top-0 group-hover:h-1 group-hover:bg-indigo-500 transition-all"></div>
            </div>
            {children}
        </footer>
    );
};

export default ResizableFooter;