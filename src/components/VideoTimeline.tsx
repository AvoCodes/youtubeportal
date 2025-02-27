
import React from 'react';
import { Check, BookOpen, Lightbulb, DollarSign, Star, Award, Rocket } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
      title: "Introduction", 
      description: "Learn the fundamentals of AI YouTube automation",
      timestamp: 30, 
      points: 5, 
      completed: false,
      icon: <BookOpen className="w-5 h-5 text-blue-500" />
    },
    { 
      id: 2, 
      title: "Content Strategy", 
      description: "Discover the best-performing niches and AI content types",
      timestamp: 180, 
      points: 15, 
      completed: false,
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />
    },
    { 
      id: 3, 
      title: "Monetization", 
      description: "Set up multiple revenue streams for your channel",
      timestamp: 400, 
      points: 25, 
      completed: false,
      icon: <DollarSign className="w-5 h-5 text-green-500" />
    },
    { 
      id: 4, 
      title: "Scaling Systems", 
      description: "Build systems to manage multiple channels at once",
      timestamp: 720, 
      points: 35, 
      completed: false,
      icon: <Rocket className="w-5 h-5 text-purple-500" />
    },
    { 
      id: 5, 
      title: "Case Studies", 
      description: "Real-world examples of successful AI channels",
      timestamp: 1020, 
      points: 40, 
      completed: false,
      icon: <Star className="w-5 h-5 text-yellow-500" />
    },
    { 
      id: 6, 
      title: "Next Steps", 
      description: "How to get started with your first channel",
      timestamp: 1500, 
      points: 50, 
      completed: false,
      icon: <Award className="w-5 h-5 text-red-500" />
    },
  ]);
  
  const [totalPoints, setTotalPoints] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState<Section | null>(null);
  
  const calculateProgress = () => {
    const completedSections = sections.filter(section => section.completed).length;
    return (completedSections / sections.length) * 100;
  };

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

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-slate-800">Webinar Content Roadmap</h3>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
          <Award className="w-4 h-4" />
          <span className="font-medium">{totalPoints} points earned</span>
        </div>
      </div>
      
      <div className="relative">
        {/* Timeline Track */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-slate-100 z-0"></div>
        
        {/* Timeline Progress */}
        <div 
          className="absolute top-6 left-0 h-1 bg-blue-500 z-0 transition-all duration-300"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
        
        {/* Timeline Sections */}
        <div className="relative z-10 grid grid-cols-6 gap-2">
          {sections.map((section) => (
            <div 
              key={section.id}
              className="flex flex-col items-center"
            >
              <button 
                onClick={() => setActiveSection(section)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeSection?.id === section.id 
                    ? 'bg-blue-100 ring-2 ring-blue-500 ring-offset-2' 
                    : section.completed 
                      ? 'bg-blue-50' 
                      : 'bg-slate-50'
                }`}
              >
                {section.completed ? (
                  section.icon
                ) : (
                  <div className={`w-4 h-4 rounded-full ${
                    activeSection?.id === section.id ? 'bg-blue-500' : 'bg-slate-300'
                  }`}></div>
                )}
              </button>
              <span className={`text-xs mt-2 font-medium text-center transition-colors ${
                activeSection?.id === section.id 
                  ? 'text-blue-700' 
                  : section.completed 
                    ? 'text-slate-700' 
                    : 'text-slate-500'
              }`}>
                {section.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Active Section Details */}
      {activeSection && (
        <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
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
