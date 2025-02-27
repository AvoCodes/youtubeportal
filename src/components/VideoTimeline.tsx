
import React from 'react';
import { Check, BookOpen, Lightbulb, DollarSign, Star, Award, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [visibleSections, setVisibleSections] = React.useState<number[]>([1, 2, 3, 4, 5, 6]);
  const timelineRef = React.useRef<HTMLDivElement>(null);
  
  // For mobile scrolling
  const [showLeftScroll, setShowLeftScroll] = React.useState(false);
  const [showRightScroll, setShowRightScroll] = React.useState(false);
  
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

  // Check if scrolling is needed
  React.useEffect(() => {
    const checkScrollButtons = () => {
      if (timelineRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = timelineRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
      }
    };

    // Initial check
    checkScrollButtons();

    // Add scroll event listener
    const timelineElement = timelineRef.current;
    if (timelineElement) {
      timelineElement.addEventListener('scroll', checkScrollButtons);
      
      // Cleanup
      return () => {
        timelineElement.removeEventListener('scroll', checkScrollButtons);
      };
    }
  }, []);

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineRef.current) {
      const scrollAmount = 150; // Adjust scroll amount as needed
      const newScrollLeft = direction === 'left' 
        ? timelineRef.current.scrollLeft - scrollAmount 
        : timelineRef.current.scrollLeft + scrollAmount;
      
      timelineRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-slate-800">Roadmap</h3>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
          <Award className="w-4 h-4" />
          <span className="font-medium">{totalPoints} points earned</span>
        </div>
      </div>
      
      <div className="relative">
        {/* Mobile Timeline Navigation */}
        <div className="relative pb-4">
          {/* Show left scroll button when needed */}
          {showLeftScroll && (
            <button 
              onClick={() => scrollTimeline('left')}
              className="absolute left-0 top-6 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow-md border border-slate-200 md:hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
          )}
          
          {/* Show right scroll button when needed */}
          {showRightScroll && (
            <button 
              onClick={() => scrollTimeline('right')}
              className="absolute right-0 top-6 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow-md border border-slate-200 md:hidden"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          )}
          
          {/* Timeline Track */}
          <div className="absolute top-6 left-5 right-5 md:left-0 md:right-0 h-1 bg-slate-100 z-0"></div>
          
          {/* Timeline Progress */}
          <div 
            className="absolute top-6 left-5 md:left-0 h-1 bg-blue-500 z-0 transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
          
          {/* Timeline Sections - Scrollable on mobile */}
          <div 
            ref={timelineRef}
            className="relative z-10 flex md:grid md:grid-cols-6 overflow-x-auto scrollbar-none py-1 px-3 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sections.map((section) => (
              <div 
                key={section.id}
                className="flex flex-col items-center flex-shrink-0 w-24 md:w-auto mx-1 md:mx-0"
              >
                <button 
                  onClick={() => setActiveSection(section)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
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
                    <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
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
      </div>
      
      {/* Active Section Details */}
      {activeSection && (
        <div className="mt-4 md:mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
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
