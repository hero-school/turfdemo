import React, { useState, useRef, useEffect } from 'react';

interface DialControlProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  mode: 'day' | 'night';
  colorStart: string;
  colorEnd: string;
}

export const DialControl: React.FC<DialControlProps> = ({ 
  label, 
  value, 
  onChange, 
  mode,
  colorStart,
  colorEnd
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  const calculateAngle = (e: MouseEvent | TouchEvent) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    // Calculate angle in degrees (0-360)
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle = angle + 90; // Adjust start point to top
    if (angle < 0) angle += 360;
    
    // Map 0-360 to 0-100
    const newValue = Math.round((angle / 360) * 100);
    onChange(newValue);
  };

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        calculateAngle(e);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  // Visual Styles
  const rotation = (value / 100) * 360;
  
  const dayGradient = `conic-gradient(from ${rotation}deg, ${colorStart}, ${colorEnd}, ${colorStart})`;
  const nightGradient = `conic-gradient(from ${rotation}deg, ${colorStart}, ${colorEnd}, transparent)`;
  
  const bgStyle = {
    background: mode === 'day' ? dayGradient : nightGradient,
    boxShadow: mode === 'night' ? `0 0 20px ${colorStart}40` : 'none',
  };

  return (
    <div className="flex flex-col items-center gap-2">
       <span className={`uppercase font-barlow text-sm tracking-widest ${mode === 'day' ? 'text-turfBlack' : 'text-turfWhite/70'}`}>
        {label}
      </span>
      
      <div 
        ref={dialRef}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        className="relative w-32 h-32 rounded-full cursor-grab active:cursor-grabbing bg-grain touch-none"
        style={bgStyle}
      >
        {/* Inner static circle for aesthetic */}
        <div className={`absolute inset-4 rounded-full flex items-center justify-center ${mode === 'day' ? 'bg-turfWhite' : 'bg-turfBlack'}`}>
            <span className={`font-thunder-sim text-2xl ${mode === 'day' ? 'text-turfBlack' : 'text-turfWhite'}`}>
                {value}%
            </span>
        </div>
        
        {/* Indicator Notch */}
        <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-4 bg-turfBlack z-10"
            style={{ 
                transform: `translateX(-50%) rotate(${rotation}deg)`, 
                transformOrigin: '50% 64px', // Radius of the parent
                backgroundColor: mode === 'day' ? '#000' : '#FFF'
            }}
        />
      </div>
     
      <span className={`uppercase font-barlow text-xs ${mode === 'day' ? 'text-turfBlack/50' : 'text-turfWhite/30'}`}>
        Tune Signal
      </span>
    </div>
  );
};