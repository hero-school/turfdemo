import React, { useState } from 'react';
import { StretchingLogo } from '../components/StretchingLogo';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleNext = () => {
    if (name.length > 0) onComplete();
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 bg-turfWhite bg-grain text-turfBlack">
      {/* Header */}
      <div className="mt-12">
        <h1 className="font-thunder-sim text-6xl mb-2 text-turfBlack">
          GROWTH <br/> WITHOUT <br/> BORDERS
        </h1>
        <p className="font-barlow text-lg text-turfBlack/70 uppercase max-w-xs">
          Connect with the fertile ground of Breda. 
        </p>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="w-full space-y-8 animate-fade-in">
          <div className="space-y-2">
            <label className="font-thunder-sim text-2xl">YOUR IDENTITY</label>
            <input 
              type="text" 
              placeholder="ENTER NAME..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b-4 border-turfBlack font-barlow text-3xl focus:outline-none focus:border-turfYellow placeholder-turfBlack/20 uppercase py-2 rounded-none"
            />
          </div>
        </div>
      </div>

      {/* Footer / Nav */}
      <div className="w-full pb-8">
        <button 
          onClick={handleNext}
          className="w-full bg-turfBlack text-turfWhite font-thunder-sim text-3xl py-4 hover:bg-turfRed transition-colors"
        >
          ENTER TURF
        </button>
      </div>
      
      {/* Absolute Logo at bottom */}
      <div className="absolute bottom-4 left-0 w-full opacity-20 pointer-events-none -z-10">
         <StretchingLogo mode="day" size="sm" />
      </div>
    </div>
  );
};