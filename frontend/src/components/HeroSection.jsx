import React from 'react';

function HeroSection() {
  return (
    <section className="text-center py-20 bg-gray-900 rounded-lg shadow-xl mb-12">
      <h1 className="text-5xl font-bold mb-4 text-white">Sherlocked: The Cipher Hunt</h1>
      <p className="text-xl mb-8 text-gray-300">Unravel the mysteries of London, crack the codes, become the ultimate detective!</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300">
        <a href="/level">Begin Your Adventure</a>
      </button>
    </section>
  );
}

export default HeroSection;

