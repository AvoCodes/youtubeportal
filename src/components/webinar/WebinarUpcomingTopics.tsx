
import React from 'react';

interface WebinarUpcomingTopicsProps {
  currentTime: number;
}

const WebinarUpcomingTopics: React.FC<WebinarUpcomingTopicsProps> = ({ currentTime }) => {
  return (
    <div className="bg-neutral-900/95 rounded-xl border border-neutral-800 overflow-hidden p-4">
      <h3 className="text-white font-semibold mb-3">Coming Up Next</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-300">
          <div className={`w-2 h-2 rounded-full ${currentTime < 600 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
          <span className={`text-sm ${currentTime >= 300 && currentTime < 600 ? 'text-white' : ''}`}>
            Revenue Breakdown of Top AI Channels
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <div className={`w-2 h-2 rounded-full ${currentTime < 900 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
          <span className={`text-sm ${currentTime >= 600 && currentTime < 900 ? 'text-white' : ''}`}>
            Scaling to Multiple Channels
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <div className={`w-2 h-2 rounded-full ${currentTime < 1200 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
          <span className={`text-sm ${currentTime >= 900 && currentTime < 1200 ? 'text-white' : ''}`}>
            Advanced Content Creation Tactics
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <div className={`w-2 h-2 rounded-full ${currentTime < 1500 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
          <span className={`text-sm ${currentTime >= 1200 && currentTime < 1500 ? 'text-white' : ''}`}>
            Special Offer for Webinar Attendees
          </span>
        </div>
      </div>
    </div>
  );
};

export default WebinarUpcomingTopics;
