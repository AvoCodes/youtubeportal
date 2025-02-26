import React, { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import LiveChat, { ChatMessage } from '../components/LiveChat';
import VideoTimeline from '../components/VideoTimeline';
import CTAButton from '../components/CTAButton';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Bell, 
  Award,
  BookOpen,
  Clock, 
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

// Sample chat messages
const CHAT_MESSAGES: ChatMessage[] = [
  { id: 1, author: "Mike Chen", message: "Ready to learn! 🚀", timestamp: 15, likes: 12, timeAgo: "7 days ago" },
  { id: 2, author: "Sarah Parker", message: "Those revenue numbers are insane!", timestamp: 65, likes: 45, timeAgo: "6 days ago" },
  { id: 3, author: "Alex Thompson", message: "Never knew YouTube was paying creators this much", timestamp: 150, likes: 67, timeAgo: "5 days ago" },
  { id: 4, author: "Rachel Kim", message: "$57/hour equivalent? That's better than my current job", timestamp: 200, likes: 89, timeAgo: "5 days ago" },
  { id: 5, author: "James Wilson", message: "Love that this doesn't require showing your face", timestamp: 300, likes: 34, timeAgo: "4 days ago" },
  { id: 6, author: "Emily Davis", message: "The AI tools look so easy to use", timestamp: 400, likes: 23, timeAgo: "3 days ago" },
  { id: 7, author: "David Martinez", message: "This is exactly what I've been looking for - a way to start without being on camera", timestamp: 500, likes: 56, timeAgo: "3 days ago" },
  { id: 8, author: "Lisa Wong", message: "Those example channels are getting crazy views!", timestamp: 600, likes: 78, timeAgo: "2 days ago" },
  { id: 9, author: "Tom Bradley", message: "Impressive how fast you can create content with AI", timestamp: 700, likes: 91, timeAgo: "2 days ago" },
  { id: 10, author: "Jessica Lee", message: "Love the transparency about the results", timestamp: 800, likes: 43, timeAgo: "1 day ago" },
  { id: 11, author: "Chris Anderson", message: "The niche selection strategy makes so much sense", timestamp: 900, likes: 65, timeAgo: "1 day ago" },
  { id: 12, author: "Maria Garcia", message: "That AI video generation is mind-blowing 🤯", timestamp: 1000, likes: 88, timeAgo: "23 hours ago" },
  { id: 13, author: "Kevin Zhang", message: "The math behind scaling multiple channels is compelling", timestamp: 1100, likes: 54, timeAgo: "12 hours ago" },
  { id: 14, author: "Amanda White", message: "Those student success stories are inspiring!", timestamp: 1200, likes: 32, timeAgo: "5 hours ago" },
  { id: 15, author: "Ryan Cooper", message: "The community aspect sounds really valuable", timestamp: 1300, likes: 21, timeAgo: "1 hour ago" }
];

// New attendees who join during the webinar
const NEW_ATTENDEES = [
  { name: "Jordan Smith", time: 45 },
  { name: "Lena Robertson", time: 120 },
  { name: "Miguel Sanchez", time: 210 },
  { name: "Aisha Khan", time: 330 },
  { name: "Diego Morales", time: 450 },
  { name: "Sophie Chen", time: 570 },
  { name: "Omar Hassan", time: 690 },
  { name: "Zoe Williams", time: 810 },
  { name: "Raj Patel", time: 930 },
  { name: "Nina Bergmann", time: 1050 },
  { name: "Carlos Diaz", time: 1170 },
  { name: "Emma Johnson", time: 1290 },
];

// Poll questions that appear at specific times
const POLLS = [
  { 
    id: 1, 
    question: "Have you ever considered creating content on YouTube?", 
    options: ["Yes, I already do", "Yes, but haven't started", "No, but interested", "Not interested"],
    time: 300
  },
  { 
    id: 2, 
    question: "What's your biggest challenge with creating content?", 
    options: ["Time constraints", "Technical skills", "Being on camera", "Coming up with ideas"],
    time: 600
  },
  { 
    id: 3, 
    question: "How much time could you dedicate weekly to your YouTube channel?", 
    options: ["Less than 5 hours", "5-10 hours", "10-20 hours", "20+ hours"],
    time: 900
  }
];

// Milestones to trigger special offers/CTAs
const MILESTONES = [
  { id: 1, time: 720, type: "early-bird" },
  { id: 2, time: 1200, type: "bonus-module" },
  { id: 3, time: 1500, type: "final-offer" }
];

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

  // Initialize with first few messages
  useEffect(() => {
    const initialMessages = CHAT_MESSAGES.filter(msg => msg.timestamp < 30);
    setMessages(initialMessages);
  }, []);

  // Handle time updates and trigger time-based events
  useEffect(() => {
    const handleTimeBasedEvents = () => {
      // Add chat messages as they "happen"
      const newMessages = CHAT_MESSAGES.filter(
        msg => msg.timestamp <= currentTime && 
        !messages.some(m => m.id === msg.id)
      );
      
      if (newMessages.length > 0) {
        setMessages(prev => [...prev, ...newMessages]);
      }
      
      // Add new attendees
      NEW_ATTENDEES.forEach(attendee => {
        if (Math.abs(currentTime - attendee.time) < 5) {
          const index = attendees.findIndex(a => a.name === attendee.name);
          if (index !== -1 && !attendees[index].joined) {
            const updatedAttendees = [...attendees];
            updatedAttendees[index].joined = true;
            setAttendees(updatedAttendees);
            
            // Show notification
            setRecentJoins(prev => [attendee.name, ...prev].slice(0, 3));
            setShowRecentJoins(true);
            setTimeout(() => setShowRecentJoins(false), 5000);
            
            // Decrease seats
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
      
      // Show polls
      POLLS.forEach(poll => {
        if (Math.abs(currentTime - poll.time) < 5) {
          setActivePoll(poll);
          setSelectedPollOption(null);
          setPollResults(poll.options.map(() => Math.floor(Math.random() * 30) + 10));
          setShowActivePoll(true);
        }
      });
      
      // Trigger milestone offers
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

  // Simulate fluctuating viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        // More people tend to join than leave, with occasional spikes
        const change = Math.floor(Math.random() * 12) - 3;
        return prev + change;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Simulate likes increasing over time
  useEffect(() => {
    const interval = setInterval(() => {
      setLikesCount(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer for limited offers
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
    // Update results with "real" vote
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
    <div className="min-h-screen bg-[#0F0F0F] pb-16">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header with title and engagement metrics */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
              A
            </div>
            <div>
              <h1 className="text-white font-medium">AI YouTube Masterclass</h1>
              <p className="text-gray-400 text-sm">With Alex Johnson</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">{viewerCount.toLocaleString()}</span>
            </div>
            <button 
              className={`flex items-center gap-2 ${hasLiked ? 'text-blue-500' : 'text-white'}`}
              onClick={handleLikeClick}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">{likesCount.toLocaleString()}</span>
            </button>
            <button className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Main content area */}
          <div className="md:col-span-2 space-y-4">
            {/* Video player with live badge and viewer count */}
            <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl">
              <VideoPlayer
                wistiaId="92627nrxy4"
                onTimeUpdate={handleTimeUpdate}
              />
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-white">
                <Badge variant="secondary" className="bg-red-600 text-white border-none animate-pulse px-2 py-0.5 text-xs">
                  LIVE
                </Badge>
                <span className="text-sm font-medium">{viewerCount.toLocaleString()} watching</span>
              </div>
              
              {/* Notifications */}
              {showNotification && (
                <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white shadow-lg border border-gray-700 max-w-xs animate-in fade-in slide-in-from-top duration-300">
                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                  <p className="text-xs text-gray-300">{notification.message}</p>
                </div>
              )}
              
              {/* New attendees notification */}
              {showRecentJoins && (
                <div className="absolute bottom-16 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white shadow-lg border border-gray-700 animate-in fade-in slide-in-from-bottom duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium">New attendees joining</span>
                  </div>
                  {recentJoins.map((name, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300 chat-message" style={{animationDelay: `${i * 300}ms`}}>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
                        {name.charAt(0)}
                      </div>
                      <span>{name} just joined</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Progress timeline */}
            <div className="bg-neutral-900/95 rounded-xl border border-neutral-800 overflow-hidden">
              <VideoTimeline currentTime={currentTime} duration={1800} />
            </div>

            {/* CTA section */}
            <div className="bg-gradient-to-r from-blue-900/70 to-purple-900/70 rounded-xl border border-blue-800/50 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-white font-semibold text-lg">Limited-time offer for webinar attendees</h3>
                <p className="text-blue-200 text-sm mb-2">Only {seatsRemaining} spots remaining at this pricing</p>
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
            
            {/* Information tabs */}
            <div className="bg-neutral-900/95 rounded-xl border border-neutral-800 overflow-hidden p-4">
              <Tabs defaultValue="details">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="about">About Host</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="text-white space-y-4">
                  <h3 className="text-xl font-semibold">AI YouTube Masterclass: Earn $57/hr Without Showing Your Face</h3>
                  <p className="text-gray-300">Learn how to leverage AI tools to create engaging content, grow your audience, and monetize your channel - all without ever stepping in front of the camera.</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-neutral-800 rounded-lg p-3 flex items-start gap-3">
                      <Award className="w-5 h-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-medium">Channel Growth</h4>
                        <p className="text-sm text-gray-400">Learn proven strategies for gaining subscribers quickly</p>
                      </div>
                    </div>
                    <div className="bg-neutral-800 rounded-lg p-3 flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-medium">Content Strategy</h4>
                        <p className="text-sm text-gray-400">Discover how to plan content that performs</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="text-white">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold mb-3">Webinar Resources</h3>
                    <div className="bg-neutral-800 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 rounded p-2">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span>AI YouTube Revenue Calculator</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Download
                        <ArrowUpRight className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                    <div className="bg-neutral-800 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-600 rounded p-2">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span>Niche Selection Guide</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Download
                        <ArrowUpRight className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="about" className="text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-blue-500">
                      <AvatarFallback className="bg-blue-600 text-xl">A</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">Alex Johnson</h3>
                      <p className="text-gray-300">YouTube Content Strategist & AI Expert</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    Alex has helped over 2,500 creators build successful YouTube channels using AI tools and strategic content planning. His students have collectively generated over $4.7M in YouTube revenue.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar content */}
          <div className="space-y-4">
            {/* Live chat */}
            <div className="bg-neutral-900/95 rounded-xl border border-neutral-800 overflow-hidden h-[500px]">
              <LiveChat
                messages={messages}
                currentTime={currentTime}
              />
            </div>
            
            {/* Active poll */}
            {showActivePoll && (
              <div className="bg-neutral-900/95 rounded-xl border border-neutral-800 overflow-hidden p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Quick Poll</h3>
                  <span className="text-gray-400 text-xs">
                    {pollResults.reduce((a, b) => a + b, 0)} votes
                  </span>
                </div>
                
                <p className="text-white text-sm mb-3">{activePoll.question}</p>
                
                <div className="space-y-2">
                  {activePoll.options.map((option, index) => {
                    const percentage = Math.round((pollResults[index] / pollResults.reduce((a, b) => a + b, 0)) * 100);
                    
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <button 
                            className={`text-left ${selectedPollOption === index ? 'text-blue-400' : 'text-gray-300'}`}
                            onClick={() => handlePollOptionSelect(index)}
                            disabled={selectedPollOption !== null}
                          >
                            {option}
                            {selectedPollOption === index && (
                              <CheckCircle className="inline ml-2 w-3 h-3" />
                            )}
                          </button>
                          <span className="text-gray-400 text-xs">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-1.5" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Upcoming topics */}
            <div className="bg-neutral-900/95 rounded-xl border border-neutral-800 overflow-hidden p-4">
              <h3 className="text-white font-semibold mb-3">Coming Up Next</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className={`w-2 h-2 rounded-full ${currentTime < 600 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <span className={`text-sm ${currentTime >= 300 && currentTime < 600 ? 'text-white' : ''}`}>Revenue Breakdown of Top AI Channels</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className={`w-2 h-2 rounded-full ${currentTime < 900 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <span className={`text-sm ${currentTime >= 600 && currentTime < 900 ? 'text-white' : ''}`}>Scaling to Multiple Channels</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className={`w-2 h-2 rounded-full ${currentTime < 1200 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <span className={`text-sm ${currentTime >= 900 && currentTime < 1200 ? 'text-white' : ''}`}>Advanced Content Creation Tactics</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className={`w-2 h-2 rounded-full ${currentTime < 1500 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <span className={`text-sm ${currentTime >= 1200 && currentTime < 1500 ? 'text-white' : ''}`}>Special Offer for Webinar Attendees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Milestone offer modal */}
      <AlertDialog open={showMilestoneOffer} onOpenChange={setShowMilestoneOffer}>
        <AlertDialogContent className="bg-gradient-to-br from-blue-900 to-indigo-900 border-blue-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl">
              {currentMilestone.type === 'early-bird' && "🔥 Early Bird Special Offer"}
              {currentMilestone.type === 'bonus-module' && "🎁 Exclusive Bonus Module Unlocked"}
              {currentMilestone.type === 'final-offer' && "⏰ Last Chance Special Offer"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-blue-200">
              {currentMilestone.type === 'early-bird' && 
                "For the next 20 minutes only, get 50% off our AI YouTube Masterclass when you enroll today!"
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
            <AlertDialogAction className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
              Claim This Offer
              <ArrowUpRight className="w-4 h-4" />
            </AlertDialogAction>
            <Button variant="outline" onClick={handleCloseMilestoneOffer} className="text-white border-blue-400">
              Continue Watching
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
