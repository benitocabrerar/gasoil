import React from 'react';

export const LogoIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <circle cx="50" cy="50" r="45" fill="#F0F0F0" />
    <path 
      d="M30,50 Q50,30 70,50 T110,50" 
      stroke="#333" 
      strokeWidth="6" 
      fill="none"
    />
    <circle cx="50" cy="50" r="10" fill="#2C3E50" />
  </svg>
);

export const AvatarIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <circle cx="50" cy="50" r="45" fill="#E0E0E0" />
    <circle cx="50" cy="40" r="20" fill="#333" />
    <path 
      d="M20,75 Q50,90 80,75" 
      stroke="#333" 
      strokeWidth="6" 
      fill="none"
    />
  </svg>
);

export const EnergyIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <polygon 
      points="50,10 20,60 80,60" 
      fill="#F39C12" 
    />
    <circle 
      cx="50" 
      cy="75" 
      r="15" 
      fill="#2980B9" 
    />
  </svg>
);

export const OilPlatformIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <rect x="40" y="20" width="20" height="60" fill="#34495E" />
    <polygon points="50,10 30,20 70,20" fill="#2C3E50" />
    <rect x="20" y="80" width="60" height="10" fill="#7F8C8D" />
    <line x1="50" y1="30" x2="50" y2="70" stroke="#ECF0F1" strokeWidth="3" />
  </svg>
);

export const BackgroundPattern = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 200" 
    className={className}
  >
    <defs>
      <pattern id="pattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2" fill="#E0E0E0" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pattern)" />
  </svg>
);