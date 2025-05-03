import React from 'react';

export const SimulationIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <rect x="10" y="40" width="30" height="50" fill="#3498DB" />
    <rect x="50" y="20" width="30" height="70" fill="#2980B9" />
    <path d="M25 30 L75 10" stroke="#2C3E50" strokeWidth="4" fill="none" />
  </svg>
);

export const DataAnalysisIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <path d="M10 80 L40 50 L70 70 L90 30" stroke="#E74C3C" strokeWidth="6" fill="none" />
    <circle cx="10" cy="80" r="10" fill="#C0392B" />
    <circle cx="40" cy="50" r="10" fill="#E74C3C" />
    <circle cx="70" cy="70" r="10" fill="#F39C12" />
    <circle cx="90" cy="30" r="10" fill="#27AE60" />
  </svg>
);

export const ReservoirModelingIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <polygon points="50,10 10,40 50,70 90,40" fill="#8E44AD" />
    <circle cx="50" cy="85" r="10" fill="#9B59B6" />
    <line x1="50" y1="70" x2="50" y2="95" stroke="#2C3E50" strokeWidth="4" />
  </svg>
);

export const ProductionOptimizationIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <path d="M10 50 Q50,20 90,50 T170,50" stroke="#2ECC71" strokeWidth="6" fill="none" />
    <circle cx="50" cy="50" r="15" fill="#27AE60" />
    <circle cx="90" cy="50" r="10" fill="#2980B9" />
  </svg>
);

export const EnvironmentalMonitoringIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <path d="M10 80 L40 50 L70 70 L90 30" stroke="#1ABC9C" strokeWidth="6" fill="none" />
    <circle cx="10" cy="80" r="10" fill="#16A085" />
    <circle cx="40" cy="50" r="10" fill="#1ABC9C" />
    <circle cx="70" cy="70" r="10" fill="#2ECC71" />
    <circle cx="90" cy="30" r="10" fill="#3498DB" />
  </svg>
);

export const RiskAssessmentIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <polygon points="50,10 10,90 90,90" fill="#E74C3C" />
    <text 
      x="50" 
      y="60" 
      textAnchor="middle" 
      fill="white" 
      fontSize="40" 
      fontWeight="bold"
    >
      !
    </text>
  </svg>
);