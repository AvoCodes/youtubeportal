
import React from 'react';
import VideoPlayer from '../VideoPlayer';
import { Progress } from '@/components/ui/progress';
import { Users, ThumbsUp } from 'lucide-react';

interface WebinarVideoProps {
  currentTime: number;
  viewerCount: number;
  likesCount: number;
  onTimeUpdate: (time: number) => void;
  showNotification: boolean;
  notification: { title: string, message: string };
  onLike: () => void;
}

const WebinarVideo: React.FC<WebinarVideoProps> = ({
  currentTime,
  viewerCount,
  likesCount,
  onTimeUpdate,
  showNotification,
  notification,
  onLike
}) => {
  return (
    <div className="w-full mb-8 rounded-xl overflow-hidden shadow-xl relative">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-red-700/20 mix-blend-overlay pointer-events-none z-10 rounded-xl"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-600 z-20"></div>
      
      {/* Video player */}
      <div className="relative z-10">
        <VideoPlayer
          wistiaId="92627nrxy4"
          onTimeUpdate={onTimeUpdate}
        />
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5">
          <Progress 
            value={(currentTime / 1800) * 100} 
            className="h-full" 
            indicatorClassName="bg-blue-500"
          />
        </div>
        
        {showNotification && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-black shadow-lg border border-gray-200 max-w-xs animate-in fade-in slide-in-from-top duration-300">
            <h4 className="font-semibold text-sm">{notification.title}</h4>
            <p className="text-xs text-gray-700">{notification.message}</p>
          </div>
        )}
      </div>
      
      {/* Bottom stats bar */}
      <div className="bg-white py-3 px-4 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-sm sm:text-base">{viewerCount.toLocaleString()} watching</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp 
              className="w-4 h-4 text-blue-600 cursor-pointer" 
              onClick={onLike}
            />
            <span className="font-medium text-sm sm:text-base">{likesCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarVideo;
