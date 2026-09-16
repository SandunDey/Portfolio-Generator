import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, Github, Layers, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

const DynamicProjectsInput = ({ projects = [], onAddProject, onUpdateProject, onRemoveProject, onReorderProjects }) => {
  const [techInputs, setTechInputs] = useState({});

  const handleTechKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechTag(index);
    }
  };

  const addTechTag = (index) => {
    const text = (techInputs[index] || '').trim();
    if (text) {
      const currentStack = projects[index]?.techStack || [];
      if (!currentStack.includes(text)) {
        onUpdateProject(index, {
          ...projects[index],
          techStack: [...currentStack, text],
        });
      }
      setTechInputs((prev) => ({ ...prev, [index]: '' }));
    }
  };

  const removeTechTag = (projectIndex, techToRemove) => {
    const currentStack = projects[projectIndex]?.techStack || [];
    onUpdateProject(projectIndex, {
      ...projects[projectIndex],
      techStack: currentStack.filter((t) => t !== techToRemove),
    });
  };

  const handleFieldChange = (index, field, value) => {
    onUpdateProject(index, {
      ...projects[index],
      [field]: value,
    });
  };

  const moveUp = (index) => {
    if (index === 0 || !onReorderProjects) return;
    const updated = [...projects];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onReorderProjects(updated);
  };

  const moveDown = (index) => {
    if (index === projects.length - 1 || !onReorderProjects) return;
    const updated = [...projects];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onReorderProjects(updated);
  };

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 shadow-lg relative group transition-all duration-200 hover:border-indigo-500/30"
        >
          {/* Card Header & Actions */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/60">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-bold">
                #{index + 1}
              </div>
              <span className="font-semibold text-slate-200 text-sm">
                {project.name || `Project ${index + 1}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {onReorderProjects && (
                <>
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    title="Move up"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === projects.length - 1}
                    title="Move down"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => onRemoveProject(index)}
                title="Delete project"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-colors ml-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Project Title <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                value={project.name || ''}
                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                placeholder="e.g. AI Content Studio, CryptoTracker Dashboard"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Description
              </label>
              <textarea
                rows={2}
                value={project.description || ''}
                onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                placeholder="Key features, problem solved, architecture details..."
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={project.githubLink || ''}
                onChange={(e) => handleFieldChange(index, 'githubLink', e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* Live Demo URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                Live Demo URL
              </label>
              <input
                type="url"
                value={project.liveDemo || ''}
                onChange={(e) => handleFieldChange(index, 'liveDemo', e.target.value)}
                placeholder="https://myproject.vercel.app"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* Tech Stack Chips */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Tech Stack Used (e.g. React, Tailwind, PostgreSQL)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInputs[index] || ''}
                  onChange={(e) => setTechInputs((prev) => ({ ...prev, [index]: e.target.value }))}
                  onKeyDown={(e) => handleTechKeyDown(index, e)}
                  placeholder="Type technology & press Add or Enter"
                  className="flex-1 px-3 py-1.5 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-xs focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => addTechTag(index)}
                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg"
                >
                  Add Tag
                </button>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5">
                {(project.techStack || []).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900 text-indigo-300 border border-indigo-500/20"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechTag(index, tech)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Project Trigger Button */}
      <button
        type="button"
        onClick={() => onAddProject()}
        className="w-full py-4 border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-2xl bg-slate-800/20 hover:bg-slate-800/40 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 cursor-pointer"
      >
        <Plus className="w-4 h-4 text-indigo-400" />
        Add New Project Entry
      </button>
    </div>
  );
};

export default DynamicProjectsInput;
