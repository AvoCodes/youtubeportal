
import React, { useState, useEffect } from 'react';
import WebinarTags from '../components/webinar/WebinarTags';
import WebinarPoll from '../components/webinar/WebinarPoll';
import WebinarHeader from '../components/webinar/WebinarHeader';
import WebinarVideo from '../components/webinar/WebinarVideo';
import WebinarOffer from '../components/webinar/WebinarOffer';
import WebinarMilestoneDialog from '../components/webinar/WebinarMilestoneDialog';
import { useToast } from '@/hooks/use-toast';
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

  const handleLike = () => {
    setLikesCount(prev => prev + 1);
    toast({
      title: "Thanks for the like!",
      description: "Your engagement helps the community.",
      duration: 3000,
    });
  };

  const handleCTAClick = () => {
    toast({
      title: "🎉 Congrats!",
      description: "You're being redirected to the secure enrollment page...",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-[1600px] mx-auto p-4 pt-8 md:pt-12">
        {/* Webinar Header */}
        <WebinarHeader />

        {/* Webinar Tags/Labels */}
        <WebinarTags />

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Video Section */}
          <WebinarVideo 
            currentTime={currentTime}
            viewerCount={viewerCount}
            likesCount={likesCount}
            onTimeUpdate={handleTimeUpdate}
            showNotification={showNotification}
            notification={notification}
            onLike={handleLike}
          />

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
            <WebinarOffer 
              seatsRemaining={seatsRemaining}
              countdownActive={countdownActive}
              countdown={countdown}
              onCTAClick={handleCTAClick}
            />
          )}
        </div>
      </div>
      
      {/* Milestone Dialog */}
      <WebinarMilestoneDialog 
        open={showMilestoneOffer && currentTime >= 1020}
        onOpenChange={setShowMilestoneOffer}
        currentMilestone={currentMilestone}
        countdown={countdown}
        onClose={handleCloseMilestoneOffer}
      />
    </div>
  );
};

export default Index;
