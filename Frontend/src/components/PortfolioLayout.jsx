import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  Layers,
  Sparkles,
  Eye,
  Calendar,
  Send,
  User,
  ArrowUpRight
} from 'lucide-react';

const PortfolioLayout = ({ data = {}, isPreview = false, onEditClick }) => {
  const {
    username,
    fullName = 'Developer Name',
    title = 'Software Engineer',
    bio = 'Building modern web applications and scalable software systems.',
    profileImage,
    contact = {},
    skills = [],
    projects = [],
    experience = [],
    viewCount = 0,
  } = data;

  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullName || 'Developer'
  )}&background=6366f1&color=fff&size=256&bold=true`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 light:bg-slate-50 light:text-slate-800">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* ================= HEADER / HERO SECTION ================= */}
        <section className="relative rounded-3xl p-8 sm:p-12 glass-panel border border-slate-800/80 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Profile Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-xl shadow-indigo-500/20 bg-slate-800">
                <img
                  src={profileImage || fallbackImage}
                  alt={fullName}
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold shadow-md flex items-center gap-1 border border-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                Available
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
                    {fullName}
                  </h1>
                  <p className="text-lg sm:text-xl font-medium text-indigo-400 mt-1">
                    {title || 'Software Developer'}
                  </p>
                </div>

                {/* View Count & Preview Badge */}
                <div className="flex items-center gap-2">
                  {isPreview && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Draft Preview Mode
                    </span>
                  )}
                  {!isPreview && (
                    <div
                      title="Total Portfolio Views"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{viewCount} views</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio Summary in Hero */}
              {bio && (
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {bio}
                </p>
              )}

              {/* Social / Contact Links Pill Bar */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400 group-hover:text-white" />
                    Email
                  </a>
                )}
                {contact.github && (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all shadow-sm"
                  >
                    <Github className="w-3.5 h-3.5 text-purple-400" />
                    GitHub
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                )}
                {contact.linkedin && (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 hover:border-blue-500 transition-all shadow-sm"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    LinkedIn
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                )}
                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500 transition-all shadow-sm"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    Website
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ME SECTION ================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
            <User className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
              About Me
            </h2>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl glass-card text-slate-300 dark:text-slate-300 light:text-slate-700 text-base leading-relaxed whitespace-pre-line">
            {bio || "Welcome to my portfolio! Here you can explore my projects, technical skills, and career journey."}
          </div>
        </section>

        {/* ================= SKILLS SECTION ================= */}
        {skills && skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                  Skills & Technologies
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {skills.length} skills listed
              </span>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl glass-card">
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800/90 text-indigo-200 border border-slate-700/80 shadow-sm hover:border-indigo-500/50 hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= PROJECTS SECTION ================= */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Code className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                  Featured Projects
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-6 glass-card flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors">
                        {project.name || `Project #${index + 1}`}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                      {project.description || 'No description provided.'}
                    </p>

                    {/* Tech Stack Pills */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-950/50 text-indigo-300 border border-indigo-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Links Footer */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-colors ml-auto"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= WORK EXPERIENCE SECTION ================= */}
        {experience && experience.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                Work Experience
              </h2>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 space-y-8 my-4">
              {experience.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-950 shadow-md"></div>

                  <div className="p-6 rounded-2xl glass-card space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white dark:text-white light:text-slate-900">
                          {exp.role || 'Role'}
                        </h3>
                        <p className="text-sm font-semibold text-indigo-400">
                          {exp.company || 'Company'}
                        </p>
                      </div>

                      {exp.duration && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 w-fit">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {exp.duration}
                        </span>
                      )}
                    </div>

                    {exp.description && (
                      <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed pt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= CONTACT SECTION ================= */}
        <section className="rounded-3xl p-8 sm:p-10 glass-panel border border-slate-800 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-2">
            <Send className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900">
            Let's Connect & Collaborate
          </h2>

          <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-lg mx-auto text-sm sm:text-base">
            Interested in working together or exploring new opportunities? Feel free to reach out directly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {contact.email ? (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                Send an Email
              </a>
            ) : (
              <span className="text-xs text-slate-500">No email provided</span>
            )}

            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                Connect on LinkedIn
              </a>
            )}
          </div>
        </section>

        {/* ================= FOOTER WATERMARK ================= */}
        <div className="text-center pt-8 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Created with DevFolio Platform</span>
          {username && (
            <span>
              URL: <code className="text-indigo-400">/portfolio/{username}</code>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioLayout;
