
import React, { useState, useEffect } from 'react';
import WebinarTags from '../components/webinar/WebinarTags';
import WebinarHeader from '../components/webinar/WebinarHeader';
import WebinarVideo from '../components/webinar/WebinarVideo';
import WebinarOffer from '../components/webinar/WebinarOffer';
import WebinarMilestoneDialog from '../components/webinar/WebinarMilestoneDialog';
import { useToast } from '@/hooks/use-toast';
import { PaymentOption } from '../components/CTAButton';

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
  
  const oneTimePaymentUrl = "https://whop.com/c/yt-portal-webinar/ot";
  const splitPaymentUrl = "https://whop.com/c/yt-portal-webinar/pp";
  
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white pb-16">
      {/* Cinema-style header area */}
      <div className="max-w-[1920px] mx-auto pt-6 md:pt-8 px-4 md:px-6 lg:px-8">
        <WebinarHeader />
        <WebinarTags />
      </div>
      
      {/* Main content with full-width video */}
      <div className="w-full mt-4 space-y-8">
        {/* Video takes up more screen real estate */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8">
          <WebinarVideo 
            currentTime={currentTime}
            viewerCount={viewerCount}
            likesCount={likesCount}
            onTimeUpdate={handleTimeUpdate}
            showNotification={showNotification}
            notification={notification}
            onLike={handleLike}
          />
        </div>
        
        {/* CTA section with styled background */}
        {currentTime >= 2040 && (
          <div className="w-full bg-gradient-to-b from-slate-900/50 to-slate-900/90 backdrop-blur-sm py-8">
            <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
              <WebinarOffer 
                seatsRemaining={seatsRemaining}
                countdownActive={countdownActive}
                countdown={countdown}
                onCTAClick={handleCTAClick}
                oneTimePaymentUrl={oneTimePaymentUrl}
                splitPaymentUrl={splitPaymentUrl}
              />
            </div>
          </div>
        )}
      </div>
      
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

export default Index;
