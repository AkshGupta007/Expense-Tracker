const express = require("express");
const cors = require("cors");
const expensesRouter = require("./Routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. CORS — must be first
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

// 2. Body parser
app.use(express.json());

// 3. Routes
app.use("/api", expensesRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// 4. Global error handler — always last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
