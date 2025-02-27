
import React, { useState } from 'react';
import { Clock, Users, ArrowUpRight } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CTAPreview = () => {
  const [countdown, setCountdown] = useState(600);
  const [seatsRemaining, setSeatsRemaining] = useState(37);
  const [variant, setVariant] = useState('default');
  const [theme, setTheme] = useState('blue');
  
  const { toast } = useToast();

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Variants of the CTA section
  const renderCTASection = () => {
    const baseClasses = {
      blue: "bg-gradient-to-r from-blue-600 to-blue-700",
      purple: "bg-gradient-to-r from-purple-600 to-indigo-700",
      green: "bg-gradient-to-r from-emerald-600 to-teal-700",
      orange: "bg-gradient-to-r from-orange-500 to-amber-600"
    };
    
    const baseClass = baseClasses[theme as keyof typeof baseClasses];

    if (variant === 'compact') {
      return (
        <div className={`${baseClass} rounded-xl p-4 sm:p-5`}>
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-medium text-lg">Ready to start your AI Shorts journey?</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-white/80">
                <p className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Only {seatsRemaining} spots left</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-mono">{formatCountdown(countdown)}</span>
                </p>
              </div>
            </div>
            <CTAButton onClick={() => {
              toast({
                title: "🎉 Congrats!",
                description: "You're being redirected to the secure enrollment page...",
                duration: 3000,
              });
            }} />
          </div>
        </div>
      );
    }
    
    if (variant === 'feature-rich') {
      return (
        <div className={`${baseClass} rounded-xl p-6`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-5">
              <div className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                Limited Time Offer
              </div>
              <h3 className="text-white font-semibold text-2xl mt-3">Start Your Profitable AI Shorts Business Today</h3>
              <p className="text-white/80 mt-2">No experience needed. Our proven system walks you through every step.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-lg text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium">Complete System</h4>
                </div>
                <p className="text-sm text-white/80">Everything you need to generate passive income</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium">Weekly Updates</h4>
                </div>
                <p className="text-sm text-white/80">Stay ahead with latest AI strategies and tools</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium">Community Access</h4>
                </div>
                <p className="text-sm text-white/80">Connect with successful members for guidance</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="space-y-2 text-white">
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-white/80" />
                  <span>Limited to next {seatsRemaining} enrollments</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white/80" />
                  <span className="font-mono">{formatCountdown(countdown)}</span>
                  <span>remaining</span>
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <CTAButton onClick={() => {
                  toast({
                    title: "🎉 Congrats!",
                    description: "You're being redirected to the secure enrollment page...",
                    duration: 3000,
                  });
                }} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Default variant - this is what's currently used in the webinar
    return (
      <div className={`${baseClass} rounded-xl p-6`}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-block bg-blue-500/20 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
              Webinar Special
            </div>
            <h3 className="text-white font-medium text-xl">Ready to start your AI Shorts journey?</h3>
            <div className="space-y-2 text-blue-100">
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-300" />
                <span>Limited to next {seatsRemaining} enrollments</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-300" />
                <span className="font-mono">{formatCountdown(countdown)}</span>
                <span>remaining</span>
              </p>
            </div>
          </div>
          <CTAButton onClick={() => {
            toast({
              title: "🎉 Congrats!",
              description: "You're being redirected to the secure enrollment page...",
              duration: 3000,
            });
          }} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-5xl mx-auto p-4 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">CTA Section Preview</h1>
          <p className="text-slate-600">Experiment with different CTA section designs before adding to the webinar page</p>
          
          <div className="flex items-center gap-2 mt-4">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => window.history.back()}
            >
              Back to Webinar
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Controls */}
          <Tabs defaultValue="style" className="w-full">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="style">Style Options</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
            </TabsList>
            
            <TabsContent value="style" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Select Variant</h3>
                    <RadioGroup 
                      value={variant} 
                      onValueChange={setVariant} 
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="variant-default" />
                        <Label htmlFor="variant-default">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="variant-compact" />
                        <Label htmlFor="variant-compact">Compact</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="feature-rich" id="variant-feature-rich" />
                        <Label htmlFor="variant-feature-rich">Feature Rich</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Color Theme</h3>
                    <RadioGroup 
                      value={theme} 
                      onValueChange={setTheme} 
                      className="flex flex-col space-y-2"
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
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="behavior" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Countdown Timer</h3>
                    <div className="flex items-center space-x-2">
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
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Seats Remaining</h3>
                    <div className="flex items-center space-x-2">
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
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Preview Section */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Preview</h2>
            <div className="border border-slate-200 rounded-lg p-8 bg-white">
              {renderCTASection()}
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-amber-800 font-medium mb-1">Implementation Notes:</h3>
            <ul className="text-amber-700 text-sm space-y-1 ml-4 list-disc">
              <li>Once you've decided on a design, you can update the CTA section in the main webinar page.</li>
              <li>The current design uses the "default" variant with the "blue" theme.</li>
              <li>To modify the button style, edit the CTAButton component separately.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAPreview;
