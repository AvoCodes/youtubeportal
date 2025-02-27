
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  onClick: () => void;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "group bg-white hover:bg-blue-50 text-blue-600 rounded-lg px-6 py-6 h-auto font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-0 whitespace-nowrap",
        className
      )}
    >
      <span>Claim Offer</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
};

export default CTAButton;
