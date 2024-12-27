import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Level from './Pages/Level';
import Preloader from './components/Preloader';
import Leaderboard from './Pages/Leaderboard';
import ContestPage from './auth'; 
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ContestPage />} />
          <Route path="/sherlock/:userId" element={<Home />} />
          <Route path="/level" element={<Level />} />
          <Route path='/leaderboard' element={<Leaderboard/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

