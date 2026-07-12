import React from 'react';

const SolanaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 18h16" />
    <path d="M4 12h16" />
    <path d="M4 6h16" />
    <path d="M6 18c-1.5-1.5-1.5-3.5 0-5" />
    <path d="M18 12c1.5-1.5 1.5-3.5 0-5" />
    <path d="M6 12c-1.5-1.5-1.5-3.5 0-5" />
    <path d="M18 6c1.5 1.5 1.5 3.5 0 5" />
  </svg>
);

export default SolanaIcon;