import React from 'react';

const RibbonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4l16 16" />
    <path d="M4 10v10h10" />
    <path d="M20 14V4H10" />
  </svg>
);

export default RibbonIcon;
