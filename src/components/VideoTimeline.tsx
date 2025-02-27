
import React from 'react';
import { Check, BookOpen, Lightbulb, DollarSign, Star, Award, Rocket } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

interface Section {
  id: number;
  title: string;
  description: string;
  timestamp: number;
  points: number;
  completed: boolean;
  icon: React.ReactNode;
}

interface VideoTimelineProps {
  currentTime: number;
  duration: number;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({ currentTime, duration }) => {
  const { toast } = useToast();
  const [sections, setSections] = React.useState<Section[]>([
    { 
      id: 1, 
      title: "Intro", 
      description: "The Temporary $15.5B YouTube Portal",
      timestamp: 30, 
      points: 5, 
      completed: false,
      icon: <BookOpen className="w-5 h-5 text-blue-500" />
    },
    { 
      id: 2, 
      title: "The Opportunity", 
      description: "Why Now?",
      timestamp: 180, 
      points: 15, 
      completed: false,
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />
    },
    { 
      id: 3, 
      title: "Niche Selection", 
      description: "How To Ride Viral Waves",
      timestamp: 400, 
      points: 25, 
      completed: false,
      icon: <DollarSign className="w-5 h-5 text-green-500" />
    },
    { 
      id: 4, 
      title: "AI Shorts", 
      description: "Let Robots Do All Of The Heavy Lifting",
      timestamp: 720, 
      points: 35, 
      completed: false,
      icon: <Rocket className="w-5 h-5 text-purple-500" />
    },
    { 
      id: 5, 
      title: "The Multiplier Effect", 
      description: "Creating Viral Shorts At Scale",
      timestamp: 1020, 
      points: 40, 
      completed: false,
      icon: <Star className="w-5 h-5 text-yellow-500" />
    },
    { 
      id: 6, 
      title: "Limited Bonus", 
      description: "How to get started with your first channel",
      timestamp: 1500, 
      points: 50, 
      completed: false,
      icon: <Award className="w-5 h-5 text-red-500" />
    },
  ]);
  
  const [totalPoints, setTotalPoints] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState<Section | null>(null);
  
  // Format timestamp to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate the progress percentage
  const progressPercentage = (currentTime / duration) * 100;
  
  React.useEffect(() => {
    sections.forEach(section => {
      if (!section.completed && currentTime >= section.timestamp) {
        setSections(prev => prev.map(s => 
          s.id === section.id ? { ...s, completed: true } : s
        ));
        setTotalPoints(prev => prev + section.points);
        
        toast({
          title: `✨ Section Completed: ${section.title}`,
          description: `+${section.points} points earned! Keep watching to unlock more content.`,
          duration: 3000,
        });
      }
    });
    
    // Set active section
    const currentSection = [...sections]
      .sort((a, b) => b.timestamp - a.timestamp)
      .find(section => currentTime >= section.timestamp);
      
    if (currentSection && (!activeSection || activeSection.id !== currentSection.id)) {
      setActiveSection(currentSection);
    }
  }, [currentTime, sections, toast, activeSection]);

  // Calculate time markers (divide duration into equal parts)
  const timeMarkers = React.useMemo(() => {
    const markers = [0];
    const increment = Math.floor(duration / 4);
    
    for (let i = 1; i < 4; i++) {
      markers.push(i * increment);
    }
    
    markers.push(duration);
    return markers;
  }, [duration]);

  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-slate-800">Roadmap</h3>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
          <Award className="w-4 h-4" />
          <span className="font-medium">{totalPoints} points earned</span>
        </div>
      </div>
      
      <div className="relative pb-2">
        {/* Progress Bar */}
        <Progress 
          value={progressPercentage} 
          className="h-2.5 bg-slate-200" 
          indicatorClassName="bg-blue-500"
          showThumb={true}
        />
        
        {/* Time Markers */}
        <div className="flex justify-between mt-2 text-sm text-slate-500">
          {timeMarkers.map((time, index) => (
            <div key={index}>{formatTime(time)}</div>
          ))}
        </div>
      </div>
      
      {/* Active Section Details */}
      {activeSection && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              {activeSection.icon}
            </div>
            <div>
              <h4 className="text-lg font-medium text-slate-800">{activeSection.title}</h4>
              <p className="text-slate-600 mt-1">{activeSection.description}</p>
              
              {activeSection.completed ? (
                <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  <span>Completed</span>
                  <span className="text-xs bg-green-100 px-2 py-0.5 rounded-full">+{activeSection.points} pts</span>
                </div>
              ) : (
                <div className="text-sm text-slate-500 mt-2">
                  In progress... +{activeSection.points} points upon completion
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTimeline;
