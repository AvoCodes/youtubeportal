
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';

interface PollOption {
  text: string;
  percentage: number;
}

interface WebinarPollProps {
  question: string;
  options: string[];
  results: number[];
  selectedOption: number | null;
  onOptionSelect: (index: number) => void;
  totalVotes: number;
}

const WebinarPoll: React.FC<WebinarPollProps> = ({
  question,
  options,
  results,
  selectedOption,
  onOptionSelect,
  totalVotes,
}) => {
  return (
    <div className="bg-neutral-900/95 rounded-xl border border-neutral-800 overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Quick Poll</h3>
        <span className="text-gray-400 text-xs">{totalVotes} votes</span>
      </div>
      
      <p className="text-white text-sm mb-3">{question}</p>
      
      <div className="space-y-2">
        {options.map((option, index) => {
          const percentage = Math.round((results[index] / totalVotes) * 100);
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <button 
                  className={`text-left ${selectedOption === index ? 'text-blue-400' : 'text-gray-300'}`}
                  onClick={() => onOptionSelect(index)}
                  disabled={selectedOption !== null}
                >
                  {option}
                  {selectedOption === index && (
                    <CheckCircle className="inline ml-2 w-3 h-3" />
                  )}
                </button>
                <span className="text-gray-400 text-xs">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-1.5" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WebinarPoll;
