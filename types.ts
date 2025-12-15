export type Screen = 'onboarding' | 'main';
export type Tab = 'events' | 'chat' | 'canvas';

export type AppMode = 'day' | 'night';

export interface EventData {
  id: string;
  title: string;
  time: string;
  location: string;
  type: 'Talk' | 'Live' | 'Night';
  attendeeCount: number;
}

export interface Attendee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  tags: string[];
  intent: string; // "Why are you going?"
  vibeScore: number; // For filtering
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface DirectMessageSummary {
  id: string;
  user: Attendee;
  lastMessage: string;
  timestamp: string;
  relatedEventId: string; // Context
  unread: boolean;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export interface GalleryPost {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  likes: number;
  commentsCount: number;
  likedByMe: boolean;
  description: string;
  comments: Comment[];
}

export interface DialState {
  vibe: number;
  groupSize: number;
}