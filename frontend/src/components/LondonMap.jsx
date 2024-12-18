import React from 'react';
import { MapPin, Lock } from 'lucide-react';

const locations = [
  { id: 1, name: "Baker Street", lat: 51.5238, lon: -0.1783 },
  { id: 2, name: "Scotland Yard", lat: 51.5115, lon: -0.1545 },
  { id: 3, name: "British Museum", lat: 51.5194, lon: -0.1269 },
  { id: 4, name: "Buckingham Palace", lat: 51.5014, lon: -0.1419 },
  { id: 5, name: "Tower Bridge", lat: 51.5055, lon: -0.0754 },
];

const LondonMap = ({ unlockedChapters }) => {
  // Function to convert lat/lon to x/y coordinates on our map image
  const getPosition = (lat, lon) => {
    // These values are approximations for the bounds of our map image
    const mapWidth = window.innerWidth; // Full screen width
    const mapHeight = window.innerHeight; // Full screen height
    const leftLon = -0.2100;
    const rightLon = -0.0300;
    const topLat = 51.5400;
    const bottomLat = 51.4800;

    const x = ((lon - leftLon) / (rightLon - leftLon)) * mapWidth;
    const y = ((topLat - lat) / (topLat - bottomLat)) * mapHeight;

    return { x, y };
  };

  // Create a function to generate dotted lines between locations
  const renderDottedLines = () => {
    const lines = [];
    for (let i = 0; i < unlockedChapters - 1; i++) {
      const { x: startX, y: startY } = getPosition(locations[i].lat, locations[i].lon);
      const { x: endX, y: endY } = getPosition(locations[i + 1].lat, locations[i + 1].lon);
      lines.push(
        <line
          key={`line-${i}`}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="black"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      );
    }
    return lines;
  };

  return (
    <div className="relative w-screen h-screen mx-auto overflow-hidden">
      {/* Map Image */}
      <img 
        src="../../public/london-map.jpg" 
        alt="Map of London" 
        className="w-full h-full object-cover"
        aria-hidden="true"
      />
      
      {/* Render Dotted Lines */}
      <svg className="absolute w-full h-full top-0 left-0">
        {renderDottedLines()}
      </svg>
      
      {/* Render Locations */}
      {locations.map((location) => {
        const { x, y } = getPosition(location.lat, location.lon);
        return (
          <div
            key={location.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}px`, top: `${y}px` }}
          >
            {location.id <= unlockedChapters ? (
              <div className="relative">
                <MapPin 
                  size={24} 
                  className={location.id === unlockedChapters ? "text-blue-600" : "text-green-600"}
                />
                {location.id === unlockedChapters && (
                  <span className="absolute top-0 left-0 text-2xl" role="img" aria-label="Sherlock Holmes" style={{ fontSize: '2.5rem' }} >🕵️</span>
                )}
              </div>
            ) : (
              <Lock size={24} className="text-red-800" />
            )}
            <span className="sr-only" style={{ fontSize: '2.5rem' }} >{`${location.name} ${location.id <= unlockedChapters ? '🔓' : '🔒'}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default LondonMap;
