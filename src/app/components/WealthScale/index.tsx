'use client';

import React, { useRef, useEffect, useState, memo } from 'react';
import { createWealthData } from './data';
import { COLORS } from './constants';
import { WealthDataPoint } from './types';

const RANDS_PER_PIXEL = 100;

// Format numbers as currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Memoized ruler component to prevent unnecessary re-renders
const RulerMarks = memo(({ amount }: { amount: number }) => {
  // Only create marks up to 10M to reduce DOM elements
  const maxAmount = Math.min(amount, 10000000);
  const markCount = Math.floor(maxAmount / 100000);

  return (
    <div className="absolute bottom-0 left-0 w-full">
      {/* First million indicator */}
      <div className="absolute bottom-20" style={{ left: `${1000000 / RANDS_PER_PIXEL - 100}px` }}>
        <div className="relative">
          <p className="absolute -top-6 text-black font-medium whitespace-nowrap bg-white/80 px-2 py-1 rounded">
            This is one million rand →
          </p>
        </div>
      </div>

      {/* Render fewer DOM elements by increasing the interval */}
      {[...Array(markCount)].map((_, i) => {
        if ((i + 1) % 2 === 0) { // Only render every second mark
          return (
            <div 
              key={i} 
              className="absolute bottom-0 flex flex-col items-center"
              style={{ left: `${(i + 1) * (100000 / RANDS_PER_PIXEL)}px` }}
            >
              <div className={`w-[1px] ${
                (i + 1) % 10 === 0 ? 'h-[125px] bg-black' :  // 1M marks
                (i + 1) % 5 === 0 ? 'h-[75px] bg-black' :    // 500K marks
                'h-[50px] bg-black'                           // 100K marks
              }`} />
              {(i + 1) % 10 === 0 && (
                <span className="absolute -top-8 text-sm text-black font-medium">
                  {(i + 1) / 10}M
                </span>
              )}
              {!((i + 1) % 10 === 0) && (
                <span className="absolute -top-6 text-xs text-black/60">
                  {((i + 1) * 100)}K
                </span>
              )}
            </div>
          );
        }
        return null;
      })}
      
      {/* Use CSS for smaller increments */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[15px]"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)',
          backgroundSize: `${20000 / RANDS_PER_PIXEL}px 100%`,
        }}
      />
    </div>
  );
});

RulerMarks.displayName = 'RulerMarks';

// Memoized wealth block component
const WealthBlock = memo(({ 
  item, 
  isFirstBlock,
  onRef 
}: { 
  item: WealthDataPoint;
  isFirstBlock: boolean;
  onRef: (el: HTMLDivElement | null) => void;
}) => {
  return (
    <div 
      className="mx-12"
      ref={onRef}
      style={{ marginTop: isFirstBlock ? '24vh' : '1rem' }}
    >
      <div 
        className="flex items-center relative"
        style={{
          width: `${item.amount / RANDS_PER_PIXEL}px`,
          height: isFirstBlock ? `${item.amount / RANDS_PER_PIXEL}px` : '500px',
          backgroundColor: COLORS.green
        }}
      >
        {item.amount >= 1000000 && <RulerMarks amount={item.amount} />}
        
        <div className="font-bold p-2.5 left-0 z-10 group relative cursor-pointer">
          {item.label}
          <div className="text-sm">
            {formatCurrency(item.amount)}
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                        absolute top-full left-0 mt-2
                        p-3 bg-white shadow-lg rounded-lg w-64 z-20">
            <p className="text-gray-700 text-sm">{item.message}</p>
            <div className="absolute -top-2 left-4 border-8 border-transparent border-b-white" />
          </div>
        </div>
      </div>
    </div>
  );
});

WealthBlock.displayName = 'WealthBlock';

export const WealthScale = () => {
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const wealthBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wealthData = createWealthData()[0].data;

  useEffect(() => {
    const handleScroll = () => {
      wealthBlockRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const isVisible = rect.left < window.innerWidth && rect.right > 0;
        
        if (isVisible) {
          const scrolledPixels = window.scrollX - ref.offsetLeft;
          const amount = Math.min(
            scrolledPixels * RANDS_PER_PIXEL,
            wealthData[index].amount
          );
          setCurrentAmount(amount);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [wealthData]);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    wealthBlockRefs.current[index] = el;
  };

  return (
    <div className="wealth-wrapper-outer">
      <div className="wealth-row">
        <div className="title-screen h-screen flex-shrink-0 inline-block w-screen">
          <h1 className="text-center text-6xl mt-24">South African Wealth Scale</h1>
          <div className="max-w-2xl mx-auto mt-8 text-center text-xl text-gray-600">
            <p className="mb-4">
              South Africa is currently the most unequal country in the world, with a Gini coefficient of 0.63. 
              This visualization aims to illustrate the stark wealth disparity by showing how different income levels 
              compare to each other.
            </p>
            <p className="mb-12">
              Starting from the minimum wage of R150 per day, scroll right to explore how it measures against 
              various income levels in South Africa.
            </p>
            <div className="text-sm text-gray-400">
              <a href="https://github.com/hlokomani/south-african-pixel-wealth" className="mx-2 hover:text-gray-600">GitHub</a>
              <span>•</span>
              <a href="https://linkedin.com/in/hlokomani" className="mx-2 hover:text-gray-600">LinkedIn</a>
              <span>•</span>
              <a href="https://www.instagram.com/hkgotbeats" className="mx-2 hover:text-gray-600">IG</a>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-[360px] h-[165px] pt-10 pl-12 text-3xl text-gray-400/20">
            <span>scroll right</span>
            <div id="instructions" className="mt-10 text-lg opacity-0 transition-opacity duration-300">
              To scroll right, use shift + mousewheel. If you have a touchpad, swipe sideways.
            </div>
          </div>
        </div>

        {wealthData.map((item, index) => (
          <WealthBlock 
            key={index}
            item={item}
            isFirstBlock={index === 0}
            onRef={setRef(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WealthScale;