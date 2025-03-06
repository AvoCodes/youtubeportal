
import React from 'react';
import { Button } from '@/components/ui/button';

interface CountdownControlProps {
  countdown: number;
  setCountdown: (value: number) => void;
}

const CountdownControl: React.FC<CountdownControlProps> = ({ countdown, setCountdown }) => {
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Countdown Timer</h3>
      <div className="flex flex-wrap items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCountdown(Math.max(0, countdown - 60))}
        >
          -1 min
        </Button>
        <span className="font-mono w-16 text-center">
          {formatCountdown(countdown)}
        </span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCountdown(countdown + 60)}
        >
          +1 min
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCountdown(600)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default CountdownControl;
