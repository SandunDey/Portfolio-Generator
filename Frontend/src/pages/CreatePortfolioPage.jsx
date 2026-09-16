import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Link as LinkIcon,
  Mail,
  Linkedin,
  Github,
  Globe,
  Layers,
  Code2,
  Briefcase,
  Eye,
  Send,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DynamicSkillsInput from '../components/DynamicSkillsInput';
import DynamicProjectsInput from '../components/DynamicProjectsInput';
import DynamicExperienceInput from '../components/DynamicExperienceInput';
import Toast from '../components/Toast';
import ShareModal from '../components/ShareModal';
import { usePortfolioForm } from '../context/PortfolioFormContext';
import { portfolioApi } from '../api/axios';

const CreatePortfolioPage = () => {
  const navigate = useNavigate();
  const {
    formData,
    updateField,
    updateContactField,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addExperience,
    updateExperience,
    removeExperience,
    loadSampleData,
    resetForm,
    setFormData,
  } = usePortfolioForm();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [publishedUsername, setPublishedUsername] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Client-side validation matching backend rules
  const validateForm = () => {
    const errors = {};
    const usernameRegex = /^[a-z0-9_-]+$/;

    // Username validation
    if (!formData.username?.trim()) {
      errors.username = 'Username is required';
    } else if (!usernameRegex.test(formData.username.trim().toLowerCase())) {
      errors.username = 'Username can only contain lowercase letters, numbers, hyphens (-), and underscores (_)';
    } else if (formData.username.trim().length < 3 || formData.username.trim().length > 30) {
      errors.username = 'Username must be between 3 and 30 characters';
    }

    // Full name validation
    if (!formData.fullName?.trim()) {
      errors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2 || formData.fullName.trim().length > 100) {
      errors.fullName = 'Full Name must be between 2 and 100 characters';
    }

    // URL validations helper
    const isValidUrl = (url) => {
      if (!url) return true;
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (formData.profileImage && !isValidUrl(formData.profileImage)) {
      errors.profileImage = 'Please provide a valid image URL (e.g. https://...)';
    }
    if (formData.contact?.linkedin && !isValidUrl(formData.contact.linkedin)) {
      errors.linkedin = 'Please provide a valid LinkedIn URL';
    }
    if (formData.contact?.github && !isValidUrl(formData.contact.github)) {
      errors.github = 'Please provide a valid GitHub URL';
    }
    if (formData.contact?.website && !isValidUrl(formData.contact.website)) {
      errors.website = 'Please provide a valid website URL';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePreview = () => {
    if (!validateForm()) {
      setToast({
        message: 'Please resolve validation errors before previewing.',
        type: 'error',
      });
      return;
    }
    navigate('/preview');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) {
      setToast({
        message: 'Please correct the highlighted errors before publishing.',
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
      console.error('Error creating portfolio:', err);
      setToast({
        message: err.customMessage || 'Failed to create portfolio. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />

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

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Title & Quick Helper Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Create Developer Portfolio
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Fill in the details below to generate your responsive, shareable portfolio page.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadSampleData}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-500/30 transition-colors cursor-pointer"
                title="Populate form with sample data for quick testing"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Fill Sample Data
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Clear all fields and reset draft"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>

          {/* ================= MULTI-SECTION FORM ================= */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* SECTION 1: URL & IDENTIFIER */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Unique Portfolio URL</h2>
                  <p className="text-xs text-slate-400">Choose your public username and portfolio address</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Portfolio Username <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center rounded-xl bg-slate-800/90 border border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent overflow-hidden">
                  <span className="px-3.5 py-3 text-xs font-mono text-slate-400 bg-slate-900/80 border-r border-slate-700">
                    /portfolio/
                  </span>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => updateField('username', e.target.value.toLowerCase().trim())}
                    placeholder="alex-morgan"
                    className="w-full px-3.5 py-3 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-mono"
                  />
                </div>
                {validationErrors.username ? (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationErrors.username}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Only lowercase letters, numbers, hyphens, and underscores allowed (e.g. <code>john-doe</code>).
                  </p>
                )}
              </div>
            </div>

            {/* SECTION 2: PERSONAL INFORMATION */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Personal Information</h2>
                  <p className="text-xs text-slate-400">Introduce yourself and what you do</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.fullName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Professional Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Professional Title / Role
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g. Senior Full Stack Developer"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Profile Image URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    value={formData.profileImage}
                    onChange={(e) => updateField('profileImage', e.target.value)}
                    placeholder="https://images.unsplash.com/... or your avatar URL"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.profileImage && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.profileImage}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Biography / About Me
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    placeholder="Write a short summary about your background, experience, passions, and tech focus..."
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: CONTACT & SOCIALS */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Contact & Social Links</h2>
                  <p className="text-xs text-slate-400">Enable recruiters and peers to reach you</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => updateContactField('email', e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.contact.linkedin}
                    onChange={(e) => updateContactField('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/alex"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.linkedin && (
                    <p className="text-xs text-rose-400 mt-1">{validationErrors.linkedin}</p>
                  )}
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-400" />
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.contact.github}
                    onChange={(e) => updateContactField('github', e.target.value)}
                    placeholder="https://github.com/alex"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.github && (
                    <p className="text-xs text-rose-400 mt-1">{validationErrors.github}</p>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    Personal Website / Blog
                  </label>
                  <input
                    type="url"
                    value={formData.contact.website}
                    onChange={(e) => updateContactField('website', e.target.value)}
                    placeholder="https://alexmorgan.dev"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.website && (
                    <p className="text-xs text-rose-400 mt-1">{validationErrors.website}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 4: SKILLS */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Skills & Technologies</h2>
                  <p className="text-xs text-slate-400">Add dynamic tags representing your tech stack</p>
                </div>
              </div>

              <DynamicSkillsInput
                skills={formData.skills}
                onAddSkill={addSkill}
                onRemoveSkill={removeSkill}
              />
            </div>

            {/* SECTION 5: PROJECTS */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Featured Projects</h2>
                  <p className="text-xs text-slate-400">Showcase your applications, github repos, and live demos</p>
                </div>
              </div>

              <DynamicProjectsInput
                projects={formData.projects}
                onAddProject={addProject}
                onUpdateProject={updateProject}
                onRemoveProject={removeProject}
                onReorderProjects={(newProjects) => setFormData((prev) => ({ ...prev, projects: newProjects }))}
              />
            </div>

            {/* SECTION 6: WORK EXPERIENCE */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Work Experience</h2>
                  <p className="text-xs text-slate-400">Add your job history, roles, and career milestones</p>
                </div>
              </div>

              <DynamicExperienceInput
                experience={formData.experience}
                onAddExperience={addExperience}
                onUpdateExperience={updateExperience}
                onRemoveExperience={removeExperience}
                onReorderExperience={(newExp) => setFormData((prev) => ({ ...prev, experience: newExp }))}
              />
            </div>

            {/* ================= SUBMIT / ACTION BUTTONS ================= */}
            <div className="sticky bottom-6 z-30 p-4 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Ready to proceed?</span> Preview or save to database.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-indigo-400" />
                  Preview Portfolio
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Publish Directly
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreatePortfolioPage;
