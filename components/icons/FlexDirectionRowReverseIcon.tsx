import React from 'react';

const FlexDirectionRowReverseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="8" width="5" height="8" rx="1" transform="rotate(180 18.5 12)" />
      <rect x="9.5" y="8" width="5" height="8" rx="1" transform="rotate(180 12 12)" />
      <rect x="3" y="8" width="5" height="8" rx="1" transform="rotate(180 5.5 12)" />
    </g>
  </svg>
);

export default FlexDirectionRowReverseIcon;