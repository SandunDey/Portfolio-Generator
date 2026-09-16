import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';
import PortfolioLayout from '../components/PortfolioLayout';
import Toast from '../components/Toast';
import ShareModal from '../components/ShareModal';
import { usePortfolioForm } from '../context/PortfolioFormContext';
import { portfolioApi } from '../api/axios';

const PortfolioPreviewPage = () => {
  const navigate = useNavigate();
  const { formData, loadSampleData } = usePortfolioForm();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [publishedUsername, setPublishedUsername] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const hasData = formData.fullName || formData.username;

  const handlePublish = async () => {
    if (!formData.username?.trim()) {
      setToast({
        message: 'Username is required before publishing. Please go back to the editor and enter a username.',
        type: 'error',
      });
      return;
    }
    if (!formData.fullName?.trim()) {
      setToast({
        message: 'Full Name is required before publishing.',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        username: formData.username.trim().toLowerCase(),
        isPublished: true,
      };

      const result = await portfolioApi.create(payload);
      setToast({
        message: 'Portfolio published successfully to MongoDB! 🚀',
        type: 'success',
      });
      setPublishedUsername(payload.username);
      setShowShareModal(true);
    } catch (err) {
      console.error('Error publishing portfolio:', err);
      setToast({
        message: err.customMessage || 'Failed to publish portfolio. Check if username is already taken.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

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
        username={publishedUsername}
      />

      {/* Top Floating Action Bar */}
      <div className="sticky top-0 z-50 w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/create')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Form Editor
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/70 text-indigo-300 border border-indigo-500/30">
              <Eye className="w-3.5 h-3.5" />
              Live Layout Preview
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!hasData && (
              <button
                type="button"
                onClick={loadSampleData}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Fill Sample Data
              </button>
            )}

            <button
              onClick={handlePublish}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Publish Portfolio
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Empty State warning if user hasn't filled anything */}
      {!hasData && (
        <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl bg-slate-900 border border-amber-500/30 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">No Portfolio Data Found</h2>
          <p className="text-sm text-slate-400">
            You haven't filled out your details yet. You can go to the creation form or load demo sample data with one click to see how it looks.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={loadSampleData}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
            >
              Load Sample Demo Data
            </button>
            <Link
              to="/create"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Go to Form
            </Link>
          </div>
        </div>
      )}

      {/* Actual Rendered Layout */}
      {hasData && (
        <div className="flex-1">
          <PortfolioLayout data={formData} isPreview={true} />
        </div>
      )}
    </div>
  );
};

export default PortfolioPreviewPage;
