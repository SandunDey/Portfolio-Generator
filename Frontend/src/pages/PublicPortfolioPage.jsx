import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Code2,
  Edit3,
  Share2,
  AlertCircle,
  Home,
  Sun,
  Moon,
  Loader2,
  PlusCircle
} from 'lucide-react';
import PortfolioLayout from '../components/PortfolioLayout';
import ShareModal from '../components/ShareModal';
import Toast from '../components/Toast';
import { portfolioApi } from '../api/axios';
import { useTheme } from '../context/ThemeContext';

const PublicPortfolioPage = () => {
  const { username } = useParams();
  const { theme, toggleTheme } = useTheme();

  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolio = async () => {
      if (!username) return;
      setLoading(true);
      setError(null);

      try {
        const response = await portfolioApi.getByUsername(username);
        if (isMounted) {
          if (response.success && response.data) {
            setPortfolioData(response.data);
          } else {
            setError(`Portfolio for "${username}" not found.`);
          }
        }
      } catch (err) {
        console.error('Error fetching public portfolio:', err);
        if (isMounted) {
          setError(
            err.response?.status === 404
              ? `No portfolio found for "@${username}".`
              : err.customMessage || 'Failed to load portfolio. Please verify the backend is running.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPortfolio();

    return () => {
      isMounted = false;
    };
  }, [username]);

  // Loading Skeleton View
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Loading Portfolio...</h2>
          <p className="text-sm text-slate-400 font-mono">@{username}</p>
        </div>
      </div>
    );
  }

  // Not Found / Error View
  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">Portfolio Not Found</h1>
            <p className="text-sm text-slate-400">
              {error || `The user @${username} has not generated a portfolio yet or the URL is incorrect.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/create"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Claim Username
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        username={username}
      />

      {/* Floating Top Mini Bar for Visitor / Owner */}
      <div className="sticky top-0 z-50 w-full bg-slate-900/80 border-b border-slate-800/80 backdrop-blur-md px-4 sm:px-8 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-extrabold text-white hidden sm:inline-block">
              Dev<span className="text-indigo-400">Folio</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
              )}
            </button>

            {/* Share Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-400" />
              Share
            </button>

            {/* Edit Portfolio Button */}
            <Link
              to={`/edit/${username}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Render the full public portfolio layout */}
      <main className="flex-1">
        <PortfolioLayout data={portfolioData} isPreview={false} />
      </main>
    </div>
  );
};

export default PublicPortfolioPage;
