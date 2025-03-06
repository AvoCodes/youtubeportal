
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type PaymentOption = 'one-time' | 'split-pay';

interface CTAButtonProps {
  onClick?: () => void;
  className?: string;
  paymentOption?: PaymentOption;
  externalUrl?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  onClick, 
  className, 
  paymentOption = 'one-time',
  externalUrl
}) => {
  const handleClick = () => {
    if (externalUrl) {
      window.open(externalUrl, '_blank');
    }
    
    if (onClick) {
      onClick();
    }
  };

  const getButtonText = () => {
    if (paymentOption === 'one-time') {
      return 'One-Time Payment ($995)';
    } else {
      return '4 Monthly Payments ($399)';
    }
  };

  const getButtonStyle = () => {
    if (paymentOption === 'one-time') {
      return "bg-blue-600 hover:bg-blue-700 text-white";
    } else {
      return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white";
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "group rounded-lg px-6 py-6 h-auto font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-0 whitespace-nowrap",
        getButtonStyle(),
        className
      )}
    >
      <span>{getButtonText()}</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
};

export default CTAButton;
