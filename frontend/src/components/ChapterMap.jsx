import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionsData from '../data/questions.json';
import LondonMap from './LondonMap';

const chapters = [
  { id: 1, name: "The Beginning", location: "Baker Street" },
  { id: 2, name: "The Hidden Message", location: "Scoland Yard" },
  { id: 3, name: "The Cryptic Clue", location: "British Museum" },
  { id: 4, name: "The Secret Location", location: "Buckingham Palace" },
  { id: 5, name: "The Final Puzzle", location: "Tower Bridge" },
];

function ChapterMap() {
  const [unlockedChapters, setUnlockedChapters] = useState(4);

  useEffect(() => {
    const checkProgress = () => {
      let totalSolved = 0;
      questionsData.chapters.forEach((chapter, index) => {
        const progress = JSON.parse(localStorage.getItem(`chapter${chapter.id}Progress`) || '{}');
        const solvedCount = Object.values(progress).filter(Boolean).length;
        totalSolved += solvedCount;
        if (solvedCount > 0 && index + 2 > unlockedChapters) {
          setUnlockedChapters(index + 2);
        }
      });
    };

    checkProgress();
    const interval = setInterval(checkProgress, 5000);

    return () => clearInterval(interval);
  }, [unlockedChapters]);

  return (
    <div className="my-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cipher Hunt Progress</h2>
      <LondonMap unlockedChapters={unlockedChapters} />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{chapter.name}</h3>
            <p className="text-gray-400 mb-2">{chapter.location}</p>
            {chapter.id <= unlockedChapters ? (
              <Link 
                to={`/track/${chapter.id}`} 
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
}

export default ChapterMap;

