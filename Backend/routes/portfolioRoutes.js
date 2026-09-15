const express = require("express");
const router = express.Router();

const {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const {
  validateCreatePortfolio,
  validateUpdatePortfolio,
} = require("../middleware/validatePortfolio");

// ── Portfolio Routes ───────────────────────────────────────────────────────────

// POST   /api/portfolio          — Create a new portfolio
router.post("/", validateCreatePortfolio, createPortfolio);

// GET    /api/portfolio/:username — Fetch portfolio by username
router.get("/:username", getPortfolio);

// PUT    /api/portfolio/:username — Update an existing portfolio
router.put("/:username", validateUpdatePortfolio, updatePortfolio);

// DELETE /api/portfolio/:username — Delete a portfolio (optional)
router.delete("/:username", deletePortfolio);

module.exports = router;
