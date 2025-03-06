
import React from 'react';
import { Button } from '@/components/ui/button';

interface SeatsControlProps {
  seatsRemaining: number;
  setSeatsRemaining: (value: number) => void;
}

const SeatsControl: React.FC<SeatsControlProps> = ({ seatsRemaining, setSeatsRemaining }) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Seats Remaining</h3>
      <div className="flex flex-wrap items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSeatsRemaining(Math.max(1, seatsRemaining - 1))}
        >
          -1
        </Button>
        <span className="font-mono w-10 text-center">
          {seatsRemaining}
        </span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSeatsRemaining(seatsRemaining + 1)}
        >
          +1
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSeatsRemaining(37)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default SeatsControl;
