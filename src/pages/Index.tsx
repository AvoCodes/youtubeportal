
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import VideoTimeline from '../components/VideoTimeline';
import CTAButton from '../components/CTAButton';
import WebinarPoll from '../components/webinar/WebinarPoll';
import { useToast } from '@/components/ui/use-toast';
import { Clock, ArrowUpRight, Users, CheckCircle, Trophy, ThumbsUp } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { NEW_ATTENDEES, POLLS, MILESTONES, CHAT_MESSAGES } from '../components/webinar/constants';

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
  const [likesCount, setLikesCount] = useState(2134);
  
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
      description: "Thank you for being active.",
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

  const handleLike = () => {
    setLikesCount(prev => prev + 1);
    toast({
      title: "Thanks for the like!",
      description: "Your engagement helps the community.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-[1600px] mx-auto p-4 pt-8 md:pt-12">
        {/* Webinar Header */}
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-medium text-slate-900 mb-2">
            The YouTube Portal: Make $57/Hr Without Showing Your Face.
          </h1>
          <p className="text-slate-600">With Daniel Bitton, Made First Million At 17.</p>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Video Section */}
          <div className="rounded-xl overflow-hidden shadow-lg bg-white">
            {/* Professional clean container */}
            <div className="relative overflow-hidden">
              {/* Light dot pattern for background styling */}
              <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
                <div className="absolute top-2 left-2 w-40 h-40">
                  <div className="grid grid-cols-8 gap-2">
                    {Array(64).fill(0).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 w-40 h-40">
                  <div className="grid grid-cols-8 gap-2">
                    {Array(64).fill(0).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Clean video player styling */}
              <div className="relative z-10">
                <VideoPlayer
                  wistiaId="92627nrxy4"
                  onTimeUpdate={handleTimeUpdate}
                />
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5">
                  <Progress 
                    value={(currentTime / 1800) * 100} 
                    className="h-full" 
                    indicatorClassName="bg-blue-500"
                  />
                </div>
                
                {showNotification && (
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-black shadow-lg border border-gray-200 max-w-xs animate-in fade-in slide-in-from-top duration-300">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    <p className="text-xs text-gray-700">{notification.message}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Clean bottom bar with viewer and like counts */}
            <div className="bg-white py-3 px-4 border-t border-slate-100 flex items-center">
              <div className="flex items-center gap-6 text-slate-700">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{viewerCount.toLocaleString()} watching now</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp 
                    className="w-4 h-4 text-blue-600 cursor-pointer" 
                    onClick={handleLike}
                  />
                  <span className="font-medium">{likesCount.toLocaleString()}</span>
                </div>
              </div>
              <div className="ml-auto text-sm text-slate-500">
                {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / 30:00
              </div>
            </div>
          </div>

          {/* Webinar Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <VideoTimeline currentTime={currentTime} duration={1800} />
          </div>

          {/* Interactive Elements */}
          {showActivePoll && (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-500">
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

          {/* Special Offer Section */}
          {currentTime >= 1020 && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6">
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-block bg-blue-500/20 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                    Webinar Special
                  </div>
                  <h3 className="text-white font-medium text-xl">Ready to start your AI Shorts journey?</h3>
                  <div className="space-y-2 text-blue-100">
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-300" />
                      <span>Limited to next {seatsRemaining} enrollments</span>
                    </p>
                    {countdownActive && (
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-300" />
                        <span className="font-mono">{formatCountdown(countdown)}</span>
                        <span>remaining</span>
                      </p>
                    )}
                  </div>
                </div>
                <CTAButton onClick={() => {
                  toast({
                    title: "🎉 Congrats!",
                    description: "You're being redirected to the secure enrollment page...",
                    duration: 3000,
                  });
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Milestone Dialog */}
      <AlertDialog open={showMilestoneOffer && currentTime >= 1020} onOpenChange={setShowMilestoneOffer}>
        <AlertDialogContent className="bg-white border-blue-100 max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900 text-2xl font-medium text-center">
              {currentMilestone.type === 'early-bird' && "🎯 Early Action Bonus Unlocked"}
              {currentMilestone.type === 'bonus-module' && "🎁 Special Module Access Granted"}
              {currentMilestone.type === 'final-offer' && "⏰ Time-Sensitive Opportunity"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-center text-lg">
              {currentMilestone.type === 'early-bird' && (
                <div className="space-y-4">
                  <p>As one of our early action takers, you'll receive:</p>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Complete AI YouTube Shorts Automation System</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Private Community Access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Weekly Live Q&A Sessions</span>
                    </li>
                  </ul>
                </div>
              )}
              {currentMilestone.type === 'bonus-module' && (
                <div className="space-y-4">
                  <p>You've unlocked our premium AI Script Generator!</p>
                  <div className="bg-slate-50 p-4 rounded-lg text-left">
                    <h4 className="font-medium text-slate-900 mb-3">Module Highlights:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Advanced AI Prompt Library</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Viral Hook Generator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>SEO Title Optimizer</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {currentMilestone.type === 'final-offer' && (
                <div className="space-y-4">
                  <p>Don't miss out on this special offer!</p>
                  <div className="bg-amber-50 text-amber-700 p-4 rounded-lg">
                    <p className="font-medium">Offer ends in: {formatCountdown(countdown)}</p>
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-3">
            <AlertDialogAction className="w-full bg-blue-600 hover:bg-blue-700 text-lg text-white gap-2 p-6">
              Join the Program Now
              <ArrowUpRight className="w-5 h-5" />
            </AlertDialogAction>
            <Button 
              variant="outline" 
              onClick={handleCloseMilestoneOffer}
              className="text-slate-600"
            >
              I'll Think About It
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
