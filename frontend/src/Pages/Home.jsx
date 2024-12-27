import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import Countdown from '../components/Countdown';


function Home() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <Countdown targetDate="2024-12-31T23:59:59" />
    </div>
  );
}

export default Home;

