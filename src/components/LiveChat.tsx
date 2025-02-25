
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface ChatMessage {
  id: number;
  author: string;
  message: string;
  timestamp: number; // in seconds
  avatar?: string;
}

interface LiveChatProps {
  messages: ChatMessage[];
  currentTime: number;
}

const LiveChat: React.FC<LiveChatProps> = ({ messages, currentTime }) => {
  const [visibleMessages, setVisibleMessages] = React.useState<ChatMessage[]>([]);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const filtered = messages.filter(msg => msg.timestamp <= currentTime);
    setVisibleMessages(filtered);
  }, [currentTime, messages]);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  return (
    <div className="glass-panel h-full rounded-lg p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4 p-2 border-b">
        <MessageCircle className="w-5 h-5" />
        <h2 className="font-semibold">Live Chat</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-2">
          {visibleMessages.map((msg) => (
            <div key={msg.id} className="chat-message flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                {msg.avatar ? (
                  <img src={msg.avatar} alt={msg.author} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-medium">{msg.author[0]}</span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{msg.author}</p>
                <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LiveChat;
