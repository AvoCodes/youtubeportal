
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  onClick: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full md:w-auto bg-yellow-400 hover:bg-yellow-300 text-blue-900 rounded-lg px-8 py-4 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
    >
      <span className="relative">
        <span className="flex items-center gap-2">
          Join Now
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </span>
        <span className="absolute top-full left-0 text-xs font-normal mt-1 text-blue-800">
          Special offer ends soon
        </span>
      </span>
    </button>
  );
};

export default CTAButton;
