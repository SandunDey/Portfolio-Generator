import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioFormContext = createContext();

const initialPortfolioState = {
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
};

const samplePortfolioData = {
  username: 'alexdev',
  fullName: 'Alex Morgan',
  title: 'Full Stack MERN Engineer & Cloud Architect',
  bio: 'Passionate developer crafting modern, scalable web applications with React, Node.js, and Cloud native technologies. Open source contributor and tech enthusiast.',
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  contact: {
    email: 'alex.morgan.dev@example.com',
    linkedin: 'https://linkedin.com/in/alex-morgan-dev',
    github: 'https://github.com/alex-morgan',
    website: 'https://alexmorgan.dev',
  },
  skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Express.js', 'Docker', 'GraphQL', 'Next.js', 'PostgreSQL'],
  projects: [
    {
      name: 'CloudSync - Realtime File Collaboration',
      description: 'A scalable cloud storage and collaborative markdown editor built with WebSockets, AWS S3, and React.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS S3'],
      githubLink: 'https://github.com/alex-morgan/cloudsync',
      liveDemo: 'https://cloudsync-demo.vercel.app',
    },
    {
      name: 'FinPulse - Crypto & Stock Tracker',
      description: 'High-frequency financial metrics dashboard offering interactive charts, alerts, and sentiment analysis.',
      techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Recharts', 'FastAPI'],
      githubLink: 'https://github.com/alex-morgan/finpulse',
      liveDemo: 'https://finpulse-demo.vercel.app',
    }
  ],
  experience: [
    {
      company: 'TechFlow Systems',
      role: 'Senior Full Stack Developer',
      duration: '2023 - Present',
      description: 'Architected microservices using Node.js and improved web client performance by 45% using React and modern caching strategies.',
    },
    {
      company: 'NovaLabs Inc.',
      role: 'Frontend Engineer',
      duration: '2021 - 2023',
      description: 'Engineered responsive single-page web applications with React, Redux, and Tailwind CSS serving 100k+ active daily users.',
    }
  ],
};

const DRAFT_STORAGE_KEY = 'devfolio_draft_data';

export const PortfolioFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        return JSON.parse(savedDraft);
      }
    } catch (e) {
      console.warn('Could not read draft from localStorage', e);
    }
    return initialPortfolioState;
  });

  // Auto-save draft changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.warn('Could not save draft to localStorage', e);
    }
  }, [formData]);

  // Update top-level text/url field
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update nested contact field
  const updateContactField = (subField, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [subField]: value,
      },
    }));
  };

  // --- Skills Handlers ---
  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const setSkills = (skillsArray) => {
    setFormData((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  // --- Projects Handlers ---
  const addProject = (project = { name: '', description: '', techStack: [], githubLink: '', liveDemo: '' }) => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const updateProject = (index, updatedProject) => {
    setFormData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[index] = updatedProject;
      return { ...prev, projects: newProjects };
    });
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // --- Experience Handlers ---
  const addExperience = (exp = { company: '', role: '', duration: '', description: '' }) => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, exp],
    }));
  };

  const updateExperience = (index, updatedExp) => {
    setFormData((prev) => {
      const newExp = [...prev.experience];
      newExp[index] = updatedExp;
      return { ...prev, experience: newExp };
    });
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Helper to load complete portfolio object (used by Edit page or Sample loader)
  const setEntirePortfolio = (data) => {
    setFormData({
      username: data.username || '',
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
  };

  const loadSampleData = () => {
    setEntirePortfolio(samplePortfolioData);
  };

  const resetForm = () => {
    setFormData(initialPortfolioState);
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <PortfolioFormContext.Provider
      value={{
        formData,
        setFormData,
        updateField,
        updateContactField,
        addSkill,
        removeSkill,
        setSkills,
        addProject,
        updateProject,
        removeProject,
        addExperience,
        updateExperience,
        removeExperience,
        setEntirePortfolio,
        loadSampleData,
        resetForm,
        initialPortfolioState,
      }}
    >
      {children}
    </PortfolioFormContext.Provider>
  );
};

export const usePortfolioForm = () => useContext(PortfolioFormContext);
