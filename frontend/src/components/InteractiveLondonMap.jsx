import React from 'react';
import { MapPin, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const locations = [
  { id: 1, name: "The Beginning", location: "Baker Street", lat: 51.5238, lon: -0.1883 },
  { id: 2, name: "The Hidden Message", location: "Scotland Yard", lat: 51.5085, lon: -0.1685 },
  { id: 3, name: "The Cryptic Clue", location: "British Museum", lat: 51.5194, lon: -0.1269 },
  { id: 4, name: "The Secret Location", location: "Tower Bridge", lat: 51.5208, lon: -0.0954 },
  { id: 5, name: "The Final Puzzle", location: "Buckingham Palace", lat: 51.5014, lon: -0.1419 },
];

const InteractiveLondonMap = ({ unlockedChapters }) => {
  const getPosition = (lat, lon) => {
    const mapWidth = 1000;
    const mapHeight = 650;
    const leftLon = -0.2100;
    const rightLon = -0.0300;
    const topLat = 51.5400;
    const bottomLat = 51.4800;

    const x = ((lon - leftLon) / (rightLon - leftLon)) * mapWidth;
    const y = ((topLat - lat) / (topLat - bottomLat)) * mapHeight;

    return { x, y };
  };

  return (
    <div className="my-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cipher Hunt Progress</h2>
      <div className="relative w-full max-w-3xl mx-auto">
        <img 
          src="../../public/london.jpg" 
          alt="Map of London" 
          className="w-full h-auto rounded-lg shadow-lg"
        />
        {locations.map((location) => {
          const { x, y } = getPosition(location.lat, location.lon);
          const isUnlocked = location.id <= unlockedChapters;
          const isCurrent = location.id === unlockedChapters;

          return (
            <div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}px`, top: `${y}px` }}
            >
              {isUnlocked ? (
                <Link 
                  to={`/chapter/${location.id}`}
                  className="group relative flex flex-col items-center"
                  aria-label={`Start ${location.name} at ${location.location}`}
                >
                  <MapPin 
                    size={24} 
                    className={isCurrent ? "text-blue-500" : "text-green-500"}
                  />
                  {isCurrent && (
                    <span className="absolute top-0 left-0 text-2xl" role="img" aria-hidden="true">🕵️</span>
                  )}
                  <div className="absolute bottom-full mb-2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {location.name}
                  </div>
                </Link>
              ) : (
                <div className="relative flex flex-col items-center">
                  <Lock size={24} className="text-gray-500" />
                  <span className="sr-only">{`${location.name} at ${location.location} is locked`}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <div key={location.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
            <p className="text-gray-400 mb-2">{location.location}</p>
            {location.id <= unlockedChapters ? (
              <Link 
                to={`/chapter/${location.id}`} 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Start Chapter
              </Link>
            ) : (
              <span className="inline-block px-4 py-2 bg-gray-600 text-gray-300 rounded cursor-not-allowed">
                Locked
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveLondonMap;

