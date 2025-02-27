
import React, { useState } from 'react';
import { Clock, Users, CheckCircle } from 'lucide-react';
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
  const [theme, setTheme] = useState('blue');
  
  const { toast } = useToast();

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderOffersSection = () => {
    const baseClasses = {
      blue: "bg-gradient-to-r from-blue-600 to-blue-700",
      purple: "bg-gradient-to-r from-purple-600 to-indigo-700",
      green: "bg-gradient-to-r from-emerald-600 to-teal-700",
      orange: "bg-gradient-to-r from-orange-500 to-amber-600"
    };
    
    const baseClass = baseClasses[theme as keyof typeof baseClasses];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-medium text-slate-900 mb-3">Offer Highlights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800">Complete AI YouTube Shorts Automation System</h4>
                <p className="text-sm text-slate-600">Everything you need to generate passive income with AI-created shorts</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800">Premium Content Library</h4>
                <p className="text-sm text-slate-600">Over 100+ ready-to-use templates and niche research reports</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800">Private Community Access</h4>
                <p className="text-sm text-slate-600">Connect with other successful creators for support and networking</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-slate-800">Weekly Live Q&A Sessions</h4>
                <p className="text-sm text-slate-600">Get your questions answered by our expert team</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="text-amber-500 bg-amber-50 rounded-full w-8 h-8 flex items-center justify-center mb-3">
              <CheckCircle className="w-4 h-4" />
            </div>
            <h3 className="font-medium text-slate-900 mb-1">AI Script Generator</h3>
            <p className="text-sm text-slate-600">Create viral-worthy scripts with our advanced AI tools</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="text-blue-500 bg-blue-50 rounded-full w-8 h-8 flex items-center justify-center mb-3">
              <CheckCircle className="w-4 h-4" />
            </div>
            <h3 className="font-medium text-slate-900 mb-1">90-Day Fast Start</h3>
            <p className="text-sm text-slate-600">Step-by-step guidance to make your first $1000</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="text-purple-500 bg-purple-50 rounded-full w-8 h-8 flex items-center justify-center mb-3">
              <CheckCircle className="w-4 h-4" />
            </div>
            <h3 className="font-medium text-slate-900 mb-1">Monetization Blueprint</h3>
            <p className="text-sm text-slate-600">Multiple income streams from your AI shorts channel</p>
          </div>
        </div>
        
        <div className={`${baseClass} rounded-xl p-5 sm:p-6`}>
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-3 text-center sm:text-left">
              <div className="inline-block bg-blue-500/20 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                Live Special
              </div>
              <h3 className="text-white font-medium text-lg sm:text-xl">Ready to start your AI Shorts journey?</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-blue-100 text-sm justify-center sm:justify-start">
                <p className="flex items-center gap-2 justify-center sm:justify-start">
                  <Users className="w-4 h-4 text-blue-300" />
                  <span>{seatsRemaining} VIP Spots Left</span>
                </p>
                <p className="flex items-center gap-2 justify-center sm:justify-start">
                  <Clock className="w-4 h-4 text-blue-300" />
                  <span className="font-mono">{formatCountdown(countdown)}</span>
                  <span>remaining</span>
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <CTAButton 
                onClick={() => {
                  toast({
                    title: "🎉 Congrats!",
                    description: "You're being redirected to the secure enrollment page...",
                    duration: 3000,
                  });
                }} 
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-5xl mx-auto p-4 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Offer Components Preview</h1>
          <p className="text-slate-600">Experiment with offer components and CTA for the webinar page</p>
          
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
            <TabsList className="grid grid-cols-2 w-full sm:w-[400px]">
              <TabsTrigger value="style">Style Options</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
            </TabsList>
            
            <TabsContent value="style" className="space-y-4 pt-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Color Theme</h3>
                <RadioGroup 
                  value={theme} 
                  onValueChange={setTheme} 
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
            </TabsContent>
            
            <TabsContent value="behavior" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-6">
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
                
                <Separator />
                
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
              </div>
            </TabsContent>
          </Tabs>

          {/* Preview Section */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Preview</h2>
            <div className="border border-slate-200 rounded-lg p-4 sm:p-8 bg-white">
              {renderOffersSection()}
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-amber-800 font-medium mb-1">Implementation Notes:</h3>
            <ul className="text-amber-700 text-sm space-y-1 ml-4 list-disc">
              <li>This design features the offer components with an integrated CTA at the bottom.</li>
              <li>The layout is fully responsive and optimized for both mobile and desktop viewing.</li>
              <li>Color themes can be changed to match your branding preferences.</li>
              <li>The countdown timer and available seats can be adjusted as needed.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAPreview;
