
import React from 'react';
import { CheckCircle } from 'lucide-react';

const WebinarFeatureCards: React.FC = () => {
  return (
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
  );
};

export default WebinarFeatureCards;
