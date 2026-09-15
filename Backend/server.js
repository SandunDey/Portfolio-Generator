require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const portfolioRoutes = require("./routes/portfolioRoutes");

// ── App Initialisation ─────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────────────────────

// CORS — allow requests from the React frontend (adjust origin in production)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse incoming JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// ── Routes ─────────────────────────────────────────────────────────────────────

// Health check — useful for deployment platforms (Render, Railway, etc.)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Generator API is running 🚀",
    version: "1.0.0",
    endpoints: {
      createPortfolio: "POST /api/portfolio",
      getPortfolio: "GET  /api/portfolio/:username",
      updatePortfolio: "PUT  /api/portfolio/:username",
      deletePortfolio: "DELETE /api/portfolio/:username",
    },
  });
});

// Portfolio CRUD routes
app.use("/api/portfolio", portfolioRoutes);

// ── 404 Handler ────────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ───────────────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ── Connect to DB, then Start Server ──────────────────────────────────────────

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
  });
});
