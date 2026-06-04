import { useExpenseContext } from "../context/ContextApi";
import { formatCurrency } from "../utils/formatCurrency";

export default function ExpenseTable({ onEdit }) {
  const { expenses, loading, error, deleteExpense } = useExpenseContext();

  function handleDelete(expense) {
    const label = expense.note || expense.category;
    if (
      window.confirm(`Delete "${label}" — ${formatCurrency(expense.amount)}?`)
    ) {
      deleteExpense(expense.id);
    }
  }

  if (loading) {
    return <p className="loading-text">Loading expenses...</p>;
  }

  if (error) {
    return <p className="error-message">⚠️ {error}</p>;
  }

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>🧾 No expenses found.</p>
        <p>Add one using the form, or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Expenses ({expenses.length})</h2>
      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Note</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>
                  <span
                    className={`badge badge-${expense.category.toLowerCase()}`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td>{expense.note || "—"}</td>
                <td className="amount">{formatCurrency(expense.amount)}</td>
                <td>
                  <button
                    className="btn-icon"
                    onClick={() => onEdit(expense)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon btn-danger"
                    onClick={() => handleDelete(expense)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
