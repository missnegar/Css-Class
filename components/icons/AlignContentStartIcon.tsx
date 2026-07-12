import React from 'react';

const AlignContentStartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3H21" />
      <rect x="5" y="5" width="4" height="6" rx="1" />
      <rect x="10" y="5" width="4" height="6" rx="1" />
      <rect x="15" y="5" width="4" height="6" rx="1" />
    </g>
  </svg>
);

export default AlignContentStartIcon;