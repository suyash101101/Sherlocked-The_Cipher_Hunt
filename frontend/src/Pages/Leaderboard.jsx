import { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data here
    // For now, we'll use dummy data
    setLeaderboard([
      { rank: 1, name: 'Sherlock Holmes', score: 1000 },
      { rank: 2, name: 'Hercule Poirot', score: 950 },
      { rank: 3, name: 'Nancy Drew', score: 900 },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player) => (
            <tr key={player.rank} className="border-b border-gray-700">
              <td className="p-2">{player.rank}</td>
              <td className="p-2">{player.name}</td>
              <td className="p-2">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;

