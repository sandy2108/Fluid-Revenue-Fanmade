// components/AnnouncementMarquee.js
import React from 'react';

const Announcement= () => {
  return (
    <div className="bg-gray-200  overflow-hidden">
      <div className="marquee">
        <strong>Important Announcement:</strong> This is not an official website related to Fluid. The results will be calculated using the formula: (Total ETH * Your Amount) / Circulating Supply. Please stay tuned for updates.
      </div>
    </div>
  );
};

export default Announcement;
