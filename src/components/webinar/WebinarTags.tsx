
import React from 'react';
import { Radio, CheckCircle, Trophy } from 'lucide-react';

const WebinarTags: React.FC = () => {
  return (
    <div className="flex justify-center md:justify-start flex-row overflow-x-auto gap-2 sm:gap-4 mb-8 no-scrollbar pb-1">
      <div className="bg-rose-500/20 text-rose-400 px-3 sm:px-4 py-1.5 rounded-full flex items-center text-xs sm:text-sm font-medium border border-rose-500/30 whitespace-nowrap flex-shrink-0 backdrop-blur-sm shadow-lg shadow-rose-500/10">
        <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2 animate-pulse" />
        <span>LIVE</span>
      </div>
      <div className="bg-emerald-500/20 text-emerald-400 px-3 sm:px-4 py-1.5 rounded-full flex items-center text-xs sm:text-sm font-medium border border-emerald-500/30 whitespace-nowrap flex-shrink-0 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2" />
        <span>Beginner Friendly</span>
      </div>
      <div className="bg-amber-500/20 text-amber-400 px-3 sm:px-4 py-1.5 rounded-full flex items-center text-xs sm:text-sm font-medium border border-amber-500/30 whitespace-nowrap flex-shrink-0 backdrop-blur-sm shadow-lg shadow-amber-500/10">
        <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2" />
        <span>Proven Success</span>
      </div>
    </div>
  );
};

export default WebinarTags;
