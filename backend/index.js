const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "EduLedger API is running",
  });
});

// Register a school
app.post("/api/schools", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "School name and email are required",
    });
  }

  try {
    const result = db
      .prepare("INSERT INTO schools (name, email) VALUES (?, ?)")
      .run(name.trim(), email.trim().toLowerCase());

    res.status(201).json({
      success: true,
      message: "School registered successfully",
      school: {
        id: result.lastInsertRowid,
        name: name.trim(),
        email: email.trim().toLowerCase(),
      },
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        success: false,
        message: "A school with this email already exists",
      });
    }

    console.error("School registration error:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not register school",
    });
  }
});

// Retrieve all registered schools
app.get("/api/schools", (req, res) => {
  try {
    const schools = db
      .prepare("SELECT * FROM schools ORDER BY id DESC")
      .all();

    res.json({
      success: true,
      count: schools.length,
      schools,
    });
  } catch (error) {
    console.error("Retrieve schools error:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not retrieve schools",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`EduLedger API running at http://localhost:${PORT}`);
});