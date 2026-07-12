import React from 'react';

const EthereumIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 2l7 10-7 10-7-10z" />
    <path d="M12 2v20" />
    <path d="M5 12h14" />
    <path d="M12 2L5 12l7 10" />
    <path d="M12 2l7 10-7 10" />
  </svg>
);

export default EthereumIcon;