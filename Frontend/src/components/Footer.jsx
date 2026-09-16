import React from 'react';
import { Code2, Heart, Github, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/70 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-200">DevFolio Platform</p>
              <p className="text-xs text-slate-500">MERN Dynamic Portfolio Generator</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
            <Link to="/create" className="hover:text-indigo-400 transition-colors">Create Portfolio</Link>
            <Link to="/preview" className="hover:text-indigo-400 transition-colors">Preview</Link>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1">
            Built with React, Express, MongoDB & Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
