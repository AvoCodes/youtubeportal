
import React from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface ChatMessage {
  id: number;
  author: string;
  message: string;
  timestamp: number;
  avatar?: string;
  likes?: number;
  timeAgo?: string;
}

interface LiveChatProps {
  messages: ChatMessage[];
  currentTime: number;
  viewerCount?: number;
  likesCount?: number;
  onLike?: () => void;
  hasLiked?: boolean;
  onClose?: () => void;
}

const LiveChat: React.FC<LiveChatProps> = ({ 
  messages, 
  onLike,
  hasLiked = false,
  onClose
}) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 relative">
      {/* Chat messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pb-16">
          <div className="space-y-4 p-4 pb-20">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 mb-5 max-w-full">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  {msg.avatar ? (
                    <AvatarImage src={msg.avatar} alt={msg.author} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {msg.author[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-gray-900">{msg.author}</span>
                    <span className="text-gray-500 text-xs">{msg.timeAgo || '7 days ago'}</span>
                  </div>
                  <p className="text-sm text-gray-700 break-words">{msg.message}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs">{msg.likes || 0}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Chat input - fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarFallback className="bg-blue-600 text-white">
              A
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Message in chat..."
              className="w-full border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
