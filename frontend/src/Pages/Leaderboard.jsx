import React from 'react';
import Leaderboard from '../components/Leaderboard_';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Commented out for now

function App() {
  const theme = {
    title: 'SHERLOCKED: THE CIPHER HUNT',
    mainFont: 'Roboto, sans-serif', // You can adjust the font here
  };

  return (
    <div
      className="min-h-screen flex flex-col text-amber-900" // Added flex and flex-col here
      style={{
        fontFamily: theme.mainFont,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div className="bg-blur"></div>

      {/* Header */}
      <header className="relative z-50 bg-amber-800 border-b border-amber-700">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl text-center font-bold text-amber-100">{theme.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                {/* Dummy buttons for now */}
                <div className="space-x-4">
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
                    Dashboard
                  </button>
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
                    Challenges
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 relative">
        {/* Leaderboard component */}
        <Leaderboard />
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 mt-auto"> {/* Added mt-auto to push footer to the bottom */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 pt-8 border-t border-amber-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-amber-300 text-sm">
                © 2025 Sherlocked: The Cipher Hunt. All rights reserved.
              </div>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <a href="#terms" className="text-amber-300 hover:text-amber-100 text-sm transition-colors">
                  Terms
                </a>
                <a href="#privacy" className="text-amber-300 hover:text-amber-100 text-sm transition-colors">
                  Privacy
                </a>
                <a href="https://iet.nitk.ac.in/" className="text-amber-300 hover:text-amber-100 text-sm transition-colors">
                  IET NITK
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
