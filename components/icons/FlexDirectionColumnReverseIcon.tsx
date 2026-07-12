import React from 'react';

const FlexDirectionColumnReverseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="16" width="8" height="5" rx="1" transform="rotate(180 12 18.5)" />
      <rect x="8" y="9.5" width="8" height="5" rx="1" transform="rotate(180 12 12)" />
      <rect x="8" y="3" width="8" height="5" rx="1" transform="rotate(180 12 5.5)" />
    </g>
  </svg>
);

export default FlexDirectionColumnReverseIcon;