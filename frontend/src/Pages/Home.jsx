import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import InteractiveLondonMap from '../components/InteractiveLondonMap';
import FAQ from '../components/FAQ';
import Countdown from '../components/Countdown';
import questionsData from '../data/questions.json';

function Home() {
  const [unlockedChapters, setUnlockedChapters] = useState(1);

  const [faqs] = useState([
    { question: 'What is Sherlocked: The Cipher Hunt?', answer: 'Sherlocked is a thrilling online hackathon where participants solve cryptographic puzzles and challenges across London.' },
    { question: 'How do I participate?', answer: 'Sign up on our website and start solving challenges in various locations. Unlock new chapters as you progress!' },
    { question: 'What are the prizes?', answer: 'Prizes include cash rewards, tech gadgets, and exclusive Sherlock Holmes-themed merchandise for top performers.' },
  ]);

  useEffect(() => {
    const checkProgress = () => {
      let totalSolved = 0;
      questionsData.chapters.forEach((chapter, index) => {
        const progress = JSON.parse(localStorage.getItem(`chapter${chapter.id}Progress`) || '{}');
        const solvedCount = Object.values(progress).filter(Boolean).length;
        totalSolved += solvedCount;
        if (solvedCount > 0 && index + 2 > unlockedChapters) {
          setUnlockedChapters(index + 2);
        }
      });
    };

    checkProgress();
    const interval = setInterval(checkProgress, 5000);

    return () => clearInterval(interval);
  }, [unlockedChapters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <InteractiveLondonMap unlockedChapters={unlockedChapters} />
      <FAQ faqs={faqs} />
      <Countdown targetDate="2024-12-31T23:59:59" />
    </div>
  );
}

export default Home;

