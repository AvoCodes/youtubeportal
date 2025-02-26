
import React from 'react';
import { Check, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface Section {
  id: number;
  title: string;
  timestamp: number;
  points: number;
  completed: boolean;
}

interface VideoTimelineProps {
  currentTime: number;
  duration: number;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({ currentTime, duration }) => {
  const { toast } = useToast();
  const [sections, setSections] = React.useState<Section[]>([
    { id: 1, title: "Introduction", timestamp: 30, points: 5, completed: false },
    { id: 2, title: "AI YouTube Basics", timestamp: 120, points: 10, completed: false },
    { id: 3, title: "Content Strategy", timestamp: 240, points: 15, completed: false },
    { id: 4, title: "Audience Building", timestamp: 360, points: 20, completed: false },
    { id: 5, title: "Revenue Streams", timestamp: 480, points: 25, completed: false },
    { id: 6, title: "Monetization Tips", timestamp: 600, points: 30, completed: false },
    { id: 7, title: "Growth Hacks", timestamp: 720, points: 35, completed: false },
    { id: 8, title: "Scaling Methods", timestamp: 900, points: 40, completed: false },
    { id: 9, title: "Advanced Strategies", timestamp: 1200, points: 45, completed: false },
    { id: 10, title: "Final Tips", timestamp: 1500, points: 50, completed: false },
  ]);
  
  const [totalPoints, setTotalPoints] = React.useState(0);
  const progress = (currentTime / duration) * 100;

  React.useEffect(() => {
    sections.forEach(section => {
      if (!section.completed && currentTime >= section.timestamp) {
        setSections(prev => prev.map(s => 
          s.id === section.id ? { ...s, completed: true } : s
        ));
        setTotalPoints(prev => prev + section.points);
        
        toast({
          title: `✨ Achievement Unlocked: ${section.title}`,
          description: `+${section.points} points earned! Keep learning!`,
          duration: 3000,
        });
      }
    });
  }, [currentTime, sections, toast]);

  return (
    <div className="relative py-6 px-4 bg-gradient-to-r from-slate-50 to-slate-100">
      <div className="absolute right-4 top-2 flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 text-blue-600 rounded-full px-3 py-1.5 border border-blue-100">
        <Trophy className="w-4 h-4" />
        <span className="font-medium">{totalPoints} points</span>
      </div>
      
      <Progress 
        value={progress} 
        className="h-1.5 mb-6 bg-slate-100" 
        indicatorClassName="bg-gradient-to-r from-blue-400 to-indigo-400"
      />
      
      <div className="grid grid-cols-10 gap-2">
        {sections.map((section) => (
          <div 
            key={section.id}
            className={`relative flex flex-col items-center group ${
              section.completed ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <div className={`w-3 h-3 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
              section.completed 
                ? 'bg-gradient-to-r from-blue-400 to-indigo-400 scale-110' 
                : 'bg-slate-200'
            }`}>
              {section.completed && <Check className="w-2 h-2 text-white" />}
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              {section.title}
              {section.completed && <span className="ml-1 text-emerald-400">+{section.points}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTimeline;
