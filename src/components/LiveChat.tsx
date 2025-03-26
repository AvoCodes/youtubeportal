
import React, { useState } from 'react';
import { ThumbsDown, ThumbsUp, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface ChatMessage {
  id: number;
  name: string;
  role?: string;
  message: string;
  hour: number;
  minute: number;
  second: number;
  mode?: string;
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
  onSendMessage?: (message: string) => void;
}

const LiveChat: React.FC<LiveChatProps> = ({ 
  messages, 
  onLike,
  hasLiked = false,
  onClose,
  onSendMessage
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-b-xl border border-gray-200 shadow-sm">
      {/* Chat header */}
      <div className="py-3 px-4 border-b border-gray-200 bg-white rounded-t-xl">
        <h3 className="font-medium text-sm">Live Chat</h3>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 p-4 pb-16">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 mb-4 max-w-full">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  {msg.avatar ? (
                    <AvatarImage src={msg.avatar} alt={msg.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                      {msg.name[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-gray-900">{msg.name}</span>
                    {msg.role && (
                      <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                        {msg.role}
                      </span>
                    )}
                    <span className="text-gray-500 text-xs">{msg.timeAgo || `${msg.hour}:${msg.minute.toString().padStart(2, '0')}`}</span>
                  </div>
                  <p className="text-sm text-gray-700 break-words">{msg.message}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <ThumbsUp className="w-3 h-3" />
                      <span className="text-xs">{msg.likes || 0}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Chat input - fixed at bottom */}
      <div className="p-3 bg-white border-t border-gray-200 rounded-b-xl">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className="bg-blue-600 text-white text-xs">
              A
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message in chat..."
              className="w-full border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
            />
            <button 
              onClick={handleSendMessage}
              className="ml-2 text-blue-500 hover:text-blue-700"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
