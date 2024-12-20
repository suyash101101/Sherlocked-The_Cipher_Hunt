import React from 'react';

export default function ScoreBoard({ score }) {
  return (
    <div className="absolute top-4 right-4 z-30 bg-gray-800 bg-opacity-75 px-4 py-2 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white">Score: {score}</h2>
    </div>
  );
}
