import React, { useState, useEffect } from 'react';
import { fetchLeaderboardData } from '../config/supabaseClient1';


const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors

  const fetchLeaderboard = async () => {
    setLoading(true);
    const { data, error } = await fetchLeaderboardData();

    if (error) {
      setError(error);
      console.error('Error fetching leaderboard data:', error);
    } else {
      setTeams(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <section id="leaderboard_table" className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-amber-800/90 rounded-xl border border-amber-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-amber-700">
            <h2 className="text-xl font-bold text-center text-amber-100">LEADERBOARD</h2>
          </div>

          {/* Loader */}
          {loading && <p className="text-center text-amber-300">Loading leaderboard...</p>}
          
          {/* Error Handling */}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-amber-900/50">
                  <th className="px-6 py-4 text-center text-sm font-semibold text-amber-200">RANK</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-amber-200">TEAM</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-amber-200">SCORE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-700">
                {teams.map((team, index) => (
                  <tr key={team.id} className="bg-amber-800/50 hover:bg-amber-700/50 transition-colors">
                    <td className="px-6 py-4 text-center text-sm font-bold text-amber-100">{index + 1}</td>
                    <td className="px-6 py-4 text-center text-sm text-amber-100">{team.team_name}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-amber-300">
                      {team.total_score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
