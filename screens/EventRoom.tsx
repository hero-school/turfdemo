import React, { useState } from 'react';
import { EventData, ChatMessage } from '../types';
import { MOCK_CHAT } from '../constants';

interface EventRoomProps {
  event: EventData;
  mode: 'day' | 'night';
  onBack: () => void;
}

export const EventRoomScreen: React.FC<EventRoomProps> = ({ event, mode, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
        id: Date.now().toString(),
        user: 'Me',
        text: input,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isMe: true
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  const textColor = mode === 'day' ? 'text-turfBlack' : 'text-turfWhite';
  const bgColor = mode === 'day' ? 'bg-white' : 'bg-black';

  return (
    <div className="flex flex-col h-full bg-grain relative">
        {/* Header */}
        <div className={`p-4 border-b ${mode === 'day' ? 'border-turfBlack bg-turfYellow' : 'border-turfWhite bg-turfPurple'}`}>
            <button onClick={onBack} className="text-xs font-barlow uppercase font-bold mb-1 opacity-70">← Leave Room</button>
            <h1 className={`font-thunder-sim text-4xl leading-none ${mode === 'day' ? 'text-turfBlack' : 'text-white'}`}>
                {event.title} <span className="opacity-50">ROOM</span>
            </h1>
            <p className="font-barlow text-xs uppercase mt-1 font-bold">Community Logistics Channel</p>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${bgColor}`}>
            {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] p-3 border ${msg.isMe 
                        ? (mode === 'day' ? 'bg-turfBlack text-white border-turfBlack' : 'bg-white text-black border-white')
                        : (mode === 'day' ? 'bg-white text-turfBlack border-turfBlack' : 'bg-black text-turfWhite border-turfWhite')
                    }`}>
                        {!msg.isMe && <span className="block text-[10px] font-bold uppercase mb-1 opacity-50">{msg.user}</span>}
                        <p className="font-barlow text-sm leading-tight">{msg.text}</p>
                    </div>
                    <span className={`text-[10px] font-barlow mt-1 opacity-50 ${textColor}`}>{msg.timestamp}</span>
                </div>
            ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className={`p-4 border-t ${mode === 'day' ? 'border-turfBlack bg-white' : 'border-turfWhite bg-black'}`}>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Coordinate plans..."
                    className={`flex-1 p-3 font-barlow bg-transparent border focus:outline-none ${mode === 'day' ? 'border-turfBlack placeholder-turfBlack/30' : 'border-turfWhite placeholder-turfWhite/30 text-white'}`}
                />
                <button type="submit" className={`px-4 font-thunder-sim text-xl uppercase ${mode === 'day' ? 'bg-turfRed text-white' : 'bg-turfYellow text-black'}`}>
                    SEND
                </button>
            </div>
        </form>
    </div>
  );
};