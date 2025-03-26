
import React, { useState, useEffect } from 'react';
import WebinarTags from '../components/webinar/WebinarTags';
import WebinarHeader from '../components/webinar/WebinarHeader';
import WebinarVideo from '../components/webinar/WebinarVideo';
import WebinarOffer from '../components/webinar/WebinarOffer';
import WebinarMilestoneDialog from '../components/webinar/WebinarMilestoneDialog';
import { useToast } from '@/hooks/use-toast';
import { PaymentOption } from '../components/CTAButton';

// Define local constants instead of importing from the broken constants.ts file
const NEW_ATTENDEES = [
  { name: "Alex Johnson", time: 120 },
  { name: "Maria Garcia", time: 240 },
  { name: "James Smith", time: 480 },
  { name: "Sarah Wilson", time: 720 },
  { name: "David Thompson", time: 960 },
  { name: "Linda Martinez", time: 1200 },
  { name: "Michael Brown", time: 1500 },
  { name: "Emily Davis", time: 1800 },
  { name: "Robert Taylor", time: 2100 },
  { name: "Jennifer Anderson", time: 2400 },
  { name: "Christopher Lee", time: 2700 },
  { name: "Jessica White", time: 3000 },
  { name: "Daniel Harris", time: 3300 },
  { name: "Amanda Martin", time: 3600 },
  { name: "Matthew Clark", time: 3900 },
  { name: "Nicole Lewis", time: 4200 },
  { name: "Andrew Jackson", time: 4500 },
  { name: "Stephanie Moore", time: 4800 }
];

const MILESTONES = [
  {
    id: "early-bird",
    title: "Early Action Bonus",
    description: "Special bonus for early action takers",
    time: 2400,
    discount: 15
  },
  {
    id: "bonus-module",
    title: "Bonus AI Module",
    description: "Advanced AI script generation tools included",
    time: 3600,
    discount: 0
  },
  {
    id: "special-offer",
    title: "Limited Time Offer",
    description: "Act now before this special pricing expires",
    time: 4800,
    discount: 20
  }
];

const Index = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [viewerCount, setViewerCount] = useState(1328);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ title: "", message: "" });
  const [showMilestoneOffer, setShowMilestoneOffer] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(MILESTONES[0]);
  const [seatsRemaining, setSeatsRemaining] = useState(37);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(600);
  const [likesCount, setLikesCount] = useState(2134);
  
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
      
      MILESTONES.forEach(milestone => {
        if (Math.abs(currentTime - milestone.time) < 5) {
          setCurrentMilestone(milestone);
          setShowMilestoneOffer(true);
          
          if (milestone.id === MILESTONES[MILESTONES.length - 1].id) {
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
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-[1600px] mx-auto p-4 px-6 sm:px-8 md:px-12 pt-8 md:pt-12">
        <WebinarHeader />
        <WebinarTags />
        <div className="space-y-6">
          <WebinarVideo 
            currentTime={currentTime}
            viewerCount={viewerCount}
            likesCount={likesCount}
            onTimeUpdate={handleTimeUpdate}
            showNotification={showNotification}
            notification={notification}
            onLike={handleLike}
          />
          {currentTime >= 2040 && (
            <WebinarOffer 
              seatsRemaining={seatsRemaining}
              countdownActive={countdownActive}
              countdown={countdown}
              onCTAClick={handleCTAClick}
              oneTimePaymentUrl={oneTimePaymentUrl}
              splitPaymentUrl={splitPaymentUrl}
            />
          )}
        </div>
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
