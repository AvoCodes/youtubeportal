
import React from 'react';
import { Clock, Users } from 'lucide-react';
import CTAButton from '../CTAButton';

interface WebinarCTAProps {
  seatsRemaining: number;
  countdownActive: boolean;
  countdown: number;
  onCTAClick: () => void;
}

const WebinarCTA: React.FC<WebinarCTAProps> = ({
  seatsRemaining,
  countdownActive,
  countdown,
  onCTAClick
}) => {
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-slate-200/60 shadow-sm">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3 text-center sm:text-left">
          <div className="inline-block bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-full border border-slate-200/60">
            Live Special
          </div>
          <h3 className="text-slate-900 font-medium text-lg sm:text-xl">Ready to start your AI Shorts journey?</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-600 text-sm justify-center sm:justify-start">
            <p className="flex items-center gap-2 justify-center sm:justify-start">
              <Users className="w-4 h-4 text-slate-500" />
              <span>{seatsRemaining} VIP Spots Left</span>
            </p>
            {countdownActive && (
              <p className="flex items-center gap-2 justify-center sm:justify-start">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="font-mono">{formatCountdown(countdown)}</span>
                <span>remaining</span>
              </p>
            )}
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <CTAButton 
            onClick={onCTAClick} 
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default WebinarCTA;
