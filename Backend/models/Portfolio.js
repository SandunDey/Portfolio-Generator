const mongoose = require("mongoose");

// ── Sub-schemas ────────────────────────────────────────────────────────────────

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    techStack: [{ type: String, trim: true }],
    githubLink: { type: String, trim: true },
    liveDemo: { type: String, trim: true },
  },
  { _id: true }
);

const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, trim: true },
    role: { type: String, trim: true },
    duration: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: true }
);

// ── Main Portfolio Schema ──────────────────────────────────────────────────────

const PortfolioSchema = new mongoose.Schema(
  {
    // Unique identifier used in public URL: /portfolio/:username
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      // Allow only URL-safe characters: letters, numbers, hyphens, underscores
      match: [
        /^[a-z0-9_-]+$/,
        "Username may only contain lowercase letters, numbers, hyphens, and underscores",
      ],
    },

    // Personal Info
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    profileImage: {
      type: String,
      trim: true,
      default: "",
    },

    // Contact Details
    contact: {
      email: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
      website: { type: String, trim: true, default: "" },
    },

    // Skills (dynamic array of strings)
    skills: [{ type: String, trim: true }],

    // Projects
    projects: [ProjectSchema],

    // Work Experience
    experience: [ExperienceSchema],

    // Analytics — bonus: track how many times the public portfolio page is viewed
    viewCount: {
      type: Number,
      default: 0,
    },

    // Whether the portfolio has been published / made public
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// ── Export ───────────────────────────────────────────────────────────────────
module.exports = mongoose.model("UserPortfolio", PortfolioSchema);
