import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className={`${sizeClasses[size]} loading-spinner`}></div>
    </div>
  );
};

export default LoadingSpinner;
