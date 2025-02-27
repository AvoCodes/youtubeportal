
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ArrowRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const PreWebinar = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [capacityPercentage, setCapacityPercentage] = useState(72);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Optionally auto-navigate to the webinar
          // navigate('/');
          return 0;
        }
        return prev - 1;
      });
      
      // Randomly increase capacity to create urgency
      if (Math.random() > 0.9 && capacityPercentage < 98) {
        setCapacityPercentage(prev => Math.min(prev + 1, 98));
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [capacityPercentage, navigate]);
  
  const handleJoinWebinar = () => {
    navigate('/');
  };
  
  const remainingSeats = Math.floor((100 - capacityPercentage) / 100 * 500);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center">
      <div className="max-w-5xl w-full px-4 py-12 md:py-16">
        {/* Webinar Information */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
            The YouTube Portal: Make $57/Hr Without Showing Your Face.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-2">
            Your seat is reserved! The live training starts soon.
          </p>
          <div className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-full font-medium text-sm">
            With Daniel Bitton, Made First Million At 17.
          </div>
        </div>
        
        {/* Timer & Capacity */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-6">
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
            <Clock className="w-5 h-5 text-blue-500" />
            <div className="font-mono text-2xl font-medium text-slate-900">
              {formatTime(timeRemaining)}
            </div>
            <span className="text-slate-500">until start</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
            <Users className="w-5 h-5 text-amber-500" />
            <span className="text-slate-500">Only</span>
            <div className="font-medium text-amber-600">{remainingSeats} seats</div>
            <span className="text-slate-500">remaining</span>
          </div>
        </div>
        
        {/* Capacity Bar */}
        <div className="w-full max-w-lg mx-auto mb-8">
          <div className="flex justify-between text-sm text-slate-600 mb-1.5">
            <span>Capacity</span>
            <span>{capacityPercentage}%</span>
          </div>
          <Progress value={capacityPercentage} className="h-2.5" indicatorClassName="bg-amber-500" />
        </div>
        
        {/* Video Player */}
        <div className="w-full mb-8">
          <VideoPlayer wistiaId="92627nrxy4" />
        </div>
        
        {/* Join Button */}
        <div className="text-center">
          <Button 
            onClick={handleJoinWebinar}
            className="text-lg px-8 py-6 h-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Join the Webinar Now
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <p className="mt-3 text-slate-500 text-sm">
            This training is about to begin. Click to join now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreWebinar;
