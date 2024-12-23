import React from 'react';
import './App.css';
import Leaderboard from './components/Leaderboard';

const theme = {
  title: 'SHERLOCKED: THE CIPHER HUNT',
};

function App() {
  return (
    <div className="App">
      <Leaderboard theme={theme} />
    </div>
  );
}

export default App;
