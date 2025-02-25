
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
    { id: 1, title: "Introduction to AI YouTube", timestamp: 60, points: 10, completed: false },
    { id: 2, title: "Content Strategy", timestamp: 300, points: 25, completed: false },
    { id: 3, title: "Revenue Breakdown", timestamp: 765, points: 50, completed: false },
    { id: 4, title: "Scaling Methods", timestamp: 1200, points: 75, completed: false },
    { id: 5, title: "Advanced Tips", timestamp: 1500, points: 100, completed: false },
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
          title: `🎉 Section Complete: ${section.title}`,
          description: `+${section.points} points earned! Keep going!`,
          duration: 3000,
        });
      }
    });
  }, [currentTime, sections, toast]);

  return (
    <div className="relative py-6 px-4">
      <div className="absolute right-4 top-2 flex items-center gap-2 bg-yellow-500/10 text-yellow-500 rounded-full px-3 py-1.5">
        <Trophy className="w-4 h-4" />
        <span className="font-medium">{totalPoints} points</span>
      </div>
      
      <Progress value={progress} className="h-2 mb-6" />
      
      <div className="grid grid-cols-5 gap-2">
        {sections.map((section) => (
          <div 
            key={section.id}
            className={`relative flex flex-col items-center group ${
              section.completed ? 'text-green-500' : 'text-white/60'
            }`}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center mb-2 transition-colors ${
              section.completed ? 'bg-green-500' : 'bg-white/20'
            }`}>
              {section.completed && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
              {section.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTimeline;
