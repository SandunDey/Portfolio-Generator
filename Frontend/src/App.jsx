import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioFormProvider } from './context/PortfolioFormContext';

import HomePage from './pages/HomePage';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
import PortfolioPreviewPage from './pages/PortfolioPreviewPage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';
import EditPortfolioPage from './pages/EditPortfolioPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <PortfolioFormProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePortfolioPage />} />
            <Route path="/preview" element={<PortfolioPreviewPage />} />
            <Route path="/portfolio/:username" element={<PublicPortfolioPage />} />
            <Route path="/edit/:username" element={<EditPortfolioPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </PortfolioFormProvider>
    </ThemeProvider>
  );
}

export default App;
