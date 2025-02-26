
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  onClick: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group bg-white hover:bg-blue-50 text-blue-600 rounded-lg px-6 py-3 font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
    >
      <span>Join the Program</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
};

export default CTAButton;
