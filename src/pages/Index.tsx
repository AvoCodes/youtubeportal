
import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import LiveChat, { ChatMessage } from '../components/LiveChat';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

const CHAT_MESSAGES: ChatMessage[] = [
  { id: 1, author: "Mike Chen", message: "Ready to learn! 🚀", timestamp: 5 },
  { id: 2, author: "Sarah Parker", message: "Those revenue numbers are insane!", timestamp: 15 },
  { id: 3, author: "Alex Thompson", message: "Never knew YouTube was paying creators this much", timestamp: 30 },
  { id: 4, author: "Rachel Kim", message: "$57/hour equivalent? That's better than my current job", timestamp: 45 },
  { id: 5, author: "James Wilson", message: "Love that this doesn't require showing your face", timestamp: 60 },
  { id: 6, author: "Emily Davis", message: "The AI tools look so easy to use", timestamp: 90 },
  { id: 7, author: "David Martinez", message: "This is exactly what I've been looking for - a way to start without being on camera", timestamp: 120 },
  { id: 8, author: "Lisa Wong", message: "Those example channels are getting crazy views!", timestamp: 150 },
  { id: 9, author: "Tom Bradley", message: "Impressive how fast you can create content with AI", timestamp: 180 },
  { id: 10, author: "Jessica Lee", message: "Love the transparency about the results", timestamp: 210 },
  { id: 11, author: "Chris Anderson", message: "The niche selection strategy makes so much sense", timestamp: 240 },
  { id: 12, author: "Maria Garcia", message: "That AI video generation is mind-blowing 🤯", timestamp: 270 },
  { id: 13, author: "Kevin Zhang", message: "The math behind scaling multiple channels is compelling", timestamp: 300 },
  { id: 14, author: "Amanda White", message: "Those student success stories are inspiring!", timestamp: 330 },
  { id: 15, author: "Ryan Cooper", message: "The community aspect sounds really valuable", timestamp: 360 }
];

const Index = () => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [viewerCount, setViewerCount] = React.useState(1328);
  const { toast } = useToast();

  React.useEffect(() => {
    // Simulate fluctuating viewer count for engagement
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6">
            <div className="relative">
              <VideoPlayer
                wistiaId="92627nrxy4"
                onTimeUpdate={handleTimeUpdate}
              />
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white animate-fade-in">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">{viewerCount.toLocaleString()} watching</span>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <Badge variant="secondary" className="bg-red-500/80 backdrop-blur-sm text-white border-none animate-pulse">
                  LIVE
                </Badge>
                <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-none">
                  Premium Webinar
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-white/5 rounded-xl blur-xl"></div>
            <div className="relative">
              <LiveChat
                messages={CHAT_MESSAGES}
                currentTime={currentTime}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm animate-pulse">
            Don't leave! More exclusive content coming up...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
