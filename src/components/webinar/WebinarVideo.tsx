
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer';
import { Progress } from '@/components/ui/progress';
import { Users, ThumbsUp, Zap, Play } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

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
  const [loading, setLoading] = useState(true);

  // Simulate video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

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
        
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-red-500 animate-pulse" />
              <span className="text-white font-semibold text-lg tracking-wider animate-pulse">LIVE</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="w-12 h-2 bg-gray-700" />
              <Skeleton className="w-24 h-2 bg-gray-700" />
              <Skeleton className="w-16 h-2 bg-gray-700" />
            </div>
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <Play className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-300 text-sm mt-4">Connecting to live stream...</p>
            <div className="flex items-center gap-2 mt-5">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm">{viewerCount} waiting</span>
            </div>
          </div>
        )}
        
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
