
import React from 'react';
import { Radio, CheckCircle, Trophy } from 'lucide-react';

const WebinarTags: React.FC = () => {
  return (
    <div className="flex justify-center sm:justify-start flex-row overflow-x-auto gap-1.5 sm:gap-3 mb-6 no-scrollbar pb-1">
      <div className="bg-rose-50 text-rose-600 px-2 sm:px-3 py-1 rounded-full flex items-center text-xs sm:text-sm font-medium border border-rose-100 whitespace-nowrap flex-shrink-0">
        <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
        <span>Live</span>
      </div>
      <div className="bg-emerald-50 text-emerald-600 px-2 sm:px-3 py-1 rounded-full flex items-center text-xs sm:text-sm font-medium border border-emerald-100 whitespace-nowrap flex-shrink-0">
        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
        <span>Beginner</span>
      </div>
      <div className="bg-amber-50 text-amber-600 px-2 sm:px-3 py-1 rounded-full flex items-center text-xs sm:text-sm font-medium border border-amber-100 whitespace-nowrap flex-shrink-0">
        <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
        <span>Proven</span>
      </div>
    </div>
  );
};

export default WebinarTags;
