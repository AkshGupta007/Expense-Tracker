const fs=require('fs');

const getData =(req, res) => {
  try {
    let expenses = JSON.parse(fs.readFileSync("./Data/data.json", "utf-8"));
    const { category, startDate, endDate } = req.query;

    if (category && category !== 'All') {
      expenses = expenses.filter(e => e.category === category);
    }

    if (startDate) {
      expenses = expenses.filter(e => e.date >= startDate);
    }

    if (endDate) {
      expenses = expenses.filter(e => e.date <= endDate);
    }

    // Sort newest first
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read expenses.' });
  }};





const editData = (req, res) => {
  const { amount, category, date, note } = req.body;

  // Validation (same as POST)
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number.' });
  }
  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: 'A valid category is required.' });
  }
  if (!date || date > new Date().toISOString().split('T')[0]) {
    return res.status(400).json({ error: 'Invalid date.' });
  }

  try {
    const expenses = JSON.parse(fs.readFileSync('./Data/data.json', 'utf-8'))   ;
    const index = expenses.findIndex(e => e.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    expenses[index] = {
      ...expenses[index],
      amount: parseFloat(Number(amount).toFixed(2)),
      category,
      date,
      note: note || '',
    };

    fs.writeFileSync('./Data/data.json', JSON.stringify(expenses, null, 2));
    res.json(expenses[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense.' });
  }
};


const addData = (req, res) => {
  const { amount, category, date, note } = req.body;

  // Allowed categories
  const VALID_CATEGORIES = [
    "Food",
    "Transport",
    "Bills",
    "Entertainment",
    "Other",
  ];
  // Validation
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number." });
  }
  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: "A valid category is required." });
  }
  if (!date) {
    return res.status(400).json({ error: "Date is required." });
  }
  // No future dates
  if (date > new Date().toISOString().split("T")[0]) {
    return res.status(400).json({ error: "Date cannot be in the future." });
  }

  try {
    const expenses = JSON.parse(fs.readFileSync("./Data/data.json", "utf-8"));
    const newExpense = {
      id: uuidv4(),
      amount: parseFloat(Number(amount).toFixed(2)),
      category,
      date,
      note: note || "",
      createdAt: new Date().toISOString(),
    };
    expenses.push(newExpense);
    fs.writeFileSync("./Data/data.json", JSON.stringify(expenses, null, 2));
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: "Failed to save expense." });
  }
};;


const deleteData=(req,res)=>{
    try {
        const { id } = req.body;

        const results = JSON.parse(fs.readFileSync("./Data/data.json", "utf-8"));

        const index = results.findIndex((item) => item.id === id);
        if (index === -1) {
          return res.status(404).json({
            success: false,
            message: "Item not found",
          });
        }

        results.splice(index, 1);
        fs.writeFileSync("./Data/data.json", JSON.stringify(results, null, 2));

        res.status(200).json({
          success: true,
          message: "Item deleted successfully",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };


  