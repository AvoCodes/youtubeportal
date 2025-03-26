
import React, { useState, useEffect } from 'react';
import WebinarMilestoneDialog from '../components/webinar/WebinarMilestoneDialog';
import { useToast } from '@/hooks/use-toast';
import { PaymentOption } from '../components/CTAButton';
import { Clock, Zap, Play, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import { Progress } from '@/components/ui/progress';

// Define milestones directly in this component
const MILESTONES_DATA = [
  {
    id: "early-bird",
    title: "Early Bird Access",
    description: "Get access to exclusive early bird bonuses",
    time: 1020,
    discount: 20
  },
  {
    id: "bonus-module",
    title: "Bonus Module",
    description: "Unlock premium AI Script Generator",
    time: 1800,
    discount: 15
  },
  {
    id: "final-offer",
    title: "Final Offer",
    description: "Last chance to join at this price",
    time: 3000,
    discount: 10
  }
];

// Define new attendees locally
const NEW_ATTENDEES = [
  { time: 360, name: "Ethan" },
  { time: 720, name: "Isabella" },
  { time: 1080, name: "Noah" },
  { time: 1440, name: "Amelia" },
  { time: 1800, name: "Jackson" },
  { time: 2160, name: "Sophia" },
  { time: 2520, name: "Lucas" },
  { time: 2880, name: "Olivia" },
  { time: 3240, name: "Liam" }
];

const Index = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [viewerCount, setViewerCount] = useState(1328);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ title: "", message: "" });
  const [showMilestoneOffer, setShowMilestoneOffer] = useState(false);
  const [seatsRemaining, setSeatsRemaining] = useState(37);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(600);
  const [likesCount, setLikesCount] = useState(2134);
  const [currentMilestone, setCurrentMilestone] = useState(MILESTONES_DATA[0]);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  
  const oneTimePaymentUrl = "https://whop.com/c/yt-portal-webinar/ot";
  const splitPaymentUrl = "https://whop.com/c/yt-portal-webinar/pp";
  
  const { toast } = useToast();
  const videoDuration = 5263; // 1 hour, 27 minutes, 43 seconds

  // Simulate video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleTimeBasedEvents = () => {
      NEW_ATTENDEES.forEach(attendee => {
        if (Math.abs(currentTime - attendee.time) < 5) {
          if (Math.random() > 0.3) {
            setSeatsRemaining(prev => Math.max(prev - 1, 5));
          }
        }
      });
      
      MILESTONES_DATA.forEach(milestone => {
        if (Math.abs(currentTime - milestone.time) < 5) {
          setCurrentMilestone(milestone);
          setShowMilestoneOffer(true);
          
          if (milestone.id === MILESTONES_DATA[MILESTONES_DATA.length - 1].id) {
            setCountdownActive(true);
          }
        }
      });
    };
    
    handleTimeBasedEvents();
  }, [currentTime]);

  useEffect(() => {
    let timer: number;
    if (countdownActive && countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdownActive, countdown]);

  // Simulate viewer count increasing during webinar
  useEffect(() => {
    const increaseViewers = () => {
      if (currentTime > 300 && currentTime < 4800) { // Only increase during main part of webinar
        if (Math.random() > 0.7) {
          setViewerCount(prev => prev + Math.floor(Math.random() * 3) + 1);
        }
      }
    };

    const intervalId = setInterval(increaseViewers, 15000);
    return () => clearInterval(intervalId);
  }, [currentTime]);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleCloseMilestoneOffer = () => {
    setShowMilestoneOffer(false);
  };

  const handleLike = () => {
    setLikesCount(prev => prev + 1);
    toast({
      title: "Thanks for the like!",
      description: "Your engagement helps the community.",
      duration: 3000,
    });
  };

  const handleCTAClick = (paymentOption: PaymentOption) => {
    toast({
      title: "🎉 Redirecting to checkout...",
      description: paymentOption === 'one-time' 
        ? "You selected the one-time payment option" 
        : "You selected the split-pay option",
      duration: 3000,
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Actual muting would need to be integrated with the video player
  };

  // Format time for countdown display
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black">
      {/* Cinematic letterbox effect - top and bottom black bars */}
      <div className="absolute top-0 left-0 right-0 h-[8%] bg-black z-30 shadow-[0_0_20px_rgba(0,0,0,0.9)]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black z-30 shadow-[0_0_20px_rgba(0,0,0,0.9)]"></div>
      
      {/* Absolutely positioned video that takes 100% of viewport */}
      <div className="absolute inset-0 w-full h-full z-0">
        <VideoPlayer
          wistiaId="1a1gto8igi"
          onTimeUpdate={handleTimeUpdate}
        />
      </div>

      {/* Film grain texture overlay for cinematic feel */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      {/* Optional vignette effect for depth */}
      <div className="absolute inset-0 z-10 pointer-events-none box-border" style={{
        boxShadow: 'inset 0 0 150px rgba(0, 0, 0, 0.9)'
      }}></div>
      
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center">
          <div className="relative w-28 h-28 flex items-center justify-center mb-12">
            <div className="absolute inset-0 rounded-full border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent animate-spin" style={{animationDelay: "300ms"}}></div>
            <div className="absolute top-[-5rem] left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xl font-bold text-white">
              The YouTube Portal
            </div>
            <Play className="w-14 h-14 text-white" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-6 h-6 text-red-500 animate-pulse" />
            <span className="text-white font-semibold text-lg tracking-wider animate-pulse">LIVE WEBINAR</span>
          </div>
          <p className="text-gray-300 text-sm mt-2">
            With Daniel Bitton, Made First Million At 17
          </p>
          <p className="text-gray-400 text-xs mt-8">Connecting to live stream...</p>
        </div>
      )}
      
      {/* Minimal UI elements - top right corner */}
      <div className="absolute top-[10%] right-6 z-20 flex gap-3">
        <button 
          onClick={toggleMute} 
          className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center gap-1.5 border border-red-500/30">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
          LIVE
        </div>
      </div>
      
      {/* Progress bar within the black bar area */}
      <div className="absolute bottom-[8%] left-0 right-0 z-40 transform translate-y-[-10px]">
        <Progress 
          value={(currentTime / videoDuration) * 100} 
          className="h-1" 
          indicatorClassName="bg-red-500" 
        />
      </div>
      
      {/* CTA section (bottom of screen, appears when triggered) */}
      {currentTime >= 2040 && (
        <div className="absolute bottom-[8%] left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-16 pb-6 px-8 z-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              {/* Left side: Key points */}
              <div className="space-y-4 text-white">
                <h2 className="text-2xl font-bold">AI YouTube Shorts Blueprint</h2>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-500/20 p-1 mt-0.5">
                      <span className="block h-3.5 w-3.5 rounded-full bg-blue-400/70"></span>
                    </div>
                    <p className="text-sm text-gray-300">Only <span className="text-blue-400 font-bold">{seatsRemaining}</span> spots remaining</p>
                  </div>
                  
                  {countdownActive && (
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-red-500/20 p-1 mt-0.5">
                        <Clock size={14} className="text-red-400" />
                      </div>
                      <p className="text-sm text-gray-300">Offer ends in <span className="text-red-400 font-mono font-bold">{formatCountdown(countdown)}</span></p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right side: Action buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => handleCTAClick('one-time')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg py-4 px-4 font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 border border-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>One-Time Payment ($995)</span>
                  <ArrowRight size={16} className="ml-1" />
                </button>
                
                <button 
                  onClick={() => handleCTAClick('split-pay')}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg py-4 px-4 font-medium flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 border border-purple-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>4 Monthly Payments ($399)</span>
                  <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <WebinarMilestoneDialog 
        open={showMilestoneOffer && currentTime >= 2040}
        onOpenChange={setShowMilestoneOffer}
        currentMilestone={currentMilestone}
        countdown={countdown}
        onClose={handleCloseMilestoneOffer}
      />
    </div>
  );
};

export default Index;
