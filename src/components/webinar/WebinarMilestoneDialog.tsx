
import React from 'react';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { MILESTONES } from './constants';

interface WebinarMilestoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentMilestone: typeof MILESTONES[0];
  countdown: number;
  onClose: () => void;
}

const WebinarMilestoneDialog: React.FC<WebinarMilestoneDialogProps> = ({
  open,
  onOpenChange,
  currentMilestone,
  countdown,
  onClose
}) => {
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
            onClick={onClose}
            className="text-slate-600"
          >
            I'll Think About It
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WebinarMilestoneDialog;
