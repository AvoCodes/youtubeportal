
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import LiveChat, { ChatMessage } from '../components/LiveChat';
import VideoTimeline from '../components/VideoTimeline';
import CTAButton from '../components/CTAButton';
import WebinarPoll from '../components/webinar/WebinarPoll';
import { useToast } from '@/components/ui/use-toast';
import { Clock, ArrowUpRight, Users } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { CHAT_MESSAGES, NEW_ATTENDEES, POLLS, MILESTONES } from '../components/webinar/constants';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [viewerCount, setViewerCount] = useState(1328);
  const [likesCount, setLikesCount] = useState(457);
  const [hasLiked, setHasLiked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ title: "", message: "" });
  const [showActivePoll, setShowActivePoll] = useState(false);
  const [activePoll, setActivePoll] = useState(POLLS[0]);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [pollResults, setPollResults] = useState<number[]>([]);
  const [showMilestoneOffer, setShowMilestoneOffer] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(MILESTONES[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [attendees, setAttendees] = useState<{name: string, joined: boolean}[]>(
    NEW_ATTENDEES.map(a => ({ name: a.name, joined: false }))
  );
  const [showRecentJoins, setShowRecentJoins] = useState(false);
  const [recentJoins, setRecentJoins] = useState<string[]>([]);
  const [seatsRemaining, setSeatsRemaining] = useState(37);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  
  const { toast } = useToast();

  useEffect(() => {
    const initialMessages = CHAT_MESSAGES.filter(msg => msg.timestamp < 30);
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    const handleTimeBasedEvents = () => {
      const newMessages = CHAT_MESSAGES.filter(
        msg => msg.timestamp <= currentTime && 
        !messages.some(m => m.id === msg.id)
      );
      
      if (newMessages.length > 0) {
        setMessages(prev => [...prev, ...newMessages]);
      }
      
      NEW_ATTENDEES.forEach(attendee => {
        if (Math.abs(currentTime - attendee.time) < 5) {
          const index = attendees.findIndex(a => a.name === attendee.name);
          if (index !== -1 && !attendees[index].joined) {
            const updatedAttendees = [...attendees];
            updatedAttendees[index].joined = true;
            setAttendees(updatedAttendees);
            
            setRecentJoins(prev => [attendee.name, ...prev].slice(0, 3));
            setShowRecentJoins(true);
            setTimeout(() => setShowRecentJoins(false), 5000);
            
            if (Math.random() > 0.3) {
              setSeatsRemaining(prev => Math.max(prev - 1, 5));
            }
            
            toast({
              title: "New Attendee!",
              description: `${attendee.name} just joined the webinar`,
              duration: 3000,
            });
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
  }, [currentTime, messages, attendees, toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 12) - 3;
        return prev + change;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLikesCount(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

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

  const handleLikeClick = () => {
    if (!hasLiked) {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
      
      setNotification({
        title: "Thanks for your feedback!",
        message: "We appreciate your engagement with our content."
      });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
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
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
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
              
              {showRecentJoins && (
                <div className="absolute bottom-16 left-4 bg-white rounded-lg p-3 text-black shadow-lg border border-gray-200 animate-in fade-in slide-in-from-bottom duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium">New attendees joining</span>
                  </div>
                  {recentJoins.map((name, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700 chat-message" style={{animationDelay: `${i * 300}ms`}}>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
                        {name.charAt(0)}
                      </div>
                      <span>{name} just joined</span>
                    </div>
                  ))}
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
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-[500px] shadow-sm">
              <LiveChat
                messages={messages}
                currentTime={currentTime}
                viewerCount={viewerCount}
                likesCount={likesCount}
                onLike={handleLikeClick}
                hasLiked={hasLiked}
              />
            </div>
            
            {showActivePoll && (
              <WebinarPoll
                question={activePoll.question}
                options={activePoll.options}
                results={pollResults}
                selectedOption={selectedPollOption}
                onOptionSelect={handlePollOptionSelect}
                totalVotes={pollResults.reduce((a, b) => a + b, 0)}
              />
            )}
          </div>
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
