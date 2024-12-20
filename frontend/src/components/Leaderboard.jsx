import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
// import wallh from '../assets/palace.png';

// const Header = () => {
//     return (
//       <header className="header">
//         <img src={wallh} alt="Logo" className="header-logo" />
//         <h1>Welcome to the Page</h1>
//       </header>
//     );
//   };
const Leaderboard = ({ theme }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('total'); // Default track to 'total'
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  const fetchLeaderboard = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leaderboard') // Fetch from the leaderboard table
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

  // Function to calculate total score by summing all the individual scores
  const calculateTotalScore = (team) => {
    return (
      (team.systems || 0) +
      (team.intelligence || 0) +
      (team.development || 0) +
      (team.programming || 0)
    );
  };

  // Sorting logic based on the selected track
  const sortedTeams = [...teams].sort((a, b) => {
    const scoreA = selectedTrack === 'total' ? calculateTotalScore(a) : a[selectedTrack];
    const scoreB = selectedTrack === 'total' ? calculateTotalScore(b) : b[selectedTrack];

    if (scoreB === scoreA) {
      return new Date(a.updated_at) - new Date(b.updated_at); // Earliest timestamp wins in case of a tie
    }
    return scoreB - scoreA;
  });

  return (
    <div className="p-6 bg-vintageBrown text-parchment min-h-screen">
      <h1 className="text-4xl font-sherlock text-center mb-6">{theme.title}</h1>
      <div className="flex justify-center mb-4">
        {['total', 'programming','intelligence','development','systems'].map((track) => (
          <button
            key={track}
            onClick={() => setSelectedTrack(track)}
            className={`px-4 py-2 m-2 rounded-lg ${
              selectedTrack === track ? 'bg-accent text-vintageBrown' : 'bg-parchment text-vintageBrown'
            }`}
          >
            {track.toUpperCase()}
          </button>
        ))}
      </div>
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
            {sortedTeams.map((team, index) => {
              const totalScore = calculateTotalScore(team); // Calculate the total score for each team
              return (
                <tr key={team.id} className="even:bg-vintageBrown odd:bg-vintageBrown">
                  <td className="border border-parchment px-4 py-2" align='center'><span className={index < 3 ? 'bold-text' : ''}>{index + 1}</span></td>
                  <td className="border border-parchment px-4 py-2" align='center'><span className={index < 3 ? 'bold-text' : ''}>{team.name.toUpperCase()}</span></td>
                  <td className="border border-parchment px-4 py-2" align='center'>
                    <span className={index < 3 ? 'bold-text' : ''}>{selectedTrack === 'total' ? totalScore : team[selectedTrack]}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;