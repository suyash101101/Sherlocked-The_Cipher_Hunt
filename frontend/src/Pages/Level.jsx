import React, { useState } from 'react';
import FloatingIsland from '../components/FloatingIsland';
import DetectiveBobblehead from '../components/DetectiveBobblehead';
import ScoreBoard from '../components/ScoreBoard';
import ConnectingPaths from '../components/ConnectingPaths';
import LevelModal from '../components/LevelModal';  // Import the LevelModal component

const islands = [
  { id: 1, name: "Baker Street", x: 3, y: 10 },
  { id: 2, name: "Scotland Yard", x: 20, y: 55 },
  { id: 3, name: "British Museum", x: 43, y: 14},
  { id: 4, name: "Tower Bridge", x: 60, y: 56 },
  { id: 5, name: "Buckingham Palace", x: 72, y: 12 },
];

const unlockThresholds = [0, 100, 200, 300, 400];  // Example score thresholds for each level

export default function Level() {
  const [unlockedLevel, setUnlockedLevel] = useState(1);  // Unlock level based on score
  const [score, setScore] = useState(100);
  const [showModal, setShowModal] = useState(false);  // To control the modal visibility

  // Handle level completion and score update
  const handleLevelComplete = (points) => {
    setScore((prevScore) => prevScore + points);

    // Update unlocked level based on score
    const nextLevel = unlockThresholds.findIndex(threshold => prevScore + points >= threshold) + 1;
    setUnlockedLevel(nextLevel);
  };

  // Function to update the total score from LevelModal
  const updateTotalScore = (newScore) => {
    setScore(newScore);
  };

  return (
    <div className="sherlock-background bg-[url('https://static.vecteezy.com/system/resources/previews/036/105/309/non_2x/ai-generated-vintage-map-of-the-world-on-the-old-paper-background-sepia-tone-ai-generated-free-photo.jpg')] bg-no-repeat bg-cover bg-center object-cover relative h-auto max-w-full">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
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
              onComplete={handleLevelComplete}  // Pass onComplete to FloatingIsland
              score={score}
              unlockThreshold={unlockThresholds[index]}  // Pass the threshold for each level
            />
          );
        })}

        <DetectiveBobblehead level={unlockedLevel} islands={islands} />
      </main>

      {/* Modal logic */}
      {showModal && <LevelModal location={{ id: unlockedLevel }} onClose={() => setShowModal(false)} updateTotalScore={updateTotalScore} />}
    </div>
  );
}
