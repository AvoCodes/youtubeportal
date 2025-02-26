
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import VideoTimeline from '../components/VideoTimeline';
import CTAButton from '../components/CTAButton';
import WebinarPoll from '../components/webinar/WebinarPoll';
import { useToast } from '@/components/ui/use-toast';
import { Clock, ArrowUpRight, Users, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">
      <div className="max-w-[1600px] mx-auto p-4 pt-8 md:pt-12 space-y-6">
        {/* Social Proof Banner */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex items-center justify-center gap-2 text-sm text-indigo-600 animate-in fade-in slide-in-from-top-4 duration-700">
          <Users className="w-4 h-4" />
          <span>
            <strong className="font-medium">{viewerCount.toLocaleString()}</strong> people are watching this exclusive training
          </span>
        </div>

        <div className="space-y-4">
          {/* Main Webinar Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center max-w-3xl mx-auto">
            Discover How to Build a <span className="text-blue-600">Profitable YouTube Channel</span> Using AI - Without Showing Your Face
          </h1>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[
              "Generate $3,000-$5,000/month",
              "100% Automated Content",
              "Step-by-Step System"
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Video Player Container */}
          <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl border-8 border-white">
            <VideoPlayer
              wistiaId="92627nrxy4"
              onTimeUpdate={handleTimeUpdate}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-red-600 rounded-full px-3 py-1.5 text-white">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-medium">LIVE</span>
            </div>
            
            {showNotification && (
              <div className="absolute top-16 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-black shadow-lg border border-gray-200 max-w-xs animate-in fade-in slide-in-from-top duration-300">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-xs text-gray-700">{notification.message}</p>
              </div>
            )}
          </div>

          {/* Progress Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <VideoTimeline currentTime={currentTime} duration={1800} />
          </div>

          {/* Limited Time Offer */}
          {currentTime >= 1020 && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-3">
                <div className="inline-block bg-yellow-400 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">
                  Special Webinar Offer
                </div>
                <h3 className="text-white font-semibold text-xl md:text-2xl">Get Started Today for 50% Off</h3>
                <div className="space-y-2">
                  <p className="text-blue-100 flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-400" />
                    <span>Only {seatsRemaining} spots remaining at this pricing</span>
                  </p>
                  {countdownActive && (
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="font-mono text-lg">{formatCountdown(countdown)}</span>
                      <span className="text-blue-200">until offer expires</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-auto">
                <CTAButton onClick={() => {
                  toast({
                    title: "🎉 Great choice!",
                    description: "You're being redirected to the enrollment page.",
                    duration: 3000,
                  });
                }} />
              </div>
            </div>
          )}
          
          {/* Interactive Poll */}
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
      
      {/* Special Offer Dialog */}
      <AlertDialog open={showMilestoneOffer && currentTime >= 1020} onOpenChange={setShowMilestoneOffer}>
        <AlertDialogContent className="bg-white border-blue-100 max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-900 text-2xl text-center">
              {currentMilestone.type === 'early-bird' && "🔥 Early Bird Special: Save 50% Today"}
              {currentMilestone.type === 'bonus-module' && "🎁 Exclusive Fast-Action Bonus Unlocked"}
              {currentMilestone.type === 'final-offer' && "⏰ Last Chance: Special Pricing Ends Soon"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700 text-center text-lg">
              {currentMilestone.type === 'early-bird' && (
                <>
                  <p className="mb-4">Lock in your 50% discount on our complete YouTube Payout Program Masterclass!</p>
                  <div className="flex justify-center items-center gap-4 text-2xl font-bold my-6">
                    <span className="text-gray-400 line-through">$997</span>
                    <span className="text-blue-600">$497</span>
                  </div>
                </>
              )}
              {currentMilestone.type === 'bonus-module' && (
                <>
                  <p className="mb-4">Get our Advanced AI Script Generator module ($497 value) FREE when you enroll now!</p>
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg my-4">
                    <p className="font-medium">Bonus Includes:</p>
                    <ul className="text-left text-base mt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Custom AI prompts library
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Viral hook templates
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        SEO optimization tools
                      </li>
                    </ul>
                  </div>
                </>
              )}
              {currentMilestone.type === 'final-offer' && (
                <>
                  <p className="mb-4">Last chance to join at the special webinar-only price!</p>
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg my-4">
                    Price increases in {formatCountdown(countdown)}
                  </div>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-3">
            <AlertDialogAction className="w-full bg-blue-600 hover:bg-blue-700 text-lg text-white gap-2 p-6">
              Yes, I Want To Join Now!
              <ArrowUpRight className="w-5 h-5" />
            </AlertDialogAction>
            <Button 
              variant="outline" 
              onClick={handleCloseMilestoneOffer} 
              className="text-blue-600"
            >
              Continue Watching
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
