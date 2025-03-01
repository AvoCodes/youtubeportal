
import React from 'react';
import WebinarOfferHighlights from './WebinarOfferHighlights';
import WebinarFeatureCards from './WebinarFeatureCards';
import WebinarCTA from './WebinarCTA';

interface WebinarOfferProps {
  seatsRemaining: number;
  countdownActive: boolean;
  countdown: number;
  onCTAClick: () => void;
}

const WebinarOffer: React.FC<WebinarOfferProps> = ({
  seatsRemaining,
  countdownActive,
  countdown,
  onCTAClick
}) => {
  return (
    <div className="space-y-6">
      <WebinarOfferHighlights />
      <WebinarFeatureCards />
      <WebinarCTA 
        seatsRemaining={seatsRemaining}
        countdownActive={countdownActive}
        countdown={countdown}
        onCTAClick={onCTAClick}
      />
    </div>
  );
};

export default WebinarOffer;
