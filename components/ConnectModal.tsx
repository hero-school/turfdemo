import React, { useState } from 'react';
import { Attendee, EventData } from '../types';

interface ConnectModalProps {
  attendee: Attendee;
  event: EventData;
  onClose: () => void;
  onSend: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ attendee, event, onClose, onSend }) => {
  const [message, setMessage] = useState(`Hi ${attendee.name}, saw you're going to ${event.title}. `);

  return (
    <div className="absolute inset-0 z-50 bg-turfBlack/90 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-sm bg-turfWhite p-6 border-2 border-turfYellow relative">
        
        <button onClick={onClose} className="absolute top-2 right-4 text-3xl font-thunder-sim text-turfBlack hover:text-turfRed">
            ×
        </button>

        <h2 className="font-thunder-sim text-4xl text-turfBlack mb-1">
            MAKE CONTACT
        </h2>
        <p className="font-barlow text-sm uppercase text-turfBlack/60 mb-6 font-bold">
            Context: {event.title}
        </p>

        <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 border border-turfBlack">
                 <img src={attendee.avatar} className="w-full h-full object-cover grayscale" />
            </div>
            <div>
                <span className="block font-barlow text-xs uppercase text-turfBlack/50">Recipient</span>
                <span className="font-thunder-sim text-2xl text-turfBlack">{attendee.name}</span>
            </div>
        </div>

        <div className="mb-6">
            <label className="block font-barlow text-xs uppercase font-bold mb-2 text-turfRed">
                Message (Must relate to event)
            </label>
            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-24 p-3 font-barlow text-lg bg-gray-50 border border-turfBlack focus:outline-none focus:border-turfRed resize-none"
            />
        </div>

        <button 
            onClick={onSend}
            className="w-full py-4 bg-turfBlack text-turfWhite font-thunder-sim text-2xl hover:bg-turfRed transition-colors"
        >
            SEND SIGNAL
        </button>

      </div>
    </div>
  );
};