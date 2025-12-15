import React, { useState } from 'react';
import { EventData, Attendee } from '../types';
import { ATTENDEES_DATA } from '../constants';
import { DialControl } from '../components/DialControl';

interface AttendeeListProps {
  event: EventData;
  mode: 'day' | 'night';
  onBack: () => void;
  onConnect: (attendee: Attendee) => void;
  onJoinRoom: () => void;
}

export const AttendeeListScreen: React.FC<AttendeeListProps> = ({ event, mode, onBack, onConnect, onJoinRoom }) => {
  const [showTuner, setShowTuner] = useState(false);
  const [vibeFilter, setVibeFilter] = useState(50);
  const [groupFilter, setGroupFilter] = useState(0);

  const textColor = mode === 'day' ? 'text-turfBlack' : 'text-turfWhite';
  const subTextColor = mode === 'day' ? 'text-turfBlack/60' : 'text-turfWhite/60';

  // Filter Logic (Simulated)
  const filteredAttendees = ATTENDEES_DATA.filter(a => {
    const diff = Math.abs(a.vibeScore - vibeFilter);
    return diff < 40; // Show users within range
  });

  return (
    <div className="flex flex-col h-full pt-6 pb-6 overflow-hidden">
      
      {/* Header (Event Context) */}
      <div className="px-6 mb-4 flex justify-between items-start">
         <div>
            <button onClick={onBack} className={`text-xs font-barlow uppercase font-bold mb-1 hover:underline ${subTextColor}`}>
                ← Back to Agenda
            </button>
            <h2 className={`font-thunder-sim text-3xl leading-none ${textColor} max-w-[200px]`}>
                {event.title}
            </h2>
         </div>
         {/* Push right content down to avoid overlap with absolute Mode Toggle */}
         <div className="text-right mt-10">
            <span className={`font-thunder-sim text-2xl ${mode === 'day' ? 'text-turfRed' : 'text-turfYellow'}`}>
                {event.attendeeCount}
            </span>
            <span className={`block text-[10px] uppercase font-barlow ${subTextColor}`}>Going</span>
         </div>
      </div>

      {/* Action Bar */}
      <div className="px-6 flex gap-2 mb-4">
        <button 
            onClick={() => setShowTuner(!showTuner)}
            className={`flex-1 py-3 border border-current font-thunder-sim text-xl uppercase tracking-wide transition-colors ${mode === 'day' ? 'text-turfBlack hover:bg-turfBlack hover:text-turfWhite' : 'text-turfWhite hover:bg-turfWhite hover:text-turfBlack'} ${showTuner ? 'bg-turfBlack text-turfWhite' : ''}`}
        >
            {showTuner ? 'Close Tuner' : 'Tune Filters'}
        </button>
        <button 
            onClick={onJoinRoom}
            className={`flex-1 py-3 bg-turfRed text-white font-thunder-sim text-xl uppercase tracking-wide hover:opacity-90`}
        >
            Event Room
        </button>
      </div>

      {/* Tuner Overlay (Collapsible) */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showTuner ? 'max-h-64 border-b border-dashed border-gray-500 mb-4' : 'max-h-0'}`}>
         <div className="flex justify-center gap-8 pb-4">
            <DialControl 
                label="Vibe Check" 
                value={vibeFilter} 
                onChange={setVibeFilter} 
                mode={mode}
                colorStart="#FFB23D"
                colorEnd="#7D00FE"
            />
             <DialControl 
                label="Squad Size" 
                value={groupFilter} 
                onChange={setGroupFilter} 
                mode={mode}
                colorStart="#FFFFFF"
                colorEnd="#000000"
            />
         </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4">
        {filteredAttendees.length === 0 ? (
            <div className="text-center py-10 opacity-50 font-barlow uppercase">No signal found. Adjust Dials.</div>
        ) : filteredAttendees.map(user => (
            <div key={user.id} className={`flex flex-col p-4 border transition-all ${mode === 'day' ? 'bg-white border-turfBlack/10' : 'bg-white/5 border-white/10'}`}>
                <div className="flex items-center gap-4 mb-3">
                    <img src={user.avatar} className="w-12 h-12 grayscale object-cover border border-current" />
                    <div>
                        <h3 className={`font-thunder-sim text-2xl leading-none ${textColor}`}>{user.name}</h3>
                        <p className={`font-barlow text-xs uppercase tracking-wider ${subTextColor}`}>{user.role}</p>
                    </div>
                    <button 
                        onClick={() => onConnect(user)}
                        className={`ml-auto px-4 py-1 font-thunder-sim text-lg border ${mode === 'day' ? 'border-turfBlack hover:bg-turfBlack hover:text-white' : 'border-turfWhite hover:bg-turfWhite hover:text-black'}`}
                    >
                        CONNECT
                    </button>
                </div>
                
                {/* Intent & Tags */}
                <div className={`p-3 text-sm italic font-barlow mb-2 ${mode === 'day' ? 'bg-gray-50 text-turfBlack' : 'bg-black text-turfWhite'}`}>
                    "{user.intent}"
                </div>
                <div className="flex flex-wrap gap-2">
                    {user.tags.map(tag => (
                        <span key={tag} className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${mode === 'day' ? 'bg-turfYellow text-turfBlack' : 'bg-turfPurple text-white'}`}>
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        ))}
      </div>

    </div>
  );
};