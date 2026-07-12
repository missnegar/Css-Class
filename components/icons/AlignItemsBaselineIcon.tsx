import React from 'react';

const AlignItemsBaselineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14H21" />
      <rect x="6" y="8" width="5" height="6" rx="1" />
      <rect x="13" y="11" width="5" height="3" rx="1" />
    </g>
  </svg>
);

export default AlignItemsBaselineIcon;