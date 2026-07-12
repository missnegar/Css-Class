import React from 'react';

const PolygonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M7.42 19.35L3 14.63l4.42-4.72 4.16 4.16-4.16 5.28z" />
    <path d="M11.58 4.72L7.42 9.44l4.16 5.28 4.42-4.72-4.42-5.28z" />
    <path d="M16 9.44l4.42 4.72-4.42 4.72-4.16-5.28 4.16-4.16z" />
  </svg>
);

export default PolygonIcon;