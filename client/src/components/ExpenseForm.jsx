import { useState } from "react";
import { useExpenseContext } from "../context/ContextApi";

const CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Other"];
const today = new Date().toISOString().split("T")[0];
const emptyForm = { amount: "", category: "", date: today, note: "" };

function getInitialForm(editingExpense) {
  if (!editingExpense) {
    return emptyForm;
  }

  return {
    amount: editingExpense.amount,
    category: editingExpense.category,
    date: editingExpense.date,
    note: editingExpense.note || "",
  };
}

export default function ExpenseForm({
  editingExpense,
  onCancelEdit,
  onEditDone,
}) {
  const { addExpense, updateExpense } = useExpenseContext();

  const [form, setForm] = useState(() => getInitialForm(editingExpense));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  function validate() {
    const errs = {};
    if (!form.amount || Number(form.amount) <= 0) {
      errs.amount = "Enter a positive amount.";
    }
    if (!form.category) {
      errs.category = "Please select a category.";
    }
    if (!form.date) {
      errs.date = "Date is required.";
    } else if (form.date > today) {
      errs.date = "Date cannot be in the future.";
    }
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setApiError("");

    try {
      const payload = { ...form, amount: parseFloat(form.amount) };

      if (editingExpense) {
        await updateExpense(editingExpense.id, payload);
        onEditDone();
      } else {
        await addExpense(payload);
      }
      setForm(emptyForm);
      setErrors({});
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  return (
    <div className="card">
      <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>

      {apiError && <p className="error-message">{apiError}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="amount">Amount (INR)</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
          />
          {errors.amount && (
            <span className="field-error">{errors.amount}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="field-error">{errors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            max={today}
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <span className="field-error">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="note">Note (optional)</label>
          <input
            id="note"
            name="note"
            type="text"
            placeholder="e.g. Dinner with client"
            value={form.note}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting
              ? "Saving..."
              : editingExpense
                ? "Update Expense"
                : "Add Expense"}
          </button>
          {editingExpense && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
