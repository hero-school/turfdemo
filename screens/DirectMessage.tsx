import React, { useState } from 'react';
import { DirectMessageSummary, ChatMessage, AppMode } from '../types';

interface DirectMessageProps {
  dm: DirectMessageSummary;
  mode: AppMode;
  onBack: () => void;
}

export const DirectMessageScreen: React.FC<DirectMessageProps> = ({ dm, mode, onBack }) => {
  // Mock history based on the summary
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
        id: 'old1', 
        user: dm.user.name, 
        text: dm.lastMessage, 
        timestamp: dm.timestamp, 
        isMe: false 
    }
  ]);
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
        <div className={`p-4 border-b flex items-center gap-3 ${mode === 'day' ? 'border-turfBlack bg-turfWhite' : 'border-turfWhite/20 bg-turfBlack'}`}>
            <button onClick={onBack} className={`text-xl font-bold ${textColor}`}>←</button>
            <div className="w-10 h-10 rounded-full border border-current overflow-hidden">
                 <img src={dm.user.avatar} className="w-full h-full object-cover grayscale" />
            </div>
            <div>
                <h1 className={`font-thunder-sim text-2xl leading-none ${textColor}`}>
                    {dm.user.name}
                </h1>
                <p className={`font-barlow text-[10px] uppercase opacity-60 ${textColor}`}>
                    {dm.user.role} • {dm.user.tags[0]}
                </p>
            </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${bgColor}`}>
            <div className="text-center py-4 opacity-30 font-barlow uppercase text-xs">
                Signal Established via {dm.relatedEventId ? 'Event Connection' : 'Direct Link'}
            </div>
            {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] p-3 border ${msg.isMe 
                        ? (mode === 'day' ? 'bg-turfBlack text-white border-turfBlack' : 'bg-white text-black border-white')
                        : (mode === 'day' ? 'bg-white text-turfBlack border-turfBlack' : 'bg-black text-turfWhite border-turfWhite')
                    }`}>
                        <p className="font-barlow text-sm leading-tight">{msg.text}</p>
                    </div>
                    <span className={`text-[10px] font-barlow mt-1 opacity-50 ${textColor}`}>{msg.timestamp}</span>
                </div>
            ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className={`p-4 border-t ${mode === 'day' ? 'border-turfBlack bg-white' : 'border-turfWhite/20 bg-black'}`}>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={`Message ${dm.user.name}...`}
                    className={`flex-1 p-3 font-barlow bg-transparent border focus:outline-none ${mode === 'day' ? 'border-turfBlack placeholder-turfBlack/30' : 'border-turfWhite placeholder-turfWhite/30 text-white'}`}
                />
                <button type="submit" className={`px-4 font-thunder-sim text-xl uppercase ${mode === 'day' ? 'bg-turfYellow text-black' : 'bg-turfPurple text-white'}`}>
                    SEND
                </button>
            </div>
        </form>
    </div>
  );
};