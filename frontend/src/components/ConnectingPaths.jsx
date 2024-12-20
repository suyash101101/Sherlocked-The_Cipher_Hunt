import React from 'react';

const ConnectingPaths = ({ islands, unlockedLevel }) => {
  return (
    <svg className="absolute inset-0 glowing-path w-full h-full" style={{ zIndex: 5 }}>
      {/* Define the glowing effect */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feComponentTransfer in="blur" result="glow">
            <feFuncA type="table" tableValues="0,1" />
          </feComponentTransfer>
          <feComposite in="glow" in2="SourceAlpha" operator="in" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>

      {islands.slice(0, -1).map((island, index) => {
        const nextIsland = islands[index + 1];
        const isUnlocked = island.id <= unlockedLevel; // Check if the level is unlocked

        return (
          <g key={island.id}>
            {/* Dotted line path between the islands with separate line and glow colors */}
            <line
              x1={`${island.x + 10}%`}  // Shift horizontally by 10
              y1={`${island.y + 10}%`}  // Shift vertically by 10
              x2={`${nextIsland.x + 10}%`}  // Shift horizontally by 10
              y2={`${nextIsland.y + 20}%`}  // Shift vertically by 20
              stroke="#150501"  // Line color (dark red)
              strokeWidth="5"
              strokeDasharray="10,10"  // Create the dotted effect
              filter="url(#glow)"  // Apply the glow filter
              className="transition-all duration-300 opacity-100 -z-10"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default ConnectingPaths;
