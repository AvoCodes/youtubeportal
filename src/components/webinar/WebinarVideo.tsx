
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer';
import { Progress } from '@/components/ui/progress';
import { Users, ThumbsUp, Zap, Play, MessageSquare, X } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import LiveChat from '../LiveChat';
import { loadChatFromCsv } from '@/utils/chatImporter';

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
  const [visibleChatMessages, setVisibleChatMessages] = useState<any[]>([]);
  const [allChatMessages, setAllChatMessages] = useState<any[]>([]);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(true);
  const videoDuration = 5263; // 1 hour, 27 minutes, 43 seconds in seconds
  
  // Load chat messages from CSV file
  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        setIsLoadingChat(true);
        const messages = await loadChatFromCsv('/chat_log.csv');
        console.log(`Loaded ${messages.length} chat messages`);
        setAllChatMessages(messages);
      } catch (error) {
        console.error('Error loading chat messages:', error);
      } finally {
        setIsLoadingChat(false);
      }
    };
    
    fetchChatMessages();
  }, []);
  
  // Filter chat messages based on current time
  useEffect(() => {
    if (allChatMessages.length === 0) return;
    
    const filteredMessages = allChatMessages
      .filter(msg => {
        // Convert HH:MM:SS to seconds for comparison with currentTime
        const totalSeconds = (msg.hour * 3600) + (msg.minute * 60) + msg.second;
        return totalSeconds <= currentTime;
      })
      .slice(-100) // Only show the last 100 messages to prevent performance issues
      .map((msg, index) => ({
        ...msg,
        likes: msg.likes || Math.floor(Math.random() * 10),
        timeAgo: getTimeAgo(msg)
      }));
    
    setVisibleChatMessages(filteredMessages);
  }, [currentTime, allChatMessages]);

  // Function to generate relative time for chat messages
  const getTimeAgo = (msg: any) => {
    const messageTotalSeconds = (msg.hour * 3600) + (msg.minute * 60) + msg.second;
    const diff = currentTime - messageTotalSeconds;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  // Simulate video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setChatExpanded(!chatExpanded);
  };

  return (
    <div className="w-full mb-8 rounded-xl overflow-hidden shadow-xl relative flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-red-700/20 mix-blend-overlay pointer-events-none z-10 rounded-xl"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-600 z-20"></div>
      
      {/* Video player section */}
      <div className="relative z-10 w-full">
        <VideoPlayer
          wistiaId="1a1gto8igi"
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
            value={(currentTime / videoDuration) * 100} 
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
        
        {/* Chat toggle button - floating over the video */}
        <button 
          onClick={toggleChat}
          className="flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full absolute bottom-4 right-4 z-30 shadow-md"
        >
          {chatExpanded ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Live Chat - now below the video */}
      {chatExpanded && (
        <div className="w-full border-t border-gray-200 rounded-b-xl overflow-hidden">
          <div className="h-80">
            {isLoadingChat ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-gray-500">Loading chat messages...</span>
              </div>
            ) : (
              <LiveChat 
                messages={visibleChatMessages} 
                currentTime={currentTime}
                onLike={onLike}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebinarVideo;
