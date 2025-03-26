
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer';
import { Progress } from '@/components/ui/progress';
import { Users, ThumbsUp, Zap, Play } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const videoDuration = 5263; // 1 hour, 27 minutes, 43 seconds in seconds
  const isMobile = useIsMobile();
  
  // Simulate video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Reduced loading time for better UX
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-full w-full mb-4 md:mb-8 relative rounded-xl overflow-hidden shadow-2xl aspect-video bg-black">
      {/* Cinematic letterbox effect - reduced on mobile */}
      <div className={`absolute top-0 left-0 w-full ${isMobile ? 'h-[2%]' : 'h-[5%]'} bg-black z-20`}></div>
      <div className={`absolute bottom-0 left-0 w-full ${isMobile ? 'h-[2%]' : 'h-[5%]'} bg-black z-20`}></div>
      
      {/* Dramatic lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600/30 to-blue-700/30 mix-blend-overlay pointer-events-none z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 z-30"></div>
      
      {/* Video player container with expanded size */}
      <div className="relative z-5 w-full h-full">
        <VideoPlayer
          wistiaId="1a1gto8igi"
          onTimeUpdate={onTimeUpdate}
        />
        
        {/* Loading overlay with improved animation */}
        {loading && (
          <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-red-500 animate-pulse" />
              <span className="text-white font-semibold text-lg tracking-wider animate-pulse">LIVE</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="w-12 h-2 bg-gray-700" />
              <Skeleton className="w-24 h-2 bg-gray-700" />
              <Skeleton className="w-16 h-2 bg-gray-700" />
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent animate-spin animation-delay-300"></div>
              <Play className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-300 text-sm mt-6">Connecting to live stream...</p>
            <div className="flex items-center gap-2 mt-5">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm">{viewerCount} waiting</span>
            </div>
          </div>
        )}
        
        {/* Improved progress bar */}
        <div className={`absolute ${isMobile ? 'bottom-[2%]' : 'bottom-[5%]'} left-0 right-0 transform translate-y-[-10px] h-2 z-30 px-4`}>
          <Progress 
            value={(currentTime / videoDuration) * 100} 
            className="h-full rounded-full overflow-hidden" 
            indicatorClassName="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"
          />
        </div>
        
        {/* Live indicator and viewer count overlay - adjusted for mobile */}
        <div className={`absolute ${isMobile ? 'top-[2%]' : 'top-[5%]'} left-0 transform translate-y-[10px] px-4 flex items-center gap-3 z-30`}>
          <div className="bg-red-600/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            LIVE
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs flex items-center gap-1.5">
            <Users className="w-3 h-3" />
            {viewerCount.toLocaleString()}
          </div>
        </div>
        
        {/* Notification with improved styling */}
        {showNotification && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-black shadow-lg border border-gray-200 max-w-xs animate-in fade-in slide-in-from-top duration-300 z-30">
            <h4 className="font-semibold text-sm">{notification.title}</h4>
            <p className="text-xs text-gray-700">{notification.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebinarVideo;
