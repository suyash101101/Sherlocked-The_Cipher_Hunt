import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Leaderboard = ({ theme }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  const fetchLeaderboard = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('current_leaderboard') // Fetch from the leaderboard table
      .select('*'); // Select all fields from the table

    if (error) {
      console.error('Error fetching leaderboard data:', error.message);
    } else {
      setTeams(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const sortedTeams = [...teams].sort((a, b) => {
    if (b.total_score !== a.total_score) {
      return b.total_score - a.total_score;
    }

    if (new Date(a.last_submission_at) !== new Date(b.last_submission_at)) {
      return new Date(a.last_submission_at) - new Date(b.last_submission_at); // Earlier submission wins
    }

    // If both total_score and last_submission_at are equal, compare by questions_solved
    return b.questions_solved - a.questions_solved; // More questions solved gets a better rank
  });

  return (
    <div className="p-6 bg-vintageBrown text-parchment min-h-screen">
      <h1 className="text-4xl font-sherlock text-center mb-6">{theme.title}</h1>
      {loading ? (
        <div className="text-center text-parchment">Loading...</div>
      ) : (
        <table className="w-full border-collapse border border-parchment text-left">
          <thead className="bg-parchment text-vintageBrown">
            <tr>
              <th className="border border-parchment px-4 py-2" align='center'>RANK</th>
              <th className="border border-parchment px-4 py-2" align='center'>TEAM</th>
              <th className="border border-parchment px-4 py-2" align='center'>SCORE</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr key={team.id} className="even:bg-vintageBrown odd:bg-vintageBrown">
                <td className="border border-parchment px-4 py-2" align='center'>
                  <span className={index < 3 ? 'bold-text' : ''}>{index + 1}</span>
                </td>
                <td className="border border-parchment px-4 py-2" align='center'>
                  <span className={index < 3 ? 'bold-text' : ''}>{team.team_name.toUpperCase()}</span>
                </td>
                <td className="border border-parchment px-4 py-2" align='center'>
                  <span className={index < 3 ? 'bold-text' : ''}>{team.total_score}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
