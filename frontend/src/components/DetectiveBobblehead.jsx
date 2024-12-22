import React from 'react';

const DetectiveBobblehead = ({ level, islands }) => {
  const currentIsland = islands.find((island) => island.id === level) || islands[0];

  return (
    <div
      className="absolute transition-all duration-1000 ease-in-out z-20"
      style={{ left: `${currentIsland.x}%`, top: `${currentIsland.y}%` }}
    >
      <div
        className="w-20 h-20 bg-contain bg-no-repeat bg-center animate-bounce filter drop-shadow-lg"
        style={{ backgroundImage: "url('/lock.png')" }}
      />
    </div>
  );
};

export default DetectiveBobblehead;
