
import React from 'react';
import { MessagesSquare, ThumbsDown, ThumbsUp } from 'lucide-react';
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
}

const LiveChat: React.FC<LiveChatProps> = ({ messages }) => {
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
    <div className="h-full rounded-lg p-4 flex flex-col text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessagesSquare className="w-5 h-5" />
          <h2 className="font-semibold">{messages.length} Comments</h2>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white hover:bg-white/10">
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
            className="w-full bg-transparent border-b border-white/20 pb-1 focus:outline-none focus:border-white/40 placeholder:text-white/40"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-6">
          {sortedMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                {msg.avatar ? (
                  <img src={msg.avatar} alt={msg.author} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg">{msg.author[0]}</span>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{msg.author}</span>
                  <span className="text-white/40 text-sm">{msg.timeAgo || '7 days ago'}</span>
                </div>
                <p className="text-sm text-white/90">{msg.message}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-white/60 hover:text-white">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-xs">{msg.likes || 0}</span>
                  </button>
                  <button className="flex items-center text-white/60 hover:text-white">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <button className="text-white/60 hover:text-white text-sm">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LiveChat;
