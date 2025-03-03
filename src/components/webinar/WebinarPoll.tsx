
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface WebinarPollProps {
  question: string;
  options: string[];
  results: number[];
  selectedOption: number | null;
  onOptionSelect: (index: number) => void;
  totalVotes: number;
}

const WebinarPoll = ({
  question,
  options,
  results,
  selectedOption,
  onOptionSelect,
  totalVotes,
}: WebinarPollProps) => {
  return (
    <Card className="p-5 bg-white/90 backdrop-blur-sm shadow-lg border border-slate-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">{question}</h3>
        <p className="text-sm text-slate-500">{totalVotes} votes so far</p>
      </div>

      <RadioGroup value={selectedOption?.toString()} className="space-y-4">
        {options.map((option, index) => {
          const percentage = totalVotes > 0 ? Math.round((results[index] / totalVotes) * 100) : 0;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center">
                <div className="flex items-start gap-2 flex-1">
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${index}`}
                    onClick={() => onOptionSelect(index)}
                    disabled={selectedOption !== null}
                  />
                  <Label 
                    htmlFor={`option-${index}`}
                    className={`${selectedOption === index ? 'font-medium text-blue-600' : 'text-slate-700'}`}
                  >
                    {option}
                  </Label>
                </div>
                <span className="text-sm font-medium text-slate-600">{percentage}%</span>
              </div>
              
              <Progress 
                value={percentage} 
                className="h-2 bg-slate-200"
                indicatorClassName={`${selectedOption === index ? 'bg-blue-500' : 'bg-slate-400'}`}
              />
            </div>
          );
        })}
      </RadioGroup>
    </Card>
  );
};

export default WebinarPoll;
