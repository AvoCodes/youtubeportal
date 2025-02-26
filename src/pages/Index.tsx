
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import VideoTimeline from '../components/VideoTimeline';
import CTAButton from '../components/CTAButton';
import WebinarPoll from '../components/webinar/WebinarPoll';
import { useToast } from '@/components/ui/use-toast';
import { Clock, ArrowUpRight } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { NEW_ATTENDEES, POLLS, MILESTONES } from '../components/webinar/constants';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [viewerCount, setViewerCount] = useState(1328);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ title: "", message: "" });
  const [showActivePoll, setShowActivePoll] = useState(false);
  const [activePoll, setActivePoll] = useState(POLLS[0]);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [pollResults, setPollResults] = useState<number[]>([]);
  const [showMilestoneOffer, setShowMilestoneOffer] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(MILESTONES[0]);
  const [seatsRemaining, setSeatsRemaining] = useState(37);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(600);
  
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
      
      POLLS.forEach(poll => {
        if (Math.abs(currentTime - poll.time) < 5) {
          setActivePoll(poll);
          setSelectedPollOption(null);
          setPollResults(poll.options.map(() => Math.floor(Math.random() * 30) + 10));
          setShowActivePoll(true);
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

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handlePollOptionSelect = (index: number) => {
    setSelectedPollOption(index);
    const newResults = [...pollResults];
    newResults[index] += 1;
    setPollResults(newResults);
    
    toast({
      title: "Vote recorded!",
      description: "Thank you for participating in our poll.",
      duration: 3000,
    });
  };

  const handleCloseMilestoneOffer = () => {
    setShowMilestoneOffer(false);
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-[1600px] mx-auto p-4 pt-8 md:pt-12 space-y-6">
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl">
            <VideoPlayer
              wistiaId="92627nrxy4"
              onTimeUpdate={handleTimeUpdate}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-red-600 rounded-full px-3 py-1.5 text-white">
              <span className="text-sm font-medium">LIVE</span>
            </div>
            
            {showNotification && (
              <div className="absolute top-16 right-4 bg-white rounded-lg p-3 text-black shadow-lg border border-gray-200 max-w-xs animate-in fade-in slide-in-from-top duration-300">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-xs text-gray-700">{notification.message}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <VideoTimeline currentTime={currentTime} duration={1800} />
          </div>

          {currentTime >= 1020 && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div>
                <h3 className="text-white font-semibold text-lg">Limited-time offer for webinar attendees</h3>
                <p className="text-blue-100 text-sm mb-2">Only {seatsRemaining} spots remaining at this pricing</p>
                {countdownActive && (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4 text-yellow-300" />
                    <span className="text-yellow-300 font-mono">{formatCountdown(countdown)}</span>
                    <span className="text-xs">until offer expires</span>
                  </div>
                )}
              </div>
              <CTAButton onClick={() => {
                toast({
                  title: "🎉 Great choice!",
                  description: "You're being redirected to the enrollment page.",
                  duration: 3000,
                });
              }} />
            </div>
          )}
          
          {showActivePoll && (
            <div className="max-w-2xl mx-auto">
              <WebinarPoll
                question={activePoll.question}
                options={activePoll.options}
                results={pollResults}
                selectedOption={selectedPollOption}
                onOptionSelect={handlePollOptionSelect}
                totalVotes={pollResults.reduce((a, b) => a + b, 0)}
              />
            </div>
          )}
        </div>
      </div>
      
      <AlertDialog open={showMilestoneOffer && currentTime >= 1020} onOpenChange={setShowMilestoneOffer}>
        <AlertDialogContent className="bg-white border-blue-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-900 text-xl">
              {currentMilestone.type === 'early-bird' && "🔥 Early Bird Special Offer"}
              {currentMilestone.type === 'bonus-module' && "🎁 Exclusive Bonus Module Unlocked"}
              {currentMilestone.type === 'final-offer' && "⏰ Last Chance Special Offer"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              {currentMilestone.type === 'early-bird' && 
                "For the next 20 minutes only, get 50% off our YouTube Payout Program Masterclass when you enroll today!"
              }
              {currentMilestone.type === 'bonus-module' && 
                "We're adding our Advanced AI Script Generator module ($497 value) for free when you enroll during this webinar!"
              }
              {currentMilestone.type === 'final-offer' && 
                "This is your final opportunity to join at this special webinar-only price. Only a few spots remaining!"
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row">
            <AlertDialogAction className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              Claim This Offer
              <ArrowUpRight className="w-4 h-4" />
            </AlertDialogAction>
            <Button variant="outline" onClick={handleCloseMilestoneOffer} className="text-blue-600">
              Continue Watching
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
