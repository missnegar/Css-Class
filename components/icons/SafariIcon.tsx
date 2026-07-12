import React from 'react';

const SafariIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z" fill="#007AFF"/>
    <path d="M12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 2.94931L10.0503 10.0503L2.94928 12L10.0503 13.9498L12.0001 21.0508L13.9498 13.9498L21.0508 12L13.9498 10.0503L12.0001 2.94931Z" fill="#007AFF"/>
    <path d="M16.2426 16.2426L7.75735 7.75735" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.2426 7.75735L7.75735 16.2426" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default SafariIcon;
