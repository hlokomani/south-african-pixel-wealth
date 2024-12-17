import React from 'react';
import { ImpactBlockData } from './types';
import { formatCurrency } from '@/utils/formatting';

interface ImpactBlockProps {
  data: ImpactBlockData;
  pixelScale: number;
}

export const ImpactBlock: React.FC<ImpactBlockProps> = ({ data, pixelScale }) => {
  const width = Math.max(1, data.cost / (pixelScale * 100));
  
  return (
    <div 
      className="absolute bottom-0 border-t border-white bg-black bg-opacity-20 text-white p-2"
      style={{ width: `${width}px`, maxWidth: '100%' }}
    >
      <div className="transform -rotate-90 origin-left translate-y-8 whitespace-nowrap">
        <span className="font-bold">Could fund: {data.description}</span>
        <span className="text-xs ml-2">[Cost: {formatCurrency(data.cost)}]</span>
        <span className="text-xs ml-2">[Source: {data.source}]</span>
      </div>
    </div>
  );
};