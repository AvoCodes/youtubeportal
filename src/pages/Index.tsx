
import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import LiveChat, { ChatMessage } from '../components/LiveChat';
import { useToast } from '@/components/ui/use-toast';

// Simulated chat messages
const CHAT_MESSAGES: ChatMessage[] = [
  { id: 1, author: "Sarah Johnson", message: "Excited to be here!", timestamp: 5 },
  { id: 2, author: "David Chen", message: "This is exactly what I've been looking for.", timestamp: 15 },
  { id: 3, author: "Emma Williams", message: "The insights are amazing!", timestamp: 30 },
  { id: 4, author: "Michael Brown", message: "Can't wait to implement these strategies.", timestamp: 45 },
  { id: 5, author: "Lisa Anderson", message: "This is transformative content.", timestamp: 60 },
  // Add more messages as needed
];

const Index = () => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const { toast } = useToast();

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6">
            <VideoPlayer
              wistiaId="92627nrxy4"
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
          
          <div>
            <LiveChat
              messages={CHAT_MESSAGES}
              currentTime={currentTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
