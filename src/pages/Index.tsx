
import React, { useState, useEffect, useRef } from 'react';
import WebinarMilestoneDialog from '../components/webinar/WebinarMilestoneDialog';
import { useToast } from '@/hooks/use-toast';
import { PaymentOption } from '../components/CTAButton';
import { Clock, Zap, Play, Volume2, VolumeX, ArrowRight, ChevronUp, ChevronDown, Maximize, Minimize } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import { Progress } from '@/components/ui/progress';

// Define only the final offer milestone
const MILESTONES_DATA = [
  {
    id: "final-offer",
    title: "Final Offer",
    description: "Last chance to join at this price",
    time: 3000,
    discount: 10
  }
];

const Index = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ title: "", message: "" });
  const [showMilestoneOffer, setShowMilestoneOffer] = useState(false);
  const [seatsRemaining, setSeatsRemaining] = useState(37);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(600);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(MILESTONES_DATA[0]);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [ctaVisible, setCTAVisible] = useState(false);
  const [ctaMinimized, setCTAMinimized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const oneTimePaymentUrl = "https://whop.com/c/yt-portal-webinar/ot";
  const splitPaymentUrl = "https://whop.com/c/yt-portal-webinar/pp";
  
  const { toast } = useToast();
  const videoDuration = 5263; // 1 hour, 27 minutes, 43 seconds
  
  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      setControlsVisible(true);
      
      timeoutId = setTimeout(() => {
        if (!loading) {
          setControlsVisible(false);
        }
      }, 3000);
    };
    
    // Reset timer on mouse movement
    const handleMouseMove = () => resetTimeout();
    
    // Start the initial timer
    resetTimeout();
    
    // Add event listener
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [loading]);

  // Simulate video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleTimeBasedEvents = () => {
      // Check only for the final milestone
      if (Math.abs(currentTime - MILESTONES_DATA[0].time) < 5) {
        setShowMilestoneOffer(true);
        setCountdownActive(true);
      }
      
      // Show CTA when appropriate
      if (currentTime >= 2040 && !ctaVisible) {
        setCTAVisible(true);
        // Automatically minimize CTA after a period to avoid distraction
        setTimeout(() => {
          setCTAMinimized(true);
        }, 15000);
      }
    };
    
    handleTimeBasedEvents();
  }, [currentTime, ctaVisible]);

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

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleCloseMilestoneOffer = () => {
    setShowMilestoneOffer(false);
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
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  const toggleCTAMinimize = () => {
    setCTAMinimized(!ctaMinimized);
  };

  // Format time for countdown display
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Format time for progress display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    } else {
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
  };
  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen overflow-hidden relative bg-black"
    >
      {/* Cinematic letterbox effect - top and bottom black bars with premium depth */}
      <div className="absolute top-0 left-0 right-0 h-[8%] bg-black z-30 shadow-[0_0_30px_8px_rgba(0,0,0,0.95)]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black z-30 shadow-[0_0_30px_8px_rgba(0,0,0,0.95)]"></div>
      
      {/* Absolutely positioned video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <VideoPlayer
          wistiaId="1a1gto8igi"
          onTimeUpdate={handleTimeUpdate}
        />
      </div>

      {/* Premium film grain with variable opacity */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      {/* Premium vignette effect for depth - more sophisticated */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-70" style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.6) 100%)'
      }}></div>
      
      {/* Title sequence during loading */}
      {loading && (
        <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center">
          <div className="max-w-md relative">
            {/* Professional animation container */}
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-2xl transition-all duration-1000">
                <div className="flex flex-col items-center gap-8">
                  {/* Premium logo animation */}
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 opacity-30 border-white/30 animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute inset-[10px] rounded-full border-2 opacity-50 border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent animate-[spin_6s_linear_infinite]"></div>
                    <div className="absolute inset-[20px] rounded-full border-2 opacity-70 border-t-transparent border-r-indigo-400 border-b-transparent border-l-transparent animate-[spin_8s_linear_infinite_reverse]"></div>
                    <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/20 flex items-center justify-center">
                      <Play className="w-10 h-10 text-white drop-shadow-md" />
                    </div>
                  </div>
                  
                  {/* Professional typography */}
                  <div className="space-y-4 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter text-white [text-shadow:_0_2px_4px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom fade-in duration-1000">
                      The YouTube Portal
                    </h1>
                    <p className="text-base text-gray-300 tracking-wide animate-in slide-in-from-bottom fade-in duration-1000 delay-300 opacity-80">
                      With Daniel Bitton<span className="opacity-70">  •  </span><span className="text-blue-400">Live</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle loading indicator */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-[pulse_1.5s_ease-in-out_0.5s_infinite]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-[pulse_1.5s_ease-in-out_1s_infinite]"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Controls overlays with fade-in/out */}
      <div className={`absolute inset-0 z-40 pointer-events-none transition-opacity duration-500 ease-in-out ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top controls bar with subtle gradient */}
        <div className="absolute top-[8%] left-0 right-0 p-4 sm:p-6 pointer-events-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs flex items-center gap-1.5 border border-red-500/20 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                <span className="font-medium tracking-wide">LIVE</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMute} 
                className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-white/90 p-2 rounded-full transition-all duration-300 border border-white/10 shadow-sm hover:scale-105"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-white/90 p-2 rounded-full transition-all duration-300 border border-white/10 shadow-sm hover:scale-105"
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom controls with premium timeline */}
        <div className="absolute bottom-[8%] left-0 right-0 pointer-events-auto transform translate-y-[-14px]">
          {/* Sophisticated progress bar */}
          <div className="px-4 sm:px-6">
            <div className="relative">
              {/* Background track */}
              <div className="h-1 bg-white/10 overflow-hidden rounded-full backdrop-blur-sm">
                {/* Progress indicator with gradient */}
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 transition-all duration-300 ease-linear rounded-full"
                  style={{ width: `${(currentTime / videoDuration) * 100}%` }}
                ></div>
              </div>
              
              {/* Time indicators */}
              <div className="flex justify-between mt-2 text-[10px] text-white/70 font-mono">
                <div>{formatTime(currentTime)}</div>
                <div>{formatTime(videoDuration)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section with elegant animation and minimization capabilities */}
      {ctaVisible && (
        <div className={`absolute left-0 right-0 z-20 transition-all duration-500 ease-in-out ${ctaMinimized ? 'bottom-0' : 'bottom-[8%]'}`}>
          {/* Minimized state tab */}
          {ctaMinimized && (
            <div className="absolute left-1/2 -translate-x-1/2 top-0 transform -translate-y-full">
              <button 
                onClick={toggleCTAMinimize}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-t-lg font-medium text-sm flex items-center gap-2 shadow-lg border border-blue-500/30"
              >
                <span>View Offer</span>
                <ChevronUp size={14} />
              </button>
            </div>
          )}
          
          {/* Full CTA panel with premium glass design */}
          <div className={`bg-gradient-to-t from-black via-black/90 to-transparent pt-20 pb-6 px-4 sm:px-8 transition-all duration-500 ease-in-out ${ctaMinimized ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
            <div className="max-w-4xl mx-auto relative">
              {/* Minimize button - only show when expanded */}
              {!ctaMinimized && (
                <button
                  onClick={toggleCTAMinimize}
                  className="absolute top-[-56px] left-1/2 -translate-x-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full p-1.5 text-white/80 border border-white/10 transition-all duration-300 hover:scale-110"
                >
                  <ChevronDown size={18} />
                </button>
              )}
              
              {/* Content area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                {/* Left side: Key points with premium styling */}
                <div className="space-y-4 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white tracking-tight">AI YouTube Shorts Blueprint</h2>
                  <div className="space-y-3 backdrop-blur-md bg-black/30 p-4 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 rounded-full bg-blue-500/20 p-1.5 mt-0.5 border border-blue-500/30">
                        <span className="block h-2.5 w-2.5 rounded-full bg-blue-400/70"></span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 font-medium mb-0.5">Limited Availability</p>
                        <p className="text-xs text-gray-400">Only <span className="text-blue-400 font-bold">{seatsRemaining}</span> spots remaining</p>
                      </div>
                    </div>
                    
                    {countdownActive && (
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 rounded-full bg-red-500/20 p-1.5 mt-0.5 border border-red-500/30">
                          <Clock size={14} className="text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-300 font-medium mb-0.5">Offer Expires Soon</p>
                          <p className="text-xs text-gray-400">
                            Countdown: <span className="text-red-400 font-mono font-bold">{formatCountdown(countdown)}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right side: Premium action buttons */}
                <div className="space-y-3">
                  <button 
                    onClick={() => handleCTAClick('one-time')}
                    className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg py-4 px-4 font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 border border-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>One-Time Payment ($995)</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  
                  <button 
                    onClick={() => handleCTAClick('split-pay')}
                    className="group w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg py-4 px-4 font-medium flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 border border-purple-500/40 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>4 Monthly Payments ($399)</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  
                  {/* Fine print with premium styling */}
                  <p className="text-xs text-center text-gray-400 mt-2">Secure checkout • 30-day satisfaction guarantee • Premium support included</p>
                </div>
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
