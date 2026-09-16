import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Share2,
  Laptop,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Eye,
  Layers,
  Palette,
  ExternalLink
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
          {/* Glowing background circles */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Top Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-8 animate-fade-in shadow-lg shadow-indigo-500/10">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Full-Stack Developer Portfolio Generator</span>
              <span className="hidden sm:inline-block text-slate-500">|</span>
              <span className="hidden sm:inline-block text-indigo-400">Instant URL Sharing</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Showcase Your Code.{' '}
              <span className="gradient-text">Build Your Developer Portfolio</span> in Minutes.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              No complex deployment or markdown hassles. Fill in your skills, showcase your projects, and instantly generate a stunning, responsive portfolio with a unique shareable link.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/create"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Zap className="w-5 h-5 text-amber-300" />
                Create Portfolio Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 shadow-md transition-all duration-200"
              >
                <Eye className="w-5 h-5 text-indigo-400" />
                View Demo Preview
              </Link>
            </div>

            {/* Trust Checklist */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>MongoDB Persistence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant `/portfolio/:username` URL</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Responsive & Dark Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Analytics View Counter</span>
              </div>
            </div>

            {/* ================= HERO PREVIEW MOCKUP ================= */}
            <div className="mt-16 relative max-w-5xl mx-auto rounded-3xl p-3 bg-gradient-to-b from-slate-700/50 via-slate-800/30 to-transparent border border-slate-700/60 shadow-2xl">
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                {/* Mock Browser Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <div className="px-4 py-1 rounded-md bg-slate-950 text-indigo-300 font-mono text-[11px] border border-slate-800">
                    https://devfolio.app/portfolio/alexdev
                  </div>
                  <div className="text-slate-500 text-[11px]">Live Preview</div>
                </div>

                {/* Mock Portfolio Body */}
                <div className="p-6 sm:p-10 text-left bg-gradient-to-b from-slate-900 to-slate-950 space-y-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg shadow-indigo-500/20">
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center font-bold text-2xl text-indigo-400">
                        AM
                      </div>
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <h3 className="text-2xl font-black text-white">Alex Morgan</h3>
                      <p className="text-sm font-semibold text-indigo-400">Full Stack MERN Engineer & Cloud Architect</p>
                      <p className="text-xs text-slate-400 max-w-xl">
                        Passionate developer crafting modern, scalable web applications with React, Node.js, and Cloud native technologies.
                      </p>
                    </div>
                  </div>

                  {/* Mock Skills Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'TypeScript', 'Docker'].map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3 SIMPLE STEPS ================= */}
        <section className="py-20 bg-slate-950/60 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">How It Works</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                From Form to Live Website in 3 Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-black text-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-white">Fill in Your Details</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Enter your name, bio, social links, skills tags, and add dynamic cards for your best projects & work experience.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-black text-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-white">Live Real-time Preview</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Review your portfolio layout before publishing. Tweak styles, edit copy, and reorder projects easily.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-white">Publish & Share Anywhere</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  One-click save to MongoDB. Receive your unique public link (e.g. <code>/portfolio/yourname</code>) to put on resumes and LinkedIn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA SECTION ================= */}
        <section className="py-20 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-10 sm:p-14 bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ready to create your standout developer portfolio?
              </h2>
              <p className="text-slate-300 max-w-xl mx-auto text-base">
                Join developers creating high-impact resumes and portfolios with clean layouts and instant URLs.
              </p>
              <div className="pt-2">
                <Link
                  to="/create"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
                >
                  <Code2 className="w-5 h-5" />
                  Get Started for Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
