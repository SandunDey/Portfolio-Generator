import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  Save,
  ArrowLeft,
  Eye,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DynamicSkillsInput from '../components/DynamicSkillsInput';
import DynamicProjectsInput from '../components/DynamicProjectsInput';
import DynamicExperienceInput from '../components/DynamicExperienceInput';
import Toast from '../components/Toast';
import { portfolioApi } from '../api/axios';

const EditPortfolioPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [validationErrors, setValidationErrors] = useState({});

  const [editForm, setEditForm] = useState({
    username: '',
    fullName: '',
    title: '',
    bio: '',
    profileImage: '',
    contact: {
      email: '',
      linkedin: '',
      github: '',
      website: '',
    },
    skills: [],
    projects: [],
    experience: [],
  });

  // Fetch existing data on mount
  useEffect(() => {
    let isMounted = true;

    const fetchExistingData = async () => {
      if (!username) return;
      setLoading(true);
      setError(null);

      try {
        const response = await portfolioApi.getByUsername(username);
        if (isMounted) {
          if (response.success && response.data) {
            const data = response.data;
            setEditForm({
              username: data.username || username,
              fullName: data.fullName || '',
              title: data.title || '',
              bio: data.bio || '',
              profileImage: data.profileImage || '',
              contact: {
                email: data.contact?.email || '',
                linkedin: data.contact?.linkedin || '',
                github: data.contact?.github || '',
                website: data.contact?.website || '',
              },
              skills: Array.isArray(data.skills) ? data.skills : [],
              projects: Array.isArray(data.projects) ? data.projects : [],
              experience: Array.isArray(data.experience) ? data.experience : [],
            });
          }
        }
      } catch (err) {
        console.error('Error fetching portfolio for edit:', err);
        if (isMounted) {
          setError(
            err.response?.status === 404
              ? `No portfolio found for "@${username}".`
              : err.customMessage || 'Failed to load portfolio.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchExistingData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  // Field change helpers
  const updateField = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateContactField = (subField, value) => {
    setEditForm((prev) => ({
      ...prev,
      contact: { ...prev.contact, [subField]: value },
    }));
  };

  // Skills
  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !editForm.skills.includes(trimmed)) {
      setEditForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setEditForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Projects
  const addProject = (project = { name: '', description: '', techStack: [], githubLink: '', liveDemo: '' }) => {
    setEditForm((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const updateProject = (index, updatedProject) => {
    setEditForm((prev) => {
      const newProjects = [...prev.projects];
      newProjects[index] = updatedProject;
      return { ...prev, projects: newProjects };
    });
  };

  const removeProject = (index) => {
    setEditForm((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Experience
  const addExperience = (exp = { company: '', role: '', duration: '', description: '' }) => {
    setEditForm((prev) => ({
      ...prev,
      experience: [...prev.experience, exp],
    }));
  };

  const updateExperience = (index, updatedExp) => {
    setEditForm((prev) => {
      const newExp = [...prev.experience];
      newExp[index] = updatedExp;
      return { ...prev, experience: newExp };
    });
  };

  const removeExperience = (index) => {
    setEditForm((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Validation
  const validate = () => {
    const errors = {};
    if (!editForm.fullName?.trim()) {
      errors.fullName = 'Full Name is required';
    } else if (editForm.fullName.trim().length < 2) {
      errors.fullName = 'Full Name must be at least 2 characters';
    }

    const isValidUrl = (url) => {
      if (!url) return true;
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (editForm.profileImage && !isValidUrl(editForm.profileImage)) {
      errors.profileImage = 'Please provide a valid image URL';
    }
    if (editForm.contact?.linkedin && !isValidUrl(editForm.contact.linkedin)) {
      errors.linkedin = 'Please provide a valid LinkedIn URL';
    }
    if (editForm.contact?.github && !isValidUrl(editForm.contact.github)) {
      errors.github = 'Please provide a valid GitHub URL';
    }
    if (editForm.contact?.website && !isValidUrl(editForm.contact.website)) {
      errors.website = 'Please provide a valid website URL';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validate()) {
      setToast({
        message: 'Please resolve errors before saving.',
        type: 'error',
      });
      return;
    }

    setSaving(true);
    try {
      const payload = { ...editForm };
      delete payload.username; // Backend ignores/protects username field

      await portfolioApi.update(username, payload);
      setToast({
        message: 'Portfolio updated successfully! Redirecting...',
        type: 'success',
      });
      setTimeout(() => {
        navigate(`/portfolio/${username}`);
      }, 1500);
    } catch (err) {
      console.error('Error updating portfolio:', err);
      setToast({
        message: err.customMessage || 'Failed to update portfolio.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Loading portfolio data...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Cannot Edit Portfolio</h2>
          <p className="text-sm text-slate-400">{error}</p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm"
          >
            Create New Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <span>Editing Mode</span>
                <span>•</span>
                <code>@{username}</code>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Edit Your Portfolio
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/portfolio/${username}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                View Live Page
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Username display (Fixed) */}
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Portfolio Username (Permanent URL Key)
                </label>
                <span className="text-[11px] text-slate-500">Locked to keep URL permanent</span>
              </div>
              <input
                type="text"
                disabled
                value={`/portfolio/${username}`}
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-indigo-300 text-sm font-mono cursor-not-allowed opacity-80"
              />
            </div>

            {/* SECTION 1: PERSONAL INFO */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Personal Details</h2>
                  <p className="text-xs text-slate-400">Update your name, bio, and avatar</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.fullName && (
                    <p className="text-xs text-rose-400 mt-1">{validationErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    value={editForm.profileImage}
                    onChange={(e) => updateField('profileImage', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.profileImage && (
                    <p className="text-xs text-rose-400 mt-1">{validationErrors.profileImage}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Biography / About Me
                  </label>
                  <textarea
                    rows={4}
                    value={editForm.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: CONTACT & SOCIALS */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Contact & Socials</h2>
                  <p className="text-xs text-slate-400">Update links and contact information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={editForm.contact.email}
                    onChange={(e) => updateContactField('email', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn URL</label>
                  <input
                    type="url"
                    value={editForm.contact.linkedin}
                    onChange={(e) => updateContactField('linkedin', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.linkedin && (
                    <p className="text-xs text-rose-400 mt-1">{validationErrors.linkedin}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub URL</label>
                  <input
                    type="url"
                    value={editForm.contact.github}
                    onChange={(e) => updateContactField('github', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.github && (
                    <p className="text-xs text-rose-400 mt-1">{validationErrors.github}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Personal Website URL</label>
                  <input
                    type="url"
                    value={editForm.contact.website}
                    onChange={(e) => updateContactField('website', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {validationErrors.website && (
                    <p className="text-xs text-rose-400 mt-1">{validationErrors.website}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: SKILLS */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-white">Skills & Technologies</h2>
              </div>

              <DynamicSkillsInput
                skills={editForm.skills}
                onAddSkill={addSkill}
                onRemoveSkill={removeSkill}
              />
            </div>

            {/* SECTION 4: PROJECTS */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-white">Featured Projects</h2>
              </div>

              <DynamicProjectsInput
                projects={editForm.projects}
                onAddProject={addProject}
                onUpdateProject={updateProject}
                onRemoveProject={removeProject}
                onReorderProjects={(newProjects) => setEditForm((prev) => ({ ...prev, projects: newProjects }))}
              />
            </div>

            {/* SECTION 5: WORK EXPERIENCE */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-white">Work Experience</h2>
              </div>

              <DynamicExperienceInput
                experience={editForm.experience}
                onAddExperience={addExperience}
                onUpdateExperience={updateExperience}
                onRemoveExperience={removeExperience}
                onReorderExperience={(newExp) => setEditForm((prev) => ({ ...prev, experience: newExp }))}
              />
            </div>

            {/* STICKY SAVE BAR */}
            <div className="sticky bottom-6 z-30 p-4 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate(`/portfolio/${username}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save & Update Portfolio
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditPortfolioPage;
