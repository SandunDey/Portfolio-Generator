import React, { useState } from 'react';
import { Plus, X, Sparkles, Check } from 'lucide-react';

const POPULAR_SUGGESTIONS = [
  'React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB',
  'Express.js', 'Tailwind CSS', 'Next.js', 'Python', 'Docker',
  'PostgreSQL', 'GraphQL', 'AWS', 'Git', 'Redux', 'REST API'
];

const DynamicSkillsInput = ({ skills = [], onAddSkill, onRemoveSkill }) => {
  const [skillInput, setSkillInput] = useState('');

  const handleAdd = (e) => {
    e?.preventDefault();
    if (skillInput.trim()) {
      onAddSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!skills.includes(suggestion)) {
      onAddSkill(suggestion);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill (e.g. React, Docker, Python) and press Enter"
            className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm light:bg-white light:border-slate-300 light:text-slate-900"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!skillInput.trim()}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* Added Skills List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Selected Skills ({skills.length})
          </span>
          {skills.length > 0 && (
            <span className="text-xs text-slate-500">
              Click &times; on any badge to remove
            </span>
          )}
        </div>

        {skills.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-800/30 text-center text-xs text-slate-400">
            No skills added yet. Type a skill above or click from suggestions below.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-900/60 to-purple-900/60 text-indigo-200 border border-indigo-500/30 shadow-sm animate-fade-in group hover:border-rose-500/50 transition-colors"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => onRemoveSkill(skill)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-indigo-300 group-hover:text-rose-400 hover:bg-rose-500/20 transition-colors"
                  title="Remove skill"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Quick Add Chips */}
      <div>
        <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Quick add recommendations:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SUGGESTIONS.map((sug) => {
            const isSelected = skills.includes(sug);
            return (
              <button
                type="button"
                key={sug}
                onClick={() => handleSuggestionClick(sug)}
                disabled={isSelected}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-slate-800/40 text-slate-500 border border-slate-800 cursor-default line-through'
                    : 'bg-slate-800 hover:bg-indigo-950/60 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/40 cursor-pointer'
                }`}
              >
                {isSelected ? <Check className="w-3 h-3 text-slate-500" /> : <Plus className="w-3 h-3" />}
                {sug}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DynamicSkillsInput;
