
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Award, BookOpen, ArrowUpRight } from 'lucide-react';

const WebinarInfoTabs = () => {
  return (
    <div className="bg-neutral-900/95 rounded-xl border border-neutral-800 overflow-hidden p-4">
      <Tabs defaultValue="details">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="about">About Host</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="text-white space-y-4">
          <h3 className="text-xl font-semibold">AI YouTube Masterclass: Earn $57/hr Without Showing Your Face</h3>
          <p className="text-gray-300">Learn how to leverage AI tools to create engaging content, grow your audience, and monetize your channel - all without ever stepping in front of the camera.</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-neutral-800 rounded-lg p-3 flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-medium">Channel Growth</h4>
                <p className="text-sm text-gray-400">Learn proven strategies for gaining subscribers quickly</p>
              </div>
            </div>
            <div className="bg-neutral-800 rounded-lg p-3 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium">Content Strategy</h4>
                <p className="text-sm text-gray-400">Discover how to plan content that performs</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="text-white">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold mb-3">Webinar Resources</h3>
            <div className="bg-neutral-800 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 rounded p-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>AI YouTube Revenue Calculator</span>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Download
                <ArrowUpRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
            <div className="bg-neutral-800 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-600 rounded p-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Niche Selection Guide</span>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Download
                <ArrowUpRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="text-white">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 border-2 border-blue-500">
              <AvatarFallback className="bg-blue-600 text-xl">A</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">Alex Johnson</h3>
              <p className="text-gray-300">YouTube Content Strategist & AI Expert</p>
            </div>
          </div>
          <p className="text-gray-300">
            Alex has helped over 2,500 creators build successful YouTube channels using AI tools and strategic content planning. His students have collectively generated over $4.7M in YouTube revenue.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebinarInfoTabs;
