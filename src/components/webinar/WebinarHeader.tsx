
import React from 'react';
import { Users, ThumbsUp, Share2 } from 'lucide-react';

interface WebinarHeaderProps {
  viewerCount: number;
  likesCount: number;
  hasLiked: boolean;
  onLikeClick: () => void;
}

const WebinarHeader: React.FC<WebinarHeaderProps> = ({
  viewerCount,
  likesCount,
  hasLiked,
  onLikeClick
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
          A
        </div>
        <div>
          <h1 className="text-white font-medium">AI YouTube Masterclass</h1>
          <p className="text-gray-400 text-sm">With Alex Johnson</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-white">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">{viewerCount.toLocaleString()}</span>
        </div>
        <button 
          className={`flex items-center gap-2 ${hasLiked ? 'text-blue-500' : 'text-white'}`}
          onClick={onLikeClick}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm font-medium">{likesCount.toLocaleString()}</span>
        </button>
        <button className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default WebinarHeader;
