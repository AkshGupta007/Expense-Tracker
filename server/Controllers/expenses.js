const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DEFAULT_DATA_FILE = path.join(__dirname, "../Data/data.json");
const DATA_FILE = process.env.DATA_FILE || DEFAULT_DATA_FILE;

const VALID_CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Other",
];

const ensureDataFile = () => {
  if (fs.existsSync(DATA_FILE)) {
    return;
  }

  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  const seedData = fs.readFileSync(DEFAULT_DATA_FILE, "utf-8");
  fs.writeFileSync(DATA_FILE, seedData);
};

const readExpenses = () => {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

const writeExpenses = (expenses) => {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
};

const getData = (req, res) => {
  try {
    let expenses = readExpenses();
    const { category, startDate, endDate } = req.query;

    if (category && category !== "All") {
      expenses = expenses.filter((e) => e.category === category);
    }
    if (startDate) {
      expenses = expenses.filter((e) => e.date >= startDate);
    }
    if (endDate) {
      expenses = expenses.filter((e) => e.date <= endDate);
    }

    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to read expenses." });
  }
};

const editData = (req, res) => {
  const { amount, category, date, note } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number." });
  }
  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: "A valid category is required." });
  }
  if (!date || date > new Date().toISOString().split("T")[0]) {
    return res.status(400).json({ error: "Invalid date." });
  }

  try {
    const expenses = readExpenses();
    const index = expenses.findIndex((e) => e.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Expense not found." });
    }

    expenses[index] = {
      ...expenses[index],
      amount: parseFloat(Number(amount).toFixed(2)),
      category,
      date,
      note: note || "",
    };

    writeExpenses(expenses);
    res.json(expenses[index]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update expense." });
  }
};

const addData = (req, res) => {
  const { amount, category, date, note } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number." });
  }
  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: "A valid category is required." });
  }
  if (!date) {
    return res.status(400).json({ error: "Date is required." });
  }
  if (date > new Date().toISOString().split("T")[0]) {
    return res.status(400).json({ error: "Date cannot be in the future." });
  }

  try {
    const expenses = readExpenses();
    const newExpense = {
      id: uuidv4(),
      amount: parseFloat(Number(amount).toFixed(2)),
      category,
      date,
      note: note || "",
      createdAt: new Date().toISOString(),
    };
    expenses.push(newExpense);
    writeExpenses(expenses);
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: "Failed to save expense." });
  }
};

const deleteData = (req, res) => {
  try {
    const id = req.params.id;

    const results = readExpenses();
    const index = results.findIndex((item) => item.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    results.splice(index, 1);
    writeExpenses(results);

    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getData, editData, addData, deleteData };
