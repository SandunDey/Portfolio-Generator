import React from 'react';
import { Plus, Trash2, Briefcase, Calendar, Building2, UserCheck, ArrowUp, ArrowDown } from 'lucide-react';

const DynamicExperienceInput = ({
  experience = [],
  onAddExperience,
  onUpdateExperience,
  onRemoveExperience,
  onReorderExperience,
}) => {
  const handleFieldChange = (index, field, value) => {
    onUpdateExperience(index, {
      ...experience[index],
      [field]: value,
    });
  };

  const moveUp = (index) => {
    if (index === 0 || !onReorderExperience) return;
    const updated = [...experience];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onReorderExperience(updated);
  };

  const moveDown = (index) => {
    if (index === experience.length - 1 || !onReorderExperience) return;
    const updated = [...experience];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onReorderExperience(updated);
  };

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div
          key={index}
          className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 shadow-lg relative group transition-all duration-200 hover:border-indigo-500/30"
        >
          {/* Card Header & Actions */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/60">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center text-xs font-bold">
                #{index + 1}
              </div>
              <span className="font-semibold text-slate-200 text-sm">
                {exp.company ? `${exp.role || 'Role'} at ${exp.company}` : `Experience ${index + 1}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {onReorderExperience && (
                <>
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    title="Move up"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === experience.length - 1}
                    title="Move down"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => onRemoveExperience(index)}
                title="Delete experience"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-colors ml-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Company / Organization
              </label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => handleFieldChange(index, 'company', e.target.value)}
                placeholder="e.g. Google, Stripe, Freelance"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                Job Title / Role
              </label>
              <input
                type="text"
                value={exp.role || ''}
                onChange={(e) => handleFieldChange(index, 'role', e.target.value)}
                placeholder="e.g. Full Stack Developer, Tech Lead"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* Duration */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Duration / Dates
              </label>
              <input
                type="text"
                value={exp.duration || ''}
                onChange={(e) => handleFieldChange(index, 'duration', e.target.value)}
                placeholder="e.g. Jan 2023 - Present or 2021 - 2022"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Role Description & Accomplishments
              </label>
              <textarea
                rows={3}
                value={exp.description || ''}
                onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                placeholder="Led development of core features, mentored junior developers, achieved 99.9% uptime..."
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Experience Trigger Button */}
      <button
        type="button"
        onClick={() => onAddExperience()}
        className="w-full py-4 border-2 border-dashed border-slate-700 hover:border-purple-500/60 rounded-2xl bg-slate-800/20 hover:bg-slate-800/40 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 cursor-pointer"
      >
        <Plus className="w-4 h-4 text-purple-400" />
        Add Work Experience Entry
      </button>
    </div>
  );
};

export default DynamicExperienceInput;
