
import React from 'react';
import VideoPlayer from '../VideoPlayer';
import { Progress } from '@/components/ui/progress';
import { Users, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    <div className="rounded-xl overflow-hidden shadow-lg bg-white border-2 border-slate-800">
      {/* Professional clean container */}
      <div className="relative overflow-hidden">
        {/* Light dot pattern for background styling */}
        <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
          <div className="absolute top-2 left-2 w-40 h-40">
            <div className="grid grid-cols-8 gap-2">
              {Array(64).fill(0).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-2 right-2 w-40 h-40">
            <div className="grid grid-cols-8 gap-2">
              {Array(64).fill(0).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Clean video player styling */}
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
      </div>
      
      {/* Clean bottom bar with viewer and like counts */}
      <div className="bg-white py-3 px-4 border-t border-slate-100 flex items-center">
        <div className="flex items-center gap-6 text-slate-700">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{viewerCount.toLocaleString()} watching now</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp 
              className="w-4 h-4 text-blue-600 cursor-pointer" 
              onClick={onLike}
            />
            <span className="font-medium">{likesCount.toLocaleString()}</span>
          </div>
        </div>
        <div className="ml-auto text-sm text-slate-500">
          {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / 30:00
        </div>
      </div>
    </div>
  );
};

export default WebinarVideo;
