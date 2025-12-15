import React from 'react';
import { Tab } from '../types';

interface NavBarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  mode: 'day' | 'night';
}

export const NavBar: React.FC<NavBarProps> = ({ currentTab, onTabChange, mode }) => {
  // Navigation Bar is always black to provide contrast and ground the app
  
  const getIconColor = (tab: Tab) => {
    if (currentTab === tab) {
      return mode === 'day' ? 'text-turfYellow' : 'text-turfPurple';
    }
    return 'text-white/40';
  };

  return (
    <div className="h-16 bg-black border-t border-white/10 flex items-center justify-around z-50">
      
      {/* EVENTS TAB */}
      <button 
        onClick={() => onTabChange('events')}
        className={`flex flex-col items-center gap-1 w-1/3 transition-colors duration-300 ${getIconColor('events')}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <span className="font-barlow text-[10px] uppercase font-bold tracking-widest">Agenda</span>
      </button>

      {/* CHAT TAB */}
      <button 
        onClick={() => onTabChange('chat')}
        className={`flex flex-col items-center gap-1 w-1/3 transition-colors duration-300 ${getIconColor('chat')}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="12" y1="11" x2="12" y2="11.01"></line>
          <line x1="8" y1="11" x2="8" y2="11.01"></line>
          <line x1="16" y1="11" x2="16" y2="11.01"></line>
        </svg>
        <span className="font-barlow text-[10px] uppercase font-bold tracking-widest">Signal</span>
      </button>

      {/* CANVAS TAB */}
      <button 
        onClick={() => onTabChange('canvas')}
        className={`flex flex-col items-center gap-1 w-1/3 transition-colors duration-300 ${getIconColor('canvas')}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span className="font-barlow text-[10px] uppercase font-bold tracking-widest">Canvas</span>
      </button>

    </div>
  );
};