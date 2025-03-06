
import React from 'react';

const ImplementationNotes: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <h3 className="text-amber-800 font-medium mb-1">Implementation Notes:</h3>
      <ul className="text-amber-700 text-sm space-y-1 ml-4 list-disc">
        <li>This design features the offer components with an integrated CTA at the bottom.</li>
        <li>The layout is fully responsive and optimized for both mobile and desktop viewing.</li>
        <li>Color themes can be changed to match your branding preferences.</li>
        <li>The countdown timer and available seats can be adjusted as needed.</li>
      </ul>
    </div>
  );
};

export default ImplementationNotes;
