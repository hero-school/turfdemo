import React, { useState } from 'react';
import { AppMode, GalleryPost, Comment } from '../types';

interface CanvasDetailProps {
  post: GalleryPost;
  mode: AppMode;
  onBack: () => void;
}

const PulseLike: React.FC<{ liked: boolean, mode: AppMode, onClick: () => void }> = ({ liked, mode, onClick }) => {
  const activeColor = mode === 'day' ? 'bg-turfRed' : 'bg-turfYellow';
  const inactiveBorder = mode === 'day' ? 'border-turfBlack' : 'border-turfWhite';
  
  return (
      <button 
          onClick={onClick}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 active:scale-75 ${liked ? `${activeColor} border-transparent` : `bg-transparent ${inactiveBorder}`}`}
      >
          <div className={`w-3 h-3 bg-current rounded-full ${liked ? 'animate-ping text-white' : 'text-current'}`}></div>
      </button>
  );
};

export const CanvasDetailScreen: React.FC<CanvasDetailProps> = ({ post, mode, onBack }) => {
  const [liked, setLiked] = useState(post.likedByMe);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [newComment, setNewComment] = useState('');

  const textColor = mode === 'day' ? 'text-turfBlack' : 'text-turfWhite';
  const subTextColor = mode === 'day' ? 'text-turfBlack/60' : 'text-turfWhite/60';
  const borderColor = mode === 'day' ? 'border-turfBlack' : 'border-turfWhite/20';
  const inputBg = mode === 'day' ? 'bg-white' : 'bg-white/10';

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      user: 'Me',
      text: newComment,
      timestamp: 'Just now'
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="flex flex-col h-full bg-grain overflow-y-auto animate-fade-in relative z-50">
      
      {/* Sticky Header */}
      <div className={`sticky top-0 z-10 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b ${borderColor} ${mode === 'day' ? 'bg-turfWhite/80' : 'bg-turfBlack/80'}`}>
        <button onClick={onBack} className={`text-sm font-barlow uppercase font-bold hover:underline ${textColor}`}>
           ← Back to Canvas
        </button>
        <span className={`font-thunder-sim text-xl ${textColor}`}>DETAILS</span>
      </div>

      {/* Content */}
      <div className="pb-20">
        {/* Image */}
        <div className="w-full aspect-[4/5] relative">
          <img src={post.imageUrl} className="w-full h-full object-cover" />
          <div className="absolute bottom-[-24px] right-6">
             <PulseLike liked={liked} mode={mode} onClick={handleLike} />
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pt-8 mb-8">
           <h1 className={`font-thunder-sim text-5xl leading-[0.85] mb-2 ${textColor}`}>{post.title}</h1>
           <div className="flex justify-between items-center mb-6">
              <span className={`px-2 py-1 bg-turfBlack text-turfWhite font-barlow text-sm uppercase font-bold`}>
                @{post.author}
              </span>
              <span className={`font-barlow font-bold uppercase ${subTextColor}`}>
                {likesCount} Signals
              </span>
           </div>
           
           <p className={`font-barlow text-lg leading-tight ${textColor} border-l-2 pl-4 ${mode === 'day' ? 'border-turfRed' : 'border-turfYellow'}`}>
             {post.description}
           </p>
        </div>

        {/* Comments Section */}
        <div className={`px-6 pt-6 border-t ${borderColor}`}>
          <h3 className={`font-thunder-sim text-3xl mb-4 ${textColor}`}>COMMENTS ({comments.length})</h3>
          
          <div className="space-y-4 mb-8">
            {comments.length === 0 ? (
               <p className={`font-barlow italic opacity-50 ${textColor}`}>No comments yet. Start the signal.</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="flex flex-col">
                   <div className="flex justify-between items-baseline mb-1">
                      <span className={`font-thunder-sim text-xl ${textColor}`}>{comment.user}</span>
                      <span className="text-[10px] font-barlow uppercase opacity-50">{comment.timestamp}</span>
                   </div>
                   <p className={`font-barlow text-sm ${subTextColor}`}>{comment.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment */}
          <form onSubmit={handleSubmitComment} className="flex gap-2 mb-8">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your noise..."
              className={`flex-1 p-3 font-barlow border focus:outline-none ${inputBg} ${borderColor} ${textColor} placeholder-current placeholder-opacity-40`}
            />
            <button 
              type="submit" 
              disabled={!newComment.trim()}
              className={`px-4 font-thunder-sim text-xl uppercase transition-opacity ${!newComment.trim() ? 'opacity-50' : 'opacity-100'} ${mode === 'day' ? 'bg-turfBlack text-white' : 'bg-turfWhite text-black'}`}
            >
              POST
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};