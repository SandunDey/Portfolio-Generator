const { body } = require("express-validator");

/**
 * Validation rules applied to POST (create) requests.
 * PUT (update) uses a subset — only runs when fields are present.
 */
const validateCreatePortfolio = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .trim()
    .toLowerCase()
    .matches(/^[a-z0-9_-]+$/)
    .withMessage(
      "Username may only contain lowercase letters, numbers, hyphens, and underscores"
    )
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("contact.email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("contact.linkedin")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),

  body("contact.github")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("GitHub must be a valid URL"),

  body("contact.website")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Personal website must be a valid URL"),

  body("profileImage")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Profile image must be a valid URL"),

  body("skills")
    .optional()
    .isArray()
    .withMessage("Skills must be an array"),

  body("skills.*")
    .optional()
    .isString()
    .trim()
    .withMessage("Each skill must be a string"),

  body("projects")
    .optional()
    .isArray()
    .withMessage("Projects must be an array"),

  body("projects.*.githubLink")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Project GitHub link must be a valid URL"),

  body("projects.*.liveDemo")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Project live demo must be a valid URL"),

  body("experience")
    .optional()
    .isArray()
    .withMessage("Experience must be an array"),
];

/**
 * Validation rules for PUT (update) — same as create but username & fullName
 * are optional because partial updates are allowed.
 */
const validateUpdatePortfolio = [
  body("fullName")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("contact.email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("contact.linkedin")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),

  body("contact.github")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("GitHub must be a valid URL"),

  body("contact.website")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Personal website must be a valid URL"),

  body("profileImage")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Profile image must be a valid URL"),

  body("skills").optional().isArray().withMessage("Skills must be an array"),

  body("projects")
    .optional()
    .isArray()
    .withMessage("Projects must be an array"),

  body("projects.*.githubLink")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Project GitHub link must be a valid URL"),

  body("projects.*.liveDemo")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Project live demo must be a valid URL"),

  body("experience")
    .optional()
    .isArray()
    .withMessage("Experience must be an array"),
];

module.exports = { validateCreatePortfolio, validateUpdatePortfolio };
