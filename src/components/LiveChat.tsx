
import React from 'react';
import { MessagesSquare, ThumbsDown, ThumbsUp, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

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
}

const LiveChat: React.FC<LiveChatProps> = ({ 
  messages, 
  viewerCount = 0,
  likesCount = 0,
  onLike,
  hasLiked = false
}) => {
  const [sortBy, setSortBy] = React.useState<'top' | 'newest'>('top');

  const sortedMessages = React.useMemo(() => {
    return [...messages].sort((a, b) => {
      if (sortBy === 'top') {
        return (b.likes || 0) - (a.likes || 0);
      }
      return b.timestamp - a.timestamp;
    });
  }, [messages, sortBy]);

  return (
    <div className="h-full rounded-lg flex flex-col bg-gray-50">
      {/* Viewer count and likes section */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">{viewerCount.toLocaleString()} watching now</span>
          </div>
          <button 
            className={`flex items-center gap-2 ${hasLiked ? 'text-blue-600' : 'text-gray-700'}`}
            onClick={onLike}
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm">{likesCount.toLocaleString()}</span>
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-900">
            <MessagesSquare className="w-5 h-5" />
            <h2 className="font-semibold">{messages.length} Comments</h2>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-200">
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy('top')}>
                Top comments
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('newest')}>
                Newest first
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-start gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg">
            A
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full bg-white border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            {sortedMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden flex-shrink-0 text-white">
                  {msg.avatar ? (
                    <img src={msg.avatar} alt={msg.author} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg">{msg.author[0]}</span>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900">{msg.author}</span>
                    <span className="text-gray-500 text-sm">{msg.timeAgo || '7 days ago'}</span>
                  </div>
                  <p className="text-sm text-gray-700">{msg.message}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs">{msg.likes || 0}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-blue-600 text-sm">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LiveChat;
