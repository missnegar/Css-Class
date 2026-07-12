import React from 'react';

const RibbonBannerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M4 7v10" />
    <path d="M20 7v10" />
    <path d="M4 12h16" />
    <path d="M10 7L8 12l2 5" />
    <path d="M14 7l2 5-2 5" />
  </svg>
);

export default RibbonBannerIcon;
