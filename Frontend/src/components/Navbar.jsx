import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Sparkles, Sun, Moon, PlusCircle, Eye, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolioForm } from '../context/PortfolioFormContext';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { formData } = usePortfolioForm();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Don't show regular navbar inside full preview or public portfolio if clean view is desired, 
  // or keep it consistent. Let's make it look clean everywhere.
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 light:bg-white/80 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
                Dev<span className="text-indigo-400">Folio</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Generator
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-indigo-600/15 text-indigo-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 dark:text-slate-300 dark:hover:text-white light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/create"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/create')
                  ? 'bg-indigo-600/15 text-indigo-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 dark:text-slate-300 dark:hover:text-white light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100'
              }`}
            >
              Create Portfolio
            </Link>
            <Link
              to="/preview"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/preview')
                  ? 'bg-indigo-600/15 text-indigo-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 dark:text-slate-300 dark:hover:text-white light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              Live Preview
              {formData.username && (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="p-2 rounded-lg border border-slate-700 bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors light:bg-slate-100 light:border-slate-300 light:text-slate-700"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              Build Yours
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900/95 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/create"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Create Portfolio
          </Link>
          <Link
            to="/preview"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Live Preview
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
