import React from 'react';

const FlexDirectionRowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="5" height="8" rx="1" />
      <rect x="9.5" y="8" width="5" height="8" rx="1" />
      <rect x="16" y="8" width="5" height="8" rx="1" />
    </g>
  </svg>
);

export default FlexDirectionRowIcon;