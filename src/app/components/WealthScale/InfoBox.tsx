import React, { memo } from 'react';

interface InfoBoxProps {
  message: string;
  threshold: number;
  currentAmount: number;
}

export const InfoBox = memo(({ message, threshold, currentAmount }: InfoBoxProps) => {
  const isVisible = currentAmount >= threshold;
  
  return (
    <div className={`absolute transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white/80 p-4 rounded shadow-lg max-w-md">
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
});

InfoBox.displayName = 'InfoBox';