
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ThemeSelector from './ThemeSelector';
import CountdownControl from './CountdownControl';
import SeatsControl from './SeatsControl';

interface ControlTabsProps {
  theme: string;
  setTheme: (theme: string) => void;
  countdown: number;
  setCountdown: (value: number) => void;
  seatsRemaining: number;
  setSeatsRemaining: (value: number) => void;
}

const ControlTabs: React.FC<ControlTabsProps> = ({
  theme,
  setTheme,
  countdown,
  setCountdown,
  seatsRemaining,
  setSeatsRemaining
}) => {
  return (
    <Tabs defaultValue="style" className="w-full">
      <TabsList className="grid grid-cols-2 w-full sm:w-[400px]">
        <TabsTrigger value="style">Style Options</TabsTrigger>
        <TabsTrigger value="behavior">Behavior</TabsTrigger>
      </TabsList>
      
      <TabsContent value="style" className="space-y-4 pt-4">
        <ThemeSelector theme={theme} onThemeChange={setTheme} />
      </TabsContent>
      
      <TabsContent value="behavior" className="space-y-4 pt-4">
        <div className="grid grid-cols-1 gap-6">
          <CountdownControl countdown={countdown} setCountdown={setCountdown} />
          
          <Separator />
          
          <SeatsControl seatsRemaining={seatsRemaining} setSeatsRemaining={setSeatsRemaining} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ControlTabs;
