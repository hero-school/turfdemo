import React from 'react';
import { EVENTS_DATA, MOCK_DMS } from '../constants';
import { EventData, AppMode, DirectMessageSummary } from '../types';

interface ChatTabProps {
  mode: AppMode;
  onOpenRoom: (event: EventData) => void;
  onOpenDM: (dm: DirectMessageSummary) => void;
}

export const ChatTab: React.FC<ChatTabProps> = ({ mode, onOpenRoom, onOpenDM }) => {
  const textColor = mode === 'day' ? 'text-turfBlack' : 'text-turfWhite';
  const subTextColor = mode === 'day' ? 'text-turfBlack/60' : 'text-turfWhite/60';
  const sectionTitleColor = mode === 'day' ? 'text-turfRed' : 'text-turfYellow';

  return (
    <div className="flex flex-col h-full pt-6 pb-4 overflow-y-auto animate-fade-in px-6">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className={`font-thunder-sim text-6xl leading-[0.85] ${textColor}`}>
          NOISE <br/> CONTROL
        </h1>
        <p className={`font-barlow uppercase text-sm mt-2 font-bold tracking-wider ${subTextColor}`}>
          Your Communications Hub
        </p>
      </div>

      {/* SECTION 1: EVENT ROOMS */}
      <div className="mb-8">
        <h2 className={`font-thunder-sim text-3xl mb-4 ${sectionTitleColor}`}>
            TURF ROOMS <span className="text-sm align-middle opacity-50 ml-2 font-barlow">(ACTIVE EVENTS)</span>
        </h2>
        
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
            {EVENTS_DATA.map(event => (
                <div 
                    key={event.id}
                    onClick={() => onOpenRoom(event)}
                    className={`flex-shrink-0 w-64 p-4 border snap-center cursor-pointer transition-transform active:scale-95 ${mode === 'day' ? 'bg-white border-turfBlack' : 'bg-white/5 border-turfWhite/20'}`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className={`text-[10px] font-barlow font-bold uppercase px-1 border ${mode === 'day' ? 'border-turfBlack text-turfBlack' : 'border-turfWhite text-turfWhite'}`}>
                            {event.attendeeCount} Online
                        </span>
                        <div className="w-2 h-2 rounded-full bg-turfRed animate-pulse"></div>
                    </div>
                    <h3 className={`font-thunder-sim text-2xl leading-none ${textColor}`}>
                        {event.title}
                    </h3>
                    <p className={`font-barlow text-xs mt-1 uppercase opacity-70 ${textColor}`}>
                        Tap to enter room
                    </p>
                </div>
            ))}
        </div>
      </div>

      {/* SECTION 2: DIRECT MESSAGES */}
      <div className="flex-1">
        <h2 className={`font-thunder-sim text-3xl mb-4 ${sectionTitleColor}`}>
            DIRECT SIGNAL
        </h2>
        
        <div className="space-y-3">
            {MOCK_DMS.map(dm => {
                const relatedEvent = EVENTS_DATA.find(e => e.id === dm.relatedEventId);
                return (
                    <div 
                      key={dm.id} 
                      onClick={() => onOpenDM(dm)}
                      className={`flex items-start gap-4 p-4 border-b cursor-pointer transition-colors active:opacity-60 ${mode === 'day' ? 'border-turfBlack/10 hover:bg-black/5' : 'border-turfWhite/10 hover:bg-white/5'}`}
                    >
                        {/* Avatar */}
                        <div className="relative">
                            <img src={dm.user.avatar} className="w-12 h-12 grayscale object-cover border border-current" />
                            {dm.unread && <div className="absolute -top-1 -right-1 w-3 h-3 bg-turfRed border border-white"></div>}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex justify-between items-baseline">
                                <h4 className={`font-thunder-sim text-2xl ${textColor}`}>{dm.user.name}</h4>
                                <span className="font-barlow text-[10px] font-bold opacity-50">{dm.timestamp}</span>
                            </div>
                            
                            {/* Context Badge */}
                            <div className={`inline-flex items-center gap-1 mb-1 px-1.5 py-0.5 text-[9px] uppercase font-bold border ${mode === 'day' ? 'bg-turfYellow/20 border-turfYellow text-turfBlack' : 'bg-turfPurple/20 border-turfPurple text-white'}`}>
                                <span className="w-1 h-1 bg-current rounded-full"></span>
                                {relatedEvent?.title || 'Unknown Event'}
                            </div>

                            <p className={`font-barlow text-sm leading-tight line-clamp-2 ${subTextColor}`}>
                                {dm.lastMessage}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

    </div>
  );
};