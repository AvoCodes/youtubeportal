
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ArrowRight, AlertTriangle } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50/80 to-white flex flex-col items-center">
      <div className="max-w-5xl w-full px-4 py-12 md:py-16">
        {/* Webinar Information */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
            The YouTube Portal: Make $57/Hr Without Showing Your Face.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-2">
            Reserve your seat! The live training starts soon.
          </p>
          <div className="inline-block bg-rose-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full font-medium text-sm shadow-sm">
            With Daniel Bitton, Made First Million At 17.
          </div>
        </div>
        
        {/* Timer & Capacity */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-6">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-rose-100">
            <Clock className="w-5 h-5 text-rose-500" />
            <div className="font-mono text-2xl font-medium text-slate-900">
              {formatTime(timeRemaining)}
            </div>
            <span className="text-slate-500">until start</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-rose-100">
            <Users className="w-5 h-5 text-amber-500" />
            <span className="text-slate-500">Only</span>
            <div className="font-medium text-amber-600">{remainingSeats} seats</div>
            <span className="text-slate-500">remaining</span>
          </div>
        </div>
        
        {/* Capacity Bar */}
        <div className="w-full max-w-lg mx-auto mb-8 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="flex justify-between text-sm text-slate-600 mb-1.5">
            <span>Capacity</span>
            <span>{capacityPercentage}%</span>
          </div>
          <Progress value={capacityPercentage} className="h-2.5" indicatorClassName="bg-rose-500" />
          
          {/* Urgency message */}
          <div className="mt-4 text-center text-red-500 text-sm font-medium flex justify-center items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Session closing soon due to high demand!</span>
          </div>
        </div>
        
        {/* Video Player */}
        <div className="w-full mb-8 rounded-xl overflow-hidden shadow-md">
          <VideoPlayer wistiaId="92627nrxy4" />
        </div>
        
        {/* Join Button */}
        <div className="text-center">
          <Button 
            onClick={handleJoinWebinar}
            className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
          >
            Join Live Session Now
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <p className="mt-3 text-slate-500 text-sm">
            This session is about to begin. Click to join now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreWebinar;
