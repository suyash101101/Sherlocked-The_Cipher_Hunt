import React from 'react';
import './App.css';
import Leaderboard from './components/Leaderboard';

const theme = {
  title: 'SHERLOCKED: THE CIPHER HUNT',
  tracks: ['total', 'System', 'Algorithm', 'Development', 'Intelligence'], // Replace track names as per your database schema
};

function App() {
  return (
    <div className="App">
      <Leaderboard theme={theme} />
    </div>
  );
}

export default App;
