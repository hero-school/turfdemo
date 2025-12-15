import { EventData, Attendee, ChatMessage, GalleryPost, DirectMessageSummary } from './types';

export const EVENTS_DATA: EventData[] = [
  {
    id: '1',
    title: 'KEYNOTE: AI ETHICS',
    time: '14:00',
    location: 'KOEPEL',
    type: 'Talk',
    attendeeCount: 142
  },
  {
    id: '2',
    title: 'STARGATE: LIVE SET',
    time: '16:30',
    location: 'PIER 15',
    type: 'Live',
    attendeeCount: 89
  },
  {
    id: '3',
    title: 'ACID CORE NIGHT',
    time: '23:00',
    location: 'MEZZ',
    type: 'Night',
    attendeeCount: 312
  },
  {
    id: '4',
    title: 'DIGITAL ART WALK',
    time: '19:00',
    location: 'CITY CENTRE',
    type: 'Live',
    attendeeCount: 56
  }
];

export const ATTENDEES_DATA: Attendee[] = [
  {
    id: 'u1',
    name: 'Sanne',
    role: 'Creative Coder',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    tags: ['Generative Art', 'Ethics'],
    intent: 'Looking for debate partners on AI copyright.',
    vibeScore: 20
  },
  {
    id: 'u2',
    name: 'Marcus',
    role: 'Producer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    tags: ['Modular', 'Techno'],
    intent: 'Checking the sound system setup.',
    vibeScore: 80
  },
  {
    id: 'u3',
    name: 'Juna',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    tags: ['UI/UX', 'Visuals'],
    intent: 'Just here for the visual inspiration.',
    vibeScore: 50
  },
  {
    id: 'u4',
    name: 'Kai',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    tags: ['Web3', 'React'],
    intent: 'Networking for my startup.',
    vibeScore: 10
  },
  {
    id: 'u5',
    name: 'Luna',
    role: 'Raver',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200',
    tags: ['Dance', 'Energy'],
    intent: 'Front row or go home.',
    vibeScore: 100
  }
];

export const MOCK_CHAT: ChatMessage[] = [
  { id: '1', user: 'System', text: 'Welcome to the Event Room. Plan your meetup here.', timestamp: '13:55', isMe: false },
  { id: '2', user: 'Sanne', text: 'Is anyone gathering beforehand?', timestamp: '13:58', isMe: false },
  { id: '3', user: 'Marcus', text: 'I am at the coffee bar near the entrance.', timestamp: '14:01', isMe: false },
];

export const MOCK_DMS: DirectMessageSummary[] = [
  {
    id: 'dm1',
    user: ATTENDEES_DATA[2], // Juna
    lastMessage: 'Hey! Saw you at the Keynote. That point about...',
    timestamp: '14:45',
    relatedEventId: '1',
    unread: true
  },
  {
    id: 'dm2',
    user: ATTENDEES_DATA[1], // Marcus
    lastMessage: 'Are we still meeting at Pier 15?',
    timestamp: '12:30',
    relatedEventId: '2',
    unread: false
  }
];

export const GALLERY_DATA: GalleryPost[] = [
  {
    id: 'g1',
    title: 'NEURAL LANDSCAPES',
    author: 'Sanne',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800',
    likes: 124,
    commentsCount: 12,
    likedByMe: true,
    description: "A series exploring the latent space between organic growth and digital decay. Generated using a custom GAN model trained on local Breda flora and brutalist architecture.",
    comments: [
      { id: 'c1', user: 'Marcus', text: 'The texture on this is unreal.', timestamp: '10m ago' },
      { id: 'c2', user: 'Juna', text: 'Would look great projected on the Koepel.', timestamp: '2h ago' }
    ]
  },
  {
    id: 'g2',
    title: 'TURF BY NIGHT (WIP)',
    author: 'Juna',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800',
    likes: 89,
    commentsCount: 4,
    likedByMe: false,
    description: "Capturing the raw energy of the crowd during the opening night. Long exposure shots mixed with real-time motion tracking.",
    comments: [
       { id: 'c3', user: 'Kai', text: 'I think I see myself in the background!', timestamp: '15m ago' }
    ]
  },
  {
    id: 'g3',
    title: 'MODULAR SYNTH SETUP',
    author: 'Marcus',
    imageUrl: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=800',
    likes: 245,
    commentsCount: 34,
    likedByMe: false,
    description: "My rig for the live set at Pier 15. Eurorack focused on granular synthesis and deep bass textures. Come check it out.",
    comments: []
  }
];