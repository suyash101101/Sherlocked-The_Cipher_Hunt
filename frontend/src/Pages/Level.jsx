import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import FloatingIsland from '../components/FloatingIsland';
import ScoreBoard from '../components/ScoreBoard';
import ConnectingPaths from '../components/ConnectingPaths';
import LevelModal from '../components/LevelModal';

const islands = [
  { id: 1, name: "Baker Street", x: 5, y: 10 },
  { id: 2, name: "Scotland Yard", x: 15, y: 65 },
  { id: 3, name: "British Museum", x: 38, y: 20 },
  { id: 4, name: "Tower Bridge", x: 55, y: 76 },
  { id: 5, name: "Buckingham Palace", x: 70, y: 22 },
];

const unlockThresholds = [0, 100, 200, 300, 400]; // Example score thresholds for each level

export default function Level() {
  const [unlockedLevel, setUnlockedLevel] = useState(1); // Default to the first level
  const [score, setScore] = useState(null); // Fetched total score
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
 
  const team_id = 1; // Replace with team ID 

  const fetchScore = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard') // Table name
        .select('total_score') // Select the column
        .eq('id', team_id) // Filter by the specific row
        .single(); // Fetch a single row

      if (error) throw error;

      if (data) {
        setScore(data.total_score || 0); // Set the fetched score
      }
    } catch (err) {
      console.error('Error fetching score:', err);
    }
  };

  // Unlock levels dynamically based on score
  useEffect(() => {
    if (score !== null) {
      const nextLevel = unlockThresholds.findIndex((threshold) => score >= threshold) + 1;
      setUnlockedLevel(nextLevel);
    }
  }, [score]);

  // Fetch the score when the component mounts
  useEffect(() => {
    fetchScore();
  }, []);

  return (
    <div className="sherlock-background bg-[url('https://static.vecteezy.com/system/resources/previews/036/105/309/non_2x/ai-generated-vintage-map-of-the-world-on-the-old-paper-background-sepia-tone-ai-generated-free-photo.jpg')] bg-no-repeat bg-cover bg-center object-cover relative h-[85em] lg:h-[90em]">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Pass the score to ScoreBoard */}
      <ScoreBoard score={score} />

      <main className="relative z-10 h-screen">
        <ConnectingPaths islands={islands} unlockedLevel={unlockedLevel} />

        {/* Render the islands with the correct unlocked state */}
        {islands.map((island, index) => {
          const isUnlocked = score >= unlockThresholds[index];
          return (
            <FloatingIsland
              key={island.id}
              {...island}
              isUnlocked={isUnlocked}
              score={score}
              unlockThreshold={unlockThresholds[index]}
            />
          );
        })}
      </main>

      {/* Modal logic */}
      {showModal && (
        <LevelModal
          location={{ id: unlockedLevel }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
