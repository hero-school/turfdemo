import React from 'react';

interface StretchingLogoProps {
  mode: 'day' | 'night';
  size?: 'sm' | 'lg';
}

export const StretchingLogo: React.FC<StretchingLogoProps> = ({ mode, size = 'lg' }) => {
  const textColor = mode === 'day' ? 'text-turfBlack' : 'text-turfWhite';
  const baseSize = size === 'lg' ? 'text-8xl' : 'text-5xl';
  
  return (
    <div className={`flex items-end justify-center font-thunder-sim font-bold tracking-tighter leading-none select-none ${textColor} ${baseSize}`}>
      <span className="animate-stretch-1 origin-bottom">T</span>
      <span className="animate-stretch-2 origin-bottom">U</span>
      <span className="animate-stretch-3 origin-bottom">R</span>
      <span className="animate-stretch-4 origin-bottom">F</span>
    </div>
  );
};