
import React from 'react';
import WebinarOfferHighlights from './WebinarOfferHighlights';
import WebinarFeatureCards from './WebinarFeatureCards';
import WebinarCTA from './WebinarCTA';
import { PaymentOption } from '../CTAButton';

interface WebinarOfferProps {
  seatsRemaining: number;
  countdownActive: boolean;
  countdown: number;
  onCTAClick: (paymentOption: PaymentOption) => void;
  oneTimePaymentUrl: string;
  splitPaymentUrl: string;
}

const WebinarOffer: React.FC<WebinarOfferProps> = ({
  seatsRemaining,
  countdownActive,
  countdown,
  onCTAClick,
  oneTimePaymentUrl,
  splitPaymentUrl
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
        oneTimePaymentUrl={oneTimePaymentUrl}
        splitPaymentUrl={splitPaymentUrl}
      />
    </div>
  );
};

export default WebinarOffer;
