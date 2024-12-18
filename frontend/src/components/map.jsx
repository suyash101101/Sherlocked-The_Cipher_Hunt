import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Make sure to replace with your Mapbox API token
mapboxgl.accessToken = 'your-mapbox-api-token';

const Map = () => {
  const mapContainer = useRef(null);
  const [lockedLocations, setLockedLocations] = useState({
    'Baker Street': true,
    'Scotland Yard': true,
    'British Museum': false,
    'Buckingham Palace': true,
    'Tower Bridge': false,
  });
  const [modalLocation, setModalLocation] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.1278, 51.5074], // London coordinates
      zoom: 12,
    });

    // Add marker for each location
    const locations = [
      { name: 'Baker Street', coords: [-0.1588, 51.5235] },
      { name: 'Scotland Yard', coords: [-0.1278, 51.4995] },
      { name: 'British Museum', coords: [-0.1278, 51.5194] },
      { name: 'Buckingham Palace', coords: [-0.1419, 51.5014] },
      { name: 'Tower Bridge', coords: [-0.0759, 51.5055] },
    ];

    locations.forEach(location => {
      const marker = new mapboxgl.Marker({ color: lockedLocations[location.name] ? 'gray' : 'green' })
        .setLngLat(location.coords)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
        .addTo(map);

      marker.getElement().addEventListener('click', () => handleLocationClick(location.name));
    });
  }, [lockedLocations]);

  const handleLocationClick = (location) => {
    if (!lockedLocations[location]) {
      setModalLocation(location);
    } else {
      alert(`${location} is locked.`);
    }
  };

  const handleCloseModal = () => {
    setModalLocation(null);
  };

  return (
    <div>
      <div ref={mapContainer} style={{ height: '500px' }} />
      {modalLocation && (
        <Modal location={modalLocation} onClose={handleCloseModal} />
      )}
    </div>
  );
};

const Modal = ({ location, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Question for {location}</h2>
        <input className="border p-2 w-full mb-4" type="text" placeholder="Your answer..." />
        <div className="flex justify-end space-x-4">
          <button className="bg-blue-500 text-white p-2 rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Map;
