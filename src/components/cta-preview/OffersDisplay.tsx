
import React from 'react';
import { Clock, Users, CheckCircle } from 'lucide-react';
import CTAButton from '../CTAButton';
import { useToast } from '@/hooks/use-toast';
import WebinarOfferHighlights from '../webinar/WebinarOfferHighlights';
import WebinarFeatureCards from '../webinar/WebinarFeatureCards';

interface OffersDisplayProps {
  theme: string;
  countdown: number;
  seatsRemaining: number;
}

const OffersDisplay: React.FC<OffersDisplayProps> = ({ theme, countdown, seatsRemaining }) => {
  const { toast } = useToast();
  
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6">
      <WebinarOfferHighlights />
      
      <WebinarFeatureCards />
      
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-slate-200/60 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 text-center">
            <div className="inline-block bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-full border border-slate-200/60">
              Live Special
            </div>
            <h3 className="text-slate-900 font-medium text-lg sm:text-xl">Ready to start your AI Shorts journey?</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-600 text-sm justify-center">
              <p className="flex items-center gap-2 justify-center">
                <Users className="w-4 h-4 text-slate-500" />
                <span>{seatsRemaining} VIP Spots Left</span>
              </p>
              <p className="flex items-center gap-2 justify-center">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="font-mono">{formatCountdown(countdown)}</span>
                <span>remaining</span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto w-full">
            <CTAButton 
              paymentOption="one-time"
              onClick={() => {
                toast({
                  title: "🎉 Redirecting to checkout...",
                  description: "You selected the one-time payment option",
                  duration: 3000,
                });
              }} 
              externalUrl="https://whop.com/checkout/plan_FOQ8hdiCxdex3/"
              className="w-full"
            />
            <CTAButton 
              paymentOption="split-pay"
              onClick={() => {
                toast({
                  title: "🎉 Redirecting to checkout...",
                  description: "You selected the split-pay option",
                  duration: 3000,
                });
              }}
              externalUrl="https://whop.com/checkout/plan_rzFcf1TvyIStA/"
              className="w-full"
            />
          </div>
          
          <div className="text-center text-sm text-slate-500">
            <p>Financing available for both payment options</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersDisplay;
