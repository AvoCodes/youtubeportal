
import React from 'react';
import { CheckCircle } from 'lucide-react';

const WebinarOfferHighlights: React.FC = () => {
  return (
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
  );
};

export default WebinarOfferHighlights;
