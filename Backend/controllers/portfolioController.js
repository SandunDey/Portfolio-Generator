const { validationResult } = require("express-validator");
const Portfolio = require("../models/Portfolio");

// ── Helper ─────────────────────────────────────────────────────────────────────

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  return null;
};

// ── POST /api/portfolio ────────────────────────────────────────────────────────
// Create a brand-new portfolio

const createPortfolio = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    // Check if username is already taken
    const existing = await Portfolio.findOne({
      username: req.body.username?.toLowerCase(),
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Username "${req.body.username}" is already taken. Please choose a different username.`,
      });
    }

    const portfolio = new Portfolio(req.body);
    const saved = await portfolio.save();

    return res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: saved,
    });
  } catch (error) {
    // Mongoose duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username already exists. Please choose another.",
      });
    }

    console.error("createPortfolio error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating portfolio",
      error: error.message,
    });
  }
};

// ── GET /api/portfolio/:username ───────────────────────────────────────────────
// Fetch a portfolio by username (also increments viewCount — bonus analytics)

const getPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    // Increment viewCount each time the public portfolio is fetched
    const portfolio = await Portfolio.findOneAndUpdate(
      { username: username.toLowerCase() },
      { $inc: { viewCount: 1 } },
      { new: true } // return the updated document
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: `Portfolio with username "${username}" not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    console.error("getPortfolio error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching portfolio",
      error: error.message,
    });
  }
};

// ── PUT /api/portfolio/:username ───────────────────────────────────────────────
// Update an existing portfolio

const updatePortfolio = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const { username } = req.params;

    // Prevent changing the username via the body to keep the URL stable
    delete req.body.username;

    const portfolio = await Portfolio.findOneAndUpdate(
      { username: username.toLowerCase() },
      { $set: req.body },
      {
        new: true,          // return the updated document
        runValidators: true, // run Mongoose validators on update
      }
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: `Portfolio with username "${username}" not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: portfolio,
    });
  } catch (error) {
    console.error("updatePortfolio error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating portfolio",
      error: error.message,
    });
  }
};

// ── DELETE /api/portfolio/:username ────────────────────────────────────────────
// Delete a portfolio (optional per spec)

const deletePortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    const portfolio = await Portfolio.findOneAndDelete({
      username: username.toLowerCase(),
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: `Portfolio with username "${username}" not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Portfolio for "${username}" has been deleted`,
    });
  } catch (error) {
    console.error("deletePortfolio error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting portfolio",
      error: error.message,
    });
  }
};

module.exports = {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
};
