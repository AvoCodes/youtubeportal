
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  onClick: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cta-button w-full bg-primary text-primary-foreground rounded-lg px-8 py-4 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
    >
      Enroll Now
      <ArrowRight className="w-5 h-5" />
    </button>
  );
};

export default CTAButton;
