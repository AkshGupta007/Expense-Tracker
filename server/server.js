const express = require('express');
const app = express();

const expensesRouter= require('./Routes/routes');
const cors = require('cors');

app.use(express.json());
app.use('/api', expensesRouter);
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});