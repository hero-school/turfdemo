import React, { useState } from 'react';
import { GALLERY_DATA } from '../constants';
import { AppMode, GalleryPost } from '../types';

interface CanvasTabProps {
  mode: AppMode;
  onSelectPost: (post: GalleryPost) => void;
}

const PulseLike: React.FC<{ liked: boolean, mode: AppMode, onClick: (e: React.MouseEvent) => void }> = ({ liked, mode, onClick }) => {
    // Custom "Dial" like button
    const activeColor = mode === 'day' ? 'bg-turfRed' : 'bg-turfYellow';
    const inactiveBorder = mode === 'day' ? 'border-turfBlack' : 'border-turfWhite';
    
    return (
        <button 
            onClick={onClick}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 active:scale-75 ${liked ? `${activeColor} border-transparent` : `bg-transparent ${inactiveBorder}`}`}
        >
            <div className={`w-2 h-2 bg-current rounded-full ${liked ? 'animate-ping text-white' : 'text-current'}`}></div>
        </button>
    );
};

export const CanvasTab: React.FC<CanvasTabProps> = ({ mode, onSelectPost }) => {
    // Note: In a real app, likes would update via API or global state. 
    // Here we use local state for the feed display.
    const [posts, setPosts] = useState<GalleryPost[]>(GALLERY_DATA);

    const toggleLike = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevent opening detail when liking
        setPosts(posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likedByMe: !post.likedByMe,
                    likes: post.likedByMe ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    const textColor = mode === 'day' ? 'text-turfBlack' : 'text-turfWhite';
    const borderColor = mode === 'day' ? 'border-turfBlack/10' : 'border-turfPurple';

    return (
        <div className="flex flex-col h-full pt-6 pb-4 overflow-y-auto animate-fade-in px-4">
            
            <div className="mb-6 px-2">
                <h1 className={`font-thunder-sim text-6xl leading-[0.85] ${textColor}`}>
                    TURF <br/> CANVAS
                </h1>
                <p className={`font-barlow uppercase text-sm mt-2 font-bold tracking-wider opacity-60`}>
                    Art, Tech & Culture Feed
                </p>
            </div>

            <div className="space-y-8">
                {posts.map(post => (
                    <div 
                        key={post.id} 
                        onClick={() => onSelectPost(post)}
                        className={`flex flex-col border-b-2 pb-6 cursor-pointer group ${borderColor}`}
                    >
                        {/* Image Container */}
                        <div className={`relative w-full aspect-[4/5] overflow-hidden mb-4 border transition-colors ${mode === 'day' ? 'border-turfBlack group-hover:border-turfRed' : 'border-turfWhite/20 group-hover:border-turfYellow'}`}>
                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            
                            {/* Floating Badge */}
                            <div className="absolute top-4 left-4">
                                <span className={`px-2 py-1 font-barlow text-xs uppercase font-bold bg-turfBlack text-turfWhite`}>
                                    @{post.author}
                                </span>
                            </div>
                        </div>

                        {/* Actions & Meta */}
                        <div className="flex justify-between items-end px-1">
                            <div>
                                <h3 className={`font-thunder-sim text-4xl leading-none transition-colors ${textColor} ${mode === 'day' ? 'group-hover:text-turfRed' : 'group-hover:text-turfYellow'}`}>
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="font-barlow text-xs font-bold uppercase opacity-60">
                                        {post.likes} Signals
                                    </span>
                                    <span className="font-barlow text-xs font-bold uppercase opacity-60">
                                        {post.commentsCount} Comments
                                    </span>
                                </div>
                            </div>

                            <PulseLike 
                                liked={post.likedByMe} 
                                mode={mode} 
                                onClick={(e) => toggleLike(e, post.id)} 
                            />
                        </div>
                    </div>
                ))}
                
                <div className="py-8 text-center opacity-40 font-barlow uppercase text-xs">
                    End of Feed
                </div>
            </div>

        </div>
    );
};