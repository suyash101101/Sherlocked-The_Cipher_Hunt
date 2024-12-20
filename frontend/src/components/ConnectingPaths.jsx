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

        // Calculate the distance between islands
        const x1 = island.x + 5;
        const y1 = island.y + 3;
        const x2 = nextIsland.x + 5;
        const y2 = nextIsland.y + 5;

        // Calculate the number of steps (footprints) based on distance
        const numFootprints = Math.floor(Math.hypot(x2 - x1, y2 - y1) / 7);  // Adjust the divisor to control spacing between steps
        const stepX = (x2 - x1) / numFootprints;
        const stepY = (y2 - y1) / numFootprints;

        // Calculate the angle between the islands
        const angle = Math.atan2(y2 - y1, x2 - x1);  // Angle in radians

        // Convert radians to degrees
        const angleInDegrees = (angle * 180) / Math.PI;

        return (
          <g key={island.id}>
            {/* Footsteps along the path */}
            {Array.from({ length: numFootprints }).map((_, i) => {
              const x = x1 + stepX * i;
              const y = y1 + stepY * i;

              return (
                <image
                
                  key={i}
                  x={`${x}%`}  // Position footprint along the path
                  y={`${y}%`}  // Position footprint along the path
                  width="5%"  // Adjust size of the footprints
                  height="5%"  // Adjust size of the footprints
                  href="/path.png"  // Image source
                  className="transition-all duration-300 opacity-50 -z-10"
                  
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

export default ConnectingPaths;
