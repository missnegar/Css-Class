import React from 'react';

const JsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M17 11.5c-1.5 0-3 1.5-3 3.5v0a3.5 3.5 0 1 0 7 0" />
    <path d="M6 18.5c0-3.5 1.5-5 3-5s3 1.5 3 5" />
  </svg>
);

export default JsIcon;