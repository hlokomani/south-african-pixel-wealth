'use client';

import React, { useRef } from 'react';
import { createWealthData } from './data';
import { COLORS } from './constants';

const RANDS_PER_PIXEL = 100;

export const WealthScale = () => {
  const firstBlockRef = useRef<HTMLDivElement>(null);
  const wealthData = createWealthData()[0].data;

  return (
    <div className="wealth-wrapper-outer">
      <div className="wealth-row">
        <div className="title-screen">
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
            <div id="instructions" className="mt-10 text-sm opacity-0 transition-opacity duration-300">
              To scroll right, use shift + mousewheel. If you have a touchpad, swipe sideways.
            </div>
          </div>
        </div>

        {wealthData.map((item, index) => (
          <div 
            key={index} 
            className="mx-12"
            ref={index === 0 ? firstBlockRef : null}
            style={{ marginTop: index === 0 ? '24vh' : '1rem' }}
          >
            <div 
              className="flex items-center relative"
              style={{
                width: `${item.amount / RANDS_PER_PIXEL}px`,
                height: index === 0 ? `${item.amount / RANDS_PER_PIXEL}px` : '500px',
                backgroundColor: COLORS.green
              }}
            >
              {item.amount === 8500000 && (
                <div className="absolute top-0 left-0 w-full">
                  <div className="absolute -top-16 left-0 bg-white p-2 rounded shadow-sm">
                    <p className="text-sm text-gray-600">Scale: Each mark = R1 million</p>
                  </div>
                  
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute top-0 flex flex-col items-center"
                         style={{ left: `${(i + 1) * (1000000 / RANDS_PER_PIXEL)}px` }}>
                      <div className="h-4 w-0.5 bg-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">
                        {i + 1}M
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              {item.amount >= 1000000 && (
                <div className="absolute bottom-0 left-0 w-full">
                  {/* First million indicator arrow */}
                  {item.amount === 8500000 && (
                    <div className="absolute bottom-20 left-0" style={{ width: `${1000000 / RANDS_PER_PIXEL}px` }}>
                      <div className="relative w-full">
                        <p className="absolute -top-6 left-1/2 -translate-x-1/2 text-black font-medium whitespace-nowrap bg-white/80 px-2 rounded">
                          This is one million rand →
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Ruler markings */}
                  {[...Array(Math.floor(item.amount / 10000))].map((_, i) => (
                    <div key={i} className="absolute bottom-0 flex flex-col items-center"
                         style={{ left: `${(i + 1) * (10000 / RANDS_PER_PIXEL)}px` }}>
                      <div className={`w-[1px] ${
                        (i + 1) % 100 === 0 ? 'h-[125px] bg-black' :  // 1M marks
                        (i + 1) % 50 === 0 ? 'h-[75px] bg-black' :    // 500K marks
                        (i + 1) % 10 === 0 ? 'h-[50px] bg-black' :    // 100K marks
                        'h-[15px] bg-black/40'                         // 10K marks
                      }`} />
                      {(i + 1) % 100 === 0 && (
                        <span className="absolute -top-8 text-sm text-black font-medium">
                          {(i + 1) / 100}M
                        </span>
                      )}
                      {(i + 1) % 10 === 0 && !((i + 1) % 100 === 0) && (
                        <span className="absolute -top-6 text-xs text-black/60">
                          {((i + 1) * 10)}K
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="font-bold p-2.5 sticky left-0 z-10 group relative cursor-pointer">
                {item.label}
                <div className="text-sm">
                  {new Intl.NumberFormat('en-ZA', {
                    style: 'currency',
                    currency: 'ZAR',
                    minimumFractionDigits: 0,
                  }).format(item.amount)}
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                              absolute top-full left-0 mt-2
                              p-3 bg-white shadow-lg rounded-lg w-64 z-20">
                  <p className="text-gray-700 text-sm">{item.message}</p>
                  <div className="absolute -top-2 left-4
                                border-8 border-transparent border-b-white">
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WealthScale;