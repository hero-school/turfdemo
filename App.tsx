import React, { useState } from 'react';
import { StretchingLogo } from './components/StretchingLogo';
import { NavBar } from './components/NavBar';
import { Onboarding } from './screens/Onboarding';
import { EventListScreen } from './screens/EventList';
import { AttendeeListScreen } from './screens/AttendeeList';
import { ConnectModal } from './components/ConnectModal';
import { EventRoomScreen } from './screens/EventRoom';
import { ChatTab } from './screens/ChatTab';
import { CanvasTab } from './screens/CanvasTab';
import { CanvasDetailScreen } from './screens/CanvasDetail';
import { DirectMessageScreen } from './screens/DirectMessage';
import { Screen, AppMode, EventData, Attendee, Tab, GalleryPost, DirectMessageSummary } from './types';

export default function App() {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [mode, setMode] = useState<AppMode>('day');
  const [currentTab, setCurrentTab] = useState<Tab>('events');
  
  // Navigation State
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [activeRoom, setActiveRoom] = useState<EventData | null>(null);
  
  // New Navigation States
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);
  const [activeDM, setActiveDM] = useState<DirectMessageSummary | null>(null);

  const toggleMode = () => setMode(prev => prev === 'day' ? 'night' : 'day');

  const containerClass = mode === 'day' 
    ? 'bg-turfWhite' 
    : 'bg-turfBlack text-white';

  // --- Handlers ---

  const handleOnboardingComplete = () => setHasOnboarded(true);

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab);
    // Reset drilled-down states when switching main contexts
    if (tab === 'events') {
        setActiveRoom(null);
        setActiveDM(null);
        setSelectedPost(null);
    } else if (tab === 'chat') {
        setSelectedEvent(null);
        setSelectedAttendee(null);
        setSelectedPost(null);
    } else if (tab === 'canvas') {
        setSelectedEvent(null);
        setActiveRoom(null);
        setActiveDM(null);
    }
  };

  // Event Tab Logic
  const handleSelectEvent = (event: EventData) => setSelectedEvent(event);
  const handleBackToEvents = () => setSelectedEvent(null);
  const handleConnect = (attendee: Attendee) => setSelectedAttendee(attendee);
  const handleCloseConnect = () => setSelectedAttendee(null);
  
  const handleSendRequest = () => {
    setSelectedAttendee(null);
    alert("Signal Sent! Check the Chat Hub.");
  };

  const handleJoinRoomFromEvent = () => {
    setActiveRoom(selectedEvent);
  };

  // Chat Tab Logic
  const handleOpenRoomFromChat = (event: EventData) => {
    setActiveRoom(event);
  };
  
  const handleOpenDM = (dm: DirectMessageSummary) => {
    setActiveDM(dm);
  };

  const handleCloseRoom = () => {
    setActiveRoom(null);
  };
  
  const handleCloseDM = () => {
    setActiveDM(null);
  };

  // Canvas Logic
  const handleSelectPost = (post: GalleryPost) => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  // --- Render Logic ---

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className={`relative h-screen w-full flex flex-col overflow-hidden transition-colors duration-500 bg-grain ${containerClass}`}>
      
      {/* Top Bar: Mode Toggle */}
      <div className="absolute top-0 right-0 p-4 z-40 pointer-events-auto">
        <button 
          onClick={toggleMode}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${mode === 'day' ? 'border-turfBlack text-turfBlack hover:bg-turfBlack hover:text-turfWhite' : 'border-turfWhite text-turfWhite hover:bg-turfWhite hover:text-turfBlack'}`}
        >
          <span className="text-xs font-barlow font-bold uppercase">{mode === 'day' ? 'DAY' : 'NGT'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 h-full w-full overflow-hidden flex flex-col">
        
        {/* --- TAB: EVENTS --- */}
        {currentTab === 'events' && !activeRoom && (
            selectedEvent ? (
                <AttendeeListScreen 
                    event={selectedEvent} 
                    mode={mode} 
                    onBack={handleBackToEvents} 
                    onConnect={handleConnect}
                    onJoinRoom={handleJoinRoomFromEvent}
                />
            ) : (
                <EventListScreen mode={mode} onSelectEvent={handleSelectEvent} />
            )
        )}

        {/* --- TAB: CHAT --- */}
        {currentTab === 'chat' && !activeRoom && !activeDM && (
            <ChatTab mode={mode} onOpenRoom={handleOpenRoomFromChat} onOpenDM={handleOpenDM} />
        )}

        {/* --- TAB: CANVAS --- */}
        {currentTab === 'canvas' && !selectedPost && (
            <CanvasTab mode={mode} onSelectPost={handleSelectPost} />
        )}

        {/* --- GLOBAL OVERLAYS (Detail Screens) --- */}
        
        {/* Event Room */}
        {activeRoom && (
            <div className="absolute inset-0 z-30 bg-turfBlack">
                 <EventRoomScreen 
                    event={activeRoom} 
                    mode={mode} 
                    onBack={handleCloseRoom}
                />
            </div>
        )}

        {/* Direct Message Screen */}
        {activeDM && (
            <div className="absolute inset-0 z-30 bg-turfBlack">
                <DirectMessageScreen 
                    dm={activeDM}
                    mode={mode}
                    onBack={handleCloseDM}
                />
            </div>
        )}

        {/* Canvas Detail Screen */}
        {selectedPost && (
            <div className="absolute inset-0 z-30 bg-turfWhite">
                <CanvasDetailScreen 
                    post={selectedPost}
                    mode={mode}
                    onBack={handleClosePost}
                />
            </div>
        )}

        {/* Connect Modal */}
        {selectedAttendee && selectedEvent && (
            <ConnectModal 
                attendee={selectedAttendee} 
                event={selectedEvent}
                onClose={handleCloseConnect} 
                onSend={handleSendRequest}
            />
        )}

      </main>

      {/* Bottom Navigation */}
      <NavBar 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        mode={mode}
      />

    </div>
  );
}