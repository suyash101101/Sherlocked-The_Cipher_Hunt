import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContestPage from './ContestPage';
import Questions from './Questions';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContestPage />} />
        <Route path="/Questions" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
