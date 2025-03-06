
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ThemeSelectorProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, onThemeChange }) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Color Theme</h3>
      <RadioGroup 
        value={theme} 
        onValueChange={onThemeChange} 
        className="flex flex-wrap gap-x-4 gap-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="blue" id="theme-blue" />
          <Label htmlFor="theme-blue" className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-600 mr-2" />
            Blue
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="purple" id="theme-purple" />
          <Label htmlFor="theme-purple" className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-600 mr-2" />
            Purple
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="green" id="theme-green" />
          <Label htmlFor="theme-green" className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-600 mr-2" />
            Green
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="orange" id="theme-orange" />
          <Label htmlFor="theme-orange" className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
            Orange
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ThemeSelector;
