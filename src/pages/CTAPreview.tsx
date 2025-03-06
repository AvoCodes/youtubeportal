
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ControlTabs from '../components/cta-preview/ControlTabs';
import OffersDisplay from '../components/cta-preview/OffersDisplay';
import ImplementationNotes from '../components/cta-preview/ImplementationNotes';

const CTAPreview = () => {
  const [countdown, setCountdown] = useState(600);
  const [seatsRemaining, setSeatsRemaining] = useState(37);
  const [theme, setTheme] = useState('blue');

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-5xl mx-auto p-4 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Offer Components Preview</h1>
          <p className="text-slate-600">Experiment with offer components and CTA for the webinar page</p>
          
          <div className="flex items-center gap-2 mt-4">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => window.history.back()}
            >
              Back to Webinar
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Controls */}
          <ControlTabs 
            theme={theme}
            setTheme={setTheme}
            countdown={countdown}
            setCountdown={setCountdown}
            seatsRemaining={seatsRemaining}
            setSeatsRemaining={setSeatsRemaining}
          />

          {/* Preview Section */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Preview</h2>
            <div className="border border-slate-200 rounded-lg p-4 sm:p-8 bg-white">
              <OffersDisplay 
                theme={theme}
                countdown={countdown}
                seatsRemaining={seatsRemaining}
              />
            </div>
          </div>
          
          <ImplementationNotes />
        </div>
      </div>
    </div>
  );
};

export default CTAPreview;
